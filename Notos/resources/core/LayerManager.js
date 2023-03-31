import { Layer } from "./Layer.js";
export class LayerManager {
    layers;
    orderedLayers = [];
    rootElement;
    constructor(rootElement) {
        this.layers = {};
        this.rootElement = rootElement;
    }
    addLayer = (dimensions, name, level, shouldRedraw) => {
        let newLayer = new Layer(dimensions, name, level, shouldRedraw, this);
        this.addLayerL(newLayer);
    };
    addLayerL(layer) {
        this.layers[layer.name.toString()] = layer;
        this.orderedLayers.push(layer);
        this.orderedLayers = this.orderedLayers.sort((a, b) => a.level - b.level);
        this.rootElement.append(layer.canvas);
    }
    setRedrawFlag = (layerName, flag) => {
        this.layers[layerName].shouldRedraw = flag;
    };
}
