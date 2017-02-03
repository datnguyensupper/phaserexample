/**
 * Created by tuynu on 1/6/2017.
 */
var LobbyConfig = {
    scaleRatioEntireGame:0.6
};

Lobby = {
    Utils:{
        /**
         * storing object to local storage
         * @param key: key
         * @param obj: object
         */
        setObjToLocalStorage: function (key, obj) {
            localStorage.setItem(key, JSON.stringify(obj));
        },
        /**
         * load object from local storage
         * @param key: key
         */
        getObjFromLocalStorage: function (key) {
            return JSON.parse(localStorage.getItem(key));
        },
        /**
         * storing value to local storage
         * @param key
         * @param value
         */
        setToLocalStorage: function (key, value) {
            try {
                localStorage.setItem(key, value);
            } catch (ex) {
                console.log("Error in setToCache function: ", ex);
            }
        },
        /**
         * load value from local storage
         * @param key: key
         */
        getFromLocalStorage: function (key) {
            try {
                var object = localStorage.getItem(key);
                return object;
            } catch (ex) {
                console.log("Error in setToCache function: ", ex);
            }
        },
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
        /**
         * is app running in web?
         * @returns {boolean}
         */
        isWeb: function () {
            var isWeb = typeof cordova === "undefined" || (cordova.platformId !== "android" && cordova.platformId !== "ios");
            return isWeb;
        },
        /**
         * is IOS devices?
         * @returns {*}
         */
        isIOS: function () {
            if (Lobby.Utils.isWeb()) {
                return false;
            }
            if (typeof device == "undefined") {
                return Lobby.Utils.isIOSCheckWithoutPlugin();
            }
            var devicePlatform = device.platform;
            return (devicePlatform == 'iOS');
        },
        /**
         * if device not ready run this code to check is IOS devices?
         * @returns {boolean}
         */
        isIOSCheckWithoutPlugin: function () {
            if (Lobby.Utils.isWeb()) {
                return false;
            }
            return /iPhone|iPad|iPod/i.test(navigator.userAgent);
        },
    }
};