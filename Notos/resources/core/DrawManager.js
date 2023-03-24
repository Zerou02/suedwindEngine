import { gLoopManager } from "./globals.js";
import { Rectangle } from "./Rectangle.js";
import { Sprite } from "./Sprite.js";
export class DrawManager {
    drawableObjectManager;
    layerManager;
    _intervalID;
    constructor(scene) {
        this.layerManager = scene.layerManager;
        this.drawableObjectManager = scene.drawableObjectManager;
        gLoopManager.addFn(() => this.redrawFn());
    }
    redrawFn() {
        this.layerManager.orderedLayers.forEach((x) => {
            let ctx = x.canvas.getContext("2d");
            if (x.shouldRedraw) {
                ctx.clearRect(0, 0, x.canvas.width, x.canvas.height);
            }
        });
        Object.values(this.drawableObjectManager.drawableObjects).forEach((x) => {
            if (x instanceof Rectangle) {
                x.draw();
            }
            else if (x instanceof Sprite) {
                x.draw();
            }
        });
    }
    deconstruct() {
        clearInterval(this._intervalID);
        const canvases = Object.values(this.layerManager.layers);
        for (let a = 0; a < canvases.length; a++) {
            canvases[a].canvas.remove();
        }
    }
}
