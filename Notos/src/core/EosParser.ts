import { Layer } from "./LayerManager.js";
import { createCanvas } from "./menuItems.js";
import { Rectangle } from "./Rectangle.js";
import { Scene } from "./Scene.js";
import { DrawableObject, EosItem, EosMap } from "./types";

export class EosParser {
  constructor() {}

  parseEosMap = (map: EosMap): Scene => {
    let scene = new Scene();
    Object.entries(map).forEach(([key, val]) => {
      scene.layerManager.addLayer(
        key,
        createCanvas(1000, 1000),
        Number(key),
        true
      );

      val.forEach((item) => {
        this.parseItem(item, scene, scene.layerManager.orderedLayers[key]);
      });
    });

    return scene;
  };

  //@ts-ignore
  parseItem = (item: EosItem, scene: Scene, layer: Layer): DrawableObject => {
    if (item.type === "rect") {
      return this.parseRectangle(item, scene, layer);
    }
  };

  parseRectangle = (item: EosItem, scene: Scene, layer: Layer): Rectangle => {
    let { end, origin, type } = item;

    return new Rectangle(
      {
        x: origin.x,
        y: origin.y,
        w: end.x - origin.x,
        h: end.y - origin.y,
      },
      layer,
      scene,
      "red"
    );
  };
}
