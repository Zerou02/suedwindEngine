import { CollisionManager } from "./CollisionManager.js";
import { LayerManager } from "./LayerManager.js";
import { SpriteManager } from "./SpriteManager.js";

export class Scene {
  collisionManager: CollisionManager;
  spriteManager: SpriteManager;
  layerManager: LayerManager;

  constructor() {
    this.collisionManager = new CollisionManager([]);
    this.spriteManager = new SpriteManager();
    this.layerManager = new LayerManager();
  }
}
