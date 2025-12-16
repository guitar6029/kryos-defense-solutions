export type Status =
  // ─── SYSTEM / NODE STATES ───
  | "ONLINE"
  | "OFFLINE"
  | "MAINTENANCE"
  | "DEGRADED"

  // ─── COMMAND STATES ───
  | "QUEUED"
  | "SENDING"
  | "ACKED"
  | "FAILED"
  | 'CANCELED';
