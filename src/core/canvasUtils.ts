import { Coordinate2d } from "./types.js";

export const drawImage = (
  ctx: CanvasRenderingContext2D,
  imgPath: string,
  position: Coordinate2d,
  size: Coordinate2d | null,
  onLoadFn: (img: HTMLImageElement) => void
) => {
  let ima = new Image();
  ima.src = imgPath;
  ima.onload = () => {
    if (size) {
      ctx.drawImage(ima, position.x, position.y, size.x, size.y);
    } else {
      ctx.drawImage(ima, position.x, position.y);
    }
    onLoadFn(ima);
  };
};
