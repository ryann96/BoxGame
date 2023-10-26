const canvas = document.getElementById("BackyRoundyCanvas");
const ctx = canvas.getContext('2d');

const backgroundImg = new Image();
backgroundImg.src = '{{site.baseurl}}/images/Backy_Roundy.jpg';

backgroundImg.onload = function () {
    const WIDTH = 1280; // Constant width
    const HEIGHT = 670; // Constant height
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

    function startGame(difficulty) {
        // Add code to start the game based on the selected difficulty
        console.log(`Starting game with difficulty: ${difficulty}`);
        // Call your other functions or game logic here
    }
};

function easy() {
    // Change the background image for "Easy" difficulty
    backgroundImg.src = '{{site.baseurl}}/images/pinkyPage.png';

    // Stop the background animation
    animateBackground = false;

    // Adjust canvas width and height
    const newCanvasWidth = 725; // set your desired width
    const newCanvasHeight = 409; // set your desired height

    // Resize and position the canvas
    canvas.width = newCanvasWidth;
    canvas.height = newCanvasHeight;
    canvas.style.width = `${newCanvasWidth}px`;
    canvas.style.height = `${newCanvasHeight}px`;

    // Remove the "Easy" button
    document.querySelector('.button').style.display = 'none';

    // Remove Title
    document.getElementById('title').style.display = 'none';

    // Create and display the "Start" button
    const startButton = document.createElement('button');
    startButton.className = 'button';
    startButton.textContent = 'Start';
    startButton.onclick = function () {
        startGame('easy');
    };

    document.getElementById('game-container').appendChild(startButton);
}

function startGame(difficulty) {
    // Add code to start the game based on the selected difficulty
    console.log(`Starting game with difficulty: ${difficulty}`);
    // Call your other functions or game logic here
}