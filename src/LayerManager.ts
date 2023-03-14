export interface Layer {
  canvas: HTMLCanvasElement;
  name: String;
  // zIndex
  level: number;
  shouldRedraw: boolean;
}

interface LayerMap {
  [name: string]: Layer;
}
export class LayerManager {
  layers: LayerMap;
  orderedLayers: Layer[] = [];

  constructor() {
    this.layers = {};
  }

  addLayer = (
    name: string,
    canvas: HTMLCanvasElement,
    level: number,
    shouldRedraw: boolean
  ) => {
    let newLayer: Layer = {
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

  setRedrawFlag = (layerName: string, flag: boolean) => {
    this.layers[layerName].shouldRedraw = flag;
  };
}
