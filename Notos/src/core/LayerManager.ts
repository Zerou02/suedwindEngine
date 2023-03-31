import { Layer } from "./Layer.js";
import { Dimensions } from "./types.js";

interface LayerMap {
  [name: string]: Layer;
}
export class LayerManager {
  layers: LayerMap;
  orderedLayers: Layer[] = [];
  rootElement: HTMLElement;

  constructor(rootElement: HTMLElement) {
    this.layers = {};
    this.rootElement = rootElement;
  }

  addLayer = (
    dimensions: Dimensions,
    name: string,
    level: number,
    shouldRedraw: boolean
  ) => {
    let newLayer = new Layer(dimensions, name, level, shouldRedraw, this);
    this.addLayerL(newLayer);
  };

  addLayerL(layer: Layer) {
    this.layers[layer.name.toString()] = layer;
    this.orderedLayers.push(layer);
    this.orderedLayers = this.orderedLayers.sort((a, b) => a.level - b.level);
    this.rootElement.append(layer.canvas);
  }
  setRedrawFlag = (layerName: string, flag: boolean) => {
    this.layers[layerName].shouldRedraw = flag;
  };
}
