---
toc: true
comments: false
layout: post
title: background test
description: in progress
type: background
courses: { compsci: {week: 2} }
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
    backgroundImg.src = '{{site.baseurl}}/images/BackgroundWithRoad3.png';

    backgroundImg.onload = function () {
        const WIDTH = 2820; // Constant width
        const HEIGHT = 1584; // Constant height
        const ASPECT_RATIO = WIDTH / HEIGHT;

        // Calculate canvas dimensions based on the window size
        const canvasWidth = window.innerWidth;
        const canvasHeight = canvasWidth / ASPECT_RATIO;

        // Set canvas dimensions
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        // Define game speed
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
                ctx.drawImage(this.image, this.x - this.width, this.y); // Draw an additional image to cover the whole canvas
            }
        }

        var backgroundObj = new Layer(backgroundImg, 0.5, 0);

        function background() {
            backgroundObj.update();
            backgroundObj.draw();
            requestAnimationFrame(background);
        }
        background();
    };
</script>