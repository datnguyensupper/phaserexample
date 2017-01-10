/**
 * Created by tuynu on 1/9/2017.
 */
'use strict';

Phaser.Plugin.Juicy = function(t) {
    Phaser.Plugin.call(this, t),
        this._boundsCache = Phaser.Utils.extend(!1, {}, this.game.world.bounds),
        this._shakeWorldMax = 20,
        this._shakeWorldTime = 0,
        this._trailCounter = 0,
        this._overScales = {},
        this._overScalesCounter = 0
}
    ,
    Phaser.Plugin.Juicy.prototype = Object.create(Phaser.Plugin.prototype),
    Phaser.Plugin.Juicy.prototype.constructor = Phaser.Plugin.Juicy,
    Phaser.Plugin.Juicy.ScreenFlash = function(t, e) {
        e = e || "white";
        var i = t.add.bitmapData(t.width, t.height);
        i.ctx.fillStyle = e,
            i.ctx.fillRect(0, 0, t.width, t.height),
            Phaser.Sprite.call(this, t, 0, 0, i),
            this.alpha = 0
    }
    ,
    Phaser.Plugin.Juicy.ScreenFlash.prototype = Object.create(Phaser.Sprite.prototype),
    Phaser.Plugin.Juicy.ScreenFlash.prototype.constructor = Phaser.Plugin.Juicy.ScreenFlash,
    Phaser.Plugin.Juicy.ScreenFlash.prototype.flash = function(t, e) {
        t = t || 1,
            e = e || 100;
        var i = this.game.add.tween(this).to({
            alpha: t
        }, 100, Phaser.Easing.Bounce.InOut, !0, 0, 0, !0);
        i.onComplete.add(function() {
            this.alpha = 0
        }, this)
    }
    ,
    Phaser.Plugin.Juicy.Trail = function(t, e, i) {
        Phaser.Graphics.call(this, t, 0, 0),
            this.target = null,
            this.trailLength = e || 100,
            this.trailWidth = 15,
            this.trailScaling = !1,
            this.trailColor = i || 16777215,
            this._segments = [],
            this._verts = [],
            this._indices = []
    }
    ,
    Phaser.Plugin.Juicy.Trail.prototype = Object.create(Phaser.Graphics.prototype),
    Phaser.Plugin.Juicy.Trail.prototype.constructor = Phaser.Plugin.Juicy.Trail,
    Phaser.Plugin.Juicy.Trail.prototype.update = function() {
        this.target && (this.x = this.target.x,
            this.y = this.target.y,
            this.addSegment(this.target.x, this.target.y),
            this.redrawSegments(this.target.x, this.target.y))
    }
    ,
    Phaser.Plugin.Juicy.Trail.prototype.addSegment = function(t, e) {
        for (var i; this._segments.length > this.trailLength; )
            i = this._segments.shift();
        i || (i = new Phaser.Point),
            i.x = t,
            i.y = e,
            this._segments.push(i)
    }
    ,
    Phaser.Plugin.Juicy.Trail.prototype.redrawSegments = function(t, e) {
        this.clear();
        var i, s, n, r, o = 0, a = 0, h = 0;
        this._verts.length !== 4 * (this._segments.length - 1) && (this._verts = []);
        for (var l = 0; l < this._segments.length; ++l) {
            if (i = this._segments[l],
                    s) {
                r = Math.atan2(i.y - s.y, i.x - s.x) + Math.PI / 2,
                    a = Math.sin(r),
                    h = Math.cos(r);
                for (var c = 0; 2 > c; ++c)
                    n = (-.5 + c / 1) * this.trailWidth,
                    this.trailScaling && (n *= l / this._segments.length),
                        this._verts[o++] = i.x + h * n - t,
                        this._verts[o++] = i.y + a * n - e
            }
            s = i.copyTo({})
        }
        if (this._verts.length >= 8) {
            for (var u = 0; u < this._verts.length; u++)
                this._indices[6 * u + 0] = 2 * u + 0,
                    this._indices[6 * u + 1] = 2 * u + 1,
                    this._indices[6 * u + 2] = 2 * u + 2,
                    this._indices[6 * u + 3] = 2 * u + 1,
                    this._indices[6 * u + 4] = 2 * u + 2,
                    this._indices[6 * u + 5] = 2 * u + 3;
            this.beginFill(this.trailColor),
                this.drawTriangles(this._verts, this._indices),
                this.endFill()
        }
    }
    ,
    Phaser.Plugin.Juicy.prototype.shake = function(t, e) {
        this._shakeWorldTime = t || 20,
            this._shakeWorldMax = e || 20,
            this.game.world.setBounds(this._boundsCache.x - this._shakeWorldMax, this._boundsCache.y - this._shakeWorldMax, this._boundsCache.width + this._shakeWorldMax, this._boundsCache.height + this._shakeWorldMax)
    }
    ,
    Phaser.Plugin.Juicy.prototype.createScreenFlash = function(t) {
        return new Phaser.Plugin.Juicy.ScreenFlash(this.game,t)
    }
    ,
    Phaser.Plugin.Juicy.prototype.createTrail = function(t, e) {
        return new Phaser.Plugin.Juicy.Trail(this.game,t,e)
    }
    ,
    Phaser.Plugin.Juicy.prototype.overScale = function(t, e, i) {
        e = e || 1.5;
        var s = this._overScalesCounter++;
        i = i || new Phaser.Point(1,1);
        var n = this._overScales[s];
        n || (n = {
            object: t,
            cache: i.copyTo({})
        }),
            n.scale = e,
            this._overScales[s] = n
    }
    ,
    Phaser.Plugin.Juicy.prototype.jelly = function(t, e, i, s) {
        e = e || .2,
            i = i || 0,
            s = s || new Phaser.Point(1,1),
            this.game.add.tween(t.scale).to({
                x: s.x + s.x * e
            }, 50, Phaser.Easing.Quadratic.InOut, !0, i).to({
                x: s.x
            }, 600, Phaser.Easing.Elastic.Out, !0),
            this.game.add.tween(t.scale).to({
                y: s.y + s.y * e
            }, 50, Phaser.Easing.Quadratic.InOut, !0, i + 50).to({
                y: s.y
            }, 600, Phaser.Easing.Elastic.Out, !0)
    }
    ,
    Phaser.Plugin.Juicy.prototype.mouseStretch = function(t, e, i) {
        e = e || .5,
            i = i || new Phaser.Point(1,1),
            t.scale.x = i.x + Math.abs(t.x - this.game.input.activePointer.x) / 100 * e,
            t.scale.y = i.y + i.y * e - t.scale.x * e
    }
    ,
    Phaser.Plugin.Juicy.prototype.update = function() {
        var t;
        if (this._shakeWorldTime > 0) {
            var e = this._shakeWorldTime / this._shakeWorldMax * this._shakeWorldMax
                , i = this.game.rnd.integerInRange(-e, e)
                , s = this.game.rnd.integerInRange(-e, e);
            this.game.camera.x = i,
                this.game.camera.y = s,
                this._shakeWorldTime--,
            this._shakeWorldTime <= 0 && this.game.world.setBounds(this._boundsCache.x, this._boundsCache.x, this._boundsCache.width, this._boundsCache.height)
        }
        for (var n in this._overScales)
            this._overScales.hasOwnProperty(n) && (t = this._overScales[n],
                t.scale > .01 ? (t.object.scale.x = t.scale * t.cache.x,
                    t.object.scale.y = t.scale * t.cache.y,
                    t.scale -= this.game.time.elapsed * t.scale * .35) : (t.object.scale.x = t.cache.x,
                    t.object.scale.y = t.cache.y,
                    delete this._overScales[n]))
    };