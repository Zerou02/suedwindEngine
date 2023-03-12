import {
  gAssetPath,
  gKeyBoardManager,
  gLayerManager,
  gSpriteManager,
} from "./globals.js";
import { Sprite } from "./Sprite.js";

const createCanvas = (width: number, height: number) => {
  let canvas = document.createElement("canvas") as HTMLCanvasElement;
  canvas.style.position = "absolute";
  canvas.width = width;
  canvas.height = height;
  console.log({ canvas });
  return canvas;
};

const initialize = () => {
  let body = document.getElementById("body") as HTMLBodyElement;
  let canvas = createCanvas(800, 600);
  let top = createCanvas(400, 300);
  body.append(top);
  body.append(canvas);

  gLayerManager.addLayer("veryTop", createCanvas(800, 600), 2);
  gLayerManager.addLayer("top", top, 1);
  gLayerManager.addLayer("ground", canvas, 0);

  let topLayer = gLayerManager.layers["top"];
  let groundLayer = gLayerManager.layers["ground"];
  let veryTopLayer = gLayerManager.layers["veryTop"];
  body.append(veryTopLayer.canvas);
  let enemy = new Sprite(
    gAssetPath + "sprites/spaceship.png",
    topLayer,
    { x: 0, y: 0 },
    { x: 400, y: 300 }
  );
  let sprite = new Sprite(gAssetPath + "icons/appIcon.png", groundLayer);

  gKeyBoardManager.addFunction("w", (e) => sprite.move({ x: 0, y: -10 }));
  gKeyBoardManager.addFunction("a", (e) => sprite.move({ x: -10, y: 0 }));
  gKeyBoardManager.addFunction("s", (e) => sprite.move({ x: 0, y: 10 }));
  gKeyBoardManager.addFunction("d", (e) => sprite.move({ x: 10, y: 0 }));
  gKeyBoardManager.addFunction("+", (e) =>
    sprite.increaseSize({ x: 10, y: 10 })
  );
  gKeyBoardManager.addFunction("-", (e) =>
    sprite.increaseSize({ x: -10, y: -10 })
  );
  gKeyBoardManager.addFunction("f", (e) => sprite.setLayer(veryTopLayer), true);
};
initialize();
