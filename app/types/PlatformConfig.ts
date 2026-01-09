import type { PlatFormType } from "./PlatformType";

export type PlatformConfig = {
  key: PlatFormType;
  title: string;
  text: string;
  startingPosition: "left" | "right";

  panel: {
    viewBox: string;
    path: string;
    width: number;
    height: number;
    imgSrc: any;
    clipId: string;
  };

  circuit: {
    imgSrc: any;
    frameIndex: number;
    absoluteClass: string;
    styleWidth: string;
    strokeWidth?: number;
  };

  captionFrame: {
    viewBox: string;
    path: string;
    strokeColor: string;
    fillColor?: string;
    strokeWidth: number;
  };

  dx: string;
};
