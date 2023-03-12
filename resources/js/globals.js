import { DrawManager } from "./DrawManager.js";
import { KeyboardManager } from "./KeyBoardManager.js";
import { LayerManager } from "./LayerManager.js";
import { SpriteManager } from "./SpriteManager.js";
export const gAssetPath = "./assets/";
export const gSpriteManager = new SpriteManager();
export const gKeyBoardManager = new KeyboardManager();
export const gLayerManager = new LayerManager();
export const gDrawManager = new DrawManager(gSpriteManager, gLayerManager);
