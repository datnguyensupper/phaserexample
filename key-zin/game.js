// the game itself
var game;

// global object with all game options
var gameOptions = {
    // game width
    gameWidth: 840,

    // height of each floor
    floorHeight: 20,

    // array with vertical floors position
    floorY: [],

    // number of floors
    floorsAmount: 4,

    // number of spikes per floor
    spikesAmount: 4,

    // height of each spike
    spikeHeight: 40,

    // size of the hero
    squareSize: 16,

    // horizontal speed of the hero
    squareSpeed: 170,

    // game gravity
    squareGravity: 450,

    //force to be applied at each jump
    jumpForce: -210,

    // jump tween length, in miliseconds
    jumpTime: 300,

    // colors used in the game
    levelColors: [0xe81d62, 0x9b26af, 0x2095f2, 0x4bae4f, 0xfeea3a, 0x795548, 0x5f7c8a],

    // local storage name, it's the variable we will be using to save game information such as best score
    localStorageName: "justjumpgame",

    // just a string with version number to be displayed
    version: "1.1m"
};

// when the window loads
window.onload = function(){
    // determining window width/height ratio
    var windowRatio = window.innerWidth/ window.innerHeight;

    // we already have in mind to use 100% of window width with game canvas, so let's
    // calculate game height to cover the entire height of the window
    var gameHeight = gameOptions.gameWidth/windowRatio;

    // 1/ floorsAmount of game height. we use these values to populate floorY array

    for(var i = 1; i <= gameOptions.floorsAmount; i++){
        gameOptions.floorY.push(gameHeight/ gameOptions.floorsAmount * i - gameOptions.floorHeight);
    }

    // game creation
    game = new Phaser.Game(gameOptions.gameWidth, gameHeight);

    // adding game state
    game.state.add("TheGame", TheGame);

    // starting game state
    game.state.start("TheGame");
}

var TheGame = function(){};

TheGame.prototype = {
    // when the state preloads
    preload: function(){

        // setting the game on maximum scale mode to cover the entire screen
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;

        // the game will keep running even when it loses the focus
        game.stage.disableVisibilityChange = true;

        // preloading the only game assets, a tile which will be used both for the square and the floor
        game.load.image("tile", "assets/sprites/tile.png");

        // preloading the bitmap font, generate with Littera bitmap font generator
        game.load.bitmapFont("font", "assets/fonts/font.png", "assets/fonts/font.fnt");

        // preloading the two audio files used in the game
        game.load.audio("jump", "assets/sounds/jump.mp3");
        game.load.audio("explosion", "assets/sounds/explosion.mp3");

    },

    //once the state is ready
    create: function(){
        // handling local storage to retrieve the previously saved high score or to create a new local storage object with a zero score
        this.savedData = localStorage.getItem(gameOptions.localStorageName) == null ? {score: 0} : JSON.parse(localStorage.getItem(gameOptions.localStorageName));

        // assigning the two sounds to variables to be called later
        this.jumpSound = game.add.audio("jump");
        this.explosionSound = game.add.audio("explosion");

        // variable to tell us if we are in demo mode, that is when the square jumps automatically
        this.demo = true;

        // variable to tell us if it's game over
        this.gameOver = false;

        // in this array we will store floor colors
        this.floorColors = [];

        // in this array we will store floor spikes (the obstacles)
        this.floorSpikes = [];

        // in this array we will store the bitmap texts showing the scores at each jump
        this.floorScores = [];

        //creating a copy of levelColors array
        var colorsArray = gameOptions.levelColors.slice();

        //background group
        this.bgGroup = game.add.group();

        // creation of a group where we will place all floors
        this.groundGroup = game.add.group();

        //creation of a group where we will place all spikes, or obstacles, or whatever you will name them
        this.spikeGroup = game.add.group();

        // creation of a group where we will place all bitmap texts showing the scores
        this.scoreGroup = game.add.group();

        // we start on the first floor
        this.levelFloor = 0;

        // adding the hero
        this.theSquare = game.add.sprite(0,0, "tile");

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

        // a custom atribute to tell the player which color we are going to use at each floor
        this.theSquare.squareColor = [];

        // determining level height. Each "level" is a floor, but i am calling the variable levelHeight rather than
        // floorHeight not to be confused with gameOptions.floorHeight
        var levelHeight = game.height/gameOptions.floorsAmount;

        // time to create the floors
        for(var i = 0; i < gameOptions.floorY.length; i++){
            // each floorSpikes item is an array
            this.floorSpikes[i] = [];

            // each floorScores item is an array
            this.floorScores[i] = [];

            // creation of the background of each floor
            var bg = game.add.sprite(0, gameOptions.floorY[i] - levelHeight + gameOptions.floorHeight,"tile");
            // assigning background a width and a height
            bg.width = game.width;
            bg.height = levelHeight;

            // tintColor is a random colorsArray item. Then such item is removed from colorsArray so that
            // each floor will have a unique color
            var tintColor = Phaser.ArrayUtils.removeRandomItem(colorsArray);

            // choosing and removing a random tint color
            this.floorColors.push(tintColor);

            // applying tint color to background
            bg.tint = tintColor;

            // setting background semi-transparent to make it look darker thanks to black canvas color
            bg.alpha = 0.5;

            // adding the background to its proper group
            this.bgGroup.add(bg);

            //creation of the floor pavement
            var floor = game.add.sprite(0, gameOptions.floorY[i], "tile");

            // assigning floor pavement a width and a height
            floor.width = game.width;
            floor.height = gameOptions.floorHeight;

            // applying tint color to floor
            floor.tint = tintColor;

            // setting floor semi-transparent to make it look darker thank to black canvas color
            floor.alpha = 0.5;

            // let's enable ARCADE physics on floors too
            game.physics.enable(floor, Phaser.Physics.ARCADE);

            // floors can't move
            floor.body.immovable = true;

            // adding the floor to ground group
            this.groundGroup.add(floor);

            // this method will place the spikes
            this.placeSpikes(i);
        }

        // placing a particle emitter at coordinates 0,0 (we'll place it in its proper position later) which can fire up to 30 particles
        this.emitter = game.add.emitter(0,0,30);

        // out particle is the same old "tile" image
        this.emitter.makeParticles("tile");

        // setting a gravity for each particle
        this.emitter.gravity = 200;

        // particles would be too big, so let's set their min and max scale.
        this.emitter.maxParticleScale = 0.1;
        this.emitter.minParticleScale = 0.05;

        // finally placing the hero
        this.placeSquare();

        // creation of a new group which will contain all demo elements
        this.demoGroup = game.add.group();

        // we start with an overlay covering the entire game area
        var blackOverlay = game.add.sprite(0,0,"tile");
        blackOverlay.width = game.width;
        blackOverlay.height = game.height;

        // tinting the overlay with black
        blackOverlay.tint  = 0x000000;

        // setting the overlay 70% opaque
        blackOverlay.alpha  = 0.7;

        // adding blackOverlay to demoGroup group
        this.demoGroup.add(blackOverlay);

        // adding a bitmap text with game tile
        var titleText = game.add.bitmapText(game.width/2, game.height/5, "font", "Just Jump", 48);

        // setting titleText anchor point to 0.5 (the center)
        titleText.anchor.set(0.5);

        // adding titleText to demoGroup group
        this.demoGroup.add(titleText);

        // same thing goes with inforText
        var infoText = game.add.bitmapText(game.width/2, game.height/5 * 2, "font", "Tap / Click to jump", 24);
        infoText.anchor.set(0.5, 0.5);
        this.demoGroup.add(infoText);

        // if you still haven't played the game, set score variable to zero
        if(!this.score){
            this.score = 0;
        }

        // now same concept we saw before now applies with scoresText, we are printing both the latest score and the top score
        var scoresText = game.add.bitmapText(game.width/2, game.height/5 * 4, "font", "Latest score\n" + this.score.toString() + "\n\nBest score\n" + this.savedData.score.toString(), 24);
        scoresText.anchor.set(0.5, 0.5);
        scoresText.align = "center";
        this.demoGroup.add(scoresText);

        // last but not least, let's add version text
        var versionText = game.add.bitmapText(game.width, game.height, "font", "v" + gameOptions.version, 24);
        versionText.anchor.set(1,1);
        this.demoGroup.add(versionText);

        // waiting for player input, then call squareJump function
        game.input.onDown.add(this.squareJump, this);
    },

    // function to be executed at each frame
    update: function(){

        // is the game over?
        if(!this.gameOver){
            // making the hero collide with floors so it won't fallo down
            game.physics.arcade.collide(this.theSquare, this.groundGroup);

            // checking if the hero overlaps with anything in spike group
            game.physics.arcade.overlap(this.theSquare, this.spikeGroup, function(){
                // placing the emitter over the player
                this.emitter.x = this.theSquare.x;
                this.emitter.y = this.theSquare.y;

                // firing 10 particles at once with a 1000 milliseconds lifespan
                this.emitter.start(true, 1000, null, 10);

                // tinting particles with the same player color
                this.emitter.forEach(function(particle){
                    particle.tint = this.theSquare.tint;
                }, this);

                // do not wait any longer for input
                game.input.onDown.remove(this.squareJump, this);

                // play explosion sound
                this.explosionSound.play();

                // game over, man!!
                this.gameOver = true;

                // updating localstorage setting score as the max value between current score and saved score
                localStorage.setItem(gameOptions.localStorageName, JSON.stringify(
                    {score: Math.max(this.score, this.savedData.score)}
                ));

                // wait two seconds before restarting the game
                game.time.events.add(Phaser.Timer.SECONDS *2, function(){
                    game.state.start("TheGame");
                }, this);

            }, null, this);

            // if the hero leaves the floor to the right or to the left...
            if((this.theSquare.x > game.width && this.levelFloor % 2 == 0) || (this.theSquare.x < 0 && this.levelFloor %2==1)){
                // calling moveSpikes method to update spikes position and widht
                this.moveSpikes(this.levelFloor);

                // increasing floor number of setting it back to zero
                this.levelFloor = (this.levelFloor + 1) % gameOptions.floorY.length;

                // placing player at the beginning of the floor
                this.placeSquare();
            }

            // we'll enter this block if the hero just landed, that is it's touching its bottom side and it can't jump yet
            if(!this.theSquare.canJump && this.theSquare.body.touching.down){
                // now the hero can jump again
                this.theSquare.canJump  = true;

                // this statement checks if we jumped a spike:
                // * we jumped more than zero times
                // * we jumped more less than or equal to gameOptions.spikesAmount
                // * it's not a demo
                if(this.jumps > 0 && this.jumps <= gameOptions.spikesAmount && !this.demo){
                    // now jumpLen takes the value of the square when it was in the middle of the jump
                    this.jumpLen = this.jumpLen + (this.theSquare.x - this.jumpLen)/2;

                    // precision is the horizontal distance from the square in the middle of the jump and spike position
                    // the smaller its value, the more perfect the jump
                    var precision = Math.round(Math.abs(this.jumpLen - this.floorSpikes[this.levelFloor][this.jumps-1].x));

                    // showing the bitmap text above the spike we just jumped
                    this.floorScores[this.levelFloor][this.jumps - 1].visible = true;

                    // if precision is less then 10 (a good jump)
                    if(precision < 10){
                        // increase the score
                        this.score += (10-precision)*10;
                        // show jump score
                        this.floorScores[this.levelFloor][this.jumps-1].text = (10-precision)*10;
                    }
                    // otherwise tell the player it was a bad jump
                    else{
                        this.floorScores[this.levelFloor][this.jumps-1].text = "BAD";
                    }
                }
            }

            // if this is the demo...
            if(this.demo){
                // if there are spikes ahead the hero and we are close enough to next spike to allow hero to jump it...
                if((this.jumps < gameOptions.spikesAmount) && (Math.abs(this.floorSpikes[this.levelFloor][this.jumps].x - this.theSquare.x) < 88)){
                    // se the hero jump!
                    this.squareJump();
                }
            }
        }
    },

    // when the player starts running on a floor
    placeSquare: function(){

        // at the beginning of the floor, the player jumped zero times
        this.jumps = 0;

        // properly tint the square according to floor number
        this.theSquare.tint = this.floorColors[this.levelFloor];

        // adjusting hero speed according to floor number: from left to right on even floors, from right to left on odd floors
        this.theSquare.body.velocity.x = (this.levelFloor % 2 == 0) ? gameOptions.squareSpeed:-gameOptions.squareSpeed;

        // no vertical velocity
        this.theSquare.body.velocity.y = 0;

        // the hero can jump again
        this.theSquare.canJump = true;

        // adjusting hero vertical and horizontal position
        this.theSquare.y = gameOptions.floorY[this.levelFloor] - gameOptions.squareSize/2;
        this.theSquare.x = (this.levelFloor % 2 == 0) ? 0: game.width;

        // stopping the jump tween if running
        if(this.jumpTween && this.jumpTween.isRunning){
            this.jumpTween.stop();
            this.theSquare.angle = 0;
        }
    },

    //
    placeSpikes: function(floor){
        // time to place the spikes
        // let's loop through this level spikes
        for(var i = 1; i <= gameOptions.spikesAmount; i++){
            // creating the spike as a tileSprite
            var spike = game.add.sprite((floor % 2==0) ? game.width:0, gameOptions.floorY[floor],"tile");
            spike.height = gameOptions.spikeHeight;

            // applying spikes the same tint color used for the ground
            spike.tint = this.floorColors[floor];

            // setting spike semi-transparent to make it look darker thanks to black canvas color
            spike.alpha = 0.5;

            // setting spike anchor point
            spike.anchor.set(0.5, 1);

            // enabling ARCADE physics to the spike
            game.physics.enable(spike, Phaser.Physics.ARCADE);

            // spikes can't move
            spike.body.immovable = true;

            // adding the spike to the spike group
            this.spikeGroup.add(spike);

            // adding the spike to floorSpikes array
            this.floorSpikes[floor].push(spike);

            // adding a bitmap text above each spike
            var scoreText = game.add.bitmapText(0, gameOptions.floorY[floor]-60, "font", "100", 24);

            // set text registration point
            scoreText.anchor.set(0.5);

            // set text aligment
            scoreText.align = "center";

            // do not show the text at the moment
            scoreText.visible = false;

            // adding the score bitmap text to scoreGroup group
            this.scoreGroup.add(scoreText);

            // adding the score to floorScores array
            this.floorScores[floor].push(scoreText);

            // now let's move the spikes of this floor
            this.moveSpikes(floor);

        }
    },

    moveSpikes: function(floor){
        // the first obstacle will be places at 180 if we are on an even floor, game.width - 180 if we are on an odd floor
        var obstacleX = (floor % 2 == 0) ? 180 : game.width - 180;

        // looping through all obstacles in this floor
        for(var i = 0; i < this.floorSpikes[floor].length; i++){

            // assigning a new width to the obstacle
            var newWidth = game.rnd.integerInRange(1, 16) * 2;

            // adjusting spike physical body size
            this.floorSpikes[floor][i].body.setSize(newWidth, this.floorSpikes[floor][i].height);

            // re-position score text accordingly
            this.floorScores[floor][i].x = obstacleX;
            this.floorScores[floor][i].visble = false;

            // placing next obstacle bwtween 150 and 200 pixels
            var obstacleGap = game.rnd.integerInRange(150, 200);

            // moving and resizing the obstacle with a tween
            var obstacleTween = game.add.tween(this.floorSpikes[floor][i]).to({
                x:obstacleX,
                width: newWidth
            }, 250, Phaser.Easing.Linear.None, true);

            // determining next obstacle position
            obstacleX += (floor % 2 == 0) ? obstacleGap: - obstacleGap;
        }
    },

    // when the player jumps
    squareJump: function(e){
        // we want e not to be undefined and demo to be true to say the player touched the screen
        // or clicked to mouse to start playing
        if(e != undefined && this.demo){
            // not a demo anymore
            this.demo = false;

            // destroying demoGroup and its content, removing titles, overlay, and everything not
            // strictly related to the game
            this.demoGroup.destroy();

            // starting from first floor
            this.levelFloor = 0;

            // resetting the score
            this.score = 0;

            // placing the ssquare
            this.placeSquare();

            // no more else to do
            return ;
        }

        // if the hero can jumps...
        if(this.theSquare.canJump){
            // we save the position the square started jumping
            this.jumpLen = this.theSquare.x;

            // increasing the number of jumps
            this.jumps ++;

            // preventing it to jump while in the air
            this.theSquare.canJump = false;

            // adding a vertical force to the player
            this.theSquare.body.velocity.y = gameOptions.jumpForce;

            // setting a jump rotation angle just to make the square rotate
            var jumpAngle = this.levelFloor % 2 == 0 ? 180 : - 180;

            // using a tween to rotate the player
            this.jumpTween = game.add.tween(this.theSquare).to({
                angle: this.theSquare.angle + jumpAngle
            }, gameOptions.jumpTime, Phaser.Easing.Linear.None, true);

            // if this is not a demo...
            if(!this.demo){
                // playing jump sound
                this.jumpSound.play();
            }
        }
    },


};