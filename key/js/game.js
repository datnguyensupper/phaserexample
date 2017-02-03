// the game itself
var game;
var extraheight = 14;
var scaleRatio = 1;
// global object with all game options
var gameOptions = {
     // game width
     gameWidth: 800,//1600,
     // game height
     gameHeight: 450,//900,
     // width of each floor
     floorWidth: 802,
     // height of each floor
     floorHeight: 20,
     //height of each level
     levelHeight: 100,
     // array with vertical floors potision
     floorY: [
         112-extraheight,
         224-extraheight,
         336-extraheight,
         448-extraheight,
         //580+extraheight*4,
         //700+extraheight*5
          ],
     // horizontal floor position
     floorX: 0,
     // size of the hero
     squareSize: 30,
     // horizontal speed of the hero
     squareSpeed: 200,//180,
     // game gravity
     squareGravity: 450,
     // force to be applied at each jump
     jumpForce: -210,
     // jump tween length, in milliseconds
     jumpTime: 100,
     //colors used in the game
     levelColors: [0xe81d62, 0x9b26af, 0x2095f2, 0x4bae4f, 0xfeea3a, 0x795548, 0x5f7c8a],

    //use for test
     isTest:false,
     //isTest:true,

    //height of leg box,
    heightOfLegOfSquare:30,
    CONSTANT_CACHE_MAX_SCORE:"maxscorecache",
    CONSTANT_CACHE_PLAY_BACKGROUND_MUSIC:"isplaybackgroundmusiccache",
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
    [{width:60,height:30,x:200},{width:60,height:30,x:400},
        {width:60,height:30,x:600}//,{width:60,height:30,x:800},
        //  {width:60,height:30,x:1000},{width:60,height:30,x:1200}
    ],
    // // floor 1
    [{width:70,height:25,x:350},{width:30,height:20,x:100},
        {width:40,height:30,x:700}
        // ,{width:70,height:25,x:900}/*,{width:30,height:20,x:550}*/,
        // {width:40,height:30,x:1250},{width:70,height:25,x:1450},{width:30,height:20,x:1100},
    ],
    // // floor 2
    [{width:10,height:35,x:150},{width:10,height:35,x:400},{width:10,height:35,x:650}
        // ,
        //     {width:10,height:35,x:800},{width:10,height:35,x:950},{width:10,height:35,x:1200},
    ],
    // // floor 3
    [{width:80,height:10,x:280},{width:80,height:10,x:480},
        {width:80,height:10,x:960},{width:80,height:10,x:1160},
        {width:80,height:10,x:1440}]
];
var gameLevelsRandom = [

    // floor 0
    [{width:60,height:30,x:200},{width:60,height:30,x:400},
        {width:60,height:30,x:600}//,{width:60,height:30,x:800},
        //  {width:60,height:30,x:1000},{width:60,height:30,x:1200}
    ],
    // // floor 1
    [{width:70,height:25,x:350},{width:30,height:20,x:100},
        {width:40,height:30,x:700}
        // ,{width:70,height:25,x:900}/*,{width:30,height:20,x:550}*/,
        // {width:40,height:30,x:1250},{width:70,height:25,x:1450},{width:30,height:20,x:1100},
    ],
    // // floor 2
    [{width:10,height:35,x:150},{width:10,height:35,x:400},{width:10,height:35,x:650}
        // ,
        //     {width:10,height:35,x:800},{width:10,height:35,x:950},{width:10,height:35,x:1200},
    ],
    // // floor 3
    [{width:80,height:10,x:280},{width:80,height:10,x:480},
        {width:80,height:10,x:960},{width:80,height:10,x:1160},
        {width:80,height:10,x:1440}],
    ////floor 4
    [{width:10,height:10,x:100},{width:10,height:10,x:200},{width:10,height:10,x:300},{width:10,height:10,x:400},{width:10,height:10,x:500},{width:10,height:10,x:600}],
    ////floor 5
    [{width:10,height:40,x:200},{width:10,height:40,x:400},{width:10,height:40,x:600}]
];



// when the window loads
window.onload = function() {

     // game creation
	game = new Phaser.Game(gameOptions.gameWidth, gameOptions.gameHeight, Phaser.AUTO, "lobbygame");
     // adding game state
    game.state.add("TheBoot", TheBootGame);
    game.state.add("TheLoadingGame", TheLoadingGame);
     game.state.add("TheGame", TheGame);
     // starting game state
     game.state.start("TheBoot");
}

var TheGame = function(){};

TheGame.prototype = {
    isPlayedBGMusic:false,
    arrayOfDebugPhysicSprites:[],
    arrayOfGroupEachFloorLevel:[],
    groupNeed2Scale:[],

    // set tint color for all object relate to the square
    setTintColorForRelateTheSquare:function(){
        if(this.playBGMusic){
        this.playBGMusic.tint = this.theSquare.tint;
        }
        if(this.stopBGMusic){
        this.stopBGMusic.tint = this.theSquare.tint;
        }

    },
    //play background music
    playBackgroundMusic: function(){
        if(!this.isPlayedBGMusic){
            ManagerForSound.loop(game, 'background-music');
        }
        this.isPlayedBGMusic = true;
        this.updateStateOfBackgroundMusic();
        Lobby.Utils.setToLocalStorage(gameOptions.CONSTANT_CACHE_PLAY_BACKGROUND_MUSIC, true);
    },

    //stop background music
    stopBackgroundMusic: function(){
        ManagerForSound.stop(game,'background-music');
        this.isPlayedBGMusic = false;
        this.updateStateOfBackgroundMusic();
        Lobby.Utils.setToLocalStorage(gameOptions.CONSTANT_CACHE_PLAY_BACKGROUND_MUSIC, false);
    },

    //share on facebook
    shareResultOnFacebook:function(){
        // var fbLoginSuccess = function (userData) {
        //     alert("UserInfo: " + JSON.stringify(userData));
        // }
        //
        // facebookConnectPlugin.login(["public_profile"],
        //     fbLoginSuccess,
        //     function (error) { alert("" + error) }
        // );
        facebookConnectPlugin.showDialog({
            method: 'share',
            href: 'https://raw.githubusercontent.com/tuynumemories/privacygame/master/privacyGameJumpingBox.txt',
            link: "https://raw.githubusercontent.com/tuynumemories/privacygame/master/privacyGameJumpingBox.txt",
            caption: "Congratulations! You beat your personal record! Your new score is " + this.maxScore
        }, /*success*/function(){},
            /*fail*/function(){});
    },
    createIfNotExistPopupGameOver:function(){


        var gameOverPopup = game.add.group();
        this.groupNeed2Scale.push (gameOverPopup);
        var bgGameOver = game.add.sprite(
            0,
            0, "bgBodyGameOver",0,gameOverPopup);
        bgGameOver.anchor.setTo(0.5,0.5);
        bgGameOver.scale.setTo(1.5);
        var gameOverTitle = game.add.sprite(
            0,
            -150, "gameOverText",0,gameOverPopup);
        gameOverTitle.anchor.setTo(0.5,0.5);

        var playBtn = game.add.button(
            -50,
            110, 'playBtn', function(){
            this.restartGame();
        }, this, 0, 0, 0);
        playBtn.anchor.setTo(0.5,0.5);
        playBtn.scale.setTo(0.8);
        gameOverPopup.add(playBtn);
        var shareBtn = game.add.button(
            -playBtn.x,
            playBtn.y, 'shareBtn', function(){
                this.shareResultOnFacebook();
            }, this, 0, 0, 0);
        gameOverPopup.add(shareBtn);
        shareBtn.anchor.setTo(0.5,0.5);

        //add score text
        var scoreText = game.add.bitmapText(bgGameOver.x+50, bgGameOver.y-40, 'carrier_command',this.score+'',30);
        scoreText.tint = 0x000000;
        scoreText.anchor.setTo(0,0.5);
        gameOverPopup.add(scoreText);
        var maxScoreText = game.add.bitmapText(scoreText.x, scoreText.y + scoreText.height + 35, 'carrier_command',this.maxScore+'',30);
        maxScoreText.tint = 0x000000;
        maxScoreText.anchor.setTo(0,0.5);
        gameOverPopup.add(maxScoreText);


        gameOverPopup.x = game.width/2;
        gameOverPopup.y = game.height/2;

        this.scaleEntireOfGame();

    },

    /**
     * scale all need popup game
     */
    scaleEntireOfGame:function(){
        //for(var i = 0; i < this.groupNeed2Scale.length; i++){
        //
        //    this.groupNeed2Scale[i].scale.setTo(scaleRatio);
        //}
    },
     // when the state preloads
     preload: function(){

          // setting the game on maximum scale mode
          game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
          //game.scale.pageAlignHorizontally = true;
          //game.scale.pageAlignVertically = true;

     },

    //Inscrease score
    increaseScore:function(){
        this.score++;
        this.updateScore();
    },
    // update score
    updateScore:function(){

        if(this.score > this.maxScore){
            this.maxScore = this.score;
            Lobby.Utils.setToLocalStorage(gameOptions.CONSTANT_CACHE_MAX_SCORE, this.maxScore);
        }

        this.currentScoreText.text = "Score:" + this.score;
        this.maxScoreText.text = "Max Score:" + this.maxScore;
    },
// update btn play or mute background music
    updateStateOfBackgroundMusic:function(){
        if(!this.stopBGMusic ||
        !this.playBGMusic){
            return;
        }
        if(this.isPlayedBGMusic){
            this.stopBGMusic.visible = true;
            this.playBGMusic.visible = false;
        }else{
            this.stopBGMusic.visible = false;
            this.playBGMusic.visible = true;

        }
    },

    //create button control music
    createBtnControlMusic: function(){
        this.playBGMusic = game.add.button(
            10,
            10, 'play_bg_music', function(){
                this.playBackgroundMusic();
            }, this, 0, 0, 0);
        this.playBGMusic.scale.setTo(0.8);
        this.stopBGMusic = game.add.button(
            this.playBGMusic.x,
            this.playBGMusic.y-5, 'mute_bg_music', function(){
                this.stopBackgroundMusic();
            }, this, 0, 0, 0);
        this.stopBGMusic.scale.setTo(this.playBGMusic.scale.x);
        this.updateStateOfBackgroundMusic();
        this.setTintColorForRelateTheSquare();

    },

     // once the state is ready
     create: function(){

        // document.removeEventListener("pause",null);
        document.addEventListener("pause", this.stopBackgroundMusic, false);

         var shouldPlayBackgroundMusic = Lobby.Utils.getFromLocalStorage(gameOptions.CONSTANT_CACHE_PLAY_BACKGROUND_MUSIC);
         if(Lobby.Utils.objectIsNull(shouldPlayBackgroundMusic)){
             shouldPlayBackgroundMusic = 'true';
         }
         if(shouldPlayBackgroundMusic === 'true') {
             this.playBackgroundMusic();
         }

         if(gameOptions.isTest){
             gameOptions.levelColors = [0x000000,0xff0000];
         }

         this.score = 0;
         this.maxScore = 0;
         //add score text
         this.currentScoreText = game.add.text(game.width-10, 10, "Score:0", {
             font: 20 + 'px Arial',
             fill: '#ffffff',
             align: "right"
         });
         this.maxScoreText = game.add.text(
             this.currentScoreText.x,
             this.currentScoreText.y + this.currentScoreText.height , "Max Score:0", {
             font: 20 + 'px Arial',
             fill: '#ffffff',
             align: "right"
         });
         this.currentScoreText.anchor.setTo(1,0);
         this.maxScoreText.anchor.setTo(1,0);


         var previousMaxScore = Lobby.Utils.getFromLocalStorage(gameOptions.CONSTANT_CACHE_MAX_SCORE);
         if(Lobby.Utils.objectNotNull(previousMaxScore)){
             this.maxScore = previousMaxScore;
             this.updateScore();
         }

         // set is dead
         this.isDead = false;

          //background group
          this.bgGroup = game.add.group();
         this.groupNeed2Scale.push (this.bgGroup);

          // creation of a group where we will place all floors
          this.groundGroup = game.add.group();
         this.groupNeed2Scale.push (this.groundGroup);

          this.spikeGroup = game.add.group();
         this.groupNeed2Scale.push (this.spikeGroup);

          // we start on the first floor
          this.levelFloor = 0;

          // adding the hero on the first floor

          this.theSquare = game.add.sprite(
              gameOptions.floorX + gameOptions.squareSize / 2 + 50,
              gameOptions.floorY[0] - gameOptions.squareSize / 2, "tile");
         this.groupNeed2Scale.push (this.theSquare);

         // var leg = game.add.sprite(0, gameOptions.squareSize-2, 'moving_leg');
         // leg.tint = 0xffffff;
         //leg.scale.setTo(2);
         // leg.anchor.setTo(0.5,0);
         // var anim = leg.animations.add('walk');
         // anim.play(15, true);
         // this.theSquare.leg = leg;
         // this.theSquare.addChild(leg);

         this.arrayOfDebugPhysicSprites.push(this.theSquare);
         this.theSquare.tint = 0xff00ff;
         this.setTintColorForRelateTheSquare();
         // this.theSquare.leg.tint = this.theSquare.tint;
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

         // this.theSquare.body.setSize(gameOptions.squareSize*2, gameOptions.squareSize*2+gameOptions.heightOfLegOfSquare);

          // a custom attribute to tell the player which color we are going to use at each floor
          this.theSquare.squareColor = [];

         // create array of coin point
         this.groupCoinPoint = game.add.group();


          // time to create the floors
          for(i = 0; i < gameOptions.floorY.length; i++){

               // colorsArray will contain a copy of levelColors array
               var colorsArray = gameOptions.levelColors.slice();

               //background
              var bg = game.add.sprite(
                  gameOptions.floorX,
                  gameOptions.floorY[i] - gameOptions.levelHeight,
                  "bgMainGame");
              //bg.width = gameOptions.floorWidth;
              //bg.height = gameOptions.levelHeight;

               // which color are we going to tint the square when crossing this floor?
               this.theSquare.squareColor[i] = Phaser.ArrayUtils.removeRandomItem(colorsArray);

              //setting background semi-transparent to make it look darker thanks to black canvas color
              bg.alpha = 0.5;

              // adding the background to its proper group
              this.bgGroup.add(bg);


               //apply a random tint color to background
               bg.tint = Phaser.ArrayUtils.removeRandomItem(colorsArray);

               // each floor is a tile sprite

              var floor = game.add.sprite(
                  gameOptions.floorX, gameOptions.floorY[i], "floorMainGame");
              //floor.width = gameOptions.floorWidth;
              //floor.height = gameOptions.floorHeight;

               // let's enable ARCADE physics on floors too
               game.physics.enable(floor, Phaser.Physics.ARCADE);

               // floors can't move
               floor.body.immovable = true;

               // adding the floor to ground group
               this.groundGroup.add(floor);


              //create floor at level i
              this.createFloor(i,gameLevels[i]);
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

         //finally placing the hero
         this.placeSquare();

          // waiting for player input, then call squareJump function
          game.input.onDown.add(this.squareJump, this);


          this.createBtnControlMusic();
         this.scaleEntireOfGame();
     },

    /**
     * do code for dead player
     */
    doDead:function(){

        if(gameOptions.isTest){
            return;
        }

        ManagerForSound.play(game,"explosion");
        // placing the emitter over the player
        this.emitter.x = this.theSquare.x;
        this.emitter.y = this.theSquare.y;

        // firing 10 particles at once with a 1000 milliseconds lifespan
        this.emitter.start(true, 1000,null,20);

        var that = this;
        // tinting particles with the same player color
        this.emitter.forEach(function(particle) {
            particle.tint = this.theSquare.tint;
        }, this);

        // placing the player at the beginning of the floor
        //this.placeSquare();
        this.isDead = true;
        this.theSquare.canJump = false;
        //in this case, restart the game
        //game.state.start("TheGame");
        this.theSquare.visible = false;

        this.createIfNotExistPopupGameOver();
    },

     // at each frame
     update: function(){


          // making the hero collide with floors so it won't fallo down
         if(!this.isDead){
             game.physics.arcade.overlap(this.theSquare, this.groupCoinPoint,function(square,countPoint){
                    //increate point
                 this.increaseScore();

                 countPoint.destroy();
             },null,this);


             game.physics.arcade.collide(this.theSquare, this.groundGroup);
             // checking if the hero overlaps with anything in spike group
             for(var i = 0; i < this.arrayOfGroupEachFloorLevel.length; i++){
                 game.physics.arcade.overlap(this.theSquare, this.arrayOfGroupEachFloorLevel[i], this.doDead,null,this);
             }
             //game.physics.arcade.overlap(this.theSquare, this.spikeGroup, this.doDead,null,this);

             // if the hero leaves the floor to the right or to the left...
             if((this.theSquare.x > gameOptions.floorX + gameOptions.floorWidth && this.levelFloor % 2 == 0) || (this.theSquare.x < gameOptions.floorX && this.levelFloor % 2 == 1)){

                 // increasing floor number or setting it back to zero
                 this.levelFloor = (this.levelFloor + 1) % gameOptions.floorY.length;

                 // placing player at the beginning of the floor
                 this.placeSquare();
             }

             // if the hero as its feet on the ground, it can jump
             if(this.theSquare.body.touching.down && !this.isDead){
                 if(!this.theSquare.canJump){
                     // console.log("not rotate man!");
                     // using a tween to rotate the player
                 }
                 this.theSquare.canJump = true;
             }

         }else{
             if(this.theSquare.y > game.height){
                 //this.restartGame();
             }
         }

     },

     // when the player starts running on a floor
     placeSquare: function(){

         this.resetFloor(this.levelFloor-1);

         //properly tint the square accourding to floor number
         this.theSquare.tint = this.theSquare.squareColor[this.levelFloor];
         // this.theSquare.leg.tint = this.theSquare.tint;

          // adjusting hero speed according to floor number: from left to right on even floors, from right to left on odd floors
          this.theSquare.body.velocity.x = (this.levelFloor % 2 == 0) ? gameOptions.squareSpeed : -gameOptions.squareSpeed;

          // no vertical velocity
          this.theSquare.body.velocity.y = 0;

          // the hero can jump again
          this.theSquare.canjump = true;

          // adjusting hero vertical and horizontal position
          this.theSquare.y = gameOptions.floorY[this.levelFloor] - gameOptions.squareSize / 2;// - gameOptions.heightOfLegOfSquare/2;
          this.theSquare.x = (this.levelFloor % 2 == 0) ? gameOptions.floorX : gameOptions.floorX + gameOptions.floorWidth;

          // stopping the jump tween if running
         this.theSquare.angle = 0;
          if(this.jumpTween && this.jumpTween.isRunning){
               this.jumpTween.stop();
          }

     },

    /**
     * reset floor level
     * @param floor
     */
    resetFloor:function(floor){
        if(floor < 0){
            floor = gameOptions.floorY.length - 1;
        }

        var floorLevelID = game.rnd.integerInRange(0, gameLevelsRandom.length-1);
        var floorLevel = gameLevelsRandom[floorLevelID];
        this.arrayOfGroupEachFloorLevel[floor].destroy();
        this.arrayOfGroupEachFloorLevel[floor] = null;
        this.createFloor(floor, floorLevel);
    },

    /**
     * create floor level
     * @param floor
     */
    createFloor:function(floor,floorLevelWall){
        var groupSpikeOfThisLevel = game.add.group();
        // let's loop through this level spikes
        for(var j = 0; j < floorLevelWall.length; j++){
            //creating the spike as a tileSprite

            var spike = game.add.sprite(
                gameOptions.floorX + floorLevelWall[j].x,
                gameOptions.floorY[floor], "tile");
            spike.width = floorLevelWall[j].width;
            spike.height = floorLevelWall[j].height;


            //create count point
            var coinPoint = game.add.sprite(spike.x+spike.width/2, spike.y-spike.height-50);
            game.physics.enable(coinPoint, Phaser.Physics.ARCADE);
            coinPoint.body.setSize(5,50);
            //point coin can't move
            coinPoint.body.immovable = true;
            this.groupCoinPoint.add(coinPoint);
            this.arrayOfDebugPhysicSprites.push(coinPoint);

            //setting spike anchor point
            spike.anchor.set(0.5, 1);


            //enabling ARCADE physics to the spike
            game.physics.enable(spike, Phaser.Physics.ARCADE);
            //spikes can't move
            spike.body.immovable = true;
            //adding the spike to spike group
            groupSpikeOfThisLevel.add(spike);
        }
        this.arrayOfGroupEachFloorLevel[floor]=groupSpikeOfThisLevel;
        this.spikeGroup.add(groupSpikeOfThisLevel);
    },

     // when the player jumps
     squareJump: function(){

          // if the hero can jump...
          if(this.theSquare.canJump){

              ManagerForSound.play(game, 'jump');

               // preventing it to jump while in the air
               this.theSquare.canJump = false;

              //this.theSquare.body.setSize(gameOptions.squareSize*2, gameOptions.squareSize*2+gameOptions.heightOfLegOfSquare);
              //var godown = game.add.tween(this.theSquare).to({y:gameOptions.floorY[this.levelFloor] - gameOptions.squareSize / 2 -gameOptions.heightOfLegOfSquare/2},200,Phaser.Easing.Linear.None, true);
              //godown.onComplete.add(function(){

                  // adding a vertical force to the player
                  this.theSquare.body.velocity.y = gameOptions.jumpForce;

                  // setting a jump rotation angle just to make the square rotate
                  var jumpAngle = this.levelFloor % 2 == 0 ? -20 : 20;



                  // using a tween to rotate the player
                  this.jumpTween = game.add.tween(this.theSquare).to({
                      angle: this.theSquare.angle + jumpAngle
                  }, gameOptions.jumpTime*2, Phaser.Easing.Linear.None, true);
                this.jumpTween.onComplete.add(function(){
                    this.jumpTween = game.add.tween(this.theSquare).to({
                        angle: 0
                    }, gameOptions.jumpTime*3, Phaser.Easing.Linear.None, true);
                },this);


                  //this.theSquare.body.setSize(gameOptions.squareSize*2, gameOptions.squareSize*2+gameOptions.heightOfLegOfSquare*2);
                  //game.add.tween(this.theSquare).to({y:gameOptions.floorY[this.levelFloor] - gameOptions.squareSize / 2 -gameOptions.heightOfLegOfSquare},200,Phaser.Easing.Linear.None, true);


          //}, this);
          }
     },

    //restart game
    restartGame:function(){
        //game.state.start('TheGame');

        game.state.start(
            "TheGame",
            true, // clearWorld
            false // clearCache
        );
    },
//render physic
    render:function(){
        if(!this.isTest){
            return;
        }
        for(var i = 0; i < this.arrayOfDebugPhysicSprites.length; i++) {
            var sprite = this.arrayOfDebugPhysicSprites[i];
            //game.debug.bodyInfo(sprite1, 32, 32);
            game.debug.body(sprite);
        }
        //game.debug.body(this.bird);
        //game.debug.body(this.pipes);
    },
};

var TheBootGame = function(){};

TheBootGame.prototype = {
    // when the state preloads
    preload: function(){
        // setting the game on maximum scale mode
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        //my.scale.setScreenSize();
        /**
         * Align game at center of screen
         * @type {boolean}
         */
        game.scale.pageAlignVertically = true;
        game.scale.pageAlignHorizontally = true;

        // the game will keep running even when it loses the focus
        game.stage.disableVisibilityChange = true;


        game.scale.setShowAll();
        game.scale.refresh();



        // preloading the only game assets, a tile which will be used both for the square and the floor
        game.load.image("loading-BG", "assets/sprites/background.jpg");
        game.load.image("tile", "assets/sprites/pattern4_small_1_large.png");
        game.load.image("progressLoading", "assets/sprites/maingame/progress.jpg");
        game.load.image("progressLoading_blank", "assets/sprites/maingame/progress_blank.jpg");

        //load leg animation
        // game.load.atlas('moving_leg', 'assets/sprites/movingLeg.png', 'assets/sprites/movingLeg.json', Phaser.Loader.TEXTURE_ATLAS_JSON_ARRAY);
        ManagerForSound.loadSound(game, 'background-music', 'assets/sounds/CoolMusic.mp3');

    },

    // once the state is ready
    create: function() {

        //ManagerForSound.loop(game, 'background-music');
        game.add.sprite(0, 0, 'loading-BG');


        var progressBG = game.add.sprite(
            400, 150, "progressLoading");
        //progressBG.width = 300;
        //progressBG.height = 20;


        var progress = game.add.sprite(
            progressBG.x,
            progressBG.y , "progressLoading_blank");
        //progress.width = 0;
        //progress.height = progressBG.height;
        progress.tint = 0xff6699;
        progress.width = 0;

        var theSquare = game.add.sprite(
            progressBG.x,
            progressBG.y - 40, "tile");
        theSquare.width = gameOptions.squareSize;
        theSquare.height = gameOptions.squareSize;
        theSquare.tint = 0xff6699;

        // var leg = game.add.sprite(gameOptions.squareSize, gameOptions.squareSize*2, 'moving_leg');
        // leg.tint = 0xff6699;
        //leg.scale.setTo(2);
        // leg.anchor.setTo(0.5,0);
        // var anim = leg.animations.add('walk');
        // anim.play(15, true);
        // theSquare.leg = leg;
        // theSquare.addChild(leg);


        game.time.events.add(100, function(){
            game.state.start(
                "TheLoadingGame",
                false, // clearWorld
                false, // clearCache
                progress,
                progressBG,
                theSquare
            );

        }, this);
    }


};

var TheLoadingGame = function(){};

TheLoadingGame.prototype = {
    _progress:null,
    _progressBG:null,
    _theSquare:null,
    init:function(progress,progressBG,theSquare){
        var loadingTime = 2000;

        this._progress = progress;
        this._progressBG = progressBG;
        this._theSquare = theSquare;

        var anm = game.add.tween(progress);
        anm.to(
            {width: progressBG.width},
            loadingTime, Phaser.Easing.Linear.None
        );
        anm.start();

        var target = theSquare.x + progressBG.width-20;
        anm = game.add.tween(theSquare);
        anm.to(
            {x: target, angle: -20},
            loadingTime, Phaser.Easing.Linear.None
        );
        anm.start();
        //
        // anm.onComplete.add(function(){
        //     // progress.Destroy();
        //     // progressBG.Destroy();
        //     theSquare.Destroy();
        // },this);

    },
    // when the state preloads
    preload: function(){

        // setting the game on maximum scale mode
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        //game.scale.pageAlignHorizontally = true;
        //game.scale.pageAlignVertically = true;

        ManagerForSound.loadSound(game, 'explosion', 'assets/sounds/Ouch.mp3');
        ManagerForSound.loadSound(game, 'jump', 'assets/sounds/Jump.mp3');

        //game over
        game.load.image("playBtn", "assets/sprites/gameover/play-btn.png");
        game.load.image("shareBtn", "assets/sprites/gameover/fbshare.png");
        game.load.image("gameOverText", "assets/sprites/gameover/gameOver.png");
        game.load.image("bgBodyGameOver", "assets/sprites/gameover/middle-copy.jpg");

        //game
        game.load.image("bgMainGame", "assets/sprites/maingame/background.jpg");
        game.load.image("floorMainGame", "assets/sprites/maingame/floor.jpg");
        game.load.image("play_bg_music", "assets/sprites/maingame/play_bg.png");
        game.load.image("mute_bg_music", "assets/sprites/maingame/mute_bg.png");
        game.load.image("hand_touch", "assets/sprites/hand-touch.png");

        game.load.bitmapFont('carrier_command', 'assets/fonts/bitmapFonts/carrier_command.png', 'assets/fonts/bitmapFonts/carrier_command.xml');

    },

    // once the state is ready
    create: function() {
        // ManagerForSound.loop(game, 'background-music');
        var tutorialText = game.add.bitmapText(120, 50, 'carrier_command','Touch to jump',20);
        tutorialText.tint = 0xffffff;
        tutorialText.anchor.setTo(0,0.5);


        var handTutorial = game.add.sprite(
            tutorialText.x + tutorialText.width + 50,
            tutorialText.y, "hand_touch");
        handTutorial.scale.setTo(0.7);

        var theSquareTutorial = game.add.sprite(
            handTutorial.x-10,
            handTutorial.y - 30, "tile");
        theSquareTutorial.width = gameOptions.squareSize;
        theSquareTutorial.height = gameOptions.squareSize;
        theSquareTutorial.angle = -10;



        game.time.events.add(1000, function(){

            var playBtn = game.add.button(
                game.width/2,
                game.height/2, 'playBtn', function(){
                }, this, 0, 0, 0);
            playBtn.anchor.setTo(0.5,0.5);

            game.input.onDown.add(function(){
                game.state.start(
                    "TheGame",
                    true, // clearWorld
                    false // clearCache
                );
            }, this);

            this._progress.destroy();
            this._progressBG.destroy();
            this._theSquare.destroy();

        }, this);
    }

};