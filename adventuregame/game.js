/**
 * Created by tuynu on 12/28/2016.
 */
var game;
var gameOptions = {
    width: 500,
    height: 200,
};

window.onload = function(){
    game = new Phaser.Game(gameOptions.width, gameOptions.height);
    game.state.add('main', mainState);
    game.state. start('main');
}

var mainState = {
    preload:function(){
        game.load.image('player', 'assets/player.png');
        game.load.image('wall', 'assets/wall.png');
        game.load.image('coin', 'assets/coin.png');
        game.load.image('enemy', 'assets/enemy.png');
    },

    create:function() {
        game.stage.backgroundColor = "#3598db";
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.world.enableBody = true;

        this.cursor = game.input.keyboard.createCursorKeys();
        this.player = game.add.sprite(70,100, 'player');
        this.player.body.gravity.y = 600;

        this.walls = game.add.group();
        this.coins = game.add.group();
        this.enemies = game.add.group();

        //design thelevel x=wall, o=coin; !=lava
        var level = [
            'xxxxxxxxxxxxxxxxxxxxxx',
            '!         !          x',
            '!                 o  x',
            '!         o          x',
            '!                    x',
            '!     o   !    x     x',
            'xxxxxxxxxxxxxxxx!!!!!x',
        ];

        for(var i = 0; i < level.length; i++){
            for(var j = 0; j < level[i].length; j++){
                var x = 30+20*j;
                var y = 30+20*i;
                if(level[i][j] == 'x'){
                    var wall = game.add.sprite(x,y,'wall');
                    this.walls.add(wall);
                    wall.body.immovable = true;
                }else if(level[i][j] == 'o'){
                    var coin = game.add.sprite(x,y,'coin');
                    this.coins.add(coin);
                }else if(level[i][j] == '!'){
                    var enemy = game.add.sprite(x,y,'enemy');
                    this.enemies.add(enemy);
                }
            }
        }

    },

    update: function(){
        if(this.cursor.left.isDown)
            this.player.body.velocity.x = -200;
        else if(this.cursor.right.isDown)
            this.player.body.velocity.x = 200;
        else
            this.player.body.velocity.x = 0;


        game.physics.arcade.collide(this.player, this.walls);
        game.physics.arcade.overlap(this.player, this.coins, this.takeCoin, null, this);
        game.physics.arcade.overlap(this.player, this.enemies, this.restart, null, this);

        if (
            this.cursor.up.isDown
            &&
            this.player.body.touching.down
        ) {
            this.player.body.velocity.y = -250;
            //this.player.body.gravity.y = 2;
            console.log("baca");
        }

    },
    takeCoin:function(player,coin){
        coin.kill();
    },
    restart:function(){
        game.state.start('main');
    },
};
