
import { getRandomInt, hitTestRectangle } from './utils';
import { Zone } from './Zone';
import { Item } from './Item';

export class ZoneStatic extends Zone {
    readonly itemsAmount: number;

    constructor(backgroundImage: string, isSafe: boolean) {
        super(backgroundImage, isSafe);
        this.itemsAmount = getRandomInt(3, 6);

        this.initItems();
    }

    private initItems() {
        for (let i = 0; i < this.itemsAmount; i++) {
            const item = new Item("../images/tree.png", 30, 32);

            item.x = getRandomInt(0, 600 - item.width);

            if (!this.itemsContainer.children.some(child => hitTestRectangle(child, item, true))) {
                this.itemsContainer.addChild(item);
            }
        }
    }
}