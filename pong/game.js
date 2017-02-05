/**
 * Created by tuynu on 12/28/2016.
 */
var game;
var gameOptions = {
    width: 800,
    height: 600,
    numberTilesOfPipe:8,
    pipeSize:60
};

window.onload = function(){
    game = new Phaser.Game(gameOptions.width, gameOptions.height);
    game.state.add('main', mainState);
    game.state. start('main');
}

var mainState = {
    paddle1:null,
    paddle2:null,
    preload:function(){
        game.load.image('paddle', "assets/paddle.png");
    },
    create:function() {
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        this.paddle1 = this.createPaddle(0, game.world.centerY);
        this.paddle2 = this.createPaddle(game.world.width - 16, game.world.centerY);


    },
    update:function(){
        this.controlPaddle(this.paddle1, game.input.y);
    },
    createPaddle:function(x,y){
        var paddle = game.add.sprite(x,y,'paddle');
        paddle.anchor.setTo(0.5,0.5);
        game.physics.arcade.enable(paddle);
        paddle.body.collideWorldBounds = true;

        return paddle;
    },
    controlPaddle : function(paddle, y){
        paddle.y = y;

        if(paddle.y < paddle.height/2){
            paddle.y = paddle.height/2;
        }else if(paddle.y > game.world.height - paddle.height/2){
            paddle.y = game.world.height - paddle.height/2;
        }
    }
};
