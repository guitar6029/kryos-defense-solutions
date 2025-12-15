import type { CommandStatus } from "./CommandStatus";

export type CommandType = "PING" | "RECALL" | "SET_MODE";

export type Command = {
  id: string;
  type: CommandType;
  targetUnitId: string;
  paylaod?: Record<string, any>;
  status: CommandStatus;
  createdAt: number;
  sendAt?: number;
  ackedAt?: number;
  error?: string;
  attempts: number;
};
