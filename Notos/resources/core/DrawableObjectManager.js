export class DrawableObjectManager {
    drawableObjects;
    constructor() {
        this.drawableObjects = [];
    }
    addDrawable = (drawable) => {
        this.drawableObjects.push(drawable);
    };
}
