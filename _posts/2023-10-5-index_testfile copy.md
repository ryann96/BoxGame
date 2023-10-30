---
toc: true
comments: true
layout: post
title: index test2 
description: test for index
courses: { compsci: {week: 6} }
type: background
---
<head>
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
        <canvas id="BackyRoundyCanvas"></canvas>
    </div>
</body>
<script>
    const canvas = document.getElementById("BackyRoundyCanvas");
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
                this.frame = 0;
            }
            update() {
                this.x = (this.x - this.speed) % this.width;
            }
            draw() {
                ctx.drawImage(this.image, this.x, this.y);
                ctx.drawImage(this.image, this.x + this.width, this.y);
            }
        }
        var backgroundObj = new Layer(backgroundImg, 0.5, 0);
        function drawStaticElements() {
            backgroundObj.draw();
        }
        function background() {
            backgroundObj.update();
            backgroundObj.draw();
            requestAnimationFrame(background);
        }
        background();
    };
    const BOX_SPRITE_WIDTH = 71.75;
    const BOX_SPRITE_HEIGHT = 82.5;
    const BOX_SCALE_FACTOR = 2;
    const DESIRED_FRAME_RATE = 15;
    const FRAME_INTERVAL = 1000 / DESIRED_FRAME_RATE;
    const PLATFORM_SPRITE_WIDTH = 362.25; 
    const PLATFORM_SPRITE_HEIGHT = 377;
    const PLATFORM_SCALE_FACTOR = 0.25;  
    const PLATFORM_FRAME_LIMIT = 3;  
    canvas.width = BOX_SPRITE_WIDTH * BOX_SCALE_FACTOR * 6;
    canvas.height = BOX_SPRITE_HEIGHT * BOX_SCALE_FACTOR * 3;
    const boxImg = new Image();
    boxImg.src = '{{site.baseurl}}/images/box.png'; 
    const platformImg = new Image();
    platformImg.src = '{{site.baseurl}}/images/platform.png';
    boxImg.onload = function () {
        platformImg.onload = function () {
            const box = new Box();
            const platform = new Platform();
            animate(box, platform); 
        };
    };
    class Box {
        constructor(image) {
            this.image = image;
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
            this.gravity = 0.5;
            this.onPlatform = false;
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
                this.y += this.gravity;
            }
        }
        checkCollision(platform) {
            const isColliding = (
                this.x < platform.x + platform.width * platform.scale &&
                this.x + this.width * this.scale > platform.x &&
                this.y < platform.y + platform.height * platform.scale &&
                this.y + this.height * this.scale > platform.y
            );
            this.onPlatform = isColliding;
            return isColliding;
        }
    }
    class Platform {
        constructor(image) {
            this.image = image;
            this.spriteWidth = PLATFORM_SPRITE_WIDTH;
            this.spriteHeight = PLATFORM_SPRITE_HEIGHT;
            this.width = this.spriteWidth;
            this.height = this.spriteHeight;
            this.x = 200;
            this.y = 400;
            this.scale = PLATFORM_SCALE_FACTOR;
            this.minFrame = 0;
            this.maxFrame = 4;
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
    function updateAnimations(box) {
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
    function drawMovingElements(box, platform) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawStaticElements();
        box.draw(ctx);
        platform.draw(ctx); 
    }
    let lastTimestamp = 0;
    function animate(box, platform, timestamp) {
        const deltaTime = timestamp - lastTimestamp;
        if (deltaTime >= FRAME_INTERVAL) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawMovingElements();
            lastTimestamp = timestamp;
        }
        requestAnimationFrame((timestamp) => animate(box, platform, timestamp));
    }
    animate(box, platform);
    let animationHasRun = false;
    document.addEventListener('keydown', function (event) {
        switch (event.key) {
            case ' ':
                if (!animationHasRun) {
                    animationHasRun = true;
                    animatePlatform();
                }
        }
    });
    function animatePlatform() {
        if (animationHasRun) {
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
</script>