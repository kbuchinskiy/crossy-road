export class Item extends PIXI.Sprite {
    constructor(image: string, width: number, height: number) {
        super(PIXI.Texture.fromImage(image));
        this.width = width;
        this.height = height;
    }
}