import { DrawManager } from "./core/DrawManager.js";
import { gAssetPath, gKeyBoardManager } from "./core/globals.js";
import { Entity } from "./core/Entity.js";
import { Scene } from "./core/Scene.js";
import { Sprite } from "./core/Sprite.js";
import { createButton, createCanvas } from "./core/menuItems.js";
import { EosMap } from "./core/types";
import { TileMapEditorScene } from "./core/TileMapEditor/TileMapEditorScene.js";
import { Rectangle } from "./core/Rectangle.js";
import { EosParser } from "./core/EosParser.js";
//@ts-ignore
//import config from "../../config.json" assert { type: "json" };

import { loadWorld } from "../../EoS/EoS.js";

const initializeTest = () => {
  const baseScene = new Scene();

  let canvas = createCanvas(800, 600);
  let top = createCanvas(400, 300);
  let testButton = createButton(
    { x: 0, y: 100, h: 100, w: 200 },
    "Destroy world",
    (e) => baseScene.deconstruct(),
    "testButton"
  );

  baseScene.addMenuItem(testButton);
  baseScene.layerManager.addLayer("veryTop", createCanvas(800, 600), 2, false);
  baseScene.layerManager.addLayer("top", top, 1, true);
  baseScene.layerManager.addLayer("ground", canvas, 0, true);

  let topLayer = baseScene.layerManager.layers["top"];
  let groundLayer = baseScene.layerManager.layers["ground"];
  let veryTopLayer = baseScene.layerManager.layers["veryTop"];

  let enemySprie = new Sprite(
    gAssetPath + "sprites/spaceship.png",
    topLayer,
    { x: 0, y: 0 },
    { x: 400, y: 300 },
    baseScene
  );
  let sprite = new Sprite(
    gAssetPath + "icons/appIcon.png",
    groundLayer,
    {
      x: 0,
      y: 400,
    },
    { x: 100, y: 100 },
    baseScene
  );

  let rect = new Rectangle(
    { x: 0, y: 0, w: 100, h: 100 },
    groundLayer,
    baseScene,
    "green"
  );

  let player = new Entity(sprite);
  let enemy = new Entity(enemySprie);

  gKeyBoardManager.addFunction("w", (e) => player.move({ x: 0, y: -10 }));
  gKeyBoardManager.addFunction("a", (e) => player.move({ x: -10, y: 0 }));
  gKeyBoardManager.addFunction("s", (e) => player.move({ x: 0, y: 10 }));
  gKeyBoardManager.addFunction("d", (e) => player.move({ x: 10, y: 0 }));
  gKeyBoardManager.addFunction("+", (e) =>
    sprite.increaseSize({ x: 10, y: 10 })
  );
  gKeyBoardManager.addFunction("-", (e) =>
    sprite.increaseSize({ x: -10, y: -10 })
  );
  gKeyBoardManager.addFunction("f", (e) => sprite.setLayer(veryTopLayer), true);
  document.addEventListener("mousedown", (e: MouseEvent) =>
    console.log("mousPos", e.clientX, e.clientY)
  );
  gKeyBoardManager.addFunction("l", (e) => baseScene.deconstruct());

  console.log(baseScene.layerManager);
};
initializeTest();

let ti = new TileMapEditorScene(gAssetPath + "tiles/spritesheet.png");

//@ts-ignore
Neutralino.init();
//@ts-ignore
let cfgPlain = (await Neutralino.filesystem.readFile(
  "./config.json"
)) as string;
let config = JSON.parse(cfgPlain);
//@ts-ignore
let b = (await loadWorld(cfgPlain.worldPath)) as EosMap;

console.log(b);

let eosParser = new EosParser();
let parsed = eosParser.parseEosMap(b);

console.log("pa", parsed);
