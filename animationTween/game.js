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
    preload:function(){
        game.load.image('space', 'assets/starfield.png', 138, 15);
        game.load.image('logo', 'assets/phaser2.png');
    },

    create:function() {
        game.add.tileSprite(0, 0, 800, 600, 'space');
        var sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'logo');

        sprite.anchor.setTo(0.5, 0.5);
        sprite.angle = -30;
        //sprite.alpha = 0;

        //  Create our tween. This will fade the sprite to alpha 1 over the duration of 2 seconds
        var tween = game.add.tween(sprite).to( { angle: 30 }, 500, "Linear", true, 0, -1);

        //  And this tells it to yoyo, i.e. fade back to zero again before repeating.
        //  The 3000 tells it to wait for 3 seconds before starting the fade back.
        tween.yoyo(true, 0);

    }
};
