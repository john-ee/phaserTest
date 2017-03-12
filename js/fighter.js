const velocity = 100;
const left = 28;
const right = 10;
const up = 1;
const down = 19;
const frame_w = 24;
const frame_h = 32;
const body_w = 10;
const body_h = 16;

class Clive extends Phaser.Sprite {
  constructor(game,x,y,key,frame) {
    super(game,x,y,'Clive',frame);
  }

  setAnimation() {
    game.physics.enable(this.player);


    this.animations.add('left', [27, 29], 10, true);
  	this.player.animations.add('right', [9, 11], 10, true);
  	this.player.animations.add('up', [0, 2], 10, true);
  	this.player.animations.add('down', [18, 20], 10, true);
  }
}
