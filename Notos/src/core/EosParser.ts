import { Layer } from "./Layer.js";
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
        { x: 0, y: 0, w: 1000, h: 1000 },
        key,
        Number(key),
        true
      );

      val.forEach((item) => {
        this.parseItem(item, scene, scene.layerManager.orderedLayers[key]);
      });
    });

    return scene;
  };

  parseItem = (item: EosItem, scene: Scene, layer: Layer) => {
    if (item.type === "rect") {
      this.parseRectangle(item).addToScene(scene, layer);
    }
  };

  parseRectangle = (item: EosItem): Rectangle => {
    let { end, origin, type } = item;

    return new Rectangle(
      {
        x: origin.x,
        y: origin.y,
        w: end.x - origin.x,
        h: end.y - origin.y,
      },
      "red"
    );
  };
}
