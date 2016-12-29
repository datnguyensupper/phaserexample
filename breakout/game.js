/**
 * Created by tuynu on 12/28/2016.
 */
var game;
var gameOptions = {
    width: 400,
    height: 450,
    numberTilesOfPipe:8,
    pipeSize:60
};

window.onload = function(){
    game = new Phaser.Game(gameOptions.width, gameOptions.height);
    game.state.add('main', mainState);
    game.state. start('main');
}

var mainState = {
    preload:function(){
        game.load.image('paddle', 'assets/paddle.png');
        game.load.image('brick', 'assets/brick.png');
        game.load.image('ball', 'assets/ball.png');
    },

    create:function() {
        //set background to blue
        game.stage.backgroundColor = '#3598db';
        //start the arcade physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);
        // Add the physics engine to all the game objects
        game.world.enableBody = true;

        this.left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

        this.paddle = game.add.sprite(gameOptions.width/2, 400, 'paddle');
        this.paddle.body.immovable = true;
        this.paddle.anchor.setTo(0.5,0);

        this.bricks = game.add.group();
        for(var i = 0; i < 5; i++){
            for(var j = 0; j < 5; j++){
                var brick = game.add.sprite(55 + i*60, 35+j*30, 'brick');
                brick.body.immovable = true;
                this.bricks.add(brick);
            }
        }

        this.ball = game.add.sprite(this.paddle.x, 0, 'ball');
        this.ball.y = this.paddle.y - this.ball.height/2;
        this.ball.anchor.setTo(0.5);
        this.ball.body.velocity.x = 200;
        this.ball.body.velocity.y = 200;

        this.ball.body.bounce.setTo(1);
        this.ball.body.collideWorldBounds = true;


    },

    update: function(){
        if(this.left.isDown) this.paddle.body.velocity.x = -300;
        else if(this.right.isDown) this.paddle.body.velocity.x = 300;
        else this.paddle.body.velocity.x = 0;

        game.physics.arcade.collide(this.paddle, this.ball);
        game.physics.arcade.collide(this.ball, this.bricks, this.hit, null, this);
        if(this.ball.y > this.paddle.y) game.state.start('main');
    },

    hit:function(ball, brick){
        brick.kill();
    },

    restartGame:function(){
        game.state.start('main');
    }
};
