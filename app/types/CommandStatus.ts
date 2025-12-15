export type CommandStatus =
  | "queued"
  | "sending"
  | "acked"
  | "failed"
  | "canceled";
