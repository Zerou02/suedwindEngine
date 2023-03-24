import { assignID } from "./utils.js";
export class CollisionBox {
    dimension;
    scene;
    id;
    onCollision;
    constructor(shape, scene) {
        this.id = assignID();
        this.dimension = shape;
        this.scene = scene;
        scene.collisionManager.add(this);
    }
    setColFn = (colFn) => {
        this.onCollision = colFn;
    };
}
