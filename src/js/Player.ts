export class Player extends PIXI.Sprite {
    direction: number = 0;
    speed: number = 0;

    constructor(height: number, width: number, playerImage: string) {
        super(PIXI.Texture.fromImage(playerImage));

        this.height = height;
        this.width = width;
    }
}