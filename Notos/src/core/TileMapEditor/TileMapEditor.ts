import { Layer } from "../Layer.js";
import { Scene } from "../Scene.js";
import { SpriteSheetSelection } from "./SpriteSheetSelection.js";

export class TileMapEditor {
  spriteSheetSelection: SpriteSheetSelection;
  mapScene: Scene;
  mapLayer: Layer;
  constructor(spriteSheetSelection: SpriteSheetSelection) {
    this.mapScene = new Scene();
    this.spriteSheetSelection = spriteSheetSelection;

    let baseDimensions = this.spriteSheetSelection.sheetLayer.dimensions;
    let mapLayer = new Layer(
      { x: baseDimensions.x + baseDimensions.w + 100, y: baseDimensions.y, w: 500, h: 500 },
      "mapLayer",
      0,
      false,
      this.mapScene.layerManager
    );

    mapLayer.addBorder();
  }
}
