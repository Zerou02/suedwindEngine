import { CollisionBox } from "./CollisionBox.js";
export class Entity {
    sprite;
    colBox;
    scene;
    constructor(sprite) {
        this.sprite = sprite;
        this.colBox = new CollisionBox(sprite.dimension, sprite.scene);
        this.scene = sprite.scene;
        this.colBox.setColFn((x) => {
            console.log("implement me: L.16", x);
        });
    }
    move = (vector) => {
        this.sprite.move(vector);
        if (this.scene.collisionManager.testCollision(this.colBox).length === 0) {
        }
        else {
            this.sprite.move({ x: -vector.x, y: -vector.y });
        }
    };
}
