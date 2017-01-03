/**
 * Created by tuynu on 12/28/2016.
 */
var game;
var gameOptions = {
    width: 800,
    height: 400,
    numberTilesOfPipe:8,
    pipeSize:60
};

window.onload = function(){
    game = new Phaser.Game(gameOptions.width, gameOptions.height);
    game.state.add('main', mainState);
    game.state. start('main');
}

var mainState = {
    line1Color:0xffffff,
    line2Color:0xFF1100,
    line3Color:0x149900,
    reg:{},
    create:function() {
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        ///// circle /////
        var circle = game.add.graphics(game.width/2 - 100, game.height/2);
        circle.lineStyle(0);
        circle.beginFill(0xFFFF0B, 1);
        circle.drawCircle(0, 0, 20);
        circle.endFill();

        ///// circle /////
        var circle2 = game.add.graphics(game.width/2 + 100, game.height/2);
        circle2.lineStyle(0);
        circle2.beginFill(0xFFFF0B, 1);
        circle2.drawCircle(0, 0, 20);
        circle2.endFill();

        /// line ///
        var startLine = game.add.graphics(0, 0);
        startLine.beginFill(this.line1Color);
        startLine.lineStyle(2, this.line1Color, 1);
        startLine.moveTo(-100, game.height/ 2 -1);
        startLine.lineTo(game.width/2 - 100, game.height/2 -1);
        startLine.endFill();


        //// line ////
        var middleLine = game.add.graphics(0, 0);
        middleLine.beginFill(this.line2Color);
        middleLine.lineStyle(2, this.line2Color, 1);
        middleLine.moveTo(game.width/2-90, game.height/2-1);
        middleLine.lineTo(game.width/2+100, game.height/2-1);
        middleLine.endFill();

        //// end line ////
        var endLine = game.add.graphics(0, 0);
        endLine.beginFill(this.line3Color);
        endLine.lineStyle(2, this.line3Color, 1);
        endLine.moveTo(game.width/2+100+10, game.height/2-1);
        endLine.lineTo(game.width + 100, game.height/2-1);
        endLine.endFill();

        this.reg.circle1 = circle;
        this.reg.circle2 = circle2;
        this.reg.line1 = startLine;
        this.reg.line2 = middleLine;
        this.reg.line3 = endLine;

        this.moveRandomly(this);

    },
    moveCircle:function(item, item2, x, y, x2, y2, that){
        item.initialX = item.x;
        item.initialY = item.y;
        item2.initialX = item2.x;
        item2.initialY = item2.y;
        var tween = this.tweenProperty(item, "xy",
            {x:x, y:y}, 1200, 0, Phaser.Easing.Back.InOut);
        var tween2 = this.tweenProperty(item2, "xy",
            {x:x2, y:y2}, 1200, 0, Phaser.Easing.Back.InOut);
        tween.chain(tween2);
        tween.onUpdateCallback(function(twn, percent, twnData){
            that.redraw(percent, that.reg.line1, [item.initialX-10, x-10], [item.initialY,y], -100, game.height/ 2 -1, that.line1Color);
            that.redrawBoth(percent, that.reg.line2, [item2.initialX-10, x2-10], [item2.initialY,y2], [item.initialX+10, x+10], [item.initialY,y], that.line2Color);
            that.redraw2(percent, that.reg.line3, [item2.initialX+10, x2+10], [item2.initialY,y2], game.width + 100, game.height/ 2 -1, that.line3Color);
        });
        tween.onComplete.addOnce(function(){
            that.moveRandomly(that);
        });
    },
    redraw:function(percent, dataObj, rangeX, rangeY, startPointX, startPointY, color){
        dataObj.clear();
        dataObj.beginFill(color);
        dataObj.lineStyle(2, color, 1);
        dataObj.moveTo(startPointX, startPointY);
        var x = Phaser.Math.linearInterpolation(rangeX, percent);
        var y = Phaser.Math.linearInterpolation(rangeY, percent);
        dataObj.lineTo(x,y);
        dataObj.endFill();

    },
    redraw2:function(percent, dataObj, rangeX, rangeY, startPointX, startPointY, color){
        dataObj.clear();
        dataObj.beginFill(color);
        dataObj.lineStyle(2, color, 1);
        dataObj.moveTo(startPointX, startPointY);
        var x = Phaser.Math.linearInterpolation(rangeX, percent);
        var y = Phaser.Math.linearInterpolation(rangeY, percent);
        dataObj.lineTo(x,y);
        dataObj.endFill();

    },
    redrawBoth:function(percent, dataObj, rangeX, rangeY, startPointX, startPointY, color){
        dataObj.clear();
        dataObj.beginFill(color);
        dataObj.lineStyle(2, color, 1);
        var x = Phaser.Math.linearInterpolation(startPointX, percent);
        var y = Phaser.Math.linearInterpolation(startPointY, percent);
        dataObj.moveTo(x, y);
        x = Phaser.Math.linearInterpolation(rangeX, percent);
        y = Phaser.Math.linearInterpolation(rangeY, percent);
        dataObj.lineTo(x,y);
        dataObj.endFill();

    },
    tweenProperty:function(item, property, obj, duration, delay, easing, yoyo, repeat, reverse){
        delay = delay || {};
        easing = easing || Phaser.Easing.Linear.None;
        yoyo = yoyo || false;
        repeat = repeat || 0;

        var tween = game.add.tween(item).to(obj, duration, easing, true, delay, repeat, yoyo);
        tween.reverse = reverse || false;
        return tween;
    },
    moveRandomly:function(that){
        var x = game.rnd.integerInRange(game.width/2-100, game.width/2+100);
        var y = game.rnd.integerInRange(game.height/2-100, game.height/2+120);
        var x2 = game.rnd.integerInRange(game.width/2-100, game.width/2+100);
        var y2 = game.rnd.integerInRange(game.height/2-100, game.height/2+120);
        this.moveCircle(that.reg.circle1,that.reg.circle2,x,y,x2,y2,that);
    }
};
