export class Drawable {
    dimensions;
    visible;
    constructor(dimensions) {
        if (dimensions)
            this.dimensions = dimensions;
        this.visible = true;
    }
    draw() { }
    setVisibility(vis) {
        this.visible = vis;
    }
    moveTo(x, y) {
        this.dimensions = { x, y, w: this.dimensions.w, h: this.dimensions.h };
    }
}
