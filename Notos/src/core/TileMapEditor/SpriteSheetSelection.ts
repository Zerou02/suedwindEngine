import { Layer } from "../Layer.js";
import { Rectangle } from "../Rectangle.js";
import { Scene } from "../Scene.js";
import { gAssetPath } from "../globals.js";
import { createButton, createLabel } from "../menuItems.js";
import { Coordinate2d, Dimensions } from "../types.js";
import { sortPoints } from "../utils.js";

interface SheetData {
  paddding: number;
  pageSize: number;
  sizeX: number;
  sizeY: number;
  tileSize: number;
}
export class SpriteSheetSelection {
  sheetname: string;
  sheetData: SheetData;
  scene: Scene;
  sheetLayer: Layer;
  img: HTMLImageElement;
  currentPage: number = 0;
  numberPages: number;

  highlightRect: Rectangle;
  stretchFactor: number = 2;

  constructor(sheetname: string) {
    this.sheetname = sheetname;
    this.scene = new Scene();
  }

  async init() {
    await this.initializeSpriteSheetData();
  }

  async initializeSpriteSheetData() {
    await fetch(`${gAssetPath}/spritesheets/${this.sheetname}.json`)
      .then((response) => response.json())
      .then((json) => {
        this.sheetData = json;
        this.numberPages = this.sheetData.sizeX / (this.sheetData.pageSize * this.sheetData.tileSize);

        const baseDimensions: Dimensions = {
          x: 0,
          y: 0,
          w: this.sheetData.pageSize * this.sheetData.tileSize * this.stretchFactor,
          h: this.sheetData.sizeY,
        };
        const backButton = createButton({ x: 0, y: baseDimensions.h + 50, w: 50, h: 50 }, "<-", () => {
          if (this.currentPage === 0) {
            this.loadPage(this.numberPages - 1);
          } else {
            this.loadPage(this.currentPage - 1);
          }
        });
        this.scene.addMenuItem(backButton);
        const pageCount = createLabel(
          { x: 60, y: baseDimensions.h + 50, w: 25, h: 50 },
          `${this.currentPage + 1 + "/" + this.numberPages}`,
          "pageCount"
        );
        pageCount.style.textAlign = "center";
        this.scene.addMenuItem(pageCount);
        const forwardButton = createButton({ x: 85, y: baseDimensions.h + 50, w: 50, h: 50 }, "->", () => {
          if (this.currentPage + 1 < this.numberPages) {
            this.loadPage(this.currentPage + 1);
          } else {
            this.loadPage(0);
          }
        });
        this.scene.addMenuItem(forwardButton);

        this.sheetLayer = new Layer(baseDimensions, "sheetLayer", 0, false, this.scene.layerManager);
        this.sheetLayer.addBorder();

        this.img = new Image(this.sheetData.sizeX, this.sheetData.sizeY);
        this.img.src = gAssetPath + "spritesheets/" + this.sheetname + ".png";
        this.img.onload = (e) => {
          this.loadPage(0);
        };

        this.initializeEventListener();
      });
  }

  initializeEventListener() {
    let overlayLayer = new Layer(this.sheetLayer.dimensions, "overlayLayer", 1, false, this.scene.layerManager);
    overlayLayer.canvas.style.pointerEvents = "none";
    this.highlightRect = new Rectangle({ x: 0, y: 0, w: 0, h: 0 }, "yellow", this.scene, overlayLayer, "outline");
    let isDragging: boolean = false;
    let startRect: Coordinate2d;
    let endRect: Coordinate2d;

    this.sheetLayer.canvas.addEventListener("mousedown", (e) => {
      isDragging = true;
      startRect = this.getRect(e);
    });

    this.sheetLayer.canvas.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      endRect = this.getRect(e);
      let sorted = sortPoints(startRect.x, endRect.x, startRect.y, endRect.y);

      if (sorted.lowerX === sorted.higherX) {
        sorted.higherX++;
      }
      sorted.higherY++;

      this.highlightRect.dimensions = {
        x: sorted.lowerX * this.sheetData.tileSize * this.stretchFactor,
        y: sorted.lowerY * this.sheetData.tileSize,
        w: (sorted.higherX - sorted.lowerX) * this.sheetData.tileSize * this.stretchFactor,
        h: (sorted.higherY - sorted.lowerY) * this.sheetData.tileSize,
      };
      overlayLayer.redrawRequested = true;

      console.log("lower", sorted.lowerY, "higher:", sorted.higherY, "start", startRect.y, "end,", endRect.y);
    });

    this.sheetLayer.canvas.addEventListener("mouseup", (e) => {
      isDragging = false;
      let endRect = this.getRect(e);
      console.log("st", startRect.y, ",,", endRect.y);

      if (startRect.x === endRect.x && startRect.y === endRect.y) {
        this.highlightRect.dimensions = {
          x: startRect.x * this.sheetData.tileSize * this.stretchFactor,
          y: startRect.y * this.sheetData.tileSize,
          w: this.sheetData.tileSize * this.stretchFactor,
          h: this.sheetData.tileSize,
        };
      }
      overlayLayer.redrawRequested = true;
    });
  }

  getRect(e: MouseEvent) {
    let rect = {
      x: Math.floor(e.x / (this.sheetData.tileSize * this.stretchFactor)),
      y: Math.floor(e.y / this.sheetData.tileSize),
    };
    return rect;
  }

  loadPage(number: number) {
    this.scene.layerManager.layers["overlayLayer"].redrawRequested = true;
    this.highlightRect.dimensions = { x: 0, y: 0, w: 0, h: 0 };
    this.currentPage = number;
    let pageLabel = this.scene.menuItems["pageCount"] as HTMLParagraphElement;
    `${this.currentPage + 1 + "/" + this.numberPages}`;
    pageLabel.textContent = `${this.currentPage + 1 + "/" + this.numberPages}`;
    let ctx = this.sheetLayer.canvas.getContext("2d") as CanvasRenderingContext2D;
    ctx.clearRect(0, 0, this.sheetLayer.dimensions.w, this.sheetLayer.dimensions.h);
    ctx.drawImage(
      this.img,
      this.sheetData.pageSize * this.sheetData.tileSize * number,
      0,
      this.sheetData.pageSize * this.sheetData.tileSize,
      this.sheetData.sizeY,
      0,
      0,
      this.sheetLayer.dimensions.w,
      this.sheetLayer.dimensions.h
    );
  }
}
