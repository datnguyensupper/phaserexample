// the game itself
var game;

// global object with all game options
var gameOptions = {
     // game width
     gameWidth: 640,
     // game height
	gameHeight: 480,
     // width of each floor
     floorWidth: 640,
     // height of each floor
     floorHeight: 20,
     // height ò
     // array with vertical floors potision
     floorY: [92,184,276,368],//460],
     // horizontal floor position
     floorX: 0,
     // size of the hero
     squareSize: 16,
     // horizontal speed of the hero
     squareSpeed: 170,
     // game gravity
     squareGravity: 450,
     // force to be applied at each jump
     jumpForce: -210,
     // jump tween length, in milliseconds
     jumpTime: 800
}

/**
 * this is where we store level information
 * gameLevels is an array.
 * each gameLevel item is an array with floor information
 * each gameLevel[floor] item is an object with:
 * * obstacle width
 * * obstacle height
 * * obstacle position
 * @type {Array}
 */
var gameLevels = [
     // floor 0
    [{width:60,height:30,x:200},{width:60,height:30,x:400}],
     // floor 1
    [{width:40,height:30,x:250},{width:70,height:25,x:450},{width:30,height:20,x:100}],
     // floor 2
    [{width:10,height:35,x:150},{width:10,height:35,x:300},{width:10,height:35,x:550}],
     // floor 3
    [{width:80,height:10,x:280}],
    //floor 4
    []
];



// when the window loads
window.onload = function() {

     // game creation
	game = new Phaser.Game(gameOptions.gameWidth, gameOptions.gameHeight, Phaser.CANVAS);
     // adding game state
     game.state.add("TheGame", TheGame);
     // starting game state
     game.state.start("TheGame");
}

var TheGame = function(){};

TheGame.prototype = {

     // when the state preloads
     preload: function(){

          // setting the game on maximum scale mode
          game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
          //game.scale.pageAlignHorizontally = true;
          //game.scale.pageAlignVertically = true;

          // preloading the only game assets, a tile which will be used both for the square and the floor
		game.load.image("tile", "assets/sprites/tile.png");
     },

     // once the state is ready
     create: function(){

          // creation of a group where we will place all floors
          this.groundGroup = game.add.group();

          this.spikeGroup = game.add.group();

          // we start on the first floor
          this.levelFloor = 0;

          // adding the hero on the first floor
          this.theSquare = game.add.sprite(gameOptions.floorX + gameOptions.squareSize / 2, gameOptions.floorY[0] - gameOptions.squareSize / 2, "tile");
          this.theSquare.tint = 0xff00ff;

          // setting hero registration point
          this.theSquare.anchor.set(0.5);

          // setting hero width and height
          this.theSquare.width = gameOptions.squareSize;
          this.theSquare.height = gameOptions.squareSize;

          // chen the hero jump?
          this.theSquare.canJump = true;

          // enabling ARCADE physics on the hero
          game.physics.enable(this.theSquare, Phaser.Physics.ARCADE);

          // setting hero horizontal velocity
          this.theSquare.body.velocity.x = gameOptions.squareSpeed;

          // gravity applied to the square
          this.theSquare.body.gravity.y = gameOptions.squareGravity;

          // time to create the floors
          for(i = 0; i < gameOptions.floorY.length; i++){

               // each floor is a tile sprite
               var floor = game.add.tileSprite(gameOptions.floorX, gameOptions.floorY[i], gameOptions.floorWidth, gameOptions.floorHeight, "tile");
floor.tint = "0x00ff00";
               // let's enable ARCADE physics on floors too
               game.physics.enable(floor, Phaser.Physics.ARCADE);

               // floors can't move
               floor.body.immovable = true;

               // adding the floor to ground group
               this.groundGroup.add(floor);

               // let's loop through this level spikes
               for(var j = 0; j < gameLevels[i].length; j++){
                    //creating the spike as a tileSprite
                    var spike = game.add.tileSprite(gameOptions.floorX + gameLevels[i][j].x,
                    gameOptions.floorY[i], gameLevels[i][j].width,gameLevels[i][j].height,"tile");

                    //setting spike anchor point
                    spike.anchor.set(0.5, 1);
                    //enabling ARCADE physics to the spike
                    game.physics.enable(spike, Phaser.Physics.ARCADE);
                    //spikes can't move
                    spike.body.immovable = true;
                    //adding the spike to spike group
                    this.spikeGroup.add(spike);
               }
          }

          // placing a partical emitter at coordinate 0,0 (we'll place it in its proper position later) which can fire up to 30 particles
          this.emitter = game.add.emitter(0, 0, 30);
          // our particle is the same old "title" image
          this.emitter.makeParticles("tile");
          //setting a gravity for each particle
          this.emitter.gravity = 200;
          // particals would be too big, so let's set their min and max scale.
          this.emitter.maxParticleScale = 0.1;
          this.emitter.minParticleScale = 0.05;

          // waiting for player input, then call squareJump function
          game.input.onDown.add(this.squareJump, this);
     },

     // at each frame
     update: function(){

          // making the hero collide with floors so it won't fallo down
          game.physics.arcade.collide(this.theSquare, this.groundGroup);
          // checking if the hero overlaps with anything in spike group
          game.physics.arcade.overlap(this.theSquare, this.spikeGroup, function(){

               // placing the emitter over the player
               this.emitter.x = this.theSquare.x;
               this.emitter.y = this.theSquare.y;

               // firing 10 particles at once with a 1000 milliseconds lifespan
               this.emitter.start(true, 1000,null,10);
               // placing the player at the beginning of the floor
               this.placeSquare();

               //in this case, restart the game
               //game.state.start("TheGame");
          },null,this);

          // if the hero leaves the floor to the right or to the left...
          if((this.theSquare.x > gameOptions.floorX + gameOptions.floorWidth && this.levelFloor % 2 == 0) || (this.theSquare.x < gameOptions.floorX && this.levelFloor % 2 == 1)){

               // increasing floor number or setting it back to zero
               this.levelFloor = (this.levelFloor + 1) % gameOptions.floorY.length;

               // placing player at the beginning of the floor
               this.placeSquare();
          }

          // if the hero as its feet on the ground, it can jump
          if(this.theSquare.body.touching.down){
               this.theSquare.canJump = true;
          }
     },

     // when the player starts running on a floor
     placeSquare: function(){
          // adjusting hero speed according to floor number: from left to right on even floors, from right to left on odd floors
          this.theSquare.body.velocity.x = (this.levelFloor % 2 == 0) ? gameOptions.squareSpeed : -gameOptions.squareSpeed;

          // no vertical velocity
          this.theSquare.body.velocity.y = 0;

          // the hero can jump again
          this.theSquare.canjump = true;

          // adjusting hero vertical and horizontal position
          this.theSquare.y = gameOptions.floorY[this.levelFloor] - gameOptions.squareSize / 2;
          this.theSquare.x = (this.levelFloor % 2 == 0) ? gameOptions.floorX : gameOptions.floorX + gameOptions.floorWidth;

          // stopping the jump tween if running
          if(this.jumpTween && this.jumpTween.isRunning){
               this.jumpTween.stop();
               this.theSquare.angle = 0;
          }

     },

     // when the player jumps
     squareJump: function(){

          // if the hero can jump...
          if(this.theSquare.canJump){

               // preventing it to jump while in the air
               this.theSquare.canJump = false;

               // adding a vertical force to the player
               this.theSquare.body.velocity.y = gameOptions.jumpForce;

               // setting a jump rotation angle just to make the square rotate
               var jumpAngle = this.levelFloor % 2 == 0 ? 90 : -90;

               // using a tween to rotate the player
               this.jumpTween = game.add.tween(this.theSquare).to({
                    angle: this.theSquare.angle + jumpAngle
               }, gameOptions.jumpTime, Phaser.Easing.Linear.None, true);
          }
     }
}