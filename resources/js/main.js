import { DrawManager } from "./DrawManager.js";
import { gAssetPath, gKeyBoardManager } from "./globals.js";
import { Player } from "./Player.js";
import { Scene } from "./Scene.js";
import { Sprite } from "./Sprite.js";
const createCanvas = (width, height) => {
    let canvas = document.createElement("canvas");
    canvas.style.position = "absolute";
    canvas.width = width;
    canvas.height = height;
    return canvas;
};
const initialize = () => {
    let body = document.getElementById("body");
    let canvas = createCanvas(800, 600);
    let top = createCanvas(400, 300);
    body.append(top);
    body.append(canvas);
    const baseScene = new Scene();
    const gDrawManager = new DrawManager(baseScene);
    baseScene.layerManager.addLayer("veryTop", createCanvas(800, 600), 2, false);
    baseScene.layerManager.addLayer("top", top, 1, true);
    baseScene.layerManager.addLayer("ground", canvas, 0, true);
    let topLayer = baseScene.layerManager.layers["top"];
    let groundLayer = baseScene.layerManager.layers["ground"];
    let veryTopLayer = baseScene.layerManager.layers["veryTop"];
    body.append(veryTopLayer.canvas);
    let enemySprie = new Sprite(gAssetPath + "sprites/spaceship.png", topLayer, { x: 0, y: 0 }, { x: 400, y: 300 }, baseScene);
    let sprite = new Sprite(gAssetPath + "icons/appIcon.png", groundLayer, {
        x: 0,
        y: 400,
    }, { x: 100, y: 100 }, baseScene);
    let player = new Player(sprite);
    let enemy = new Player(enemySprie);
    gKeyBoardManager.addFunction("w", (e) => player.move({ x: 0, y: -10 }));
    gKeyBoardManager.addFunction("a", (e) => player.move({ x: -10, y: 0 }));
    gKeyBoardManager.addFunction("s", (e) => player.move({ x: 0, y: 10 }));
    gKeyBoardManager.addFunction("d", (e) => player.move({ x: 10, y: 0 }));
    gKeyBoardManager.addFunction("+", (e) => sprite.increaseSize({ x: 10, y: 10 }));
    gKeyBoardManager.addFunction("-", (e) => sprite.increaseSize({ x: -10, y: -10 }));
    gKeyBoardManager.addFunction("f", (e) => sprite.setLayer(veryTopLayer), true);
    document.addEventListener("mousedown", (e) => console.log("mousPos", e.clientX, e.clientY));
    console.log(baseScene.layerManager);
};
initialize();
