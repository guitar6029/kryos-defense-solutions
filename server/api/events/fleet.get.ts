import { defineEventHandler, setResponseHeader } from "h3";
import {
  formatFleetEvent,
  subscribeToFleetEvents,
} from "../../utils/fleet-events";
import { HEARTBEAT_MS_DEFAULT } from "./constants/fleet";



export default defineEventHandler(async (event) => {
  const response = event.node.res;
  setResponseHeader(event, "Content-Type", "text/event-stream; charset=utf-8");
  setResponseHeader(event, "Cache-Control", "no-cache, no-transform");
  setResponseHeader(event, "Connection", "keep-alive");
  setResponseHeader(event, "X-Accel-Buffering", "no");

  response.flushHeaders();

  await new Promise<void>((resolve) => {
    let closed = false;
    let unsubscribe = () => { };
    const cleanup = () => {
      if (closed) return;
      closed = true;
      clearInterval(heartbeat);
      unsubscribe();
      response.off("close", cleanup);
      response.off("error", fail);
      resolve();
    };
    const fail = () => {
      // The transport failed; never write exception details into the stream.
      cleanup();
    };
    const write = (frame: string) => {
      if (closed) return;
      try {
        response.write(frame);
      } catch {
        fail();
      }
    };

    const heartbeat = setInterval(() => write(": keepalive\n\n"), HEARTBEAT_MS_DEFAULT);
    response.once("close", cleanup);
    response.once("error", fail);
    unsubscribe = subscribeToFleetEvents((fleetEvent) =>
      write(formatFleetEvent(fleetEvent)),
    );

    try {
      write(": connected\n\n");
    } catch {
      fail();
    }
  });
});

