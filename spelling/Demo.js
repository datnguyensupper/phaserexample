'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DemoState = (function (_GameState) {
    _inherits(DemoState, _GameState);

    function DemoState() {
        _classCallCheck(this, DemoState);

        _get(Object.getPrototypeOf(DemoState.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(DemoState, [{
        key: 'preload',
        value: function preload() {
            _get(Object.getPrototypeOf(DemoState.prototype), 'preload', this).call(this);

            game.load.image('bg', 'assets/bg/background2.png');
            game.load.image('burnMark', 'assets/spells/burnmark.png');
            game.load.image('groundCrack', 'assets/spells/groundcrack.png');

            game.load.image('iconMagicBolt', 'assets/icons/fireball-eerie-2.png');
            game.load.image('iconFireWall', 'assets/icons/Wall of Fire.png');
            game.load.image('iconLightningBolt', 'assets/icons/Thunder.png');
            game.load.image('iconIceCage', 'assets/icons/Blizzard.png');
            game.load.image('iconFireStorm', 'assets/icons/fire-arrows-3.png');

            game.load.atlas('player', 'assets/knight/atlas.png', 'assets/knight/atlas.json');
            game.load.atlas('zombie1', 'assets/zombie1/atlas.png', 'assets/zombie1/atlas.json');

            game.load.atlas('bolt', 'assets/spells/bolt/atlas.png', 'assets/spells/bolt/atlas.json');
            game.load.atlas('flame', 'assets/spells/fire/atlas.png', 'assets/spells/fire/atlas.json');
            game.load.atlas('ice', 'assets/spells/ice/atlas.png', 'assets/spells/ice/atlas.json');
        }
    }, {
        key: 'create',
        value: function create() {
            game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            game.juicy = game.plugins.add(new Phaser.Plugin.Juicy(this));

            // add game background a group so it doesn't get sorted with the game.world
            // when we sort it during update
            var bgGroup = game.add.group();
            var bg = game.add.sprite(0, 20, 'bg');
            bg.anchor.setTo(0, 0);
            bg.scale.set(0.3);
            bgGroup.add(bg);

            this.player = new Player(80, 200, 'player');

            this.zombies = [];
            var offsetX = 120;
            var offsetY = 110;
            for (var y = 1; y < 4; y++) {
                for (var x = 1; x < 5; x++) {
                    var posx = x * 100 + (y % 2 ? 0 : 50) + offsetX;
                    var posy = y * 50 + offsetY;
                    this.createZombie(posx, posy);
                }
            }

            // icon position, icon key, cooldown, duration
            var magicBolt = new MagicBolt(50, 430, 'iconMagicBolt', 2500);
            var fireWall = new FireWall(130, 430, 'iconFireWall', 5000, 3000);
            var lightningBolt = new LightningBolt(210, 430, 'iconLightningBolt', 2000);
            var iceCage = new IceCage(290, 430, 'iconIceCage', 3000, 2000);
            var fireStorm = new FireStorm(370, 430, 'iconFireStorm', 6000);

            // store a reference for these because we need to call their update method
            this.magicBolt = magicBolt;
            this.fireStorm = fireStorm;

            // we need a reference to the player's position
            magicBolt.player = this.player;

            // for these spells, we need a reference to the list of zombies
            // so we can target them
            iceCage.zombies = this.zombies;
            magicBolt.zombies = this.zombies;
            lightningBolt.zombies = this.zombies;

            // create keyboard and touch inputs
            game.input.addPointer();
            this.enableInput(magicBolt, Phaser.KeyCode.ONE);
            this.enableInput(fireWall, Phaser.KeyCode.TWO);
            this.enableInput(lightningBolt, Phaser.KeyCode.THREE);
            this.enableInput(iceCage, Phaser.KeyCode.FOUR);
            this.enableInput(fireStorm, Phaser.KeyCode.FIVE);
        }
    }, {
        key: 'enableInput',
        value: function enableInput(spell, keycode) {
            var _this = this;

            game.input.keyboard.addKey(keycode).onDown.add(function () {
                _this.castSpell(spell);
            });

            spell.icon.inputEnabled = true;
            spell.icon.events.onInputDown.add(function (icon) {
                _this.castSpell(spell);
            });
        }
    }, {
        key: 'castSpell',
        value: function castSpell(spell) {
            if (spell.active) {
                this.player.play('attack', 20, false);
                // only cast the spell after a certain ms the animation plays
                this.game.time.events.add(300, function () {
                    spell.cast();
                });
            }
        }
    }, {
        key: 'createZombie',
        value: function createZombie(x, y) {
            var zombie = game.add.sprite(x, y, 'zombie1');
            zombie.anchor.setTo(0.5, 0.5);

            var idle = zombie.animations.add('idle', [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28]);
            var die = zombie.animations.add('die', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
            var raise = zombie.animations.add('raise', [11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]);
            zombie.play('raise', 10, false);
            zombie.scale.setTo(-0.4, 0.4);
            // everytime a zombie dies, we raise them back
            die.onComplete.add(function () {
                zombie.play('raise', game.rnd.between(15, 20), false);
            });
            // set them to idle after they have risen
            // the random play speed gives us a nice effect
            // so that their movements are not sync with each other
            raise.onComplete.add(function () {
                zombie.play('idle', game.rnd.between(9, 20), true);
            });

            // store in our regular array
            this.zombies.push(zombie);
        }
    }, {
        key: 'update',
        value: function update() {
            game.world.sort('y', Phaser.Group.SORT_ASCENDING);

            this.magicBolt.update();
            this.fireStorm.update();
        }
    }, {
        key: 'render',
        value: function render() {
            _get(Object.getPrototypeOf(DemoState.prototype), 'render', this).call(this);

            game.debug.text('Press 1 - magic bolt', 400, 400);
            game.debug.text('2 - fire wall', 430, 416);
            game.debug.text('3 - lightning bolt', 430, 432);
            game.debug.text('4 - ice cage', 430, 448);
            game.debug.text('5 - fire storm', 430, 464);
        }
    }]);

    return DemoState;
})(GameState);
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Spell = (function () {
    // x, y - icon position
    // icon - key
    // cooldown - amount in seconds before the spell can be cast again
    // duration - amount in seconds for spells with duration eg, enchantments

    function Spell(x, y, icon, cooldown, duration) {
        _classCallCheck(this, Spell);

        // we are not using the Phaser's group class
        // because we want the z-order to work with some sprites
        // so many of the spell sprites are added to the game.world
        // but it's still handy to put them all in an array so we can just iterate each
        this.group = [];
        // boolean flag that enables/disable casting of the spell again
        this.active = true;
        // cooldown timer
        this.cooldown = cooldown;
        // some spells, like firewall have a duration
        this.duration = duration;

        // create each spell icons
        this.createIcon(x, y, icon);

        // and then create the necessary sprites, animations and emitters
        this.create();
    }

    // to be overridden by child classes

    _createClass(Spell, [{
        key: 'create',
        value: function create() {}
    }, {
        key: 'perform',
        value: function perform() {}
    }, {
        key: 'update',
        value: function update() {}
    }, {
        key: 'expire',
        value: function expire() {}
    }, {
        key: 'cast',
        value: function cast() {
            var _this = this;

            // don't allow casting if cooldown is still in effect
            if (!this.active) return false;

            // perform each child spell actual behaviour
            this.perform();

            // don't allow casting again
            this.active = false;

            // activate the cooldown animation
            this.icon.pie.progress = 0;
            var tween = game.add.tween(this.icon.pie).to({ progress: 1 }, this.cooldown, Phaser.Easing.Quadratic.InOut, true, 0);
            tween.onComplete.add(function () {
                _this.active = true;
            });

            // expire the spell if it has a duration
            if (this.duration) {
                game.time.events.add(this.duration, function () {
                    _this.expire();
                });
            }
        }
    }, {
        key: 'createIcon',
        value: function createIcon(x, y, key) {
            // create a group for the icon so they don't get sorted along with the sprites in the game.world
            var iconGroup = game.add.group();

            // position the icon
            var icon = game.add.sprite(x, y, key);
            icon.anchor.setTo(0.5, 0.5);

            // create a progress pie on top of the icon
            var pie = new PieProgress(game, icon.x, icon.y, 40, '0x000000');
            pie.alpha = 0.5;

            // put a circle frame so we have rounded spell icons
            var g = game.add.graphics(0, 0);
            var radius = 40;
            g.lineStyle(20, 0x000000, 1);
            g.anchor.setTo(0, 0);
            var xo = icon.x;
            var yo = icon.y;
            g.moveTo(xo, yo + radius);
            for (var i = 0; i <= 360; i++) {
                var _x = xo + Math.sin(i * (Math.PI / 180)) * radius;
                var _y = yo + Math.cos(i * (Math.PI / 180)) * radius;
                g.lineTo(_x, _y);
            }
            iconGroup.add(icon);
            iconGroup.add(g);
            iconGroup.add(pie);

            icon.pie = pie;
            this.icon = icon;
        }
    }]);

    return Spell;
})();
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Player = function Player(x, y, key) {
    _classCallCheck(this, Player);

    // just some common setup to show our hero
    var player = game.add.sprite(x, y, key);
    player.animations.add('idle', [10, 11, 12, 13, 14, 15, 16, 17, 18, 19]);

    var attack = player.animations.add('attack', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    player.play('idle', 12, true);
    attack.onComplete.add(function () {
        player.play('idle', game.rnd.between(15, 20), false);
    });

    player.anchor.setTo(0.5, 0.5);
    player.scale.set(0.4);

    return player;
};
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MagicBolt = (function (_Spell) {
    _inherits(MagicBolt, _Spell);

    function MagicBolt(x, y, key, cooldown, duration) {
        _classCallCheck(this, MagicBolt);

        _get(Object.getPrototypeOf(MagicBolt.prototype), 'constructor', this).call(this, x, y, key, cooldown, duration);
    }

    _createClass(MagicBolt, [{
        key: 'create',
        value: function create() {
            // we create an actual Phaser.Group
            // because we want these sprites to
            // be on top of all the zombies
            this.boltGroup = game.add.group();

            // create 3 magic bolts
            for (var i = 0; i < 3; i++) {
                var bolt = game.add.sprite(0, 0, 'bolt');
                // add the animations in
                // one for moving and another when it hits their targets
                bolt.animations.add('move', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
                bolt.animations.add('sizzle', [10, 11, 12, 13, 14, 15, 16, 17, 18, 19]);
                bolt.scale.set(0.6);
                bolt.anchor.set(0.5);
                // don't show the bolts
                bolt.kill();
                bolt.SPEED = 400; // speed pixels/second
                bolt.TURN_RATE = 5; // turn rate in degrees/frame

                // enable physics because we'removing this sprite using velocity
                game.physics.enable(bolt, Phaser.Physics.ARCADE);

                this.group.push(bolt);
                this.boltGroup.add(bolt);
            }
        }
    }, {
        key: 'perform',
        value: function perform() {
            var _this = this;

            this.group.forEach(function (bolt) {
                // pick a random zombie to target
                var target = game.rnd.pick(_this.zombies.filter(function (e) {
                    return e.alive;
                }));
                // flag it so it doesn't get pick again
                target.alive = false;

                // random properties for each bolt
                bolt.revive();
                bolt.scale.set(0.6);
                bolt.play('move', 40, true);
                // make it come out from the player's sword
                bolt.x = _this.player.x + 50;
                bolt.y = _this.player.y - 30;

                // store a reference so we can access it later on
                bolt.target = target;

                // to start with, I want the bolts to randomly fly
                // towards the top of the game screen
                var startX = game.rnd.between(_this.player.x, _this.player.y + 100);
                var startY = game.rnd.between(0, 50);

                // set a fix speed regardless of the bolt's distance from their targets
                var duration = game.math.distance(startX, startY, bolt.x, bolt.y) / bolt.SPEED * 1000;

                // make the bolt face the target
                var targetAngle = game.math.angleBetween(bolt.x, bolt.y, startX, startY);
                bolt.rotation = targetAngle;

                // tween the bolt
               
                var tween = game.add.tween(bolt).to({ x: startX, y: startY }, duration, Phaser.Easing.Linear.None, true);
                tween.onComplete.add(function () {
                    // once the bolt reaches the top of the game screen
                    // we start making it home in to their target
                    bolt.homeIn = true;
                });
            });
        }
    }, {
        key: 'update',
        value: function update() {
            // we want our bolts to be on top of their targets
            game.world.bringToTop(this.boltGroup);

            this.group.forEach(function (bolt) {
                if (bolt.homeIn) {
                    var targetAngle = game.math.angleBetween(bolt.x, bolt.y, bolt.target.x, bolt.target.y);
                    // Gradually (this.TURN_RATE) aim the missile towards the target angle
                    if (bolt.rotation !== targetAngle) {
                        // Calculate difference between the current angle and targetAngle
                        var delta = targetAngle - bolt.rotation;

                        // Keep it in range from -180 to 180 to make the most efficient turns.
                        if (delta > Math.PI) delta -= Math.PI * 2;
                        if (delta < -Math.PI) delta += Math.PI * 2;

                        if (delta > 0) {
                            // Turn clockwise
                            bolt.angle += bolt.TURN_RATE;
                        } else {
                            // Turn counter-clockwise
                            bolt.angle -= bolt.TURN_RATE;
                        }

                        // Just set angle to target angle if they are close
                        if (Math.abs(delta) < game.math.degToRad(bolt.TURN_RATE)) {
                            bolt.rotation = targetAngle;
                        }
                    }
                    // Calculate velocity vector based on this.rotation and this.SPEED
                    bolt.body.velocity.x = Math.cos(bolt.rotation) * bolt.SPEED;
                    bolt.body.velocity.y = Math.sin(bolt.rotation) * bolt.SPEED;

                    // distance check if it hits the target
                    if (game.math.distance(bolt.x, bolt.y, bolt.target.x, bolt.target.y) < 20) {
                        // play the hit animation
                        bolt.target.play('die', game.rnd.between(9, 15), false);
                        bolt.target.revive();

                        // stop the bolt from moving
                        bolt.homeIn = false;
                        bolt.body.velocity.x = 0;
                        bolt.body.velocity.y = 0;

                        // show the hit animation with random size
                        var size = game.rnd.realInRange(0.7, 1);
                        bolt.scale.set(size);
                        bolt.play('sizzle', 25, false, true);
                    }
                }
            });
        }
    }]);

    return MagicBolt;
})(Spell);
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FireWall = (function (_Spell) {
    _inherits(FireWall, _Spell);

    function FireWall(x, y, key, cooldown, duration) {
        _classCallCheck(this, FireWall);

        _get(Object.getPrototypeOf(FireWall.prototype), 'constructor', this).call(this, x, y, key, cooldown, duration);
    }

    _createClass(FireWall, [{
        key: 'create',
        value: function create() {
            // create a group for the burn marks so it appears below all the flames
            this.burnMarksGroup = game.add.group();

            // create 8 flames that spawns in front of our hero
            for (var i = 0; i < 8; i++) {
                var offsetY = 180;
                var posY = i * 15 + offsetY;
                var flame = game.add.sprite(game.rnd.between(150, 160), posY, 'flame');
                flame.alpha = 0;
                flame.animations.add('move', [15, 16, 17, 18, 19, 20]);
                flame.anchor.setTo(0.5, 0.5);

                // we don't need that much burn marks showing on the ground
                if (i % 2 > 0) {
                    var mark = game.add.sprite(game.rnd.between(150, 160), posY + 10, 'burnMark');
                    mark.alpha = 0;
                    mark.anchor.setTo(0.5, 0.5);

                    // store a reference
                    flame.mark = mark;

                    this.burnMarksGroup.add(mark);
                }

                this.group.push(flame);
            }
        }
    }, {
        key: 'perform',
        value: function perform() {
            this.group.forEach(function (flame) {
                flame.alpha = 1;
                // we show a growing flame
                flame.scale.set(0);

                // random growth size for each flame
                var size = game.rnd.realInRange(0.7, 1);
                game.add.tween(flame.scale).to({ x: size, y: size }, game.rnd.between(300, 1000), Phaser.Easing.Linear.None, true);

                // play the animation
                flame.play('move', game.rnd.between(8, 15), true);

                if (flame.mark) {
                    (function () {
                        // random angle and size for our burn marks
                        flame.mark.alpha = 1;
                        flame.mark.scale.set(0);
                        flame.mark.angle = game.rnd.between(0, 360);

                        var size = game.rnd.realInRange(0.15, 0.30);

                        // show it a few moment after the flame shows up
                        game.time.events.add(500, function () {
                            game.add.tween(flame.mark.scale).to({ x: size, y: size }, game.rnd.between(500, 1000), Phaser.Easing.Linear.None, true);
                        });
                    })();
                }
            });
        }
    }, {
        key: 'expire',
        value: function expire() {
            // expire just fades them out
            this.group.forEach(function (flame) {
                game.add.tween(flame).to({ alpha: 0 }, 500, Phaser.Easing.Quadratic.InOut, true, 0);
                if (flame.mark) game.add.tween(flame.mark).to({ alpha: 0 }, 500, Phaser.Easing.Quadratic.InOut, true, 0);
            });
        }
    }]);

    return FireWall;
})(Spell);
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IceCage = (function (_Spell) {
    _inherits(IceCage, _Spell);

    function IceCage(x, y, key, cooldown, duration) {
        _classCallCheck(this, IceCage);

        _get(Object.getPrototypeOf(IceCage.prototype), 'constructor', this).call(this, x, y, key, cooldown, duration);
    }

    _createClass(IceCage, [{
        key: 'create',
        value: function create() {
            var _this = this;

            var _loop = function () {
                var ice = game.add.sprite(0, 0, 'ice');
                ice.anchor.set(0.5);

                // add the animations in
                var summon = ice.animations.add('summon', [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35]);
                ice.animations.add('idle', [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47]);
                ice.animations.add('shatter', [48, 49, 50, 51, 52, 53, 54]);

                // when the summon completes
                // we play the idle animation
                summon.onComplete.add(function () {
                    ice.play('idle', game.rnd.between(5, 10), true);
                });

                _this.group.push(ice);
            };

            // the ice cage spells spawn 3 ice cages
            for (var i = 0; i < 3; i++) {
                _loop();
            }
        }
    }, {
        key: 'perform',
        value: function perform() {
            var _this2 = this;

            this.group.forEach(function (ice) {
                // pick a random target
                var target = game.rnd.pick(_this2.zombies.filter(function (e) {
                    return e.alive;
                }));

                // flag it so we don't pick it out from the list again
                target.alive = false;

                // store a reference, we need to access it later on
                ice.target = target;

                // spawn the ice on the target's position
                // offset a bit so it appears below the target
                ice.x = target.x;
                ice.y = target.y + 20;

                // random size, revive and play the animation
                ice.scale.set(game.rnd.realInRange(0.5, 0.8));
                ice.alpha = 1;
                ice.revive();
                ice.play('summon', 25, false);

                // freeze the target after a few ms after the lightning plays
                game.time.events.add(300, function () {
                    // tween the target to blue
                    _this2.tweenTint(target, 0xffffff, 0x0000aa, 500);
                    // and stop it's animation
                    target.animations.paused = true;
                });
            });
        }
    }, {
        key: 'expire',
        value: function expire() {
            var _this3 = this;

            this.group.forEach(function (ice) {
                // after the spell expires, we play the shatter animation
                ice.play('shatter', 15, false, true);

                // can be re-targeted
                ice.target.alive = true;

                // tween the target back to its original color
                _this3.tweenTint(ice.target, 0x0000aa, 0xffffff, 500);

                // resume target's animation
                ice.target.animations.paused = false;
            });
        }
    }, {
        key: 'tweenTint',
        value: function tweenTint(obj, startColor, endColor, time) {
            // create an object to tween with our step value at 0
            var colorBlend = { step: 0 };

            // create the tween on this object and tween its step property to 100
            var colorTween = game.add.tween(colorBlend).to({ step: 100 }, time);

            // run the interpolateColor function every time the tween updates, feeding it the
            // updated value of our tween each time, and set the result as our tint
            colorTween.onUpdateCallback(function () {
                obj.tint = Phaser.Color.interpolateColor(startColor, endColor, 100, colorBlend.step);
            });

            // set the object to the start color straight away
            obj.tint = startColor;

            // start the tween
            colorTween.start();
        }
    }]);

    return IceCage;
})(Spell);
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LightningBolt = (function (_Spell) {
    _inherits(LightningBolt, _Spell);

    function LightningBolt(x, y, key, cooldown, duration) {
        _classCallCheck(this, LightningBolt);

        _get(Object.getPrototypeOf(LightningBolt.prototype), 'constructor', this).call(this, x, y, key, cooldown, duration);
    }

    _createClass(LightningBolt, [{
        key: 'create',
        value: function create() {
            var lightningBolt = game.add.sprite(0, 0, 'bolt');
            var animation = lightningBolt.animations.add('move', [20, 21, 22, 23, 24, 25, 26, 27, 28, 29]);
            lightningBolt.scale.setTo(1.5, 1);
            lightningBolt.anchor.setTo(0.5, 0.5);
            lightningBolt.kill();

            animation.onComplete.add(function () {
                lightningBolt.target.tint = 0xffffff;
                lightningBolt.target.play('die', game.rnd.between(9, 15), false);
            });

            // create the ground crack decal
            // once again, we add this to its own group so it doesn't get affected
            // when we are sorting the world and this shows always below the zombie
            var groundCrackGroup = game.add.group();
            var groundCrack = game.add.sprite(0, 0, 'groundCrack');
            groundCrack.scale.set(0.2);
            groundCrack.anchor.setTo(0.5, 0.5);
            groundCrack.alpha = 0;
            groundCrackGroup.add(groundCrack);

            lightningBolt.crack = groundCrack;

            // there's a single instance of this so we don't need the array
            this.lightningBolt = lightningBolt;
        }
    }, {
        key: 'perform',
        value: function perform() {
            // find a random zombie that is alive to target
            var zombie = game.rnd.pick(this.zombies.filter(function (e) {
                return e.alive;
            }));

            var lightningBolt = this.lightningBolt;
            lightningBolt.revive();
            lightningBolt.target = zombie;
            // a little variety where the starting position of the lightning
            lightningBolt.x = zombie.x + game.rnd.between(-20, 20);
            // just making sure it's on top of the zombie's head
            lightningBolt.y = zombie.y - lightningBolt.height / 2 + 20; // offset

            // find the target angle to the zombie so the lightning's end is pointing at the zombie's position
            var targetAngle = game.math.angleBetween(lightningBolt.x, lightningBolt.y, zombie.x, zombie.y);
            lightningBolt.rotation = targetAngle;

            // play the animation
            lightningBolt.play('move', 20, false, true);

            // and make sure it stays on top
            game.world.bringToTop(lightningBolt);

            // add some effect after the bolts hit the zombie
            game.time.events.add(150, function () {
                // show a crack on the ground
                lightningBolt.crack.angle = game.rnd.between(0, 360);
                lightningBolt.crack.alpha = 1;
                lightningBolt.crack.position.set(zombie.x, zombie.y + 30);
                // fade out the crack
                game.add.tween(lightningBolt.crack).to({ alpha: 0 }, 1000);

                // blacken the zombie to show our zombie got fried from the bolt
                zombie.tint = 0x555555;
                // shake and flash the zombie
                game.add.tween(zombie).to({ x: lightningBolt.x - 10 }, 50, Phaser.Easing.Bounce.InOut, true, 0, 0, true);
                game.add.tween(zombie).to({ alpha: 0.2 }, 200, Phaser.Easing.Bounce.InOut, true, 0, 0, true);
            });
        }
    }]);

    return LightningBolt;
})(Spell);
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FireStorm = (function (_Spell) {
    _inherits(FireStorm, _Spell);

    function FireStorm(x, y, key, cooldown, duration) {
        _classCallCheck(this, FireStorm);

        _get(Object.getPrototypeOf(FireStorm.prototype), 'constructor', this).call(this, x, y, key, cooldown, duration);
    }

    _createClass(FireStorm, [{
        key: 'create',
        value: function create() {
            for (var i = 0; i < 5; i++) {
                // setup an emitter for each fireball for the smoke trail
                var smokeTrail = game.add.emitter(0, 0, 400);
                // limit the emitter width
                smokeTrail.width = 10;
                // limit the amount of speed and rotation
                smokeTrail.setXSpeed(-30, -10);
                smokeTrail.setYSpeed(-50, -25);
                smokeTrail.setRotation(10, 20);
                // random size, alpha
                smokeTrail.setScale(1, 1.5);
                smokeTrail.setAlpha(0.3, 0.7, 3000);
                // no gravity, we want them going up
                smokeTrail.gravity = 0;
                // just pull from the existing spritesheet
                smokeTrail.makeParticles('flame', ['zsmoke.png']);
                // start the emitter but pause it until the spell is cast
                smokeTrail.start(false, game.rnd.between(1000, 4000), 150);
                smokeTrail.on = false;

                // our fireball sprite
                var fireball = game.add.sprite(0, 0, 'flame');
                fireball.scale.set(game.rnd.realInRange(0.5, 1));
                fireball.anchor.set(0.5);
                // there 2 animations to play
                // 1. while it's moving and 2. when it hits the ground
                var move = fireball.animations.add('move', [0, 1, 2, 3, 4, 5]);
                var hit = fireball.animations.add('hit', [6, 7, 8, 9, 10, 11, 12, 13, 14]);

                // we're adding another animation once it hits the ground
                // but we need to create a separate sprite for the smoke animation
                // because we play this together with the fireball hit animation
                var smoke = game.add.sprite(0, 0, 'flame');
                smoke.animations.add('smoke', [21, 22, 23, 24, 25, 26, 27, 28, 29, 30]);
                smoke.anchor.set(0.5);
                smoke.scale.setTo(fireball.scale.x, fireball.scale.y);

                // we start with these hidden away
                fireball.kill();
                smoke.kill();

                // store reference
                fireball.smoke = smoke;
                fireball.smokeTrail = smokeTrail;

                this.group.push(fireball);
            }
        }
    }, {
        key: 'perform',
        value: function perform() {
            this.group.forEach(function (fireball) {
                // we start with reving and resuming the emitters
                fireball.revive();
                fireball.smokeTrail.on = true;
                // play the animation
                fireball.play('move', game.rnd.between(15, 25), true);
                // start from the upper left of the game screen
                fireball.x = game.rnd.between(0, 100);
                fireball.y = 0;

                // randomly hit where the zombies are standing
                var targetX = game.rnd.between(200, game.world.width);
                var targetY = game.rnd.between(200, 350);
                // make it face and target the ground
                var targetAngle = game.math.angleBetween(fireball.x, fireball.y, targetX, targetY);
                fireball.rotation = targetAngle;

                // tween the movement
                var tween = game.add.tween(fireball).to({ x: targetX, y: targetY }, game.rnd.between(1000, 2000), Phaser.Easing.Linear.None, true);
                tween.onComplete.add(function () {
                    // when the fireball hits the ground, we do the following:

                    // show the smoke sprite animation
                    fireball.smoke.revive();
                    fireball.smoke.position = fireball.position;

                    // play the fireball hit animation
                    fireball.play('hit', game.rnd.between(15, 20), false, true);
                    // play the smoke animation
                    fireball.smoke.play('smoke', game.rnd.between(10, 15), false, true);
                    // turn off the somke trail emitter;
                    fireball.smokeTrail.on = false;
                    // and we shake the screen for each fireball that hits the ground
                    game.juicy.shake();
                });
            });
        }
    }, {
        key: 'update',
        value: function update() {
            this.group.forEach(function (fireball) {
                // for each smoke trail particle, we slowly fade them out
                fireball.smokeTrail.forEachAlive(function (particle) {
                    // by using each particle's lifespan
                    particle.alpha = game.math.clamp(particle.lifespan / 1000, 0, 0.5);
                });

                // here we're making sure that each emitted particle from the emitter
                // emits from where the fireball position currently is
                fireball.smokeTrail.x = fireball.x;
                fireball.smokeTrail.y = fireball.y;
            });
        }
    }]);

    return FireStorm;
})(Spell);








