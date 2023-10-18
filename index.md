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

        if (keys.right.pressed && iceman.x + iceman.width <= canvas.width - 50) {
            iceman.x += iceman.speed;
        } else if (keys.left.pressed && iceman.x >= 50) {
            iceman.x -= iceman.speed;
        }
    }

    animate();

    addEventListener('keydown', ({ keyCode }) => {
        switch (keyCode) {
            case 65:
                keys.left.pressed = true;
                break;
            case 68:
                keys.right.pressed = true;
                break;
        }
    });

    addEventListener('keyup', ({ keyCode }) => {
        switch (keyCode) {
            case 65:
                keys.left.pressed = false;
                break;
            case 68:
                keys.right.pressed = false;
                break;
        }
    });

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

    class Iceman {
        constructor() {
            this.image = new Image();
            this.image.src = "{{site.baseurl}}/images/box.png"; // Update the path to your image
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
            case 'a':
                iceman.x -= iceman.speed;
                break;
            case 'd':
                iceman.x += iceman.speed;
                break;
            case 'w':
                iceman.y -= iceman.speed;
                break;
            case 's':
                iceman.y += iceman.speed;
                break;
        }
    });

    let lastTimestamp = 0;
    function animate2(timestamp) {
        const deltaTime = timestamp - lastTimestamp;
        if (deltaTime >= FRAME_INTERVAL) {
            c.clearRect(0, 0, canvas.width, canvas.height);
            iceman.draw(c);
            iceman.update();
            lastTimestamp = timestamp;
        }
        requestAnimationFrame(animate2);
    }

    animate2();
</script>