export interface Layer {
  canvas: HTMLCanvasElement;
  name: String;
  // zIndex
  level: number;
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

  addLayer = (name: string, canvas: HTMLCanvasElement, level: number) => {
    let newLayer: Layer = {
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
}
