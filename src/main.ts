import { gAssetPath, gKeyBoardManager, gSpriteManager } from "./globals.js";
import { Sprite } from "./Sprite.js";
import { Coordinate2d } from "./types.js";

const initialize = () => {
  let body = document.getElementById("body") as HTMLBodyElement;
  let canvas = document.createElement("canvas") as HTMLCanvasElement;
  let canvas2 = document.createElement("canvas") as HTMLCanvasElement;

  //canvas.style.zIndex = "2";
  canvas.width = 800;
  canvas.height = 600;
  canvas2.width = 400;
  canvas2.height = 300;

  body.append(canvas);
  body.append(canvas2);

  let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

  let ctx2 = canvas2.getContext("2d");
  ctx2!.fillStyle = "red";

  //  ctx2?.fillRect(0, 0, 400, 300);
  ctx?.fillRect(0, 0, 800, 600);
  let sprite = new Sprite(gAssetPath + "icons/appIcon.png", ctx);
  gKeyBoardManager.addFunction("w", (e) => sprite.move({ x: 0, y: -10 }));
  gKeyBoardManager.addFunction("a", (e) => sprite.move({ x: -10, y: 0 }));
  gKeyBoardManager.addFunction("s", (e) => sprite.move({ x: 0, y: 10 }));
  gKeyBoardManager.addFunction("d", (e) => sprite.move({ x: 10, y: 0 }));

  //  setInterval(() => {}, 1000 / 30);
};
initialize();
