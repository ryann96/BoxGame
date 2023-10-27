---
toc: true
comments: false
layout: post
title: Medium Mode
description: Just started.
type: platforms
courses: { compsci: {week: 2} }
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
    <canvas id="BackyRoundyCanvas"></canvas>
</div>

<script>
    document.addEventListener('DOMContentLoaded', function () {
        const canvas = document.getElementById("BackyRoundyCanvas");
        const ctx = canvas.getContext('2d');

        const backgroundImg = new Image();
        backgroundImg.src = '{{site.baseurl}}/images/Backy_Roundy.jpg';

        backgroundImg.onload = function () {
            const WIDTH = 1280;
            const HEIGHT = 1000;
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

            function background() {
                backgroundObj.update();
                backgroundObj.draw();
                requestAnimationFrame(background);
            }

            background();
        };

        const boxImg = new Image();
        boxImg.src = '{{site.baseurl}}/images/box.png';

        const platformImg = new Image();
        platformImg.src = '{{site.baseurl}}/images/platform.png';

        boxImg.onload = function () {
            platformImg.onload = function () {
                const box = new Box(boxImg);
                const platform = new Platform(platformImg);
                animate(box, platform);
            };
        };

        function animate(box, platform) {
            // Your animation code here
        }
    });
</script>
</body>
</html>
