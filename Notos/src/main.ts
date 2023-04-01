import { gAssetPath, gKeyBoardManager } from "./core/globals.js";
import { Entity } from "./core/Entity.js";
import { Scene } from "./core/Scene.js";
import { Sprite } from "./core/Sprite.js";
import { createButton, createCanvas } from "./core/menuItems.js";
import { EosMap } from "./core/types";
import { TileMapEditor } from "./core/TileMapEditor/TileMapEditor.js";
import { Rectangle } from "./core/Rectangle.js";
import { EosParser } from "./core/EosParser.js";
//@ts-ignore
//import config from "../../config.json" assert { type: "json" };

import { loadWorld } from "../../EoS/EoS.js";
import { Circle } from "./core/Circle.js";
import { SpriteSheet } from "./core/TileMapEditor/Spritesheet.js";
import { SpriteSheetSelection } from "./core/TileMapEditor/SpriteSheetSelection.js";

const initializeTest = () => {
  const baseScene = new Scene();

  let testButton = createButton({ x: 0, y: 100, h: 100, w: 200 }, "Destroy world", (e) => baseScene.deconstruct());

  baseScene.addMenuItem(testButton);
  baseScene.layerManager.addLayer({ x: 0, y: 0, h: 600, w: 800 }, "veryTop", 2, false);
  baseScene.layerManager.addLayer({ x: 0, y: 0, h: 300, w: 400 }, "top", 1, true);
  baseScene.layerManager.addLayer({ x: 0, y: 0, h: 600, w: 800 }, "ground", 0, true);

  let topLayer = baseScene.layerManager.layers["top"];
  let groundLayer = baseScene.layerManager.layers["ground"];
  let veryTopLayer = baseScene.layerManager.layers["veryTop"];

  let enemySprie = new Sprite(
    gAssetPath + "sprites/spaceship.png",
    { x: 0, y: 0 },
    { x: 400, y: 300 },
    baseScene,
    topLayer
  );

  let sprite = new Sprite(
    gAssetPath + "icons/appIcon.png",
    {
      x: 0,
      y: 400,
    },
    { x: 100, y: 100 },
    baseScene,
    groundLayer
  );

  let rect = new Rectangle({ x: 0, y: 0, w: 100, h: 100 }, "green", baseScene, groundLayer);

  let player = new Entity(sprite);
  let enemy = new Entity(enemySprie);

  gKeyBoardManager.addFunction("w", (e) => player.move({ x: 0, y: -10 }));
  gKeyBoardManager.addFunction("a", (e) => player.move({ x: -10, y: 0 }));
  gKeyBoardManager.addFunction("s", (e) => player.move({ x: 0, y: 10 }));
  gKeyBoardManager.addFunction("d", (e) => player.move({ x: 10, y: 0 }));
  gKeyBoardManager.addFunction("+", (e) => sprite.increaseSize({ x: 10, y: 10 }));
  gKeyBoardManager.addFunction("-", (e) => sprite.increaseSize({ x: -10, y: -10 }));
  gKeyBoardManager.addFunction("f", (e) => sprite.setLayer(veryTopLayer), true);
  document.addEventListener("mousedown", (e: MouseEvent) => console.log("mousPos", e.clientX, e.clientY));
  gKeyBoardManager.addFunction("l", (e) => baseScene.deconstruct());
};

const eosTest = async () => {
  //@ts-ignore
  let cfgPlain = (await Neutralino.filesystem.readFile("./config.json")) as string;
  let config = JSON.parse(cfgPlain);
  //@ts-ignore
  let worldMap = (await loadWorld(cfgPlain.worldPath)) as EosMap;

  let eosParser = new EosParser();
  let parsed = eosParser.parseEosMap(worldMap);
};

const circleTest = () => {
  let baseScene = new Scene();
  baseScene.layerManager.addLayer({ x: 0, y: 0, w: 500, h: 500 }, "ground", 0, true);
  let circle = new Circle({ x: 100, y: 100 }, 50, "red", baseScene, baseScene.layerManager.layers["ground"]);
};
//@ts-ignore
Neutralino.init();

//tileMapTest();
//initializeTest();

let spriteSheetSelection = new SpriteSheetSelection("dungeon_ground");
await spriteSheetSelection.init();
new TileMapEditor(spriteSheetSelection);
