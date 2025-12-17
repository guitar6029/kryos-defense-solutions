export type Callout = {
  id: string;
  anchor: {
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
  };
  wClass: string;
  hClass: string;
  showLine?: boolean;
  lineFrom?: "tl" | "tc" | "tr" | "lc" | "rc" | "bl" | "bc" | "br";
  lineLen?: string;
  title: string;
  body: string;
};
