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

