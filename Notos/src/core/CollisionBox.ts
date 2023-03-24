import { Scene } from "./Scene.js";
import { Dimensions } from "./types.js";
import { assignID } from "./utils.js";

type ColFn = (otherColBox: CollisionBox) => void;
export class CollisionBox {
  dimension: Dimensions;
  scene: Scene;
  id: number;
  onCollision: ColFn;

  constructor(shape: Dimensions, scene: Scene) {
    this.id = assignID();
    this.dimension = shape;
    this.scene = scene;
    scene.collisionManager.add(this);
  }

  setColFn = (colFn: ColFn) => {
    this.onCollision = colFn;
  };
}
