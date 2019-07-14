let gameScore = 0;
    lives = 3,
    livesLeft = document.querySelector('.lives > span'),
    score = document.querySelector('.score > span');



// Enemies 
var Enemy = function (x, y, speed) {

    // Enemy speed
    this.x = x;
    this.y = y;
    this.speed = speed;

    // Enemy image 
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.update = function (dt) {

    // Speed multiplies
    this.x += this.speed * dt;

    // Off canvas enemy speed
    if (this.x > 510) {
        this.x = -50;
        this.speed = 100 + Math.floor(Math.random() * 222);
    };

    // Checks collisons and restarts player at the bottom
    if (player.x < this.x + 60 &&
            player.x + 37 > this.x &&
            player.y < this.y + 25 &&
            30 + player.y > this.y) {
            player.x = 200;
            player.y = 400;
            lives--;
            livesLeft.innerText = lives;
            if (lives === 0) {
                //Will replace with modal
                confirm(`Game Over! Do you want to play again?`);
                lives = 3;
                gameScore = 0;
                livesLeft.innerText = lives;
                score.innerText = '';
            }
        }

};

    // Draw the enemy on the screen, required method for game
    Enemy.prototype.render = function() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        };




// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player {
    constructor(x, y, movement) {
        this.x = x;
        this.y = y;
        this.movement = movement;
        this.sprite = 'images/char-boy.png';
    }
    update() {
        // Stops Player from moving off the left/right side of canvas
        if (this.y > 380) {
            this.y = 380;
        }
        if (this.x > 400) {
            this.x = 400;
        }
        if (this.x < 0) {
            this.x = 0;
        }
        // Once player reaches the water, 50 points will be added to their game score
        if (this.y < 0) {
            this.x = 200;
            this.y = 380;
            gameScore++;
            score.innerText = gameScore * 100;
            if (gameScore === 10 && lives > 0) {
                confirm('Congratulations, you won!');
                lives = 3;
                gameScore = 0;
                livesLeft.innerText = lives;
                score.innerText = '';
            }
        }
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    // Moves Player with keyboard arrow keys
    handleInput(arrowKeyPressed) {
        switch (arrowKeyPressed) {
            case 'left':
                this.x -= this.movement + 50;
                break;
            case 'up':
                this.y -= this.movement + 30;
                break;
            case 'right':
                this.x += this.movement + 50;
                break;
            case 'down':
                this.y += this.movement + 30;
                break;
        }
    }
};

// Now instantiate your objects.
let allEnemies = [];

// Canvas position of created enemies and player x, y, movement
let enemyPosition = [60, 140, 220];
let player = new Player(200, 380, 50);

//Array of enemies
enemyPosition.forEach(function(locationY){
    let enemy = new Enemy(0, locationY, 100 + Math.floor(Math.random() * 500));
    allEnemies.push(enemy);
});


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
