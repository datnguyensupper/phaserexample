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

        // segments is the array which will cotnain string segments
        this.segments=[];

        // populating segments array with gameOptions.tailSegments Point
        for(var i = 0; i < gameOptions.tailSegments; i++){
            this.segments[i] = new Phaser.Point(0,0);
        }

        // we create a graphics instance called "canvas", we'll draw the string on it
        this.canvas = game.add.graphics(0,0);

    },

    // at each update
    update: function(){
        // clearing the canvas, ready to be redrawn
        this.canvas.clear();

        // setting line style to a 4 pixel thick line, red, 100% opaque
        this.canvas.lineStyle(4, 0x00ff00, 1);

        // the head of the string is current input position
        var head= new Phaser.Point(game.input.x, game.input.y);

        // placing the pen on the head
        this.canvas.moveTo(head.x, head.y);

        // the first segment is the head itself
        this.segments[0] = new Phaser.Point(head.x, head.y);

        // looping through all segments starting from the second one
        for(var i = 1; i < gameOptions.tailSegments-1; i++){
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
            }

            // drawing the segment
            this.canvas.lineTo(this.segments[i].x, this.segments[i].y);
        }
    },
};
