/**
 * Created by tuynu on 1/3/2017.
 */
'use strict';

var _get = function(e, t, o) {
    for (var a = !0; a; ) {
        var r = e
            , n = t
            , i = o;
        a = !1,
        null === r && (r = Function.prototype);
        var s = Object.getOwnPropertyDescriptor(r, n);
        if (void 0 !== s) {
            if ("value"in s)
                return s.value;
            var l = s.get;
            if (void 0 === l)
                return;
            return l.call(i)
        }
        var c = Object.getPrototypeOf(r);
        if (null === c)
            return;
        e = c,
            t = n,
            o = i,
            a = !0,
            s = c = void 0
    }
}
    , DemoState = function(e) {
    function t() {
        _classCallCheck(this, t),
            _get(Object.getPrototypeOf(t.prototype), "constructor", this).apply(this, arguments)
    }
    return _inherits(t, e),
        _createClass(t, [{
            key: "preload",
            value: function() {
                _get(Object.getPrototypeOf(t.prototype), "preload", this).call(this),
                    this.load.atlas("skeleton", "assets/atlas.png", "assets/atlas.json"),
                    this.load.xml("skeletonAnimations", "assets/animations.scml")
            }
        }, {
            key: "create",
            value: function() {
                var e = this;
                _get(Object.getPrototypeOf(t.prototype), "create", this).call(this),
                    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL,
                    game.stage.backgroundColor = gameOptions.backgroundColor,
                    game.input.keyboard.addKey(Phaser.KeyCode.P).onDown.add(function() {
                        e.popSkeleton()
                    }),
                    game.input.keyboard.addKey(Phaser.KeyCode.E).onDown.add(function() {
                        e.reset()
                    }),
                    game.input.addPointer(),
                    game.input.onDown.add(function(t) {
                        t == game.input.pointer2 ? e.reset() : e.popSkeleton()
                    }),
                    this.reset()
            }
        }, {
            key: "update",
            value: function() {
                _get(Object.getPrototypeOf(t.prototype), "update", this).call(this),
                    this.skeletons.forEach(function(e) {
                        if (game.physics.arcade.collide(e.emitter, e.floor, function(e, t) {
                                t.body.velocity.x *= .9,
                                    t.body.velocity.y *= .9,
                                    t.body.angularVelocity *= .9
                            }),
                                e.updateAnimation(),
                                e.emitter.forEachAlive(function(e) {
                                    e.alpha = game.math.clamp(e.lifespan / 1e3, 0, 1)
                                }),
                            10 == e.emitter.countDead()) {
                            var t = game.add.tween(e).to({
                                alpha: -1
                            }, 200, Phaser.Easing.Linear.None, !0);
                            t.onComplete.add(function() {
                                game.world.remove(e.emitter),
                                    game.world.remove(e)
                            })
                        }
                    })
            }
        }, {
            key: "render",
            value: function() {
                _get(Object.getPrototypeOf(t.prototype), "render", this).call(this),
                this.showDebug && this.skeletons.forEach(function(e) {
                    game.debug.body(e.floor),
                        game.debug.geom(e.position, "rgb(255,255,255)")
                }),
                    game.debug.text("Press D for any rendering debug", 32, 32),
                    game.debug.text("Press P or touch to pop a skeleton", 32, 48),
                    game.debug.text("Press E or use 2 touches to reset", 32, 64)
            }
        }, {
            key: "reset",
            value: function() {
                game.world.removeAll(),
                    this.skeletons = [];
                var e = new IsoGrid(game);
                e.drawGrid();
                for (var t = 1; 5 > t; t++)
                    for (var o = 1; 6 > o; o++) {
                        var a = 100 * o + (t % 2 ? 0 : 50)
                            , r = 100 * t
                            , n = this.createSkeleton(a, r);
                        n.alive = !0,
                            this.createEmitter(n),
                            this.skeletons.push(n),
                            game.world.add(n)
                    }
            }
        }, {
            key: "createSkeleton",
            value: function(e, t) {
                var o = this.loadSpriter("skeleton");
                o.position.setTo(e, t),
                    o.scale.set(.2),
                    o.setAnimationSpeedPercent(game.rnd.between(10, 20)),
                    o.playAnimationByName("Idle");
                var a = game.add.sprite(0, 0, null);
                return game.physics.arcade.enable(a),
                    a.anchor.setTo(0, -1),
                    a.body.setSize(400, 1, -200),
                    a.body.immovable = !0,
                    o.floor = a,
                    o.addChild(a),
                    o
            }
        }, {
            key: "createEmitter",
            value: function(e) {
                var t = game.add.emitter(e.x, e.y, 10);
                t.minParticleScale = e.scale.x,
                    t.maxParticleScale = e.scale.x + .15,
                    t.setXSpeed(-100, 100),
                    t.setYSpeed(-300, -150),
                    t.gravity = 500,
                    t.makeParticles("skeleton", ["armL", "legL", "handL", "feetL", "elbowL", "lower_legL"]),
                    e.emitter = t
            }
        }, {
            key: "popSkeleton",
            value: function() {
                var e = game.rnd.pick(this.skeletons.filter(function(e) {
                    return e.alive
                }));
                e && (e.alive = !1,
                    e.setAnimationSpeedPercent(10),
                    e.playAnimationByName("Death"),
                    e.emitter.start(!0, game.rnd.between(1e3, 2500), null, 10))
            }
        }]),
        t
}(GameState);
