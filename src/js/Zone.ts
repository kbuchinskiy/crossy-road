
import { getRandomInt, hitTestRectangle } from './utils'

export class Zone extends PIXI.Container {
    private readonly background: PIXI.Sprite;
    readonly itemsAmount: number;
    itemsContainer: PIXI.Container = new PIXI.Container;

    constructor(backgroundImage: string, readonly isSafe) {
        super();
        this.background = PIXI.Sprite.fromImage(backgroundImage);
        this.addChild(this.background);
        this.addChild(this.itemsContainer);
    }
}