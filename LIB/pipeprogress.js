/**
 * Created by tuynu on 1/9/2017.
 */
'user strict';

var PieProgress = function(t, e, i, s, n, r) {
    this._radius = s,
        this._progress = 1,
        this.bmp = t.add.bitmapData(2 * s, 2 * s),
        Phaser.Sprite.call(this, t, e, i, this.bmp),
        this.anchor.set(.5),
        this.angle = r || -90,
        this.color = n || "#fff",
        this.updateProgress()
};
PieProgress.prototype = Object.create(Phaser.Sprite.prototype),
    PieProgress.prototype.constructor = PieProgress,
    PieProgress.prototype.updateProgress = function() {
        var t = this._progress;
        t = Phaser.Math.clamp(t, 1e-5, .99999),
            this.bmp.clear(),
            this.bmp.ctx.fillStyle = this.color,
            this.bmp.ctx.beginPath(),
            this.bmp.ctx.arc(this._radius, this._radius, this._radius, 0, 2 * Math.PI * t, !0),
            this.bmp.ctx.lineTo(this._radius, this._radius),
            this.bmp.ctx.closePath(),
            this.bmp.ctx.fill(),
            this.bmp.dirty = !0
    }
    ,
    Object.defineProperty(PieProgress.prototype, "radius", {
        get: function() {
            return this._radius
        },
        set: function(t) {
            this._radius = t > 0 ? t : 0,
                this.bmp.resize(2 * this._radius, 2 * this._radius),
                this.updateProgress()
        }
    }),
    Object.defineProperty(PieProgress.prototype, "progress", {
        get: function() {
            return this._progress
        },
        set: function(t) {
            this._progress = Phaser.Math.clamp(t, 0, 1),
                this.updateProgress()
        }
    }),
    function(t) {
        "use strict";
        var e = -7 * (Math.PI / 8)
            , i = -1 * (Math.PI / 8)
            , s = Math.PI / 8
            , n = 7 * (Math.PI / 8)
            , r = -3 * (Math.PI / 8)
            , o = 3 * (Math.PI / 8)
            , a = 5 * (Math.PI / 8)
            , h = -5 * (Math.PI / 8);
        t.Plugin.VirtualGamepad = function(e, i) {
            t.Plugin.call(this, e, i),
                this.input = this.game.input,
                this.joystick = null,
                this.joystickPad = null,
                this.joystickPoint = null,
                this.joystickRadius = null,
                this.joystickPointer = null,
                this.button = null,
                this.buttonPoint = null,
                this.buttonRadius = null,
                this.preUpdate = l.bind(this)
        }
            ,
            t.Plugin.VirtualGamepad.prototype = Object.create(t.Plugin.prototype),
            t.Plugin.VirtualGamepad.prototype.constructor = t.Plugin.VirtualGamepad,
            t.Plugin.VirtualGamepad.prototype.addJoystick = function(e, i, s) {
                return null !== this.joystick ? null : (this.joystick = this.game.add.sprite(e, i, "gamepad"),
                    this.joystick.alpha = .9,
                    this.joystick.frame = 2,
                    this.joystick.anchor.set(.5),
                    this.joystick.fixedToCamera = !0,
                    this.joystick.scale.setTo(s, s),
                    this.joystickPad = this.game.add.sprite(e, i, "gamepad"),
                    this.joystickPad.alpha = .9,
                    this.joystickPad.frame = 1,
                    this.joystickPad.anchor.set(.5),
                    this.joystickPad.fixedToCamera = !0,
                    this.joystickPad.scale.setTo(s, s),
                    this.joystickPoint = new t.Point(e,i),
                    this.joystick.properties = {
                        inUse: !1,
                        up: !1,
                        down: !1,
                        left: !1,
                        right: !1,
                        x: 0,
                        y: 0,
                        distance: 0,
                        angle: 0,
                        rotation: 0
                    },
                    this.joystickRadius = s * (this.joystick.width / 2),
                    this.joystick)
            }
            ,
            t.Plugin.VirtualGamepad.prototype.addButton = function(e, i, s, n) {
                return null !== this.button ? null : (this.button = this.game.add.button(e, i, n, null, this),
                    this.button.alpha = .9,
                    this.button.anchor.set(.5),
                    this.button.fixedToCamera = !0,
                    this.button.scale.setTo(s, s),
                    this.buttonPoint = new t.Point(e,i),
                    this.button.isDown = !1,
                    this.buttonRadius = s * (this.button.width / 2),
                    this.button)
            }
        ;
        var l = function() {
            var t = !0;
            this.button && (this.button.isDown = !1,
                this.button.frame = 0),
                this.game.input.pointers.forEach(function(e) {
                    t = c(e, this)
                }, this),
                t = c(this.game.input.mousePointer, this),
            t && (null === this.joystickPointer || this.joystickPointer.isUp) && (u(this.joystickPoint, this),
                this.joystick.properties.inUse = !1,
                this.joystickPointer = null)
        }
            , c = function(t, e) {
            var i = !0
                , s = e.joystickPoint.distance(t.position);
            return t.isDown && (t === e.joystickPointer || s < e.joystickRadius) && (i = !1,
                e.joystick.properties.inUse = !0,
                e.joystickPointer = t,
                u(t.position, e)),
                s = e.buttonPoint.distance(t.position),
            t.isDown && s < e.buttonRadius && (e.button.isDown = !0,
                e.button.frame = 3),
                i
        }
            , u = function(t, l) {
            var c = t.x - l.joystickPoint.x
                , u = t.y - l.joystickPoint.y
                , d = l.joystickPoint.angle(t);
            l.joystickPoint.distance(t) > l.joystickRadius && (c = 0 === c ? 0 : Math.cos(d) * l.joystickRadius,
                u = 0 === u ? 0 : Math.sin(d) * l.joystickRadius),
                l.joystick.properties.x = parseInt(c / l.joystickRadius * 100, 10),
                l.joystick.properties.y = parseInt(u / l.joystickRadius * 100, 10),
                l.joystick.properties.rotation = d,
                l.joystick.properties.angle = 180 / Math.PI * d,
                l.joystick.properties.distance = parseInt(l.joystickPoint.distance(t) / l.joystickRadius * 100, 10),
                l.joystick.properties.up = d > e && i >= d,
                l.joystick.properties.down = d > s && n >= d,
                l.joystick.properties.right = d > r && o >= d,
                l.joystick.properties.left = d > a || h >= d,
            0 === l.joystick.properties.x && 0 === l.joystick.properties.y && (l.joystick.properties.right = !1,
                l.joystick.properties.left = !1),
                l.joystickPad.cameraOffset.x = l.joystickPoint.x + c,
                l.joystickPad.cameraOffset.y = l.joystickPoint.y + u
        }
    }(Phaser);