import { Layer } from "../Layer.js";
import { Line } from "../Line.js";
import { Rectangle } from "../Rectangle.js";
import { Scene } from "../Scene.js";
import { Sprite } from "../Sprite.js";
import { sortPoints } from "../utils.js";
import { SpriteSheet } from "./Spritesheet.js";
export class TileMapEditorScene {
    scene;
    spriteSheet;
    gridSize;
    constructor(spriteSheetSrc) {
        this.scene = new Scene();
        this.gridSize = 48;
        let spriteSheetLvl = new Layer({ x: 0, y: 0, w: 200, h: 200 }, "spriteSheet", 0, false, this.scene.layerManager);
        let spriteSheetOverlay = new Layer({ x: 0, y: 0, w: 200, h: 200 }, "spriteSheetOverlay", 1, false, null);
        spriteSheetOverlay.canvas.style.pointerEvents = "none";
        spriteSheetOverlay.addToLayerManager(this.scene.layerManager);
        spriteSheetLvl.addBorder();
        this.spriteSheet = new SpriteSheet(new Sprite(spriteSheetSrc, { x: 0, y: 0 }, { x: 200, y: 200 }, this.scene, spriteSheetLvl), 0, 16);
        let highlightRect = new Rectangle({ x: 0, y: 0, w: 0, h: 0 }, "yellow", this.scene, spriteSheetOverlay);
        highlightRect.mode = "outline";
        let mapLayer = new Layer({ x: 200, y: 200, h: 10 * this.gridSize, w: 10 * this.gridSize }, "map", 1, false, this.scene.layerManager);
        for (let y = 0; y <= mapLayer.dimensions.h; y += this.gridSize) {
            new Line({ x: 0, y }, { x: mapLayer.dimensions.w, y }, "black", this.scene, mapLayer);
        }
        for (let x = 0; x <= mapLayer.dimensions.w; x += this.gridSize) {
            new Line({ x, y: 0 }, { x, y: mapLayer.dimensions.h }, "black", this.scene, mapLayer);
        }
        let startPoint = { x: 0, y: 0 };
        let endPoint = { x: 0, y: 0 };
        let isDragging = false;
        spriteSheetLvl.canvas.addEventListener("mousedown", (e) => {
            startPoint = {
                x: Math.floor(e.x / this.spriteSheet.totalTileSize),
                y: Math.floor(e.y / this.spriteSheet.totalTileSize),
            };
            isDragging = true;
        });
        spriteSheetLvl.canvas.addEventListener("mousemove", (e) => {
            if (!isDragging)
                return;
            let t = this.spriteSheet.totalTileSize;
            endPoint = {
                x: Math.floor(e.x / t),
                y: Math.floor(e.y / t),
            };
            let s = sortPoints(startPoint.x, endPoint.x, startPoint.y, endPoint.y);
            highlightRect.dimensions = {
                x: s.lowerX * t,
                y: s.lowerY * t,
                w: (s.higherX - s.lowerX) * t,
                h: (s.higherY - s.lowerY) * t,
            };
            spriteSheetOverlay.redrawRequested = true;
        });
        spriteSheetLvl.canvas.addEventListener("mouseup", (e) => {
            isDragging = false;
            endPoint = {
                x: Math.floor(e.x / this.spriteSheet.totalTileSize),
                y: Math.floor(e.y / this.spriteSheet.totalTileSize),
            };
            if (startPoint.x === endPoint.x && startPoint.y === endPoint.y) {
                spriteSheetOverlay.redrawRequested = true;
                highlightRect.dimensions = {
                    x: startPoint.x * this.spriteSheet.totalTileSize,
                    y: startPoint.y * this.spriteSheet.totalTileSize,
                    w: this.spriteSheet.totalTileSize,
                    h: this.spriteSheet.totalTileSize,
                };
            }
        });
        mapLayer.canvas.addEventListener("mousedown", (e) => {
            mapLayer.canvas
                .getContext("2d")
                ?.drawImage(this.spriteSheet.sprite.imgElement, highlightRect.dimensions.x, highlightRect.dimensions.y, highlightRect.dimensions.w, highlightRect.dimensions.h, Math.floor((e.x - mapLayer.dimensions.x) / this.gridSize) * this.gridSize, Math.floor((e.y - mapLayer.dimensions.y) / this.gridSize) * this.gridSize, this.gridSize, this.gridSize);
        });
        mapLayer.addBorder();
    }
}
