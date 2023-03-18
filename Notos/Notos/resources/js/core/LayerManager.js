export class LayerManager {
    layers;
    orderedLayers = [];
    rootElement;
    constructor(rootElement) {
        this.layers = {};
        this.rootElement = rootElement;
    }
    addLayer = (name, canvas, level, shouldRedraw) => {
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
        this.rootElement.append(newLayer.canvas);
    };
    setRedrawFlag = (layerName, flag) => {
        this.layers[layerName].shouldRedraw = flag;
    };
}
