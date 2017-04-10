var myId=0;
var fightersList;
var player;
var fighter;
var cursors;


var ready = false;
var eurecaServer;
//this function will handle client communication with the server
var eurecaClientSetup = function() {
	//create an instance of eureca.io client
	var eurecaClient = new Eureca.Client();

	eurecaClient.ready(function (proxy) {
		eurecaServer = proxy;


		//we temporary put create function here so we make sure to launch the game once the client is ready
		create();
		ready = true;
	});
}


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
    down:false,
    attack:false
  }

  this.input = {
    left:false,
    right:false,
    up:false,
    down:false,
    attack:false
  }

  var x = 0;
  var y = 0;

  this.game = game;
  this.health = 5;
  this.player = player;
  this.direction = 'down';
  this.delay = false;
	this.alive = true;

  this.fighter = game.add.sprite(x, y, 'fighter1', down);
  this.fighter.id = index;
  game.physics.arcade.enable(this.fighter, Phaser.Physics.ARCADE);
  this.fighter.body.immovable = false;
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
	this.fighter.addChild(this.hitboxes);
  hitbox1 = this.hitboxes.create(0,0,null);
  hitbox1.body.setSize(slash_side_w, slash_side_h, - this.fighter.body.width * 0.5, this.fighter.body.height * 0.25);
  hitbox1.name = "slash_left";
  hitbox2 = this.hitboxes.create(0,0,null);
  hitbox2.body.setSize(slash_side_w, slash_side_h, this.fighter.body.width * 0.5, this.fighter.body.height * 0.25);
  hitbox2.name = "slash_right";
  hitbox3 = this.hitboxes.create(0,0,null);
  hitbox3.body.setSize(slash_side_h, slash_side_w, - this.fighter.body.width * 0.50, - this.fighter.body.height/2);
  hitbox3.name = "slash_up";
  hitbox4 = this.hitboxes.create(0,0,null);
  hitbox4.body.setSize(slash_side_h, slash_side_w, 0, this.fighter.body.height * 0.75);
  hitbox4.name = "slash_down";
};

Fighter.prototype.update = function() {
  //  Reset the players velocity (movement)
	this.fighter.body.velocity.x = 0; //
	this.fighter.body.velocity.y = 0;
  for (var i in this.input) this.cursor[i] = this.input[i];

	if (this.cursor.attack)
	{
		this.attack();
	}

	else
	{

		if (this.cursor.left && this.cursor.down)
		{
			//  Move to the left
			this.fighter.body.velocity.x = - velocity  * 0.75;
			this.fighter.body.velocity.y = velocity  * 0.75;
			this.fighter.animations.play('down');
			this.fighter.direction = 'down';
		}

		else if (this.cursor.right && this.cursor.down)
		{
			//  Move to the left
			this.fighter.body.velocity.x = velocity * 0.75;
			this.fighter.body.velocity.y = velocity * 0.75;
			this.fighter.animations.play('down');
			this.fighter.direction = 'down';
		}

		else if (this.cursor.left && this.cursor.up)
		{
			//  Move to the left
			this.fighter.body.velocity.x = - velocity * 0.75;
			this.fighter.body.velocity.y = - velocity * 0.75;
			this.fighter.animations.play('up');
			this.fighter.direction = 'up';
		}

		else if (this.cursor.right && this.cursor.up)
		{
			//  Move to the left
			this.fighter.body.velocity.x = velocity * 0.75;
			this.fighter.body.velocity.y = - velocity * 0.75;
			this.fighter.animations.play('up');
			this.fighter.direction = 'up';
		}

		else if (this.cursor.left)
		{
			//  Move to the left
			this.fighter.body.velocity.x = - velocity;
			this.fighter.animations.play('left');
			this.fighter.direction = 'left';
		}
		else if (this.cursor.right)
		{
			//  Move to the right
			this.fighter.body.velocity.x = velocity;
			this.fighter.animations.play('right');
			this.fighter.direction = 'right';
		}
		else if (this.cursor.up)
		{
  		//  Move to the right
  		this.fighter.body.velocity.y = - velocity;
  		this.fighter.animations.play('up');
  		this.fighter.direction = 'up';
		}
		else if (this.cursor.down)
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

var game = new Phaser.Game(500, 500, Phaser.AUTO, 'phaser-example', { preload: preload, create: eurecaClientSetup, update: update, render: render });

function preload() {
	game.load.image('background', 'assets/background.png');
	game.load.spritesheet('fighter1', 'assets/Clive2.png', frame_w, frame_h);
}

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);
	game.add.sprite(0, 0, 'background');

  fightersList = {};
  player = new Fighter(myId, game, fighter)
  fightersList[myId] = player;
  fighter = player.fighter;

  cursors = {
	  up: game.input.keyboard.addKey(Phaser.Keyboard.Z),
	  down: game.input.keyboard.addKey(Phaser.Keyboard.S),
	  left: game.input.keyboard.addKey(Phaser.Keyboard.Q),
	  right: game.input.keyboard.addKey(Phaser.Keyboard.D),
    attack: game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),
	};
}


function update() {
  if (!ready) return;

  player.input.up = cursors.up.isDown;
  player.input.left = cursors.left.isDown;
  player.input.right = cursors.right.isDown;
  player.input.down = cursors.down.isDown;
  player.input.attack = cursors.attack.isDown;

  for (var i in fightersList) {
    if (fightersList[i].alive) {
      fightersList[i].update();
    }
  }
	//input_debug();
}

function render () {}

function knockback(player, hitboxes)
{
	if (player.delay == false)
	{
		player.delay = true;
		player.hp--;
		if (player.hp < 1) {
			player.kill();
		}
		else {
			player.tint = 0xff0000;
		}
	}
}

function reenable(player)
{
	player.delay = false;
	player.tint = 0xffffff;
}

function input_debug() {
	this.game.debug.start(20, 20, 'blue');
	this.game.debug.line("player.cursor")
	this.game.debug.line(player.cursor.up);
	this.game.debug.line(player.cursor.down);
	this.game.debug.line(player.cursor.left);
	this.game.debug.line(player.cursor.right);
	this.game.debug.line(player.cursor.attack);

	this.game.debug.line("cursors")
	this.game.debug.line(cursors.up.isDown);
	this.game.debug.line(cursors.down.isDown);
	this.game.debug.line(cursors.left.isDown);
	this.game.debug.line(cursors.right.isDown);
	this.game.debug.line(cursors.attack.isDown);

	this.game.debug.line("player.input")
	this.game.debug.line(player.input.up);
	this.game.debug.line(player.input.down);
	this.game.debug.line(player.input.left);
	this.game.debug.line(player.input.right);
	this.game.debug.line(player.input.attack);
}
