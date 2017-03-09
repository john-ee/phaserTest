var game = new Phaser.Game(500, 500, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var player = new Player(game);

function preload() {
	game.load.image('background', 'assets/background.png');
	game.load.spritesheet('fighter', 'assets/Clive2.png', 24, 32);
}

function create() {
	game.physics.startSystem(Phaser.Physics.ARCADE);
	game.add.sprite(0, 0, 'background');

	player.create();
	//  Our controls.
	cursors = game.input.keyboard.createCursorKeys();
},

function update() {
	player.update();
},

function update() {
	player.update();
}
