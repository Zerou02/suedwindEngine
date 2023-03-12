export class LayerManager {
  layers: HTMLCanvasElement[];

  constructor(layers: HTMLCanvasElement[]) {
    this.layers = layers;
  }

  addLayer = (layer: HTMLCanvasElement) => {
    this.layers.push(layer);
  };
}
