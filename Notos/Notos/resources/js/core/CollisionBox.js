import { assignID } from "./utils.js";
export class CollisionBox {
    transform;
    scene;
    id;
    onCollision;
    constructor(shape, scene) {
        this.id = assignID();
        this.transform = shape;
        this.scene = scene;
        scene.collisionManager.add(this);
    }
    setColFn = (colFn) => {
        this.onCollision = colFn;
    };
}
