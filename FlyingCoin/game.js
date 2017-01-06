/**
 * Created by tuynu on 12/28/2016.
 */
var game;
var gameOptions = {
    width: 1600,
    height: 900,
    numberTilesOfPipe:8,
    pipeSize:60,
    from:{x:10,y:10},
    to:{x:500,y:500}
};

window.onload = function(){
    game = new Phaser.Game(gameOptions.width, gameOptions.height);
    game.state.add('main', mainState);
    game.state. start('main');
}

var mainState = {
    groupCoinAnimation:null,
    isDestroy:false,
    arrayOfCoinAnimation:[],
    arrayPointCalculated:{},
    preload: function(){
        game.load.spritesheet(
            'coin-rotation', 'assets/coin-animation.png', 49, 49, 12
        );
        game.load.image("flare", "assets/Flare.png");
    },
    create:function() {

        var circle = game.add.graphics(game.width/2 - 100, game.height/2);
        circle.lineStyle(0);
        circle.beginFill(0xFFFF0B, 1);
        circle.drawCircle(0, 0, 100);
        circle.endFill();

        circle.inputEnabled = true;

        var group = game.add.group();
        circle.events.onInputDown.add(function(){
            this.createCoinAnimation(this,/*from*/gameOptions.from,/*to*/gameOptions.to,/*duration*/3000,/*#Coin*/10,/*callback*/function(){
            },/*parent*/group);
        }, this);

        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;


    },

    createPartical:function(that,pointer) {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.stage.backgroundColor = 0x337799;
        var emitter = game.add.emitter(0, 0, 100);
        //emitter.scale.setTo(0.1);
        emitter.blendMode = PIXI.blendModes.ADD;
        emitter.makeParticles('flare');
        emitter.gravity = 200;

        that.particleBurst(that,pointer,emitter);

    },
    particleBurst:function(that,pointer,emitter) {
        emitter.x = pointer.x;
        emitter.y = pointer.y;
        emitter.gravity = 0;
        emitter.minParticleSpeed.set(-50, -50);
        emitter.maxParticleSpeed.set(50, 50);
        emitter.setAlpha(0.3, 0.8);
        emitter.setScale(0.1, 0.5, 0.1, 0.5);
        emitter.start(/*explode*/true , /*lifespan*/300, /*frequency*/null,/*quantity*/20,/*forceQuantitytrue*/null);
        //  And 2 seconds later we'll destroy the emitter
        game.time.events.add(300, function(){that.destroyEmitter(emitter)}, this);
    },
    destroyEmitter:function(emitter) {
        emitter.destroy();
    },



    /**
     * create and run coin animation
     * @param from   : start position of coin
     * @param to     : destination of coin
     * @param durationEachCoin   : in milisecond
     * @param numberOfCoin
     * @param callback    : call when finish animation, can be null
     * @param parent    : don't use
     */
    createCoinAnimation: function (
        that,from, to,durationEachCoin, numberOfCoin, callback,parent) {
        this.isDestroy = false;
        if(Lobby.Utils.objectIsNull(this.groupCoinAnimation)) {
            this.groupCoinAnimation = game.add.group();
        }
        this.groupCoinAnimation.visible = true;
        game.world.bringToTop(this.groupCoinAnimation);
        //if(Lobby.Utils.objectNotNull(parent)) {
        //    parent.add(groupCoinAnimation);
        //}

        if(Lobby.Utils.objectIsNull(durationEachCoin)){
            durationEachCoin = 1000;
        }
        if(Lobby.Utils.objectIsNull(numberOfCoin)){
            numberOfCoin = 10;
        }

        var numberOfCoinComplete = 0;

        var numberOfCoinStartAnimating = 0;

        var animationOneCoin = function(){
            that.animationOneCoin(that,from,to,durationEachCoin,parent,function(){
                numberOfCoinComplete++;
                if(numberOfCoinComplete === numberOfCoin){
                    if(Lobby.Utils.objectNotNull(callback)){
                        //my._soundCoinAnimation.stop();
                        //ManagerForSound.play(my,'animation-receive-coin');
                        callback();
                    }
                }
            });
        };
        animationOneCoin();
        var time4Rotating = game.time.events.loop(
            200,
            function () {
                numberOfCoinStartAnimating++;
                if(numberOfCoinStartAnimating >= numberOfCoin){
                    Lobby.Utils.clearTimer(game,time4Rotating);
                    //my.time.events.remove(time4Rotating);
                }
                animationOneCoin();

            },this);
    },

    /**
     * animation flying crown
     * @param from    start position
     * @param to      destination position
     * @param callback    callback when finish animation
     * @param parent      Deprecated
     */
    createCrownAnimation : function(from, to, callback,parent) {
        this.isDestroy = false;
        if(Lobby.Utils.objectIsNull(this.groupCoinAnimation)) {
            this.groupCoinAnimation = game.add.group();
        }
        this.groupCoinAnimation.visible = true;
        game.world.bringToTop(this.groupCoinAnimation);
        //if(Lobby.Utils.objectNotNull(parent)) {
        //    parent.add(groupCoinAnimation);
        //}

        var  durationEachCoin = 1000;
        var numberOfCoin = 10;


        var numberOfCrownComplete = 0;

        var numberOfCrownStartAnimating = 0;
        var arraySize = [0.75, 0.9 , 0.5];
        var arrayTime = [133, 111, 200];
        var createOneCrown = function(callbackC){
            var crownSprite = game.add.sprite(0,0,"popup-shop-crown_icon", null, groupCoinAnimation);
            crownSprite.anchor.setTo(0.5);
            var ramdomSizeValue = arraySize[numberOfCrownStartAnimating % 3];
            crownSprite.scale.setTo(ramdomSizeValue*(100/70)*LobbyConfig.scaleRatioEntireGame);// reduce image resolution 70%

            var delayRatioDuration = 1;
            crownSprite.position = {x: from.x, y: from.y};
            var tween = game.add.tween(crownSprite.position).to({
                x: [from.x + (to.x - from.x) / 3, from.x + (to.x - from.x) *2 / 3, to.x],
                y: [from.y + (to.y - from.y) / 3, from.y + (to.x - from.y) *2 / 3, to.y],
            }, durationEachCoin*delayRatioDuration, Phaser.Easing.Quadratic.Out, true).interpolation(function (v, k) {
                return Phaser.Math.bezierInterpolation(v, k);
            });

            tween.onComplete.add(function (){
                if(Lobby.Utils.objectNotNull(callbackC)){
                    callbackC();
                    crownSprite.visible = false;
                }
            }, game);
        };

        /**
         * animation flying one coin
         */
        //my.playAnimationCoinSound();
        var animationOneCoin = function(){
            createOneCrown(function(){
                numberOfCrownComplete++;
                if(numberOfCrownComplete == numberOfCoin){
                    if(Lobby.Utils.objectNotNull(callback)){
                        callback();
                    }
                }
            });
        };
        animationOneCoin();
        var time4Rotating = game.time.events.loop(
            arrayTime[numberOfCrownStartAnimating % 3],
            function () {
                numberOfCrownStartAnimating++;
                if(numberOfCrownStartAnimating >= numberOfCoin){
                    Lobby.Utils.clearTimer(my,time4Rotating);
                    //my.time.events.remove(time4Rotating);
                }
                animationOneCoin();
            },this);

    },

    /**
     * flying one coin animation
     * @param from     start world position of coin
     * @param to        world destination of coin
     * @param duration    in milisecond
     * @param parent      deprecated
     * @param callback   callback when finish coin animation, can be null
     */
    animationOneCoin :function (that,from,to,duration,parent,callback) {
        if(this.isDestroy){
            return;
        }
        var start = {
            x: from.x,//LobbyConfig.width / 2 + 30,
            y: from.y + 30,//LobbyConfig.height - 120,
            timeAnimation: duration
        };

        var end = {
            x: to.x,//LobbyConfig.width / 2 - 280,
            y: to.y//45
        };

        var coinAnimation = null;

        var i = this.arrayOfCoinAnimation.length; while (i--) {
            var coin = this.arrayOfCoinAnimation[i];
            if(coin.visible === false){
                coinAnimation = coin;
                break;
            }
        }
        //for(var i = 0; i < arrayOfCoinAnimation.length; i++){
        //}

        if(coinAnimation == null) {
            coinAnimation = game.add.sprite(0, 0, "coin-rotation", null, this.groupCoinAnimation);
            coinAnimation.scale.setTo((100/70)*LobbyConfig.scaleRatioEntireGame);// reduce image resolution 70%
            coinAnimation.animations.add('coin-animation');
            coinAnimation.animations.play('coin-animation', 25, true, false);
            coinAnimation.anchor = {
                x: 0.5,
                y: 0.5
            };
            this.arrayOfCoinAnimation.push(coinAnimation);
        }else{
            coinAnimation.animations.play('coin-animation', 25, true, false);
            this.groupCoinAnimation.add(coinAnimation);
        }



        if(Lobby.Utils.objectNotNull(parent)) {
            //from.x+=parent.world.x;
            //from.y+=parent.world.y;
            //to.x+=parent.world.x;
            //to.y+=parent.world.y;
            //parent.add(coinAnimation);
        }


        start.x = Lobby.Utils.floatToIntOptimize(start.x);
        start.y = Lobby.Utils.floatToIntOptimize(start.y);
        end.x = Lobby.Utils.floatToIntOptimize(end.x);
        end.y = Lobby.Utils.floatToIntOptimize(end.y);

        coinAnimation.visible = true;
        coinAnimation.position = {
            x: start.x,
            y: start.y
        };


        //my.add.tween(coinAnimation.position).to(end, 2400, Phaser.Easing.Cubic.In, true);

        var delayRatioDuration = 1;


        var listGoodPoint = this.arrayPointCalculated[start.x+"_"+start.y+"_"];
        if(Lobby.Utils.objectIsNull(listGoodPoint)){
            listGoodPoint = this.getGoodControlPointBenzierCurve(end,start, this.DistanceBetween2Point(start, end)/2, [0.75, 0.25]);
            this.arrayPointCalculated[start.x+"_"+start.y+"_"] = listGoodPoint;
        }

        var tween = game.add.tween(coinAnimation.position).to({
            x: [start.x, listGoodPoint[0].x, listGoodPoint[1].x, end.x],
            y: [start.y, listGoodPoint[0].y, listGoodPoint[1].y, end.y],
        }, duration*delayRatioDuration, Phaser.Easing.Quadratic.Out, true).interpolation(function (v, k) {
            return Phaser.Math.bezierInterpolation(v, k);
        });

        tween.onComplete.add(function (){
            if(Lobby.Utils.objectNotNull(callback)){
                that.createPartical(this,gameOptions.to);
                callback();
                coinAnimation.visible = false;
            }
        }, this);


    },

    /**
     * heristic array of middle control point of bezier curve
     * @param pointA    control point start
     * @param pointB    control point end
     * @param distance   distance between A & B
     * @param ratioPositionFromA2B      array contain ratio between distance A to control point i and distance from control point i to B
     * @returns {Array}
     */
    getGoodControlPointBenzierCurve : function(pointA, pointB, distance, ratioPositionFromA2B) {
        var result = {x:0,y:0};

        var AB = {x:pointB.x - pointA.x, y:pointB.y - pointA.y};

        //angle in radians
        var angleX = this.getAngleXBetween3Point({x:0, y:0}, AB, {x:0, y:1});

        angleX = AB.x > 0 ? (360- angleX) : angleX;

        result = {x:-1* distance, y:0* distance} ;
        result = this.rotate_point(result.x, result.y, 0,0, angleX);

        var resultList = new Array();
        var centerList = new Array();
        for (var i = 0; i < ratioPositionFromA2B.length; i++)
        {
            if(ratioPositionFromA2B[i] == 0){
                centerList[i] = pointA;
            }else{
                centerList[i] = {x:((pointB.x - pointA.x) * ratioPositionFromA2B[i] + pointA.x),
                    y:((pointB.y - pointA.y) * ratioPositionFromA2B[i] + pointA.y)}
            }

            resultList[i] = {x:result.x + centerList[i].x,y:result.y + centerList[i].y};
        }

        return resultList;
    },

    /**
     * get angle p2p1p3
     * @param p1     center
     * @param p2     top
     * @param p3      top
     * @returns {number}
     */
    getAngleXBetween3Point : function(p1, p2, p3){
        //var p1={
        //    x:0,
        //    y:0
        //};
        //
        //var p2={
        //    x:0,
        //    y:1
        //};
        //
        //var p3={
        //    x:-1,
        //    y:1
        //};

        var p12 = Math.sqrt(Math.pow((p1.x - p2.x),2) + Math.pow((p1.y - p2.y),2));
        var p13 = Math.sqrt(Math.pow((p1.x - p3.x),2) + Math.pow((p1.y - p3.y),2));
        var p23 = Math.sqrt(Math.pow((p2.x - p3.x),2) + Math.pow((p2.y - p3.y),2));

    //angle in radians
        var resultRadian = Math.acos(((Math.pow(p12, 2)) + (Math.pow(p13, 2)) - (Math.pow(p23, 2))) / (2 * p12 * p13));

    //angle in degrees
        var resultDegree = Math.acos(((Math.pow(p12, 2)) + (Math.pow(p13, 2)) - (Math.pow(p23, 2))) / (2 * p12 * p13)) * 180 / Math.PI;
        return resultDegree;
    },

    /**
     * rotate point(pointX,pointY) around origin(originX,originY) angle
     * @param pointX
     * @param pointY
     * @param originX
     * @param originY
     * @param angle       rotate angle
     * @returns {{x: *, y: *}}
     */
    rotate_point : function(pointX, pointY, originX, originY, angle) {
        angle = angle * Math.PI / 180.0;
        return {
            x: Math.cos(angle) * (pointX-originX) - Math.sin(angle) * (pointY-originY) + originX,
            y: Math.sin(angle) * (pointX-originX) + Math.cos(angle) * (pointY-originY) + originY
        };
    },

    /**
     * get distance between p1 and p2
     * @param p1
     * @param p2
     * @returns {number}
     * @constructor
     */
    DistanceBetween2Point : function(p1,p2){
        var a = p1.x - p2.x;
        var b = p1.y - p2.y;

        var s = Math.sqrt( a*a + b*b );
        return s;
    }
};
