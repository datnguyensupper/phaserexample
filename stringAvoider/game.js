/**
 * Created by tuynu on 12/28/2016.
 */
var game;
var gameOptions = {
    width: 640,
    height: 960,
    // number of segments which build the tail
    tailSegments: 300,
    // length of each segment
    segmentLength:2
};

window.onload = function(){
    game = new Phaser.Game(gameOptions.width, gameOptions.height);
    game.state.add('main', mainState);
    game.state. start('main');
}

var mainState = {
    preload:function(){
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;

        game.load.image("maze", "assets/maze.png");

        // preloading start and end icons as spritesheet
        game.load.spritesheet("icons", "assets/icons.png", 80, 80);
    },

    create:function() {
        // creation of a bitmap data with the same size as the game
        this.bitmap = game.make.bitmapData(game.width, game.height);

        // drawing "maxe" image on the bitmap data
        this.bitmap.draw("maze");

        // updating bitmap data to let it have actual image data
        this.bitmap.update();

        // adding the bitmap data as a sprite
        game.add.sprite(0,0,this.bitmap);

        // adding start icon
        this.startSpot = game.add.sprite(80, 80, "icons", 0);

        // setting start icon registration point to its centre
        this.startSpot.anchor.set(0.5);

        // adding end icon
        this.endSpot = game.add.sprite(game.width - 80,game.height - 80, "icons", 1);

        // setting start icon registration point to its centre
        this.endSpot.anchor.set(0.5);

        // adding scissors icon
        this.scissors = game.add.sprite(140, 800, "icons", 2);

        // setting scissors icon registration point to its centre
        this.scissors.anchor.set(0.5);

        // just a flag to inform us if we already had an input, that is if the player already clicked/touched the canvas
        this.firstInput = true;

        //// populating segments array with gameOptions.tailSegments Point
        //for(var i = 0; i < gameOptions.tailSegments; i++){
        //    this.segments[i] = new Phaser.Point(0,0);
        //}

        // we create a graphics instance called "canvas", we'll draw the string on it
        this.canvas = game.add.graphics(0,0);

        // segments is the array which will cotnain string segments
        this.segments=[];

        // waiting for player input to call startMove method
        game.input.onDown.add(this.startMove, this);

    },

    // startMove method, will be called each time the player touches/clicks the canvas
    startMove: function(e){
        // checking if it's the first input: player clicks/touchs the canvas for the first time
        if(this.firstInput){
            // not the first input anymore
            this.firstInput = false;

            // making start icon invisible
            this.startSpot.visible = false;

            // populating segments array with an amount of "gameOptions.tailSegments" Phaser Point objects
            for(var i = 0; i < gameOptions.tailSegments; i++){
                // I want the string to be a circle at first, so I am using a little trigonometry to place thế points accordingly
                var radians = 12 * Math.PI*i/gameOptions.tailSegments + Math.PI/4;
                // creatingh Points objects and placing them into segments array. "10" is the radius of the circle
                this.segments[i] = new Phaser.Point(this.startSpot.x+10*Math.cos(radians),this.startSpot.y+10*Math.sin(radians));
            }

            // calling moveString function. Actually this function moves and renders the string, and the two arguments represent
            // respectively the x and y movement to apply to string's head. We set them to zero because there's no movement
            this.moveString(0,0);
        }

        // removing callback
        game.input.onDown.remove(this.startMove, this);

        // add move callback to be fired when the player moves the mouse/finger and call dragString method
        game.input.addMoveCallback(this.dragString, this);

        // add a up callback to be fired when the player release the finger/mouse button and call endMove method
        game.input.onUp.add(this.endMove, this);

        // saving current event position, that is the position where the player is currently touching/clicking
        this.startPosition = e.position;
    },

    // endMove method is called when the player released the finger/the mouse button
    endMove: function(){
        // waiting for player input to call startMove method
        game.input.onDown.add(this.startMove, this);

        // removing other listeners
        game.input.onUp.remove(this.endMove, this);
        game.input.deleteMoveCallback(this.dragString, this);
    },

    // dragString method is called when the player the player moves the finger or the mouse while keeping mouse button pressed
    dragString: function(e){
        // calling moveString function. Actually this function moves and renders the string, and the two arguments represent
        // respectively the x and y movement to apply to string's head.
        // We set them to represent the distance from current input position and previous input position
        this.moveString(e.position.x - this.startPosition.x, e.position.y-this.startPosition.y);

        // updating startPosition variable
        this.startPosition = new Phaser.Point(e.position.x, e.position.y);

    },

    // moveString method updates and renders the string
    moveString: function(x,y){

        // it's not game over yet
        var gameOver = false;

        // clearing the canvas, ready to be redrawn
        this.canvas.clear();

        // setting line style to a 4 pixel thick line, red, 100% opaque
        this.canvas.lineStyle(8, 0x00ff00, 1);

        // the head of the string is current input position
        var head= new Phaser.Point(this.segments[0].x + x, this.segments[0].y + y);

        // placing the pen on the head
        this.canvas.moveTo(head.x, head.y);

        // the first segment is the head itself
        this.segments[0] = new Phaser.Point(head.x, head.y);

        // checking if we collected scissors powerup while it's still visible
        if(this.segments[0].distance(this.scissors.position) < this.scissors.width/4 && this.scissors.visible){
            // setting scissors powerup as not visible
            this.scissors.visible = false;

            // remove the second half of the string
            this.segments.splice(this.segments.length/2-1, this.segments.length/2);
        }

        // looping through all segments starting from the second one
        for(var i = 1; i < this.segments.length-1; i++){
            // determining the angle between current segment and previous segment
            var nodeAngle = Math.atan2(this.segments[i].y-this.segments[i-1].y, this.segments[i].x-this.segments[i-1].x);

            // calculating new segment prosition according to previous segment position and the angle
            this.segments[i] = new Phaser.Point(this.segments[i-1].x+gameOptions.segmentLength*Math.cos(nodeAngle), this.segments[i-1].y+gameOptions.segmentLength*Math.sin(nodeAngle));

            // getting the color behind the segment
            var color = this.bitmap.getPixelRGB(Math.round(this.segments[i].x), Math.round(this.segments[i].y));

            // if the color alpha is different than zero, that is it's not a transparent pixel...
            if(color.a != 0){
                // from now on ,draw the string in red
                this.canvas.lineStyle(4, 0xff0000,1);

                // game over...
                gameOver = true;
            }

            // drawing the segment
            this.canvas.lineTo(this.segments[i].x, this.segments[i].y);

            // repositioning graphic pen to avoid graphic glitch
            this.canvas.moveTo(this.segments[i].x, this.segments[i].y);
        }

        // if it's game over or the head of the string is fairly inside the end spot...
        if(this.segments[0].distance(this.endSpot.position) < this.endSpot.width/4 || gameOver){
            // removing listeners
            game.input.onUp.remove(this.endMove, this);
            game.input.deleteMoveCallback(this.dragString, this);

            // wait 2 seconds before restarting the game.
            game.time.events.add(Phaser.Timer.SECOND*2, function(){
                game.state.start("main");
            }, this);
        }

    },


};
