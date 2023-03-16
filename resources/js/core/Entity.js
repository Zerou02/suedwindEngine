import { CollisionBox } from "./CollisionBox.js";
export class Entity {
    constructor(sprite) {
        this.move = (vector) => {
            this.sprite.move(vector);
            if (this.scene.collisionManager.testCollision(this.colBox).length === 0) {
                console.log("trans", { ...this.sprite.transform });
            }
            else {
                this.sprite.move({ x: -vector.x, y: -vector.y });
            }
        };
        this.sprite = sprite;
        this.colBox = new CollisionBox(sprite.transform, sprite.scene);
        this.scene = sprite.scene;
        console.log(this.colBox);
        this.colBox.setColFn((x) => {
            console.log("implement me: L.16", x);
        });
    }
}
