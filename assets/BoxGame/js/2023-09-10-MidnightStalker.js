const canvas = document.getElementById('spriteContainer');
const ctx = canvas.getContext('2d');
const SPRITE_WIDTH = 30;
const SPRITE_HEIGHT = 30;
const SCALE_FACTOR = 3;
const FRAME_LIMIT = 5;
const DESIRED_FRAME_RATE = 8;
const FRAME_INTERVAL = 1000 / DESIRED_FRAME_RATE;
const BOMB_RADIUS = 5;
const BOMB_SPEED = 20;
const BOMB_DISTANCE = 200;

canvas.width = SPRITE_WIDTH * SCALE_FACTOR * 8;
canvas.height = SPRITE_HEIGHT * SCALE_FACTOR;

export class Ninja {
    constructor() {
        this.image = document.getElementById("ninjaSprite");
        this.spriteWidth = SPRITE_WIDTH;
        this.spriteHeight = SPRITE_HEIGHT;
        this.width = this.spriteWidth;
        this.height = this.spriteHeight;
        this.x = 0;
        this.y = 0;
        this.scale = SCALE_FACTOR;
        this.minFrame = 0;
        this.maxFrame = FRAME_LIMIT;
        this.frameX = 0;
        this.frameY = 2;
        this.velocityX = 6;
    }

    draw(context) {
        context.drawImage(
            this.image,
            this.frameX * this.spriteWidth,
            this.frameY * this.spriteHeight,
            this.spriteWidth,
            this.spriteHeight,
            this.x,
            this.y,
            this.width * this.scale,
            this.height * this.scale
        );
    }

    update() {
        if (this.frameX < this.maxFrame) {
            this.frameX++;
        } else {
            this.frameX = 0;
        }
        this.x += this.velocityX;
        if (this.x > canvas.width) {
            this.x = -this.width * this.scale;
        }
    }
}

class Bomb {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = BOMB_RADIUS;
        this.speed = BOMB_SPEED;
        this.distanceTravelled = 0;
        this.color = 'black';
    }

    draw(context) {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        context.fillStyle = this.color;
        context.fill();
        context.closePath();
    }

    update() {
        this.x += this.speed;
        this.distanceTravelled += this.speed;
        if (this.distanceTravelled >= BOMB_DISTANCE) {
            bombs.splice(bombs.indexOf(this), 1);
        } else if (this.distanceTravelled >= 180) {
            this.color = 'orange';
            this.radius = BOMB_RADIUS * 2.5;
        }
    }
}

const ninja = new Ninja();
const bombs = [];

const controls = document.getElementById('controls');
controls.addEventListener('click', function (event) {
    if (event.target.tagName === 'INPUT') {
        const selectedAnimation = event.target.id;
        switch (selectedAnimation) {
            case 'A':
                ninja.frameY = 2;
                break;
            case 'B':
                ninja.frameY = 5;
                break;
            case 'C':
                ninja.frameY = 6;
                break;
        }
    }
});

const throwBombButton = document.getElementById('throwBomb');
throwBombButton.addEventListener('click', function () {
    const bomb = new Bomb(ninja.x + ninja.width * ninja.scale, ninja.y + ninja.height * ninja.scale / 2);
    bombs.push(bomb);
});

let lastTimestamp = 0;

function animate(timestamp) {
    const deltaTime = timestamp - lastTimestamp;
    if (deltaTime >= FRAME_INTERVAL) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ninja.draw(ctx);
        ninja.update();
        bombs.forEach(bomb => {
            bomb.draw(ctx);
            bomb.update();
        });
        lastTimestamp = timestamp;
    }
    requestAnimationFrame(animate);
}

export default Ninja;