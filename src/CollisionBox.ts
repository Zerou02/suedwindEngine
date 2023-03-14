import { Scene } from "./Scene.js";
import { Transform } from "./types.js";
import { assignID } from "./utils.js";

type ColFn = (otherColBox: CollisionBox) => void;
export class CollisionBox {
  transform: Transform;
  scene: Scene;
  id: number;
  onCollision: ColFn;

  constructor(shape: Transform, scene: Scene) {
    this.id = assignID();
    this.transform = shape;
    this.scene = scene;
    scene.collisionManager.add(this);
  }

  setColFn = (colFn: ColFn) => {
    this.onCollision = colFn;
  };
}
