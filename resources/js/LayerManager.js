export class LayerManager {
    constructor() {
        this.orderedLayers = [];
        this.addLayer = (name, canvas, level) => {
            let newLayer = {
                name,
                canvas,
                level,
            };
            canvas.style.zIndex = level.toString();
            this.layers[name] = newLayer;
            this.orderedLayers.push(newLayer);
            this.orderedLayers = this.orderedLayers.sort((a, b) => a.level - b.level);
            console.log("sortedLayers", this.orderedLayers);
        };
        this.layers = {};
    }
}
