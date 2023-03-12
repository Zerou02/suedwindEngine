export interface Dimensions {
  x: number;
  y: number;
  w: number;
  h: number;
  rotationDegrees: number;
}

export interface Transform {
  dimensions: Dimensions;
  layer: number;
}

export interface Coordinate2d {
  x: number;
  y: number;
}
