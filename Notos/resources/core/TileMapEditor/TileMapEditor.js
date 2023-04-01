import { Layer } from "../Layer.js";
import { Scene } from "../Scene.js";
export class TileMapEditor {
    spriteSheetSelection;
    mapScene;
    mapLayer;
    constructor(spriteSheetSelection) {
        this.mapScene = new Scene();
        this.spriteSheetSelection = spriteSheetSelection;
        let baseDimensions = this.spriteSheetSelection.sheetLayer.dimensions;
        let mapLayer = new Layer({ x: baseDimensions.x + baseDimensions.w + 100, y: baseDimensions.y, w: 500, h: 500 }, "mapLayer", 0, false, this.mapScene.layerManager);
        mapLayer.addBorder();
    }
}
