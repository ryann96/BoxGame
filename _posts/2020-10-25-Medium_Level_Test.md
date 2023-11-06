---
toc: true
comments: true
layout: post
title: medium
description: test for index
courses: { compsci: {week: 6} }
type: background
---
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Combined Animation</title>
    <style>
        .canvas-container {
            display: flex;
        }
        canvas {
            margin: 0;
            border: 1px solid white;
        }
    </style>
</head>
<body>
    <div class="canvas-container">
        <canvas id="CombinedCanvas"></canvas>
    </div>
    <script>
        const canvas = document.getElementById("CombinedCanvas");
        const ctx = canvas.getContext('2d');
        const backgroundImg = new Image();
        backgroundImg.src = '{{site.baseurl}}/images/BackgroundWithRoad3.png';
        backgroundImg.onload = function () {
            const WIDTH = 2820;
            const HEIGHT = 1584;
            const ASPECT_RATIO = WIDTH / HEIGHT;
            const canvasWidth = WIDTH;
            const canvasHeight = canvasWidth / ASPECT_RATIO;
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;
            canvas.style.width = `${canvasWidth}px`;
            canvas.style.height = `${canvasHeight}px`;
            var gameSpeed = 2;
            class Layer {
                constructor(image, speedRatio, initialY) {
                    this.x = 0;
                    this.y = initialY;
                    this.width = WIDTH;
                    this.height = HEIGHT;
                    this.image = image;
                    this.speedRatio = speedRatio;
                    this.speed = gameSpeed * this.speedRatio;
                }
                update() {
                    this.x = (this.x - this.speed) % this.width;
                }
                draw() {
                    ctx.drawImage(this.image, this.x, this.y);
                    if (this.x < 0) {
                        ctx.drawImage(this.image, this.x + this.width, this.y);
                    }
                }
            }
            var backgroundObj = new Layer(backgroundImg, 0.5, 0);
            function background() {
                ctx.clearRect(0, 0, canvasWidth, canvasHeight);
                backgroundObj.update();
                backgroundObj.draw();
                requestAnimationFrame(background);
            }
            background();
            const SPRITE_WIDTH = 71.75;
            const SPRITE_HEIGHT = 82.5;
            const SCALE_FACTOR = 5;
            const DESIRED_FRAME_RATE = 15;
            const FRAME_INTERVAL = 1000 / DESIRED_FRAME_RATE;
            class Box {
                constructor() {
                    this.image = new Image();
                    this.image.src = '{{site.baseurl}}/images/box.png';
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
                    this.speed = 150;
                }
                setFrameLimit(limit) {
                    this.maxFrame = limit;
                }
                setPosition(x, y) {
                    this.x = x;
                    this.y = y;
                }
                draw() {
                    ctx.drawImage(
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
                    case 'ArrowLeft':
                        keyState.ArrowLeft = true;
                        break;
                    case 'ArrowRight':
                        keyState.ArrowRight = true;
                        break;
                    case 'ArrowUp':
                        keyState.ArrowUp = true;
                        break;
                }
            });
            document.addEventListener('keyup', function (event) {
                switch (event.key) {
                    case 'ArrowLeft':
                        keyState.ArrowLeft = false;
                        break;
                    case 'ArrowRight':
                        keyState.ArrowRight = false;
                        break;
                    case 'ArrowUp':
                        keyState.ArrowUp = false;
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
                    ctx.clearRect(box.x, box.y, box.width * box.scale, box.height * box.scale);
                    backgroundObj.draw();
                    box.draw();
                    box.update();
                    updateAnimations();
                    lastTimestamp = timestamp;
                }
                requestAnimationFrame(animate);
            }
            animate();
        };
    </script>
</body>
</html>
