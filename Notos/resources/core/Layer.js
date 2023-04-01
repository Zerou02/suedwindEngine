import { createCanvas } from "./menuItems.js";
export class Layer {
    dimensions;
    canvas;
    name;
    level;
    shouldRedraw;
    layerManager;
    redrawRequested;
    constructor(dimensions, name, level, shouldRedraw, layerManager) {
        this.dimensions = dimensions;
        this.canvas = createCanvas(dimensions.x, dimensions.y, dimensions.w, dimensions.h);
        this.canvas.style.zIndex = level.toString();
        this.name = name;
        this.level = level;
        this.shouldRedraw = shouldRedraw;
        if (layerManager)
            this.addToLayerManager(layerManager);
    }
    addToLayerManager(layerManager) {
        this.layerManager = layerManager;
        layerManager.addLayerL(this);
    }
    moveTo(x, y) {
        this.canvas.style.left = x.toString() + "px";
        this.canvas.style.top = y.toString() + "px";
    }
    addBorder() {
        this.canvas.style.outline = "1px solid black";
    }
    redraw() {
        this.redrawRequested = true;
    }
}
