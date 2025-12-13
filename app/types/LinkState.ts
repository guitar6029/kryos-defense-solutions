export type LinkStatus = "STABLE" | "WEAK" | "LOST";

export type LinkState = {
  status: LinkStatus;
  signalQuality: number;
};
