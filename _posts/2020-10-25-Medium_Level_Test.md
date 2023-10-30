---
toc: true
comments: false
layout: post
title: Medium Mode
description: Just started.
type: platforms
courses: { compsci: {week: 5} }
---

<style>
    .canvas-container {
        display: flex;
        position: fixed;
    }
    canvas {
        margin: 0;
        border: 1px solid white;
    }
</style>
     
<!-- Prepare background DOM canvas -->
<canvas id="BackyRoundyCanvas"></canvas>

<script>
    const canvas = document.getElementById("BackyRoundyCanvas");
    const ctx = canvas.getContext('2d');

    const backgroundImg = new Image();
    backgroundImg.src = '{{site.baseurl}}/images/Backy_Roundy.jpg';

    backgroundImg.onload = function () {
        const WIDTH = 1280; // Constant width
        const HEIGHT = 650; // Constant height
        const ASPECT_RATIO = WIDTH / HEIGHT;

        const canvasWidth = window.innerWidth;
        const canvasHeight = canvasWidth / ASPECT_RATIO;

        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        canvas.style.width = `${canvasWidth}px`;
        canvas.style.height = `${canvasHeight}px`;

        var gameSpeed = 2;

        class Layer {
            constructor(image, speedRatio, initialY) {
                this.x = 0;
                this.y = initialY; // Set a new initial value for y
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

        var backgroundObj = new Layer(backgroundImg, 0.5, 0); // Set initial Y position to 200

        function background() {
            backgroundObj.update();
            backgroundObj.draw();
            requestAnimationFrame(background);
        }
        background();
    };

    function easy() {
        console.log("It works")
    }
</script>