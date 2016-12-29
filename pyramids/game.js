var game;

var gameOptions = {
     gameWidth: 1000,
     gameHeight: 800,
     tileSize: 100,
     fieldSize: {
          rows: 8,
          cols: 10
     }
}

var levels = [
     {
          level:[
               [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
               [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
               [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
               [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
               [0, 1, 1, 1, 1, 1, 1, 0, 0, 0],
               [0, 1, 1, 1, 1, 1, 1, 0, 0, 0],
               [0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
               [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          ],
          playerPos: new Phaser.Point(5, 2)
     },
     {
          level:[
               [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
               [0, 0, 0, 0, 0, 1, 1, 1, 1, 0],
               [0, 1, 1, 0, 0, 1, 1, 1, 1, 0],
               [0, 1, 1, 3, 3, 1, 1, 1, 0, 0],
               [0, 1, 1, 3, 3, 1, 1, 1, 0, 0],
               [0, 0, 0, 0, 0, 0, 3, 3, 0, 0],
               [0, 0, 0, 0, 0, 0, 3, 3, 0, 0],
               [0, 0, 0, 0, 0, 0, 1, 1, 0, 0]
          ],
          playerPos: new Phaser.Point(5,3)
     }
];

levelNumber = 0;
window.onload = function(){
     game = new Phaser.Game(gameOptions.gameWidth, gameOptions.gameHeight);
     game.state.add("TheGame", TheGame);
     game.state.start("TheGame");
}

var TheGame = function(){};
 TheGame.prototype = {
      preload: function(){
           game.load.spritesheet("tiles", "assets/sprites/tile.png",
               gameOptions.tileSize, gameOptions.tileSize);
           game.load.image("player", "assets/sprites/player.png");
      },
      create:function(){
          game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
           game.scale.pageAlignHorizontally = true;
           game.scale.pageAlignVertically = true;
           this.createLevel();
           game.input.onDown.add(this.beginSwipe, this);
      },
      createLevel: function(){
           this.tilesArray = [];
           this.tileGroup = game.add.group();
           this.tileGroup.x = (game.width - gameOptions.tileSize*gameOptions.fieldSize.cols)/2;
           this.tileGroup.y = (game.height - gameOptions.tileSize*gameOptions.fieldSize.rows)/2;
           for(var i = 0; i < gameOptions.fieldSize.rows; i++){
               this.tilesArray[i] = [];
               for(var j = 0; j < gameOptions.fieldSize.cols; j++){
                    if(levels[levelNumber].level[i][j] != 0){
                         this.addTile(i,j,levels[levelNumber].level[i][j]);
                    }
               }

           }
           this.playerPosition = new Phaser.Point(0,0);
           levels[levelNumber].playerPos.clone(this.playerPosition);
           this.player = game.add.sprite(
               this.getPlayerPositionX()
               ,this.getPlayerPositionY(), "player");
           this.player.anchor.set(0.5);
           this.tileGroup.add(this.player);
           this.firstMove = true;
      },
      //function add a tile at "row" row, "col" column with "val" value
      addTile: function(row, col, val){
           var tileXPos = col * gameOptions.tileSize + gameOptions.tileSize/2;
           var tileYPos = row * gameOptions.tileSize + gameOptions.tileSize/2;
           var theTile = game.add.sprite(tileXPos, tileYPos, "tiles");
           if(val == 3) theTile.tint = 0xffff88;
           theTile.anchor.set(0.5);
           theTile.tileValue = val;
           theTile.falling = false;
           theTile.tilePosition = new Phaser.Point(col, row);
           this.tilesArray[row][col] = theTile;
           this.tileGroup.add(theTile);
      },
      // get x position of player base on this.playerPosition
      getPlayerPositionX:function(){
          return this.playerPosition.x * gameOptions.tileSize + gameOptions.tileSize/2;
      },
      // get y position of player base on this.playerPosition
      getPlayerPositionY:function(){
          return this.playerPosition.y * gameOptions.tileSize + gameOptions.tileSize/2;
      },
      // get tile of player
      getPlayerTile:function(){
           return this.tilesArray[this.playerPosition.y][this.playerPosition.x];
      },
      //start checking for swipes
      beginSwipe: function(e) {
           game.input.onDown.remove(this.beginSwipe, this);
           game.input.onUp.add(this.endSwipe, this);
      },
      //end checking for swipes
      endSwipe: function(e){
           game.input.onUp.remove(this.endSwipe, this);
           var swipeTime = e.timeUp - e.timeDown;
           var swipeDistance = Phaser.Point.subtract(e.position, e.positionDown);
           var swipeMagnitude = swipeDistance.getMagnitude();
           var swipeNormal = Phaser.Point.normalize(swipeDistance);
           if(swipeMagnitude > 20 && swipeTime < 1000 &&
               (Math.abs(swipeNormal.x) > 0.8 || Math.abs(swipeNormal.y) > 0.8)){
                if(swipeNormal.x > 0.8) this.handleMovement(new Phaser.Point(1,0));
                if(swipeNormal.x < -0.8) this.handleMovement(new Phaser.Point(-1,0));
                if(swipeNormal.y > 0.8) this.handleMovement(new Phaser.Point(0,1));
                if(swipeNormal.y < -0.8) this.handleMovement(new Phaser.Point(0,-1));
           }else{
                game.input.onDown.add(this.beginSwipe, this);
           }
      },
      //handling swipes
      handleMovement: function(p){
           var playerTile = this.tilesArray[this.playerPosition.y][this.playerPosition.x];
          if(this.firstMove){
               this.firstMove = false;
               playerTile.tileValue = 2;
               playerTile.frame = 1;
          }else{
               switch (playerTile.tileValue){
                    case 1:
                       playerTile.falling = true;
                       var tween = game.add.tween(playerTile)
                           .to({
                                alpha:0,
                                width: gameOptions.tileSize/4,
                                height: gameOptions.tileSize/4,
                                angle: game.rnd.integerInRange(-15, 15)
                           }, 500, Phaser.Easing.Linear.None, true);
                       tween.onComplete.add(
                           function(target){
                                this.tilesArray[target.tilePosition.y][target.tilePosition.x] = null;
                                target.destroy();
                           },this
                       );
                       break;
                    case 3:
                       playerTile.tileValue = 1;
                       playerTile.tint = 0xffffff;
                       break;
               }
          }
           this.playerPosition.add(p.x, p.y);
           var playerTween = game.add.tween(this.player).to({
               x:this.getPlayerPositionX(),
               y:this.getPlayerPositionY()
           }, 100, Phaser.Easing.Linear.None, true);
           playerTween.onComplete.add(
               function(){
                    if(
                        this.playerPosition.y == gameOptions.fieldSize.rows ||
                        this.playerPosition.x == gameOptions.fieldSize.cols ||
                        this.getPlayerTile() == null ||
                        this.getPlayerTile().falling
                    ){
                         this.levelRestart();
                    }else{
                         if(this.getPlayerTile().tileValue == 2){
                              if(this.isLevelComplete()){
                                   if(levelNumber == 0){
                                        levelNumber++;
                                        this.levelRestart();
                                   }else{
                                        alert("ok you complete the game");
                                   }
                              }else{
                                   var tween = game.add.tween(this.getPlayerTile())
                                       .to({alpha: 0},100, Phaser.Easing.Linear.None, true);
                                   this.levelRestart();
                              }
                         }else{
                              game.input.onDown.add(this.beginSwipe, this);
                         }
                    }
               },this
           );
      },
      // function to check if the level is completed
      isLevelComplete: function(){
           for(var i = 0; i < gameOptions.fieldSize.rows; i++){
                for(var j = 0; j < gameOptions.fieldSize.cols; j++){
                     if(
                         this.tilesArray[i][j] != null &&
                         !this.tilesArray[i][j].falling &&
                         this.tilesArray[i][j].tileValue != 2
                     ){
                          return false;
                     }
                }
           }
           return true;
      },
      //routine to start whent he level is failed
      levelRestart:function(){
          var tween = game.add.tween(this.player).to(
              {
               alpha:0,
               width: gameOptions.tileSize/4,
               height:gameOptions.tileSize/4
              },500,Phaser.Easing.Linear.None, true
          );
           tween.onComplete.add(
               function(){
                    game.state.start("TheGame");
               },this
           );
      }
 };