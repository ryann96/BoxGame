---
layout: default
title: Delveries
---

<style>
    .canvas-container {
        display: flex;
    }

    canvas {
        margin: 0;
        border: 1px solid white;
    }
</style>

<div class="canvas-container">
    <canvas id="playerCanvas"></canvas>
    <canvas id="spriteContainer">
        <img id="box" src="{{site.baseurl}}/images/box.png"> 
    </canvas>
</div>

<div id="controls">
    <input type="radio" name="animation" id="A" checked>
    <label for="A">A</label><br>
    <input type="radio" name="animation" id="B">
    <label for="B">B</label><br>
</div>

<script>
    let canvas = document.getElementById('playerCanvas');
    let c = canvas.getContext('2d');
    canvas.width = 650;
    canvas.height = 400;
    let gravity = 1.5;

    class Player {
        constructor() {
            this.position = {
                x: 100,
                y: 200
            };
            this.velocity = {
                x: 0,
                y: 0
            };
            this.width = 30;
            this.height = 30;
        }
        draw() {
            c.fillStyle = 'red';
            c.fillRect(this.position.x, this.position.y, this.width, this.height);
        }
        update() {
            this.draw();
            this.position.y += this.velocity.y;
            this.position.x += this.velocity.x;
            if (this.position.y + this.height + this.velocity.y <= canvas.height)
                this.velocity.y += gravity;
            else
                this.velocity.y = 0;
        }
    }

    player = new Player();

    let keys = {
        right: {
            pressed: false
        },
        left: {
            pressed: false
        }
    };

    function animate() {
        requestAnimationFrame(animate);
        c.clearRect(0, 0, canvas.width, canvas.height);
        player.update();
        if (keys.right.pressed && player.position.x + player.width <= canvas.width - 50) {
            player.velocity.x = 15;
        } else if (keys.left.pressed && player.position.x >= 50) {
            player.velocity.x = -15;
        } else {
            player.velocity.x = 0;
        }
    }

    animate();

    addEventListener('keydown', ({ keyCode }) => {
        switch (keyCode) {
            case 65:
                console.log('left');
                keys.left.pressed = true;
                break;
            case 83:
                console.log('down');
                break;
            case 68:
                console.log('right');
                keys.right.pressed = true;
                break;
            case 87:
                console.log('up');
                player.velocity.y -= 20;
                break;
        }
    });

    addEventListener('keyup', ({ keyCode }) => {
        switch (keyCode) {
            case 65:
                console.log('left');
                keys.left.pressed = false;
                break;
            case 83:
                console.log('down');
                break;
            case 68:
                console.log('right');
                keys.right.pressed = false;
                break;
            case 87:
                console.log('up');
                player.velocity.y = -20;
                break;
        }
    });

    const canvas2 = document.getElementById('spriteContainer');
    const ctx = canvas2.getContext('2d');
    const SPRITE_WIDTH = 71.75;
    const SPRITE_HEIGHT = 80.5;
    const SCALE_FACTOR = 2;
    const DESIRED_FRAME_RATE = 20;
    const FRAME_INTERVAL = 1000 / DESIRED_FRAME_RATE;
    const animationData = {
        'A': {
            frameLimit: 7,
            x: 1,
            y: -20,
        },
        'B': {
            frameLimit: 7,
            x: 1,
            y: -20,
        }
    };
    canvas2.width = SPRITE_WIDTH * SCALE_FACTOR * 7;
    canvas2.height = SPRITE_HEIGHT * SCALE_FACTOR;

    class Iceman {
        constructor() {
            this.image = document.getElementById("box");
            this.spriteWidth = SPRITE_WIDTH;
            this.spriteHeight = SPRITE_HEIGHT;
            this.width = this.spriteWidth;
            this.height = this.spriteHeight;
            this.x = 0;
            this.y = 0;
            this.scale = SCALE_FACTOR;
            this.minFrame = 0;
            this.frameY = 0;
            this.frameX = 0;
            this.maxFrame = 0;
            this.speed = 5; 
        }
        setFrameLimit(limit) {
            this.maxFrame = limit;
        }
        setPosition(x, y) {
            this.x = x;
            this.y = y;
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
        }
    }

    const iceman = new Iceman();

    const controls = document.getElementById('controls');
    controls.addEventListener('click', function (event) {
        if (event.target.tagName === 'INPUT') {
            const selectedAnimation = event.target.id;
            const animationInfo = animationData[selectedAnimation];
            if (animationInfo) {
                iceman.setFrameLimit(animationInfo.frameLimit);
                iceman.setPosition(animationInfo.x, animationInfo.y);
            }
            switch (selectedAnimation) {
                case 'A':
                    iceman.frameY = 0;
                    break;
                case 'B':
                    iceman.frameY = 1;
                    break;
            }
        }
    });

    document.addEventListener('keydown', function (event) {
        switch (event.key) {
            case 'ArrowLeft':
                iceman.x -= iceman.speed;
                break;
            case 'ArrowRight':
                iceman.x += iceman.speed;
                break;
            case 'ArrowUp':
                iceman.y -= iceman.speed;
                break;
            case 'ArrowDown':
                iceman.y += iceman.speed;
                break;
        }
    });

    let lastTimestamp = 0;
    function animate2(timestamp) {
        const deltaTime = timestamp - lastTimestamp;
        if (deltaTime >= FRAME_INTERVAL) {
            ctx.clearRect(0, 0, canvas2.width, canvas2.height);
            iceman.draw(ctx);
            iceman.update();
            lastTimestamp = timestamp;
        }
        requestAnimationFrame(animate2);
    }

    animate2();
</script>