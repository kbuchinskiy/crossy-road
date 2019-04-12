export class Player extends PIXI.Sprite {
    direction: number = 0;
    speed: number = 0;

    constructor(height: number, width: number, texture: PIXI.Texture) {
        super(texture);

        this.height = height;
        this.width = width;
    }
}