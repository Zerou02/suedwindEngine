import { Layer } from "../Layer.js";
import { Line } from "../Line.js";
import { Scene } from "../Scene.js";
import { Sprite } from "../Sprite.js";
import { SpriteSheet } from "./Spritesheet.js";

export class TileMapEditorScene {
  scene: Scene;
  spriteSheet: SpriteSheet;
  gridSize: number;
  constructor(spriteSheetSrc: string) {
    this.scene = new Scene();
    this.gridSize = 100;

    let spriteSheetLvl = new Layer(
      { x: 0, y: 0, w: 200, h: 200 },
      "spriteSheet",
      0,
      false,
      this.scene.layerManager
    );

    this.spriteSheet = new SpriteSheet(
      new Sprite(
        spriteSheetSrc,
        { x: 0, y: 0 },
        { x: 60, y: 60 },
        this.scene,
        spriteSheetLvl
      ),
      2,
      16
    );

    let mapLayer = new Layer(
      { x: 200, y: 200, h: 500, w: 500 },
      "map",
      1,
      false,
      this.scene.layerManager
    );

    for (let y = 0; y <= mapLayer.dimensions.h; y += this.gridSize) {
      new Line(
        { x: 0, y },
        { x: mapLayer.dimensions.w, y },
        "black",
        this.scene,
        mapLayer
      );
    }

    for (let x = 0; x <= mapLayer.dimensions.w; x += this.gridSize) {
      new Line(
        { x, y: 0 },
        { x, y: mapLayer.dimensions.h },
        "black",
        this.scene,
        mapLayer
      );
    }

    spriteSheetLvl.canvas.addEventListener("mousedown", (e) => {
      this.spriteSheet.currentSelectedPicture = {
        x: Math.floor(e.x / 20),
        y: Math.floor(e.y / 20),
      };
    });

    mapLayer.canvas.addEventListener("mousedown", (e) => {
      let totalTileSize =
        2 * this.spriteSheet.padding + this.spriteSheet.tileSize;

      if (!this.spriteSheet.currentSelectedPicture) {
        return;
      }

      mapLayer.canvas
        .getContext("2d")
        ?.drawImage(
          this.spriteSheet.sprite.imgElement,
          this.spriteSheet.currentSelectedPicture.x * totalTileSize +
            this.spriteSheet.padding,
          this.spriteSheet.currentSelectedPicture.y * totalTileSize +
            this.spriteSheet.padding,
          this.spriteSheet.tileSize,
          this.spriteSheet.tileSize,
          Math.floor((e.x - mapLayer.dimensions.x) / this.gridSize) *
            this.gridSize,
          Math.floor((e.y - mapLayer.dimensions.y) / this.gridSize) *
            this.gridSize,
          this.gridSize,
          this.gridSize
        );
    });

    spriteSheetLvl.addBorder();
    mapLayer.addBorder();
  }
}
