const default_position = 19;
var direction;
var cursors
var velocity = 100;
var left = 28;
var right = 10;
var up = 1;
var down = 19;

function Player(game){
    this.game = game;
    this.sprite = null;
}

Player.prototype.create = function (inputType) {
    this.player = game.add.sprite(game.world.width/2, game.world.height/2, 'fighter', default_position);
    game.physics.enable(this.player);


    this.player.animations.add('left', [27, 29], 10, true);
  	this.player.animations.add('right', [9, 11], 10, true);
  	this.player.animations.add('up', [0, 2], 10, true);
  	this.player.animations.add('down', [18, 20], 10, true);

    cursors = this.game.input.keyboard.createCursorKeys();
    }
}

Player.prototype.update = function(inputType) {
  //  Reset the players velocity (movement)
  player.body.velocity.x = 0; //
  player.body.velocity.y = 0;

  if (cursors.left.isDown)
  {
      //  Move to the left
      player.body.velocity.x = - velocity;
      player.animations.play('left');
      direction = 'left';
  }
  else if (cursors.right.isDown)
  {
      //  Move to the right
      player.body.velocity.x = velocity;
      player.animations.play('right');
      direction = 'right';
  }
  if (cursors.up.isDown)
  {
    //  Move to the right
    player.body.velocity.y = - velocity;
    player.animations.play('up');
    direction = 'up';
  }
  else if (cursors.down.isDown)
  {
    //  Move to the right
    player.body.velocity.y = velocity;
    player.animations.play('down');
    direction = 'down';
  }

  if(!cursors.left.isDown && !cursors.right.isDown && !cursors.up.isDown && !cursors.down.isDown)
  {
    //  Stand still
    player.animations.stop();
    if (direction == 'left') {
      player.frame = left;
    }
    else if (direction == 'right') {
      player.frame = right;
    }
    else if (direction == 'up') {
      player.frame = up;
    }
    else if (direction == 'down') {
      player.frame = down;
    }
  }
}

Player.prototype.getPlayer = function() {
    return this.player;
}