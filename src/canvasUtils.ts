import { Coordinate2d } from "./types.js";

export const drawImage = (
  ctx: CanvasRenderingContext2D,
  imgPath: string,
  position: Coordinate2d,
  onLoadFn: (img: HTMLImageElement) => void
) => {
  let ima = new Image();
  ima.src = imgPath;
  ima.onload = () => {
    ctx.drawImage(ima, position.x, position.y);
    onLoadFn(ima);
  };
};
