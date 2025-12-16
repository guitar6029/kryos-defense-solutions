import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { Command, CommandDraft } from "~/types/Command";
import type { CommandFailReason } from "~/types/CommandFailReason";

const randomFailReason = (): CommandFailReason => {
  const reasons: CommandFailReason[] = [
    "timeout",
    "unreachable",
    "rejected",
    "invalid",
    "internal",
  ];

  return reasons[Math.floor(Math.random() * reasons.length)]!;
};

export const useSystemCommandStore = defineStore("systemCommand", () => {
  const queue = ref<Command[]>([]);
  const history = ref<Command[]>([]);
  const activeId = ref<string | null>(null);

  const requestCommand = (draft: CommandDraft) => {
    console.log("request command : ", draft);
    //create full Command from the draft
    const command: Command = {
      id: crypto.randomUUID(),
      createdAt: Date.now(),
      status: "QUEUED",
      attempts: 0,
      ...draft,
    };

    //push to the queue
    queue.value.push(command);
    console.log("before kick");
    kick();
  };

  // decides whether something should be sent
  const kick = () => {
    console.log("in kick");
    if (activeId.value) return;

    console.log("finding next qued only");
    console.log(
      "queue snapshot",
      queue.value.map((c) => ({ id: c.id, status: c.status }))
    );
    const nextQueuedOnly = queue.value.find(
      (c: Command) => c.status === "QUEUED"
    );
    if (nextQueuedOnly) {
      console.log("sending queue with id");
      send(nextQueuedOnly.id);
    } else {
      console.log("not found ");
    }
  };

  const send = (id: string) => {
    console.log("inside the send");
    //set the id as th active id
    activeId.value = id;

    //find the command in queue
    const activeCommand = queue.value.find((c: Command) => c.id === id);

    if (!activeCommand) {
      console.log("before reset active id");
      resetActiveId();
      kick();
      return;
    }

    //send
    markSending(activeCommand);

    //ack orfail
    // use Math.random , if > .5 , then send, else fails
    setTimeout(() => {
      const connectionSuccess = Math.random() > 0.5;
      //good
      if (connectionSuccess) {
        console.log("in time out, ack");
        ack(activeCommand);
      } else {
        //failed
        console.log("in time out, it failed");
        const reason = randomFailReason();
        fail(activeCommand, reason);
      }
    }, 3500);
  };

  const fail = (command: Command, reason: CommandFailReason = "unknown") => {
    console.log("it failed");
    //mark the status to failed
    command.status = "FAILED";
    command.error = reason;

    // remove from queue
    removeFromQueue(command);

    //add to history
    addCommandToHistory(command);

    //celar the active
    resetActiveId();

    //resume the queue
    kick();
  };

  const removeFromQueue = (command: Command) => {
    const index = queue.value.findIndex((c: Command) => c.id === command.id);
    if (index !== -1) {
      queue.value.splice(index, 1);
    }
  };

  const ack = (command: Command) => {
    //set new status and time ackedAt
    command.status = "ACKED";
    command.ackedAt = Date.now();

    //clean up
    //first remove from queue
    removeFromQueue(command);
    // add the command to the history log
    addCommandToHistory(command);
    // and then clear the active id
    resetActiveId();

    console.log("before ack : ", command);
    // start the next queued
    kick();
  };

  const resetActiveId = () => {
    activeId.value = null;
  };

  const addCommandToHistory = (command: Command) => {
    history.value.unshift(command);
  };

  const markSending = (activeCommand: Command) => {
    activeCommand.status = "SENDING";
    activeCommand.sentAt = Date.now();
    activeCommand.attempts++;
  };

  const getQueued = computed(() => {
    return queue.value.filter((c: Command) => c.status === "QUEUED");
  });

  const getActive = computed(() => {
    return queue.value.find((c: Command) => c.id === activeId.value) ?? null;
  });

  const queuedCount = computed(() => {
    return queue.value.filter((c: Command) => c.status === "QUEUED").length;
  });

  const failedCount = computed(() => {
    return history.value.filter((c: Command) => c.status === "FAILED").length;
  });

  const getHistory = computed(() => {
    return history.value;
  });

  const lastAckMsAgo = computed(() => {
    const ackedOnly =
      history.value.filter((c: Command) => c.status === "ACKED") ?? [];
    if (ackedOnly.length === 0) {
      return 0;
    }

    let max = 0;
    for (let i = 0; i < ackedOnly.length; ) {
      const ackedCurVal = ackedOnly[i]?.ackedAt ?? 0;
      if (ackedCurVal > max) {
        max = ackedCurVal;
      }
      i++;
    }

    const calculated = Date.now() - max;
    return calculated;
  });

  return {
    failedCount,
    getActive,
    getHistory,
    getQueued,
    lastAckMsAgo,
    queuedCount,
    requestCommand,
  };
});
