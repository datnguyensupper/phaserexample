/**
 * Created by tuynu on 12/28/2016.
 */
var game;
var gameOptions = {
    width: 400,
    height: 490,
    numberTilesOfPipe:8,
    pipeSize:60,
    backgroundColor:'#71c5cf'
};

window.onload = function(){
    game = new Phaser.Game(gameOptions.width, gameOptions.height);
    game.state.add('main', mainState);
    game.state. start('main');
}

var mainState = {
    preload:function(){
        //load the bird
        game.load.image('bird', 'assets/bird.png');
        game.load.image('pipe', 'assets/pipe.png');
        game.load.audio('jump', 'assets/jump.wav');
    },

    create:function() {
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.jumpSound = game.add.audio('jump');
        game.stage.backgroundColor = gameOptions.backgroundColor;
        game.physics.startSystem(Phaser.Physics.ARCADE);
        this.bird = game.add.sprite(100, 245, 'bird');
        this.bird.anchor.setTo(-0.2, 0.5);
        game.physics.arcade.enable(this.bird);
        this.bird.body.gravity.y = 1000;
        var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.jump,this);

        //this.ground = game.add.sprite(0, 390);
        //game.physics.arcade.enable(this.ground);
        //this.ground.body.setSize(150, 20, 0, 0);
        //this.ground.body.immovable = true;
        this.pipes = game.add.group();

        this.timer = game.time.events.loop(
            1500, this.addRowOfPipes, this
        );

        this.score = 0;
        this.labelScore = game.add.text(20, 20, "0",
            {font : "30px Arial", fill: "#ffffff"});
    },

    update: function(){

        //game.physics.arcade.collide(this.bird, this.ground);
        //game.physics.arcade.overlap(this.bird, this.pipes, this.restartGame, null, this);
        game.physics.arcade.overlap(this.bird, this.pipes, this.hitPipe, null, this);
        //console.log(this.bird.y);
        if(this.bird.y < 0 || this.bird.y > 490)
            this.restartGame();

        if(this.bird.angle < 20){
            this.bird.angle += 1;
        }
    },

    hitPipe: function(){
        if(this.bird.alive == false) return;

        this.bird.alive = false;
        game.time.events.remove(this.timer);
        this.pipes.forEach(function(p){
            p.body.velocity.x = 0;
        }, this);
    },

    jump:function(){
        if(this.bird.alive == false) return;

        this.jumpSound.play();
        this.bird.body.velocity.y = -350;
        game.add.tween(this.bird).to({angle:-20}, 100).start();
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

    addRowOfPipes:function(){
        this.score += 1;
        this.labelScore.text = this.score;

        //random from 1->5
        var hole = Math.floor(Math.random()*5) + 1;
        for(var i = 0; i < gameOptions.numberTilesOfPipe; i++) {
            if (i != hole && i != hole + 1) this.addOnePipe(400, i*gameOptions.pipeSize + 10);
        }

    },

    addOnePipe: function(x, y){
        var pipe = game.add.sprite(x, y, 'pipe');
        this.pipes.add(pipe);
        game.physics.arcade.enable(pipe);
        pipe.body.velocity.x = -200;

        // Automatically kill the pipe when its' no longer visible
        pipe.checkWorldBounds = true;
        pipe.outOfBoundsKill = true;
    },
};
