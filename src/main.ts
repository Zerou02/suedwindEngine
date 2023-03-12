import { gAssetPath, gKeyBoardManager, gLayerManager } from "./globals.js";
import { Sprite } from "./Sprite.js";

const initialize = () => {
  let body = document.getElementById("body") as HTMLBodyElement;
  let canvas = document.createElement("canvas") as HTMLCanvasElement;
  canvas.width = 800;
  canvas.height = 600;
  body.append(canvas);
  let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

  gLayerManager.addLayer(canvas);
  let sprite = new Sprite(gAssetPath + "icons/appIcon.png", ctx);
  gKeyBoardManager.addFunction("w", (e) => sprite.move({ x: 0, y: -10 }));
  gKeyBoardManager.addFunction("a", (e) => sprite.move({ x: -10, y: 0 }));
  gKeyBoardManager.addFunction("s", (e) => sprite.move({ x: 0, y: 10 }));
  gKeyBoardManager.addFunction("d", (e) => sprite.move({ x: 10, y: 0 }));
};
initialize();
