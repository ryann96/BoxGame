window.addEventListener('load', function () {
    const canvas = document.getElementById('spriteContainer');
    const ctx = canvas.getContext('2d');
    const SPRITE_WIDTH = 362.25;
    const SPRITE_HEIGHT = 377;
    const SCALE_FACTOR = 0.25;
    const FRAME_LIMIT = 4;

    canvas.width = SPRITE_WIDTH * SCALE_FACTOR;
    canvas.height = SPRITE_HEIGHT * SCALE_FACTOR;

    const platformImage = new Image();
    platformImage.src = "{{site.baseurl}}/images/platform.png";

    platformImage.onload = function () {
        class Platform {
            constructor() {
                this.image = platformImage;
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

        const platform = new Platform();

        let animationHasRun = false;

        platform.draw(ctx);
        document.addEventListener('keydown', function (event) {
            switch (event.key) {
                case ' ':
                    if (!animationHasRun) {
                        animationHasRun = true;
                        animate();
                    }
            }
        });

        function animate() {
            if (animationHasRun) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                platform.draw(ctx);
                platform.update();
            }
            if (platform.frameX !== platform.maxFrame) {
                setTimeout(function () {
                    requestAnimationFrame(animate);
                }, 100);
            }
        };
    }
});
//Press Space bar to animate