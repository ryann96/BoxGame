---
toc: true
comments: true
layout: post
title: index test1
description: test for index
courses: { compsci: {week: 1} }
type: background
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

<body>
    <div class="canvas-container">
        <canvas id="playerCanvas">
                <img id="box" src="{{site.baseurl}}/images/box.png">
                <img id="platform" src="{{site.baseurl}}/images/platform.png"> 
        </canvas>
    </div>
</body>

<script>
    window.addEventListener('load', function () {
        const canvas = document.getElementById('playerCanvas');
        const ctx = canvas.getContext('2d');
        const BOX_SPRITE_WIDTH = 71.75;
        const BOX_SPRITE_HEIGHT = 82.5;
        const BOX_SCALE_FACTOR = 2;
        const DESIRED_FRAME_RATE = 15;
        const FRAME_INTERVAL = 1000 / DESIRED_FRAME_RATE;
        const PLATFORM_SPRITE_WIDTH = 362.25; 
        const PLATFORM_SPRITE_HEIGHT = 377;
        const PLATFORM_SCALE_FACTOR = 0.25;  
        const PLATFORM_FRAME_LIMIT = 4;  
        canvas.width = BOX_SPRITE_WIDTH * BOX_SCALE_FACTOR*6;
        canvas.height = BOX_SPRITE_HEIGHT * BOX_SCALE_FACTOR*3;

        class Box {
            constructor() {
                this.image = document.getElementById("box");
                this.spriteWidth = BOX_SPRITE_WIDTH;
                this.spriteHeight = BOX_SPRITE_HEIGHT;
                this.width = this.spriteWidth;
                this.height = this.spriteHeight;
                this.x = 0;
                this.y = 300;
                this.scale = BOX_SCALE_FACTOR;
                this.minFrame = 0;
                this.frameY = 0;
                this.frameX = 0;
                this.maxFrame = 7;
                this.speed = 10; 
                this.gravity = 0.5; // Gravity value
                this.onPlatform = false; // Flag to track if on platform
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

                if (!this.onPlatform) {
                    this.y += this.gravity; // Apply gravity
                }
            }
            checkCollision(platform) {
                const isColliding = (
                    this.x < platform.x + platform.width * platform.scale &&
                    this.x + this.width * this.scale > platform.x &&
                    this.y < platform.y + platform.height * platform.scale &&
                    this.y + this.height * this.scale > platform.y
                );

                this.onPlatform = isColliding; // Update onPlatform flag

                return isColliding;
            }
        }
        class Platform {
            constructor() {
                this.image = document.getElementById("platform");
                this.spriteWidth = PLATFORM_SPRITE_WIDTH;
                this.spriteHeight = PLATFORM_SPRITE_HEIGHT;
                this.width = this.spriteWidth;
                this.height = this.spriteHeight;
                this.x = 200;
                this.y = 400;
                this.scale = PLATFORM_SCALE_FACTOR;
                this.minFrame = 0;
                this.maxFrame = PLATFORM_FRAME_LIMIT;
                this.frameX = 0;
                this.frameY = 0;
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
        const platform = new Platform();

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
                // Apply gravity
                if (!box.onPlatform) {
                    box.y += box.gravity;
                }
                if (box.checkCollision(platform)) {
                    box.y = platform.y - box.height * box.scale;
                    platform.y = box.y + box.height * box.scale;
                } else {
                    box.onPlatform = false; // Reset onPlatform flag when not on platform
                }
                box.draw(ctx);
                box.update();
                updateAnimations();
                lastTimestamp = timestamp;
            }
            requestAnimationFrame(animate);
        }

        animate();

        let platformanimationHasRun = false;

        document.addEventListener('keydown', function (event) {
            switch (event.key) {
                case ' ':
                    if (!platformanimationHasRun) {
                    platformanimationHasRun = true;
                    animatePlatform();
                }
            }
        });

        platform.draw(ctx);

        function animatePlatform() {
            if (platformanimationHasRun) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                platform.draw(ctx);
                platform.update();
            }
            if (platform.frameX !== platform.maxFrame) {
                setTimeout(function () {
                    requestAnimationFrame(animatePlatform);
                }, 100);
            }
        }
        platform.draw(ctx);
    });
</script>