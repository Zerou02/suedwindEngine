export class LayerManager {
    constructor() {
        this.orderedLayers = [];
        this.addLayer = (name, canvas, level, shouldRedraw) => {
            let newLayer = {
                name,
                canvas,
                level,
                shouldRedraw,
            };
            canvas.style.zIndex = level.toString();
            this.layers[name] = newLayer;
            this.orderedLayers.push(newLayer);
            this.orderedLayers = this.orderedLayers.sort((a, b) => a.level - b.level);
        };
        this.setRedrawFlag = (layerName, flag) => {
            this.layers[layerName].shouldRedraw = flag;
        };
        this.layers = {};
    }
}
