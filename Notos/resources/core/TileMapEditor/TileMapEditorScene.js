import { createCanvas } from "../menuItems.js";
import { Scene } from "../Scene.js";
import { Sprite } from "../Sprite.js";
export class TileMapEditorScene {
    scene;
    spriteSheet;
    constructor(spriteSheetSrc) {
        this.scene = new Scene();
        this.scene.layerManager.addLayer("base", createCanvas(800, 600), 0, false);
        let baseLevel = this.scene.layerManager.layers["base"];
        this.spriteSheet = new Sprite(spriteSheetSrc, { x: 0, y: 0 }, null, this.scene, baseLevel);
    }
}
