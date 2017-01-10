'use strict';

var IsoGrid = function() {
    function t(e, i, s, n) {
        _classCallCheck(this, t),
            this.game = e,
            this.tileWidth = i || 64,
            this.tileHeight = s || 32,
            this.numTilesPerRow = n || 30
    }
    return _createClass(t, [{
        key: "drawGrid",
        value: function() {
            var t = new Phaser.Rectangle(0,0,this.tileWidth * this.numTilesPerRow,this.tileHeight * this.numTilesPerRow)
                , e = new Phaser.Point(this.game.world.centerX - t.width / 2,this.game.world.centerY - t.height / 2)
                , i = this.game.add.graphics(e.x, e.y)
                , s = this.tileWidth
                , n = this.tileHeight;
            i.lineStyle(1, 11184810);
            for (var r = 0; r < this.numTilesPerRow; r++) {
                var o = t.width / 2
                    , a = t.height / 2 + this.numTilesPerRow / 2 * n - 16;
                a -= r * n / 2,
                    o -= r * s / 2;
                for (var h = 0; r + 1 > h; h++) {
                    var l = o + h * s;
                    i.moveTo(l - s / 2, a),
                        i.lineTo(l, a + n / 2),
                        i.lineTo(l + s / 2, a),
                        i.lineTo(l, a - n / 2),
                        i.lineTo(l - s / 2, a)
                }
            }
            for (var r = 0; r < this.numTilesPerRow - 1; r++) {
                var o = t.width / 2
                    , a = t.height / 2 - (this.numTilesPerRow / 2 - 1 - r) * n;
                a -= 16,
                    a -= r * n / 2,
                    o -= r * s / 2;
                for (var c = 0; r + 1 > c; c++) {
                    var u = o + c * s;
                    i.moveTo(u - s / 2, a),
                        i.lineTo(u, a + n / 2),
                        i.lineTo(u + s / 2, a),
                        i.lineTo(u, a - n / 2),
                        i.lineTo(u - s / 2, a)
                }
            }
        }
    }]),
        t
}();