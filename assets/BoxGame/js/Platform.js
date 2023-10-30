import GameObject from "./GameObject.js";

export class Platformx extends GameObject{
    constructor(x, y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height
    }

    triggerCollision(){

    }
}

export default Platformx;