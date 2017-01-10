/**
 * Created by tuynu on 1/9/2017.
 */
'use strict';

function _classCallCheck(e, t) {
    if (!(e instanceof t))
        throw new TypeError("Cannot call a class as a function")
}
function _inherits(e, t) {
    if ("function" != typeof t && null !== t)
        throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }),
    t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}

var _createClass = function() {
    function e(e, t) {
        for (var o = 0; o < t.length; o++) {
            var a = t[o];
            a.enumerable = a.enumerable || !1,
                a.configurable = !0,
            "value"in a && (a.writable = !0),
                Object.defineProperty(e, a.key, a)
        }
    }
    return function(t, o, a) {
        return o && e(t.prototype, o),
        a && e(t, a),
            t
    }
}();

var GameState = function(t) {
    function e() {
        _classCallCheck(this, e),
            _get(Object.getPrototypeOf(e.prototype), "constructor", this).apply(this, arguments)
    }
    return _inherits(e, t),
        _createClass(e, [{
            key: "preload",
            value: function() {
                this.load.onLoadStart.add(this.loadStart, this),
                    this.load.onFileComplete.add(this.fileComplete, this),
                    this.load.onLoadComplete.add(this.loadComplete, this)
            }
        }, {
            key: "loadStart",
            value: function() {
                this.loadingText = this.add.text(20, this.world.height - 32, "Loading...", {
                    font: "20px Arial",
                    fill: "#ffffff"
                })
            }
        }, {
            key: "fileComplete",
            value: function(t, e, i, s, n) {
                this.loadingText.setText("File Complete: " + t + "% - " + s + " out of " + n)
            }
        }, {
            key: "loadComplete",
            value: function() {
                game.world.remove(this.loadingText),
                    this.time.advancedTiming = !0
            }
        }, {
            key: "create",
            value: function() {
                var t = this;
                this.showDebug = !1,
                    game.input.keyboard.addKey(Phaser.KeyCode.D).onDown.add(function() {
                        t.showDebug = !t.showDebug
                    }),
                    game.camera.x = game.world.centerX - game.width / 2
            }
        }, {
            key: "update",
            value: function() {}
        }, {
            key: "render",
            value: function() {
                game.debug.text(game.time.fps, 5, 14, "#00ff00")
            }
        }, {
            key: "loadSpriter",
            value: function(t) {
                this.spriterLoader || (this.spriterLoader = new Spriter.Loader);
                var e = new Spriter.SpriterXml(game.cache.getXML(t + "Animations"))
                    , i = this.spriterLoader.load(e);
                return new Spriter.SpriterGroup(game,i,t,t)
            }
        }, {
            key: "drawIsoGrid",
            value: function() {
                var t = new IsoGrid(game);
                t.drawGrid()
            }
        }]),
        e
}(Phaser.State);