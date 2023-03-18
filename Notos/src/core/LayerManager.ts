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
  rootElement: HTMLElement;

  constructor(rootElement: HTMLElement) {
    this.layers = {};
    this.rootElement = rootElement;
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
    this.rootElement.append(newLayer.canvas);
  };

  setRedrawFlag = (layerName: string, flag: boolean) => {
    this.layers[layerName].shouldRedraw = flag;
  };
}
