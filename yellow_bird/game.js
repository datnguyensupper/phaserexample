/**
 * Created by tuynu on 12/28/2016.
 */
var game;
var gameOptions = {
    width: 400,
    height: 400
};

window.onload = function(){
    game = new Phaser.Game(gameOptions.width, gameOptions.width);
    game.state.add('main', mainState);
    game.state. start('main');
}

var mainState = {
    preload:function(){
        //load the bird
        game.load.image('bird', 'assets/bird.png');
    },

    create:function() {
        game.stage.backgroundColor = '#71c5cf';
        game.physics.startSystem(Phaser.Physics.ARCADE);
        this.bird = game.add.sprite(100, 245, 'bird');
        game.physics.arcade.enable(this.bird);
        this.bird.body.gravity.y = 1000;
        var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.jump,this);

        this.ground = game.add.sprite(0, 390);
        game.physics.arcade.enable(this.ground);
        this.ground.body.setSize(150, 20, 0, 0);
        this.ground.body.immovable = true;
    },

    update: function(){

        game.physics.arcade.collide(this.bird, this.ground);
        //console.log(this.bird.y);
        if(this.bird.y < 0 || this.bird.y > 490)
            this.restartGame();
    },

    jump:function(){
        this.bird.body.velocity.y = -350;
    },

    restartGame:function(){
        game.state.start('main');
    },

    render:function(){
        //game.debug.bodyInfo(sprite1, 32, 32);
        //game.debug.body(sprite1);
        game.debug.body(this.bird);
        game.debug.body(this.ground);
    }
};
