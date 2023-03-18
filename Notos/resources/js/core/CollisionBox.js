import { assignID } from "./utils.js";
export class CollisionBox {
    constructor(shape, scene) {
        this.setColFn = (colFn) => {
            this.onCollision = colFn;
        };
        this.id = assignID();
        this.transform = shape;
        this.scene = scene;
        scene.collisionManager.add(this);
    }
}
