import { CollisionBox } from "./CollisionBox.js";
import { Scene } from "./Scene.js";
import { Sprite } from "./Sprite.js";
import { Coordinate2d } from "./types.js";

export class Entity {
  sprite: Sprite;
  colBox: CollisionBox;
  scene: Scene;

  constructor(sprite: Sprite) {
    this.sprite = sprite;
    this.colBox = new CollisionBox(sprite.transform, sprite.scene);
    this.scene = sprite.scene;

    console.log(this.colBox);

    this.colBox.setColFn((x) => {
      console.log("implement me: L.16", x);
    });
  }

  move = (vector: Coordinate2d) => {
    this.sprite.move(vector);
    if (this.scene.collisionManager.testCollision(this.colBox).length === 0) {
      console.log("trans", { ...this.sprite.transform });
    } else {
      this.sprite.move({ x: -vector.x, y: -vector.y });
    }
  };
}
