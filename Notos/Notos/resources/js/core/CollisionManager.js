export class CollisionManager {
    colBoxes;
    constructor(colBoxes = []) {
        this.colBoxes = colBoxes;
    }
    add = (colBox) => {
        this.colBoxes.push(colBox);
    };
    checkCollisions() {
        this.colBoxes.forEach((x) => {
            this.colBoxes.forEach((y) => {
                if (this.isColliding(y, x)) {
                    y.onCollision(x);
                    x.onCollision(y);
                }
            });
        });
    }
    testCollision = (colBox) => {
        console.log("TEST COL");
        let retBoxes = [];
        this.colBoxes.forEach((x) => {
            if (colBox.id !== x.id) {
                console.log("OTHER", x);
                if (this.isColliding(colBox, x)) {
                    retBoxes.push(x);
                }
            }
        });
        return retBoxes;
    };
    isColliding = (colBox1, colBox2) => {
        let rect1 = colBox1.transform.dimensions;
        let rect2 = colBox2.transform.dimensions;
        return (rect1.x < rect2.x + rect2.w &&
            rect1.x + rect1.w > rect2.x &&
            rect1.y < rect2.y + rect2.h &&
            rect1.h + rect1.y > rect2.y);
    };
}
