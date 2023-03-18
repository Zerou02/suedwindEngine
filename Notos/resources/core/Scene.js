import { CollisionManager } from "./CollisionManager.js";
import { DrawManager } from "./DrawManager.js";
import { LayerManager } from "./LayerManager.js";
import { createDiv } from "./menuItems.js";
import { SpriteManager } from "./SpriteManager.js";
import { DrawableObjectManager } from "./DrawableObjectManager.js";
export class Scene {
    collisionManager;
    spriteManager;
    drawableObjectManager;
    layerManager;
    drawManager;
    rootElement;
    layerRoot;
    menuRoot;
    menuItems = {};
    constructor() {
        this.collisionManager = new CollisionManager([]);
        this.spriteManager = new SpriteManager();
        this.drawableObjectManager = new DrawableObjectManager();
        this.rootElement = document.getElementById("body");
        this.layerRoot = createDiv({ x: 0, y: 0 }, "layerRoot");
        this.layerRoot.style.zIndex = "0";
        this.menuRoot = createDiv({ x: 0, y: 0 }, "menuRoot");
        this.menuRoot.style.zIndex = "1";
        this.rootElement.append(this.layerRoot, this.menuRoot);
        this.layerManager = new LayerManager(this.layerRoot);
        this.drawManager = new DrawManager(this);
    }
    deconstruct() {
        this.drawManager.deconstruct();
        this.layerRoot.remove();
        this.menuRoot.remove();
    }
    addMenuItem(item) {
        this.menuRoot.append(item);
        this.menuItems[item.id] = item;
    }
}
