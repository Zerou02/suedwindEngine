import { Sprite } from "./Sprite";
import { Rectangle } from "./Rectangle";
import { Circle } from "./Circle";
import { Line } from "./Line";
import { Drawable } from "./Drawable";

export interface Dimensions {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface Transform {
  dimensions: Dimensions;
  layer: number;
}

export interface Coordinate2d {
  x: number;
  y: number;
}

export type DrawableObject = Drawable;

export interface EosItem {
  type: "rect";
  origin: Coordinate2d;
  end: Coordinate2d;
}

export interface EosMap {
  [key: string]: EosItem[];
}
