---
layout: default
title: Delveries
---

<style>
    .canvas-container {
        display: flex;
        background-image: url('images/Backy_Roundy.jpg');
        background-size: repeat;
        background-attachment: fixed;
        background-repeat: repeat;
    }
    canvas {
        margin: 0;
        border: 1px solid white;
    }
</style>

<div class="canvas-container">
    <canvas id="playerCanvas">
            <img id="box" src="{{site.baseurl}}/images/box.png">
    </canvas>
</div>

<script>

    window.addEventListener('load', function () {
        const canvas = document.getElementById('playerCanvas');
        const ctx = canvas.getContext('2d');
        // Set the canvas size
        canvas.width = SPRITE_WIDTH * SCALE_FACTOR*6;
        canvas.height = SPRITE_HEIGHT * SCALE_FACTOR*3;

        // Load the background image
        const backgroundImage = new Image();
        backgroundImage.src = 'images/Backy_Roundy.jpg';

        backgroundImage.onload = function () {
            const pattern = ctx.createPattern(backgroundImage, 'repeat');
            ctx.fillStyle = pattern;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        
        const SPRITE_WIDTH = 71.75;
        const SPRITE_HEIGHT = 82.5;
        const SCALE_FACTOR = 2;
        const DESIRED_FRAME_RATE = 15;
        const FRAME_INTERVAL = 1000 / DESIRED_FRAME_RATE;

        class Box {
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
                this.maxFrame = 7;
                this.speed = 10; 
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

        const box = new Box();

        const keyState = {
            ArrowLeft: false,
            ArrowRight: false,
            ArrowUp: false,
        };

        document.addEventListener('keydown', function (event) {
            switch (event.key) {
                case 'w':
                    keyState.ArrowUp = true;
                    break;
                case 'a':
                    keyState.ArrowLeft = true;
                    break;
                case 'd':
                    keyState.ArrowRight = true;
                    break;
            }
        });

        document.addEventListener('keyup', function (event) {
            switch (event.key) {
                case 'w':
                    keyState.ArrowUp = false;
                    break;
                case 'a':
                    keyState.ArrowLeft = false;
                    break;
                case 'd':
                    keyState.ArrowRight = false;
                    break;
            }
        });

        function updateAnimations() {
            let selectedAnimation = 'A';
            box.frameY = 0;
            if (keyState.ArrowLeft) {
                box.x -= box.speed;
            }
            if (keyState.ArrowRight) {
                box.x += box.speed;
            }
            if (keyState.ArrowUp) {
                selectedAnimation = 'B';
                box.frameY = 1;
            } 
        }

        let lastTimestamp = 0;
        function animate(timestamp) {
            const deltaTime = timestamp - lastTimestamp;
            if (deltaTime >= FRAME_INTERVAL) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                box.draw(ctx);
                box.update();
                updateAnimations();
                lastTimestamp = timestamp;
            }
            requestAnimationFrame(animate);
        }

        animate();
    });
</script>
