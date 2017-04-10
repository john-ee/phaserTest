const default_position = 19;
const velocity = 100;
const knock_back = 20;
const left = 28;
const right = 10;
const up = 1;
const down = 19;
const frame_w = 24;
const frame_h = 32;
const body_w = 10;
const body_h = 20;
const offset_x = frame_w / 4 + 1;
const offset_y = frame_h / 4;
const slash_side_w = 10;
const slash_side_h = 15;

Fighter = function(index, game, player) {
  this.cursor = {
    left:false,
    right:false,
    up:false,
    attack:false
  }

  this.input = {
    left:false,
    right:false,
    up:false,
    attack:false
  }

  var x = 0;
  var y = 0;

  this.game = game;
  this.health = 5;
  this.player = player;
  this.direction = 'down';
  this.delay = false;

  this.fighter.id = index;
  this.fighter = game.add.sprite(x, y, 'fighter1', down);
  game.physics.arcade.enable(this.fighter);
	this.fighter.body.collideWorldBounds = true; //
	// animations
	this.fighter.animations.add('left', [27, 28, 29], 10, true);
	this.fighter.animations.add('right', [9, 10, 11], 10, true);
	this.fighter.animations.add('up', [0, 1, 2], 10, true);
	this.fighter.animations.add('down', [18, 19, 20], 10, true);
	this.fighter.animations.add('f_left', [30, 31, 32], 10, false);
	this.fighter.animations.add('f_right', [12, 13, 14], 10, false);
	this.fighter.animations.add('f_up', [3, 4, 5], 10, false);
	this.fighter.animations.add('f_down', [21, 22, 23], 10, false);



	// Change body size for battle
	this.fighter.body.setSize(body_w, body_h, offset_x, offset_y);
	// Enable hitboxes
	this.hitboxes = game.add.group();
	this.hitboxes.enableBody = true;
	this.hitboxes.direction = 'down';
	this.fighter.addChild(hitboxes1);
  hitbox1 = hitboxes1.create(0,0,null);
  hitbox1.body.setSize(slash_side_w, slash_side_h, - this.fighter.body.width * 0.5, this.fighter.body.height * 0.25);
  hitbox1.name = "slash_left";
  hitbox2 = hitboxes1.create(0,0,null);
  hitbox2.body.setSize(slash_side_w, slash_side_h, this.fighter.body.width * 0.5, this.fighter.body.height * 0.25);
  hitbox2.name = "slash_right";
  hitbox3 = hitboxes1.create(0,0,null);
  hitbox3.body.setSize(slash_side_h, slash_side_w, - this.fighter.body.width * 0.50, - this.fighter.body.height/2);
  hitbox3.name = "slash_up";
  hitbox4 = hitboxes1.create(0,0,null);
  hitbox4.body.setSize(slash_side_h, slash_side_w, 0, this.fighter.body.height * 0.75);
  hitbox4.name = "slash_down";
};

Fighter.prototype.update = function() {
  //  Reset the players velocity (movement)
	this.fighter.body.velocity.x = 0; //
	this.fighter.body.velocity.y = 0;

	if (!this.hit.isDown)
	{

		if (this.cursors.left && this.cursors.down)
		{
			//  Move to the left
			this.fighter.body.velocity.x = - velocity  * 0.75;
			this.fighter.body.velocity.y = velocity  * 0.75;
			this.fighter.animations.play('down');
			this.fighter.direction = 'down';
		}

		else if (this.cursors.right && this.cursors.down)
		{
			//  Move to the left
			this.fighter.body.velocity.x = velocity * 0.75;
			this.fighter.body.velocity.y = velocity * 0.75;
			this.fighter.animations.play('down');
			this.fighter.direction = 'down';
		}

		else if (this.cursors.left && this.cursors.up)
		{
			//  Move to the left
			this.fighter.body.velocity.x = - velocity * 0.75;
			this.fighter.body.velocity.y = - velocity * 0.75;
			this.fighter.animations.play('up');
			this.fighter.direction = 'up';
		}

		else if (this.cursors.right && this.cursors.up)
		{
			//  Move to the left
			this.fighter.body.velocity.x = velocity * 0.75;
			this.fighter.body.velocity.y = - velocity * 0.75;
			this.fighter.animations.play('up');
			this.fighter.direction = 'up';
		}

		else if (this.cursors.left)
		{
			//  Move to the left
			this.fighter.body.velocity.x = - velocity;
			this.fighter.animations.play('left');
			this.fighter.direction = 'left';
		}
		else if (this.cursors.right)
		{
			//  Move to the right
			this.fighter.body.velocity.x = velocity;
			this.fighter.animations.play('right');
			this.fighter.direction = 'right';
		}
		else if (this.cursors.up)
		{
  		//  Move to the right
  		this.fighter.body.velocity.y = - velocity;
  		this.fighter.animations.play('up');
  		this.fighter.direction = 'up';
		}
		else if (this.cursors.down)
		{
			//  Move to the right
			this.fighter.body.velocity.y = velocity;
			this.fighter.animations.play('down');
			this.fighter.direction = 'down';
		}

		else
		{
			//  Stand still
			this.fighter.animations.stop();
			if (this.fighter.direction == 'left') {
				this.fighter.frame = left;
			}
			else if (this.fighter.direction == 'right') {
				this.fighter.frame = right;
			}
			else if (this.fighter.direction == 'up') {
				this.fighter.frame = up;
			}
			else if (this.fighter.direction == 'down') {
				this.fighter.frame = down;
			}
		}
	}
};

Fighter.prototype.attack = function() {
	var slash;
	if (this.fighter.direction == 'left') {
		this.fighter.animations.play('f_left');
		slash =  "slash_left";
	}
	else if (this.fighter.direction == 'right') {
		this.fighter.animations.play('f_right');
		//enableHitbox(this.fighter, hitboxes, "slash_right");
		slash = "slash_right";
	}
	else if (this.fighter.direction == 'up') {
		this.fighter.animations.play('f_up');
		slash = "slash_up";
	}
	else{
		this.fighter.animations.play('f_down');
		slash = "slash_down";
	}
	return slash;
};

Fighter.prototype.enableHitbox = function()
{
  // search all the hitboxes
	var box;
  for(var i = 0; i < this.hitboxes.children.length; i++){
    // if we find the hitbox with the "name" specified
    if(this.hitboxes.children[i].name === hitboxName){
      // reset it
      this.hitboxes.children[i].reset(this.fighter.body.x,this.fighter.body.y);
    }
  }
}

// disable all active hitboxes
Fighter.prototype.disableAllHitboxes = function()
{
  this.hitboxes.forEachExists(function(hitbox) {
    this.hitbox.kill();
  });
};

Fighter.prototype.kill = function() {
	this.alive = false;
	this.fighter.kill();
};
