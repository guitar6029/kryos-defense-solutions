import type { CommandFailReason } from "./CommandFailReason";
import type { CommandStatus } from "./CommandStatus";

export type CommandType = "PING" | "RECALL" | "SET_MODE";

export type Command = {
  id: string;
  type: CommandType;
  targetUnitId: string;
  payload?: Record<string, any>;
  status: CommandStatus;
  createdAt: number;
  sentAt?: number;
  ackedAt?: number;
  error?: CommandFailReason | string;
  attempts: number;
};

export type CommandDraft = Pick<Command, "type" | "targetUnitId" | "payload">;
