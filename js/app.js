var enemySpeed = 200;

//SuperClass = Character
var Character = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Enemies our player must avoid
var Enemy = function(x,y,speed) {

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    this.x = x;
    this.y = y;

    this.speed = Math.floor(200 + (Math.random() * enemySpeed));
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (this.speed * dt);

    if (this.x > 550){

      this.x = -100;
      this.speed = Math.floor(200 + (Math.random() * enemySpeed));

      if (this.y > 226){

        this.y = 60;
      }
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    Character.call(this);
    // ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

//player class -- constructor
var Player = function (x,y) {

    this.x = 202;
    this.y = 404;

    this.sprite = 'images/char-boy.png';

};

//reset after player hits the water
Player.prototype.update = function() {

  if (this.y < 10){

    alert('Congratulations!');
    this.reset();

  }
};

Player.prototype.render = function() {
    Character.call(this);
	// ctx.drawImage (Resources.get(this.sprite), this.x, this.y);
};

//ensure that the player is within the board
Player.prototype.handleInput = function(direction) {

	if(direction == 'left' && this.x > 0) {

		this.x -= 100;

	}
	if(direction == 'right' && this.x < 350) {

		this.x += 100;

	}
	if(direction == 'up' && this.y > 50) {

		this.y -= 100;

	}
	if(direction == 'down' && this.y < 400) {

		this.y += 100;

	}
};


//Reset function to bring player back to starting Y coordinate
Player.prototype.reset = function() {

  this.x = 202;
  this.y = 404;

};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemy1 = new Enemy (200, 60);
var enemy2 = new Enemy (0, 143);
var enemy3 = new Enemy (50, 226);
var enemy4 = new Enemy (-300, 226);

var allEnemies = [enemy1, enemy2, enemy3, enemy4];

var player = new Player();

//Collision function to reset player back to starting Y coordinate
var checkCollisions = function() {

  allEnemies.forEach(function(enemy) {

  if(enemy.x < player.x + 30 && enemy.x + 60 > player.x && enemy.y < player.y + 60 && enemy.y + 40 > player.y){

        alert('Too bad, try again!');
		    player.reset();

	     }
	});
};

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
