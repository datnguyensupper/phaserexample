/**
 * Created by tuynu on 1/6/2017.
 */
var LobbyConfig = {
    scaleRatioEntireGame:0.6
};

Lobby = {
    Utils:{
        /**
         * object is null
         * @param object
         * @returns {boolean}
         */
        objectIsNull: function (object) {
            //return (object == null || object == undefined || (object !== object));
            return (object === null || object === undefined);
        },
        /**
         * object is not null
         * @param object
         * @returns {boolean}
         */
        objectNotNull: function (object) {
            return (!Lobby.Utils.objectIsNull(object));
        },
        /**
         * clear timer (timer is my.time.events)
         * @param my
         * @param timer
         */
        clearTimer: function (game, timer) {
            if (Lobby.Utils.objectIsNull(game) ||
                Lobby.Utils.objectIsNull(timer)) {
                return;
            }
            game.time.events.remove(timer);
        },
        /**
         * float to in
         * @param float
         * @returns {number}
         */
        floatToIntOptimize: function (float) {
            var rounded = (0.5 + float) | 0;
            //rounded = ~~(0.5+float);
            //rounded = (0.5+float) << 0;
            return rounded;
        },
    }
};