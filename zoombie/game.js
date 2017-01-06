/**
 * Created by tuynu on 12/28/2016.
 */
var game;
var gameOptions = {
    width: 640,
    height: 480,
    backgroundColor:'#71c5cf'
};

window.onload = function(){
    game = new Phaser.Game(gameOptions.width, gameOptions.height);
    game.state.add('main', DemoState);
    game.state. start('main');
}

var mainState = {
    preload:function(){

    },

    create:function() {
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.stage.backgroundColor = gameOptions.backgroundColor;
    },

    update: function(){
    },
    restartGame:function(){
        game.state.start('main');
    },

    render:function(){
        //game.debug.bodyInfo(sprite1, 32, 32);
        //game.debug.body(sprite1);
        //game.debug.body(this.bird);
        //game.debug.body(this.pipes);
    },
};
