/**
 * Created by tuynu on 1/9/2017.
 */
'use strict';
var __extends = this && this.__extends || function(t, e) {
        function i() {
            this.constructor = t
        }
        for (var s in e)
            e.hasOwnProperty(s) && (t[s] = e[s]);
        t.prototype = null === e ? Object.create(e) : (i.prototype = e.prototype,
            new i)
    }
    , Spriter;
!function(t) {
    var e = function() {
        function t() {
            this._items = [],
                this._itemNames = []
        }
        return t.prototype.add = function(t, e, i) {
            void 0 === e && (e = this._items.length),
            void 0 !== i && null !== i || (i = "item_" + e),
                this._items[e] = t,
                this._itemNames[i] = e
        }
            ,
            t.prototype.getById = function(t) {
                return this._items[t]
            }
            ,
            t.prototype.getByName = function(t) {
                var e = this._itemNames[t];
                return "number" != typeof e && console.warn("item " + t + "  not found!"),
                    "number" == typeof e ? this._items[e] : null
            }
            ,
            Object.defineProperty(t.prototype, "length", {
                get: function() {
                    return this._items.length
                },
                enumerable: !0,
                configurable: !0
            }),
            t
    }();
    t.IdNameMap = e
}(Spriter || (Spriter = {}));
var Spriter;
!function(t) {
    var e = function() {
        function t() {
            this.reset()
        }
        return Object.defineProperty(t.prototype, "current", {
            get: function() {
                return this._line.at(this._currentIndex)
            },
            enumerable: !0,
            configurable: !0
        }),
            Object.defineProperty(t.prototype, "currentIndex", {
                get: function() {
                    return this._currentIndex
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "next", {
                get: function() {
                    return this._line.at(this._nextIndex)
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "nextIndex", {
                get: function() {
                    return this._nextIndex
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "lastTime", {
                set: function(t) {
                    this._lastTime = t
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "line", {
                get: function() {
                    return this._line
                },
                set: function(t) {
                    this._line = t
                },
                enumerable: !0,
                configurable: !0
            }),
            t.prototype.reset = function() {
                this._lastTime = -1,
                    this._currentIndex = -1,
                    this._nextIndex = 0
            }
            ,
            t.prototype.step = function(t) {
                var e = this._nextIndex
                    , i = this._line.keys[e]
                    , s = i.time
                    , n = t < this._lastTime;
                return !n && s > this._lastTime && t >= s || n && (s > this._lastTime || t >= s) ? (this._lastTime = s,
                    this._currentIndex = e,
                ++e >= this._line.keys.length && (e = 0),
                    this._nextIndex = e,
                    i) : null
            }
            ,
            t
    }();
    t.LineStepper = e
}(Spriter || (Spriter = {}));
var Spriter;
!function(t) {
    var e = function() {
        function t(t, e) {
            this._file = t,
                this._nodeList = e
        }
        return t.prototype.length = function() {
            return this._nodeList.length
        }
            ,
            t.prototype.processed = function() {
                this._file.processed()
            }
            ,
            t.prototype.getChildNodes = function(t, e) {
                return this._file.getNodesForElement(this._nodeList[t], e)
            }
            ,
            t.prototype.getFolder = function(t) {
                return this._file.getFolder(this._nodeList[t])
            }
            ,
            t.prototype.getFile = function(t) {
                return this._file.getFile(this._nodeList[t])
            }
            ,
            t.prototype.getTag = function(t) {
                return this._file.getTag(this._nodeList[t])
            }
            ,
            t.prototype.getEntity = function(t) {
                return this._file.getEntity(this._nodeList[t])
            }
            ,
            t.prototype.getObjectInfo = function(t) {
                return this._file.getObjectInfo(this._nodeList[t], t)
            }
            ,
            t.prototype.getCharMap = function(t) {
                return this._file.getCharMap(this._nodeList[t])
            }
            ,
            t.prototype.getCharMapEntry = function(t, e, i) {
                this._file.getCharMapEntry(this._nodeList[t], e, i)
            }
            ,
            t.prototype.getVariable = function(t) {
                return this._file.getVariable(this._nodeList[t])
            }
            ,
            t.prototype.getAnimation = function(t) {
                return this._file.getAnimation(this._nodeList[t])
            }
            ,
            t.prototype.getMainline = function(t) {
                return this._file.getBaseline(this._nodeList[t])
            }
            ,
            t.prototype.getMainlineKey = function(t) {
                return this._file.getMainlineKey(this._nodeList[t])
            }
            ,
            t.prototype.getRef = function(t) {
                return this._file.getRef(this._nodeList[t])
            }
            ,
            t.prototype.getTimeline = function(t) {
                return this._file.getTimeline(this._nodeList[t])
            }
            ,
            t.prototype.getSoundline = function(t) {
                return this._file.getBaseline(this._nodeList[t])
            }
            ,
            t.prototype.getEventline = function(t) {
                return this._file.getBaseline(this._nodeList[t])
            }
            ,
            t.prototype.getTagline = function(t) {
                return this._file.getBaseline(this._nodeList[t])
            }
            ,
            t.prototype.getVarline = function(t) {
                return this._file.getVarline(this._nodeList[t])
            }
            ,
            t.prototype.getKey = function(t) {
                return this._file.getKey(this._nodeList[t])
            }
            ,
            t.prototype.getTagKey = function(t) {
                return this._file.getTagKey(this._nodeList[t])
            }
            ,
            t.prototype.getVariableKey = function(t, e) {
                return this._file.getVariableKey(this._nodeList[t], e)
            }
            ,
            t.prototype.getTimelineKey = function(t, e) {
                return this._file.getTimelineKey(this._nodeList[t], t, e)
            }
            ,
            t.prototype.getTagChanges = function() {
                for (var t = 0, e = 0; e < this.length(); e++) {
                    var i = this._file.getTagChange(this._nodeList[e]);
                    t |= 1 << i
                }
                return t
            }
            ,
            t
    }();
    t.NodeListBin = e
}(Spriter || (Spriter = {}));
var Spriter;
!function(t) {
    var e = function() {
        function t(t, e) {
            this._file = t,
                this._nodeList = e,
            Array.isArray(e) || (e.length = 1)
        }
        return t.prototype.length = function() {
            return this._nodeList.length
        }
            ,
            t.prototype.processed = function() {
                this._file.processed()
            }
            ,
            t.prototype.getNode = function(t) {
                return Array.isArray(this._nodeList) ? this._nodeList[t] : this._nodeList
            }
            ,
            t.prototype.getChildNodes = function(t, e) {
                return this._file.getNodesForElement(this.getNode(t), e)
            }
            ,
            t.prototype.getFolder = function(t) {
                return this._file.getFolder(this.getNode(t))
            }
            ,
            t.prototype.getFile = function(t) {
                return this._file.getFile(this.getNode(t))
            }
            ,
            t.prototype.getTag = function(t) {
                return this._file.getTag(this.getNode(t))
            }
            ,
            t.prototype.getEntity = function(t) {
                return this._file.getEntity(this.getNode(t))
            }
            ,
            t.prototype.getObjectInfo = function(t) {
                return this._file.getObjectInfo(this.getNode(t), t)
            }
            ,
            t.prototype.getCharMap = function(t) {
                return this._file.getCharMap(this.getNode(t))
            }
            ,
            t.prototype.getCharMapEntry = function(t, e, i) {
                this._file.getCharMapEntry(this.getNode(t), e, i)
            }
            ,
            t.prototype.getVariable = function(t) {
                return this._file.getVariable(this.getNode(t))
            }
            ,
            t.prototype.getAnimation = function(t) {
                return this._file.getAnimation(this.getNode(t))
            }
            ,
            t.prototype.getMainline = function(t) {
                return this._file.getBaseline(this.getNode(t))
            }
            ,
            t.prototype.getMainlineKey = function(t) {
                return this._file.getMainlineKey(this.getNode(t))
            }
            ,
            t.prototype.getRef = function(t) {
                return this._file.getRef(this.getNode(t))
            }
            ,
            t.prototype.getTimeline = function(t) {
                return this._file.getTimeline(this.getNode(t))
            }
            ,
            t.prototype.getSoundline = function(t) {
                return this._file.getBaseline(this.getNode(t))
            }
            ,
            t.prototype.getEventline = function(t) {
                return this._file.getBaseline(this.getNode(t))
            }
            ,
            t.prototype.getTagline = function(t) {
                return this._file.getBaseline(this.getNode(t))
            }
            ,
            t.prototype.getVarline = function(t) {
                return this._file.getVarline(this.getNode(t))
            }
            ,
            t.prototype.getKey = function(t) {
                return this._file.getKey(this.getNode(t))
            }
            ,
            t.prototype.getTagKey = function(t) {
                return this._file.getTagKey(this.getNode(t))
            }
            ,
            t.prototype.getVariableKey = function(t, e) {
                return this._file.getVariableKey(this.getNode(t), e)
            }
            ,
            t.prototype.getTimelineKey = function(t, e) {
                return this._file.getTimelineKey(this.getNode(t), t, e)
            }
            ,
            t.prototype.getTagChanges = function() {
                for (var t = 0, e = 0; e < this.length(); e++) {
                    var i = this._file.getTagChange(this.getNode(e));
                    t |= 1 << i
                }
                return t
            }
            ,
            t
    }();
    t.NodeListJSON = e
}(Spriter || (Spriter = {}));
var Spriter;
!function(t) {
    var e = function() {
        function t(t, e) {
            this._file = t,
                this._nodeList = e
        }
        return t.prototype.length = function() {
            return this._nodeList.length
        }
            ,
            t.prototype.processed = function() {
                this._file.processed()
            }
            ,
            t.prototype.getChildNodes = function(t, e) {
                return this._file.getNodesForElement(this._nodeList.item(t), e)
            }
            ,
            t.prototype.getFolder = function(t) {
                return this._file.getFolder(this._nodeList.item(t))
            }
            ,
            t.prototype.getFile = function(t) {
                return this._file.getFile(this._nodeList.item(t))
            }
            ,
            t.prototype.getTag = function(t) {
                return this._file.getTag(this._nodeList.item(t))
            }
            ,
            t.prototype.getEntity = function(t) {
                return this._file.getEntity(this._nodeList.item(t))
            }
            ,
            t.prototype.getObjectInfo = function(t) {
                return this._file.getObjectInfo(this._nodeList.item(t), t)
            }
            ,
            t.prototype.getCharMap = function(t) {
                return this._file.getCharMap(this._nodeList.item(t))
            }
            ,
            t.prototype.getCharMapEntry = function(t, e, i) {
                this._file.getCharMapEntry(this._nodeList.item(t), e, i)
            }
            ,
            t.prototype.getVariable = function(t) {
                return this._file.getVariable(this._nodeList.item(t))
            }
            ,
            t.prototype.getAnimation = function(t) {
                return this._file.getAnimation(this._nodeList.item(t))
            }
            ,
            t.prototype.getMainline = function(t) {
                return this._file.getBaseline(this._nodeList.item(t))
            }
            ,
            t.prototype.getMainlineKey = function(t) {
                return this._file.getMainlineKey(this._nodeList.item(t))
            }
            ,
            t.prototype.getRef = function(t) {
                return this._file.getRef(this._nodeList.item(t))
            }
            ,
            t.prototype.getTimeline = function(t) {
                return this._file.getTimeline(this._nodeList.item(t))
            }
            ,
            t.prototype.getSoundline = function(t) {
                return this._file.getBaseline(this._nodeList.item(t))
            }
            ,
            t.prototype.getEventline = function(t) {
                return this._file.getBaseline(this._nodeList.item(t))
            }
            ,
            t.prototype.getTagline = function(t) {
                return this._file.getBaseline(this._nodeList.item(t))
            }
            ,
            t.prototype.getVarline = function(t) {
                return this._file.getVarline(this._nodeList.item(t))
            }
            ,
            t.prototype.getKey = function(t) {
                return this._file.getKey(this._nodeList.item(t))
            }
            ,
            t.prototype.getTagKey = function(t) {
                return this._file.getTagKey(this._nodeList.item(t))
            }
            ,
            t.prototype.getVariableKey = function(t, e) {
                return this._file.getVariableKey(this._nodeList.item(t), e)
            }
            ,
            t.prototype.getTimelineKey = function(t, e) {
                return this._file.getTimelineKey(this._nodeList.item(t), t, e)
            }
            ,
            t.prototype.getTagChanges = function() {
                for (var t = 0, e = 0; e < this.length(); e++) {
                    var i = this._file.getTagChange(this._nodeList.item(e));
                    t |= 1 << i
                }
                return t
            }
            ,
            t
    }();
    t.NodeListXml = e
}(Spriter || (Spriter = {}));
var Spriter;
!function(t) {
    !function(t) {
        t[t.XML = 0] = "XML",
            t[t.JSON = 1] = "JSON",
            t[t.BIN = 2] = "BIN"
    }(t.eFileType || (t.eFileType = {}));
    t.eFileType;
    !function(t) {
        t[t.ORIGINAL = 0] = "ORIGINAL",
            t[t.NAME_ONLY = 1] = "NAME_ONLY",
            t[t.NAME_AND_EXTENSION = 2] = "NAME_AND_EXTENSION",
            t[t.FULL_PATH_NO_EXTENSION = 3] = "FULL_PATH_NO_EXTENSION"
    }(t.eImageNameType || (t.eImageNameType = {}));
    var e = t.eImageNameType
        , i = function() {
        function t(t) {
            var i = "undefined" != typeof t && null !== t;
            this._imageNameType = i && "undefined" != typeof t.imageNameType ? t.imageNameType : e.NAME_ONLY,
                this._minDefs = i && "undefined" != typeof t.minDefs ? t.minDefs : null
        }
        return t.prototype.processed = function() {
            this.popMinDefsStack()
        }
            ,
            t.prototype.setMinimized = function(t) {
                return this._minimized = t,
                    t && (this._minDefsStack = [],
                    null === this._minDefs) ? void console.error("Spriter file is minimized - you must provide object with name definitions") : void 0
            }
            ,
            t.prototype.getFileName = function(t) {
                var i;
                switch (this._imageNameType) {
                    case e.NAME_ONLY:
                        i = t.split("\\").pop().split("/").pop().split(".")[0];
                        break;
                    case e.NAME_AND_EXTENSION:
                        i = t.split("\\").pop().split("/").pop();
                        break;
                    case e.FULL_PATH_NO_EXTENSION:
                        i = t.split(".")[0];
                        break;
                    case e.ORIGINAL:
                        i = t
                }
                return i
            }
            ,
            t.prototype.translateElementName = function(t) {
                if (this._minimized) {
                    if (this._minDefs.name !== t)
                        return console.warn("current definition is " + this._minDefs.name),
                            t;
                    null !== this._minDefs.minName && (t = this._minDefs.minName)
                }
                return t
            }
            ,
            t.prototype.translateChildElementName = function(t) {
                if (this._minimized && null !== this._minDefs) {
                    var e = this._minDefs.childElements;
                    null !== e && (t = null === e[t] ? t : e[t].minName)
                }
                return t
            }
            ,
            t.prototype.translateAttributeName = function(t) {
                if (this._minimized && null !== this._minDefs) {
                    var e = this._minDefs.attributes;
                    null !== e && (t = null === e[t] ? t : e[t])
                }
                return t
            }
            ,
            t.prototype.setMinDefsToElementName = function(t) {
                if (this._minimized) {
                    this._minDefsStack.push(this._minDefs);
                    var e = this._minDefs.childElements[t];
                    this._minDefs = e
                }
            }
            ,
            t.prototype.popMinDefsStack = function() {
                this._minimized && (this._minDefs = this._minDefsStack.pop())
            }
            ,
            t
    }();
    t.SpriterFile = i
}(Spriter || (Spriter = {}));
var Spriter;
!function(t) {
    var e = function(e) {
        function i(t) {
            e.call(this, null),
                this._elements = {
                    spriter_data: 1,
                    folder: 2,
                    file: 3,
                    entity: 4,
                    obj_info: 5,
                    frames: 6,
                    i: 7,
                    animation: 8,
                    mainline: 9,
                    key: 10,
                    bone_ref: 11,
                    object_ref: 12,
                    timeline: 13,
                    bone: 14,
                    object: 15
                },
                this._smallOffset = !1,
                this._bin = new DataView(t),
                this._smallOffset = 1 === this._bin.getUint8(0)
        }
        return __extends(i, e),
            i.prototype.getType = function() {
                return t.eFileType.BIN
            }
            ,
            i.prototype.readUint8 = function() {
                return this._bin.getUint8(this._tmpPosition++)
            }
            ,
            i.prototype.readInt8 = function() {
                return this._bin.getInt8(this._tmpPosition++)
            }
            ,
            i.prototype.readUint16 = function() {
                var t = this._bin.getUint16(this._tmpPosition, !0);
                return this._tmpPosition += 2,
                    t
            }
            ,
            i.prototype.readInt16 = function() {
                var t = this._bin.getInt16(this._tmpPosition, !0);
                return this._tmpPosition += 2,
                    t
            }
            ,
            i.prototype.readUint32 = function() {
                var t = this._bin.getUint32(this._tmpPosition, !0);
                return this._tmpPosition += 4,
                    t
            }
            ,
            i.prototype.readInt32 = function() {
                var t = this._bin.getInt32(this._tmpPosition, !0);
                return this._tmpPosition += 4,
                    t
            }
            ,
            i.prototype.readFixed16_16 = function() {
                var t = this._bin.getInt32(this._tmpPosition, !0);
                return this._tmpPosition += 4,
                t / 65536
            }
            ,
            i.prototype.readFixed1_7 = function() {
                var t = 255 & this._bin.getInt8(this._tmpPosition++);
                return t / 128
            }
            ,
            i.prototype.readString = function() {
                for (var t = [], e = this._bin.getUint8(this._tmpPosition++) - 1; e >= 0; e--)
                    t.push(this._bin.getUint8(this._tmpPosition++));
                return String.fromCharCode.apply(null, t)
            }
            ,
            i.prototype.getNodes = function(e) {
                return new t.NodeListBin(this,this.getSubNodesOfElementType(1, this._elements[e]))
            }
            ,
            i.prototype.getNodesForElement = function(e, i) {
                return new t.NodeListBin(this,this.getSubNodesOfElementType(e, this._elements[i]))
            }
            ,
            i.prototype.getSubNodesOfElementType = function(t, e) {
                var i = []
                    , s = this._bin.getUint8(t + 1);
                t += 2;
                for (var n = 0; s > n; n++) {
                    var r = this._smallOffset ? this._bin.getUint16(t + 2 * n, !0) : this._bin.getUint32(t + 4 * n, !0)
                        , o = this._bin.getUint8(t + r);
                    o === e && i.push(t + r)
                }
                return i
            }
            ,
            i.prototype.getAttribsPosition = function(t) {
                var e = this._bin.getUint8(t + 1);
                return t + 2 + e * (this._smallOffset ? 2 : 4)
            }
            ,
            i.prototype.getFolder = function(e) {
                this._tmpPosition = this.getAttribsPosition(e);
                for (var s = 0, n = "", r = this._bin.getUint8(this._tmpPosition++) - 1; r >= 0; r--)
                    switch (this._bin.getUint8(this._tmpPosition++)) {
                        case i.ATTR_FOLDER_ID:
                            s = this.readUint8();
                            break;
                        case i.ATTR_FOLDER_NAME:
                            n = this.readString()
                    }
                return new t.Folder(s,n)
            }
            ,
            i.prototype.getFile = function(e) {
                console.log("skip sound loading"),
                    this._tmpPosition = this.getAttribsPosition(e);
                for (var s = 0, n = "", r = 0, o = 0, a = this._bin.getUint8(this._tmpPosition++) - 1; a >= 0; a--)
                    switch (this._bin.getUint8(this._tmpPosition++)) {
                        case i.ATTR_FILE_ID:
                            s = this.readUint8();
                            break;
                        case i.ATTR_FILE_NAME:
                            n = this.readString();
                            break;
                        case i.ATTR_FILE_PIVOT_X:
                            r = this.readFixed16_16();
                            break;
                        case i.ATTR_FILE_PIVOT_Y:
                            o = this.readFixed16_16();
                            break;
                        case i.ATTR_FILE_WIDTH:
                        case i.ATTR_FILE_HEIGHT:
                            this._tmpPosition += 2
                    }
                return new t.File(s,this.getFileName(n),r,1 - o)
            }
            ,
            i.prototype.getTag = function() {
                return console.error("implement loading Tag"),
                    null
            }
            ,
            i.prototype.getEntity = function(e) {
                this._tmpPosition = this.getAttribsPosition(e);
                for (var s = 0, n = "", r = this._bin.getUint8(this._tmpPosition++) - 1; r >= 0; r--)
                    switch (this._bin.getUint8(this._tmpPosition++)) {
                        case i.ATTR_ENTITY_ID:
                            s = this.readUint8();
                            break;
                        case i.ATTR_ENTITY_NAME:
                            n = this.readString()
                    }
                return new t.Entity(s,n)
            }
            ,
            i.prototype.getObjectInfo = function(e, s) {
                this._tmpPosition = this.getAttribsPosition(e);
                for (var n = "", r = 0, o = 0, a = 0, h = this._bin.getUint8(this._tmpPosition++) - 1; h >= 0; h--)
                    switch (this._bin.getUint8(this._tmpPosition++)) {
                        case i.ATTR_OBJ_INFO_NAME:
                            n = this.readString();
                            break;
                        case i.ATTR_OBJ_INFO_TYPE:
                            1 === this.readUint8() && (r = 1);
                            break;
                        case i.ATTR_OBJ_INFO_WIDTH:
                            o = this.readFixed16_16();
                            break;
                        case i.ATTR_OBJ_INFO_HEIGHT:
                            a = this.readFixed16_16()
                    }
                return console.error("add loading of pivots"),
                    new t.ObjectInfo(s,n,r,o,a,0,0)
            }
            ,
            i.prototype.getCharMap = function() {
                return console.error("add loading of charmaps"),
                    null
            }
            ,
            i.prototype.getCharMapEntry = function() {
                return console.error("add loading of charmap entries"),
                    null
            }
            ,
            i.prototype.getVariable = function() {
                return console.error("add loading of variables"),
                    null
            }
            ,
            i.prototype.getAnimation = function(e) {
                this._tmpPosition = this.getAttribsPosition(e);
                for (var s = 0, n = "", r = 0, o = t.eAnimationLooping.LOOPING, a = this._bin.getUint8(this._tmpPosition++) - 1; a >= 0; a--)
                    switch (this._bin.getUint8(this._tmpPosition++)) {
                        case i.ATTR_ANIMATION_ID:
                            s = this.readUint8();
                            break;
                        case i.ATTR_ANIMATION_NAME:
                            n = this.readString();
                            break;
                        case i.ATTR_ANIMATION_LENGTH:
                            r = this.readUint32();
                            break;
                        case i.ATTR_ANIMATION_INTERVAL:
                            this._tmpPosition += 2;
                            break;
                        case i.ATTR_ANIMATION_LOOPING:
                            o = 1 === this.readUint8() ? t.eAnimationLooping.LOOPING : t.eAnimationLooping.NO_LOOPING
                    }
                return new t.Animation(s,n,r,o)
            }
            ,
            i.prototype.getMainlineKey = function(e) {
                this._tmpPosition = this.getAttribsPosition(e);
                for (var s = 0, n = 0, r = this._bin.getUint8(this._tmpPosition++) - 1; r >= 0; r--)
                    switch (this._bin.getUint8(this._tmpPosition++)) {
                        case i.ATTR_MAINLINE_KEY_ID:
                            s = this.readUint8();
                            break;
                        case i.ATTR_MAINLINE_KEY_TIME:
                            n = this.readUint32()
                    }
                return new t.KeyMainline(s,n)
            }
            ,
            i.prototype.getRef = function(e) {
                this._tmpPosition = this.getAttribsPosition(e);
                for (var s = 0, n = -1, r = 0, o = 0, a = 0, h = this._bin.getUint8(this._tmpPosition++) - 1; h >= 0; h--)
                    switch (this._bin.getUint8(this._tmpPosition++)) {
                        case i.ATTR_BONE_REF_ID:
                        case i.ATTR_OBJ_REF_ID:
                            s = this.readUint8();
                            break;
                        case i.ATTR_BONE_REF_PARENT:
                        case i.ATTR_OBJ_REF_PARENT:
                            n = this.readUint8();
                            break;
                        case i.ATTR_BONE_REF_TIMELINE:
                        case i.ATTR_OBJ_REF_TIMELINE:
                            r = this.readUint8();
                            break;
                        case i.ATTR_BONE_REF_KEY:
                        case i.ATTR_OBJ_REF_KEY:
                            o = this.readUint8();
                            break;
                        case i.ATTR_OBJ_REF_Z:
                            a = this.readUint8();
                            break;
                        case i.ATTR_OBJ_REF_NAME:
                            this.readString();
                            break;
                        case i.ATTR_OBJ_REF_FOLDER:
                        case i.ATTR_OBJ_REF_FILE:
                            ++this._tmpPosition;
                            break;
                        case i.ATTR_OBJ_REF_ABS_X:
                        case i.ATTR_OBJ_REF_ABS_Y:
                        case i.ATTR_OBJ_REF_ABS_PIVOT_X:
                        case i.ATTR_OBJ_REF_ABS_PIVOT_Y:
                        case i.ATTR_OBJ_REF_ABS_SCALE_X:
                        case i.ATTR_OBJ_REF_ABS_SCALE_Y:
                        case i.ATTR_OBJ_REF_ANGLE:
                            this._tmpPosition += 4;
                            break;
                        case i.ATTR_OBJ_REF_ALPHA:
                            ++this._tmpPosition
                    }
                return new t.Ref(s,n,r,o,a)
            }
            ,
            i.prototype.getTimeline = function(e) {
                console.error("add loading of all types of objects"),
                    this._tmpPosition = this.getAttribsPosition(e);
                for (var s = 0, n = "", r = 0, o = 0, a = this._bin.getUint8(this._tmpPosition++) - 1; a >= 0; a--)
                    switch (this._bin.getUint8(this._tmpPosition++)) {
                        case i.ATTR_TIMELINE_ID:
                            s = this.readUint8();
                            break;
                        case i.ATTR_TIMELINE_NAME:
                            n = this.readString();
                            break;
                        case i.ATTR_TIMELINE_OBJ:
                            r = this.readUint8();
                            break;
                        case i.ATTR_TIMELINE_OBJ_TYPE:
                            1 === this.readUint8() && (o = 1)
                    }
                return new t.Timeline(s,n,o,r)
            }
            ,
            i.prototype.getBaseline = function() {
                return console.error("add loading of baselines"),
                    null
            }
            ,
            i.prototype.getVarline = function() {
                return console.error("add loading of varlines"),
                    null
            }
            ,
            i.prototype.getKey = function() {
                return console.error("add loading of keys"),
                    null
            }
            ,
            i.prototype.getTagKey = function() {
                return console.error("add loading of tag keys"),
                    null
            }
            ,
            i.prototype.getVariableKey = function() {
                return console.error("add loading of variable keys"),
                    null
            }
            ,
            i.prototype.getTimelineKey = function(e, s, n) {
                this._tmpPosition = this.getAttribsPosition(e);
                for (var r = 0, o = 1, a = 0, h = 0, l = 0, c = 0, u = 0, d = this._bin.getUint8(this._tmpPosition++) - 1; d >= 0; d--)
                    switch (this._bin.getUint8(this._tmpPosition++)) {
                        case i.ATTR_TIMELINE_KEY_ID:
                            ++this._tmpPosition;
                            break;
                        case i.ATTR_TIMELINE_KEY_TIME:
                            r = this.readUint32();
                            break;
                        case i.ATTR_TIMELINE_KEY_SPIN:
                            o = this.readInt8();
                            break;
                        case i.ATTR_TIMELINE_KEY_CURVE:
                            a = this.readUint8();
                            break;
                        case i.ATTR_TIMELINE_KEY_C1:
                            h = this.readFixed1_7();
                            break;
                        case i.ATTR_TIMELINE_KEY_C2:
                            l = this.readFixed1_7()
                    }
                e += 2;
                var p = e + (this._smallOffset ? this._bin.getUint16(e, !0) : this._bin.getUint32(e, !0))
                    , f = this._bin.getUint8(p)
                    , g = null
                    , m = !1;
                14 === f ? g = new t.KeyBone(s,r,o) : 15 === f && (g = new t.KeyObject(s,r,o),
                    m = !0),
                0 !== a && g.setCurve(a, h, l, c, u),
                    this._tmpPosition = this.getAttribsPosition(p);
                var y = g.info;
                y.x = 0,
                    y.y = 0,
                    y.scaleX = 1,
                    y.scaleY = 1,
                    y.angle = 0,
                    y.alpha = 1;
                for (var v = 0, b = !1, x = 0, _ = !1, w = 0, T = 0, d = this._bin.getUint8(this._tmpPosition++) - 1; d >= 0; d--)
                    switch (this._bin.getUint8(this._tmpPosition++)) {
                        case i.ATTR_BONE_X:
                        case i.ATTR_OBJ_X:
                            y.x = this.readFixed16_16();
                            break;
                        case i.ATTR_BONE_Y:
                        case i.ATTR_OBJ_Y:
                            y.y = -this.readFixed16_16();
                            break;
                        case i.ATTR_BONE_ANGLE:
                        case i.ATTR_OBJ_ANGLE:
                            y.angle = 360 - this.readFixed16_16();
                            break;
                        case i.ATTR_BONE_SCALE_X:
                        case i.ATTR_OBJ_SCALE_X:
                            y.scaleX = this.readFixed16_16();
                            break;
                        case i.ATTR_BONE_SCALE_Y:
                        case i.ATTR_OBJ_SCALE_Y:
                            y.scaleY = this.readFixed16_16();
                            break;
                        case i.ATTR_OBJ_FOLDER:
                            w = this.readUint8();
                            break;
                        case i.ATTR_OBJ_FILE:
                            T = this.readUint8();
                            break;
                        case i.ATTR_OBJ_PIVOT_X:
                            v = this.readFixed16_16(),
                                b = !0;
                            break;
                        case i.ATTR_OBJ_PIVOT_Y:
                            x = this.readFixed16_16(),
                                _ = !0;
                            break;
                        case i.ATTR_OBJ_ALPHA:
                            y.alpha = this.readFixed1_7()
                    }
                if (m) {
                    g.setFolderAndFile(w, T);
                    var P = n.getFolderById(w).getFileById(T);
                    y.pivotX = b ? v : P.pivotX,
                        y.pivotY = 1 - (_ ? x : 1 - P.pivotY)
                }
                return g
            }
            ,
            i.prototype.getTagChange = function() {
                return console.error("add loading of tag changes"),
                    null
            }
            ,
            i.ATTR_VERSION = 0,
            i.ATTR_GENERATOR = 1,
            i.ATTR_GENERATOR_VERSION = 2,
            i.ATTR_FOLDER_ID = 0,
            i.ATTR_FOLDER_NAME = 1,
            i.ATTR_FILE_ID = 0,
            i.ATTR_FILE_NAME = 1,
            i.ATTR_FILE_WIDTH = 2,
            i.ATTR_FILE_HEIGHT = 3,
            i.ATTR_FILE_PIVOT_X = 4,
            i.ATTR_FILE_PIVOT_Y = 5,
            i.ATTR_ENTITY_ID = 0,
            i.ATTR_ENTITY_NAME = 1,
            i.ATTR_OBJ_INFO_NAME = 0,
            i.ATTR_OBJ_INFO_TYPE = 1,
            i.ATTR_OBJ_INFO_WIDTH = 2,
            i.ATTR_OBJ_INFO_HEIGHT = 3,
            i.ATTR_FRAMES_I_FOLDER = 0,
            i.ATTR_FRAMES_I_FILE = 1,
            i.ATTR_ANIMATION_ID = 0,
            i.ATTR_ANIMATION_NAME = 1,
            i.ATTR_ANIMATION_LENGTH = 2,
            i.ATTR_ANIMATION_INTERVAL = 3,
            i.ATTR_ANIMATION_LOOPING = 4,
            i.ATTR_MAINLINE_KEY_ID = 0,
            i.ATTR_MAINLINE_KEY_TIME = 1,
            i.ATTR_BONE_REF_ID = 0,
            i.ATTR_BONE_REF_PARENT = 1,
            i.ATTR_BONE_REF_TIMELINE = 2,
            i.ATTR_BONE_REF_KEY = 3,
            i.ATTR_OBJ_REF_ID = 4,
            i.ATTR_OBJ_REF_PARENT = 5,
            i.ATTR_OBJ_REF_TIMELINE = 6,
            i.ATTR_OBJ_REF_KEY = 7,
            i.ATTR_OBJ_REF_NAME = 8,
            i.ATTR_OBJ_REF_Z = 9,
            i.ATTR_OBJ_REF_FOLDER = 10,
            i.ATTR_OBJ_REF_FILE = 11,
            i.ATTR_OBJ_REF_ABS_X = 12,
            i.ATTR_OBJ_REF_ABS_Y = 13,
            i.ATTR_OBJ_REF_ABS_PIVOT_X = 14,
            i.ATTR_OBJ_REF_ABS_PIVOT_Y = 15,
            i.ATTR_OBJ_REF_ABS_SCALE_X = 16,
            i.ATTR_OBJ_REF_ABS_SCALE_Y = 17,
            i.ATTR_OBJ_REF_ANGLE = 18,
            i.ATTR_OBJ_REF_ALPHA = 19,
            i.ATTR_TIMELINE_ID = 0,
            i.ATTR_TIMELINE_NAME = 1,
            i.ATTR_TIMELINE_OBJ = 2,
            i.ATTR_TIMELINE_OBJ_TYPE = 3,
            i.ATTR_TIMELINE_KEY_ID = 0,
            i.ATTR_TIMELINE_KEY_TIME = 1,
            i.ATTR_TIMELINE_KEY_SPIN = 2,
            i.ATTR_TIMELINE_KEY_CURVE = 3,
            i.ATTR_TIMELINE_KEY_C1 = 4,
            i.ATTR_TIMELINE_KEY_C2 = 5,
            i.ATTR_BONE_X = 0,
            i.ATTR_BONE_Y = 1,
            i.ATTR_BONE_ANGLE = 2,
            i.ATTR_BONE_SCALE_X = 3,
            i.ATTR_BONE_SCALE_Y = 4,
            i.ATTR_OBJ_FOLDER = 5,
            i.ATTR_OBJ_FILE = 6,
            i.ATTR_OBJ_X = 7,
            i.ATTR_OBJ_Y = 8,
            i.ATTR_OBJ_SCALE_X = 9,
            i.ATTR_OBJ_SCALE_Y = 10,
            i.ATTR_OBJ_PIVOT_X = 11,
            i.ATTR_OBJ_PIVOT_Y = 12,
            i.ATTR_OBJ_ANGLE = 13,
            i.ATTR_OBJ_ALPHA = 14,
            i
    }(t.SpriterFile);
    t.SpriterBin = e
}(Spriter || (Spriter = {}));
var Spriter;
!function(t) {
    var e = function(e) {
        function i(t, i) {
            e.call(this, i),
                this._json = t;
            var s = void 0 !== t.min;
            this.setMinimized(s)
        }
        return __extends(i, e),
            i.prototype.getType = function() {
                return t.eFileType.JSON
            }
            ,
            i.prototype.parseInt = function(t, e, i) {
                void 0 === i && (i = 0);
                var s = t[this.translateAttributeName(e)];
                return void 0 === s ? i : "number" == typeof s ? s : parseInt(s)
            }
            ,
            i.prototype.parseFloat = function(t, e, i) {
                void 0 === i && (i = 0);
                var s = t[this.translateAttributeName(e)];
                return void 0 === s ? i : "number" == typeof s ? s : parseFloat(s)
            }
            ,
            i.prototype.parseBoolean = function(t, e, i) {
                void 0 === i && (i = !1);
                var s = t[this.translateAttributeName(e)];
                return void 0 === s ? i : "boolean" == typeof s ? s : "true" === s
            }
            ,
            i.prototype.parseString = function(t, e, i) {
                void 0 === i && (i = "");
                var s = t[this.translateAttributeName(e)];
                return void 0 === s ? i : s
            }
            ,
            i.prototype.getNodes = function(e) {
                this.setMinDefsToElementName(e);
                var i = this.translateElementName(e);
                return new t.NodeListJSON(this,void 0 !== this._json[i] ? this._json[i] : [])
            }
            ,
            i.prototype.getNodesForElement = function(e, i) {
                this.setMinDefsToElementName(i);
                var s = this.translateElementName(i);
                return new t.NodeListJSON(this,void 0 !== e[s] ? e[s] : [])
            }
            ,
            i.prototype.getFolder = function(e) {
                return new t.Folder(this.parseInt(e, "id"),this.parseString(e, "name"))
            }
            ,
            i.prototype.getFile = function(e) {
                return void 0 !== e.type && "sound" === e.type ? null : new t.File(this.parseInt(e, "id"),this.getFileName(this.parseString(e, "name")),this.parseFloat(e, "pivot_x"),1 - this.parseFloat(e, "pivot_y"))
            }
            ,
            i.prototype.getTag = function(e) {
                return new t.Item(this.parseInt(e, "id"),this.parseString(e, "name"))
            }
            ,
            i.prototype.getEntity = function(e) {
                return new t.Entity(this.parseInt(e, "id"),this.parseString(e, "name"))
            }
            ,
            i.prototype.getObjectInfo = function(e, i) {
                return new t.ObjectInfo(i,this.parseString(e, "name"),t.Types.getObjectTypeForName(this.parseString(e, "type")),this.parseFloat(e, "w"),this.parseFloat(e, "h"),this.parseFloat(e, "pivot_x"),this.parseFloat(e, "pivot_y"))
            }
            ,
            i.prototype.getCharMap = function(e) {
                return new t.CharMap(this.parseInt(e, "id"),this.parseString(e, "name"))
            }
            ,
            i.prototype.getCharMapEntry = function(t, e, i) {
                var s = i.getFolderById(this.parseInt(t, "folder")).getFileById(this.parseInt(t, "file")).name
                    , n = null;
                void 0 !== t.target_folder && void 0 !== t.target_file && (n = i.getFolderById(this.parseInt(t, "target_folder")).getFileById(this.parseInt(t, "target_file"))),
                    e.put(s, n)
            }
            ,
            i.prototype.getVariable = function(e) {
                var i = t.Types.getVariableTypeForName(this.parseString(e, "type"));
                return new t.Variable(this.parseInt(e, "id"),this.parseString(e, "name"),i,2 === i ? this.parseString(e, "default") : this.parseFloat(e, "default", 0))
            }
            ,
            i.prototype.getAnimation = function(e) {
                return new t.Animation(this.parseInt(e, "id"),this.parseString(e, "name"),this.parseFloat(e, "length"),this.parseBoolean(e, "looping", !0) === !0 ? t.eAnimationLooping.LOOPING : t.eAnimationLooping.NO_LOOPING)
            }
            ,
            i.prototype.getMainlineKey = function(e) {
                return new t.KeyMainline(this.parseInt(e, "id"),this.parseFloat(e, "time"))
            }
            ,
            i.prototype.getRef = function(e) {
                return new t.Ref(this.parseInt(e, "id"),this.parseInt(e, "parent", -1),this.parseInt(e, "timeline"),this.parseInt(e, "key"),this.parseInt(e, "z_index"))
            }
            ,
            i.prototype.getTimeline = function(e) {
                return new t.Timeline(this.parseInt(e, "id"),this.parseString(e, "name"),t.Types.getObjectTypeForName(this.parseString(e, "object_type", "sprite")),this.parseInt(e, "obj", -1))
            }
            ,
            i.prototype.getBaseline = function(e) {
                return new t.Baseline(this.parseInt(e, "id"),this.parseString(e, "name", null))
            }
            ,
            i.prototype.getVarline = function(e) {
                return new t.Varline(this.parseInt(e, "id"),this.parseInt(e, "def"))
            }
            ,
            i.prototype.getKey = function(e) {
                return new t.Key(this.parseInt(e, "id"),this.parseInt(e, "time"))
            }
            ,
            i.prototype.getTagKey = function(e) {
                return new t.KeyTag(this.parseInt(e, "id"),this.parseInt(e, "time"))
            }
            ,
            i.prototype.getVariableKey = function(e, i) {
                return new t.KeyVariable(this.parseInt(e, "id"),this.parseInt(e, "time"),2 === i ? this.parseString(e, "val") : this.parseFloat(e, "val"))
            }
            ,
            i.prototype.getTimelineKey = function(e, i, s) {
                var n = this.parseInt(e, "time")
                    , r = this.parseInt(e, "spin", 1)
                    , o = this.parseString(e, "curve_type", "linear")
                    , a = this.parseFloat(e, "c1", 0)
                    , h = this.parseFloat(e, "c2", 0)
                    , l = this.parseFloat(e, "c3", 0)
                    , c = this.parseFloat(e, "c4", 0)
                    , u = this.translateChildElementName("bone")
                    , d = this.translateChildElementName("object")
                    , p = null
                    , f = null
                    , g = !1;
                void 0 !== e[u] ? (f = e[u],
                    p = new t.KeyBone(i,n,r),
                    this.setMinDefsToElementName("bone")) : void 0 !== e[d] && (f = e[d],
                    p = new t.KeyObject(i,n,r),
                    this.setMinDefsToElementName("object"),
                    g = !0),
                "linear" !== o && p.setCurve(t.Types.getCurveTypeForName(o), a, h, l, c);
                var m = p.info;
                if (m.x = this.parseFloat(f, "x"),
                        m.y = -this.parseFloat(f, "y"),
                        m.scaleX = this.parseFloat(f, "scale_x", 1),
                        m.scaleY = this.parseFloat(f, "scale_y", 1),
                        m.angle = 360 - this.parseFloat(f, "angle"),
                        m.alpha = this.parseFloat(f, "a", 1),
                        g) {
                    var y = this.parseInt(f, "folder")
                        , v = this.parseInt(f, "file");
                    p.setFolderAndFile(y, v);
                    var b = s.getFolderById(y).getFileById(v);
                    m.pivotX = this.parseFloat(f, "pivot_x", b.pivotX),
                        m.pivotY = 1 - this.parseFloat(f, "pivot_y", 1 - b.pivotY)
                }
                return this.popMinDefsStack(),
                    p
            }
            ,
            i.prototype.getTagChange = function(t) {
                return this.parseInt(t, "t")
            }
            ,
            i
    }(t.SpriterFile);
    t.SpriterJSON = e
}(Spriter || (Spriter = {}));
var Spriter;
!function(t) {
    var e = function(e) {
        function i(t, i) {
            e.call(this, i),
                this._xml = t;
            var s = t.documentElement.hasAttribute("min");
            this.setMinimized(s)
        }
        return __extends(i, e),
            i.prototype.getType = function() {
                return t.eFileType.XML
            }
            ,
            i.prototype.parseInt = function(t, e, i) {
                void 0 === i && (i = 0);
                var s = t.getAttribute(this.translateAttributeName(e));
                return null !== s ? parseInt(s) : i
            }
            ,
            i.prototype.parseFloat = function(t, e, i) {
                void 0 === i && (i = 0);
                var s = t.getAttribute(this.translateAttributeName(e));
                return null !== s ? parseFloat(s) : i
            }
            ,
            i.prototype.parseString = function(t, e, i) {
                void 0 === i && (i = "");
                var s = t.getAttribute(this.translateAttributeName(e));
                return null !== s ? s : i
            }
            ,
            i.prototype.getNodes = function(e) {
                this.setMinDefsToElementName(e);
                var i = this.translateElementName(e);
                return new t.NodeListXml(this,this._xml.documentElement.getElementsByTagName(i))
            }
            ,
            i.prototype.getNodesForElement = function(e, i) {
                this.setMinDefsToElementName(i);
                var s = this.translateElementName(i);
                return new t.NodeListXml(this,e.getElementsByTagName(s))
            }
            ,
            i.prototype.getFolder = function(e) {
                return new t.Folder(this.parseInt(e, "id"),this.parseString(e, "name"))
            }
            ,
            i.prototype.getFile = function(e) {
                return e.hasAttribute("type") && "sound" === e.getAttribute("type") ? null : new t.File(this.parseInt(e, "id"),this.getFileName(this.parseString(e, "name")),this.parseFloat(e, "pivot_x"),1 - this.parseFloat(e, "pivot_y"))
            }
            ,
            i.prototype.getTag = function(e) {
                return new t.Item(this.parseInt(e, "id"),this.parseString(e, "name"))
            }
            ,
            i.prototype.getEntity = function(e) {
                return new t.Entity(this.parseInt(e, "id"),this.parseString(e, "name"))
            }
            ,
            i.prototype.getObjectInfo = function(e, i) {
                return new t.ObjectInfo(i,this.parseString(e, "name"),t.Types.getObjectTypeForName(this.parseString(e, "type")),this.parseFloat(e, "w"),this.parseFloat(e, "h"),this.parseFloat(e, "pivot_x"),this.parseFloat(e, "pivot_y"))
            }
            ,
            i.prototype.getCharMap = function(e) {
                return new t.CharMap(this.parseInt(e, "id"),this.parseString(e, "name"))
            }
            ,
            i.prototype.getCharMapEntry = function(t, e, i) {
                var s = i.getFolderById(this.parseInt(t, "folder")).getFileById(this.parseInt(t, "file")).name
                    , n = null;
                t.hasAttribute("target_folder") && t.hasAttribute("target_file") && (n = i.getFolderById(this.parseInt(t, "target_folder")).getFileById(this.parseInt(t, "target_file"))),
                    e.put(s, n)
            }
            ,
            i.prototype.getVariable = function(e) {
                var i = t.Types.getVariableTypeForName(this.parseString(e, "type"));
                return new t.Variable(this.parseInt(e, "id"),this.parseString(e, "name"),i,2 === i ? this.parseString(e, "default") : this.parseFloat(e, "default", 0))
            }
            ,
            i.prototype.getAnimation = function(e) {
                return new t.Animation(this.parseInt(e, "id"),this.parseString(e, "name"),this.parseFloat(e, "length"),"true" === this.parseString(e, "looping", "true") ? t.eAnimationLooping.LOOPING : t.eAnimationLooping.NO_LOOPING)
            }
            ,
            i.prototype.getMainlineKey = function(e) {
                return new t.KeyMainline(this.parseInt(e, "id"),this.parseFloat(e, "time"))
            }
            ,
            i.prototype.getRef = function(e) {
                return new t.Ref(this.parseInt(e, "id"),this.parseInt(e, "parent", -1),this.parseInt(e, "timeline"),this.parseInt(e, "key"),this.parseInt(e, "z_index"))
            }
            ,
            i.prototype.getTimeline = function(e) {
                return new t.Timeline(this.parseInt(e, "id"),this.parseString(e, "name"),t.Types.getObjectTypeForName(this.parseString(e, "object_type", "sprite")),this.parseInt(e, "obj", -1))
            }
            ,
            i.prototype.getBaseline = function(e) {
                return new t.Baseline(this.parseInt(e, "id"),this.parseString(e, "name", null))
            }
            ,
            i.prototype.getVarline = function(e) {
                return new t.Varline(this.parseInt(e, "id"),this.parseInt(e, "def"))
            }
            ,
            i.prototype.getKey = function(e) {
                return new t.Key(this.parseInt(e, "id"),this.parseInt(e, "time"))
            }
            ,
            i.prototype.getTagKey = function(e) {
                return new t.KeyTag(this.parseInt(e, "id"),this.parseInt(e, "time"))
            }
            ,
            i.prototype.getVariableKey = function(e, i) {
                return new t.KeyVariable(this.parseInt(e, "id"),this.parseInt(e, "time"),2 === i ? this.parseString(e, "val") : this.parseFloat(e, "val"))
            }
            ,
            i.prototype.getTimelineKey = function(e, i, s) {
                var n = this.parseInt(e, "time")
                    , r = this.parseInt(e, "spin", 1)
                    , o = this.parseString(e, "curve_type", "linear")
                    , a = this.parseFloat(e, "c1", 0)
                    , h = this.parseFloat(e, "c2", 0)
                    , l = this.parseFloat(e, "c3", 0)
                    , c = this.parseFloat(e, "c4", 0)
                    , u = this.translateChildElementName("bone")
                    , d = this.translateChildElementName("object")
                    , p = null
                    , f = e.firstElementChild
                    , g = !1;
                f.tagName === u ? (p = new t.KeyBone(i,n,r),
                    this.setMinDefsToElementName("bone")) : f.tagName === d && (this.setMinDefsToElementName("object"),
                    p = new t.KeyObject(i,n,r),
                    g = !0),
                "linear" !== o && p.setCurve(t.Types.getCurveTypeForName(o), a, h, l, c);
                var m = p.info;
                if (m.x = this.parseFloat(f, "x"),
                        m.y = -this.parseFloat(f, "y"),
                        m.scaleX = this.parseFloat(f, "scale_x", 1),
                        m.scaleY = this.parseFloat(f, "scale_y", 1),
                        m.angle = 360 - this.parseFloat(f, "angle"),
                        m.alpha = this.parseFloat(f, "a", 1),
                        g) {
                    var y = this.parseInt(f, "folder")
                        , v = this.parseInt(f, "file");
                    p.setFolderAndFile(y, v);
                    var b = s.getFolderById(y).getFileById(v);
                    m.pivotX = this.parseFloat(f, "pivot_x", b.pivotX),
                        m.pivotY = 1 - this.parseFloat(f, "pivot_y", 1 - b.pivotY)
                }
                return this.popMinDefsStack(),
                    p
            }
            ,
            i.prototype.getTagChange = function(t) {
                return this.parseInt(t, "t")
            }
            ,
            i
    }(t.SpriterFile);
    t.SpriterXml = e
}(Spriter || (Spriter = {}));
var Spriter;
!function(t) {
    var e = function() {
        function t(t, e) {
            this._id = t,
                this._name = e
        }
        return Object.defineProperty(t.prototype, "id", {
            get: function() {
                return this._id
            },
            enumerable: !0,
            configurable: !0
        }),
            Object.defineProperty(t.prototype, "name", {
                get: function() {
                    return this._name
                },
                enumerable: !0,
                configurable: !0
            }),
            t
    }();
    t.Item = e
}(Spriter || (Spriter = {}));
var Spriter;
!function(t) {
    !function(t) {
        t[t.NO_LOOPING = 0] = "NO_LOOPING",
            t[t.LOOPING = 1] = "LOOPING"
    }(t.eAnimationLooping || (t.eAnimationLooping = {}));
    var e = (t.eAnimationLooping,
        function(e) {
            function i(i, s, n, r) {
                e.call(this, i, s),
                    this._length = n,
                    this._loopType = r,
                    this._timelines = new t.IdNameMap,
                    this._lines = new t.IdNameMap
            }
            return __extends(i, e),
                Object.defineProperty(i.prototype, "mainline", {
                    get: function() {
                        return this._mainline
                    },
                    set: function(t) {
                        this._mainline = t
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                i.prototype.addTimeline = function(t) {
                    this._timelines.add(t, t.id, t.name)
                }
                ,
                i.prototype.getTimelineById = function(t) {
                    return this._timelines.getById(t)
                }
                ,
                i.prototype.getTimelineByName = function(t) {
                    return this._timelines.getByName(t)
                }
                ,
                i.prototype.addLine = function(t) {
                    this._lines.add(t, this._lines.length, t.name)
                }
                ,
                i.prototype.getLineById = function(t) {
                    return this._lines.getById(t)
                }
                ,
                i.prototype.getLineByName = function(t) {
                    return this._lines.getByName(t)
                }
                ,
                Object.defineProperty(i.prototype, "linesLength", {
                    get: function() {
                        return this._lines.length
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                Object.defineProperty(i.prototype, "length", {
                    get: function() {
                        return this._length
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                Object.defineProperty(i.prototype, "loopType", {
                    get: function() {
                        return this._loopType
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                i
        }(t.Item));
    t.Animation = e
}(Spriter || (Spriter = {}));
var Spriter;
!function(t) {
    var e = function(e) {
        function i(i, s) {
            e.call(this, i, s),
                this._objectInfos = new t.IdNameMap,
                this._charMaps = new t.IdNameMap,
                this._variables = new t.IdNameMap,
                this._animations = new t.IdNameMap
        }
        return __extends(i, e),
            i.prototype.addObjectInfo = function(t) {
                this._objectInfos.add(t, t.id, t.name)
            }
            ,
            i.prototype.getObjectInfoById = function(t) {
                return this._objectInfos.getById(t)
            }
            ,
            i.prototype.getObjectInfoByName = function(t) {
                return this._objectInfos.getByName(t)
            }
            ,
            i.prototype.addCharMap = function(t) {
                this._charMaps.add(t, t.id, t.name)
            }
            ,
            i.prototype.getCharMapById = function(t) {
                return this._charMaps.getById(t)
            }
            ,
            i.prototype.getCharMapByName = function(t) {
                return this._charMaps.getByName(t)
            }
            ,
            Object.defineProperty(i.prototype, "charMapsLength", {
                get: function() {
                    return this._charMaps.length
                },
                enumerable: !0,
                configurable: !0
            }),
            i.prototype.addVariable = function(t) {
                this._variables.add(t, t.id, t.name)
            }
            ,
            i.prototype.getVariableById = function(t) {
                return this._variables.getById(t)
            }
            ,
            i.prototype.getVariableByName = function(t) {
                return this._variables.getByName(t)
            }
            ,
            Object.defineProperty(i.prototype, "variablesLength", {
                get: function() {
                    return this._variables.length
                },
                enumerable: !0,
                configurable: !0
            }),
            i.prototype.addAnimation = function(t) {
                this._animations.add(t, t.id, t.name)
            }
            ,
            i.prototype.getAnimationById = function(t) {
                return this._animations.getById(t)
            }
            ,
            i.prototype.getAnimationByName = function(t) {
                return this._animations.getByName(t)
            }
            ,
            Object.defineProperty(i.prototype, "animationsLength", {
                get: function() {
                    return this._animations.length
                },
                enumerable: !0,
                configurable: !0
            }),
            i
    }(t.Item);
    t.Entity = e
}(Spriter || (Spriter = {}));
var Spriter;
!function(t) {
    var e = function(t) {
        function e(e, i, s, n) {
            t.call(this, e, i),
                this._pivotX = s,
                this._pivotY = n
        }
        return __extends(e, t),
            Object.defineProperty(e.prototype, "pivotX", {
                get: function() {
                    return this._pivotX
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "pivotY", {
                get: function() {
                    return this._pivotY
                },
                enumerable: !0,
                configurable: !0
            }),
            e
    }(t.Item);
    t.File = e
}(Spriter || (Spriter = {}));
var Spriter;
!function(t) {
    var e = function(e) {
        function i(i, s) {
            e.call(this, i, s),
                this._files = new t.IdNameMap
        }
        return __extends(i, e),
            i.prototype.addFile = function(t) {
                this._files.add(t, t.id, t.name)
            }
            ,
            i.prototype.getFileById = function(t) {
                return this._files.getById(t)
            }
            ,
            i.prototype.getFileByName = function(t) {
                return this._files.getByName(t)
            }
            ,
            i
    }(t.Item);
    t.Folder = e
}(Spriter || (Spriter = {}));
var Spriter;
!function(t) {
    var e = function(t) {
        function e() {
            t.apply(this, arguments)
        }
        return __extends(e, t),
            e.prototype.put = function(t, e) {
                void 0 === this._map && (this._map = {}),
                void 0 !== this._map[t] && console.error("Key with name " + t + " already exists"),
                    this._map[t] = e
            }
            ,
            e.prototype.value = function(t) {
                return this._map[t]
            }
            ,
            e
    }(t.Item);
    t.CharMap = e
}(Spriter || (Spriter = {}));
var Spriter;
!function(t) {
    var e = function() {
        function t(t) {
            this._stack = [],
                this._length = 0,
                this._entity = t
        }
        return t.prototype.reset = function() {
            this._length = 0
        }
            ,
            t.prototype.push = function(t) {
                var e = this.getCharMap(t);
                this._stack[this._length++] = e
            }
            ,
            t.prototype.remove = function(t) {
                var e = this.getCharMap(t)
                    , i = this.findCharMap(e);
                if (-1 !== i) {
                    for (var s = i; s < this._length - 2; s++)
                        this._stack[s] = this._stack[s + 1];
                    this._stack[--this._length] = null
                }
            }
            ,
            t.prototype.getFile = function(t) {
                for (var e = this._length - 1; e >= 0; e--) {
                    var i = this._stack[e].value(t.name);
                    if (void 0 !== i)
                        return i
                }
                return t
            }
            ,
            t.prototype.getCharMap = function(t) {
                var e = this._entity.getCharMapByName(t);
                return null === t && console.error("charmap with name " + t + " does not exist"),
                    e
            }
            ,
            t.prototype.findCharMap = function(t) {
                for (var e = 0; e < this._length; e++)
                    if (this._stack[e] === t)
                        return e;
                return -1
            }
            ,
            t
    }();
    t.CharMapStack = e
}(Spriter || (Spriter = {}));
var Spriter;
!function(t) {
    var e = function() {
        function t(t, e) {
            this._id = t,
                this._time = e
        }
        return Object.defineProperty(t.prototype, "id", {
            get: function() {
                return this._id
            },
            enumerable: !0,
            configurable: !0
        }),
            Object.defineProperty(t.prototype, "time", {
                get: function() {
                    return this._time
                },
                enumerable: !0,
                configurable: !0
            }),
            t
    }();
    t.Key = e
}(Spriter || (Spriter = {}));
var Spriter;
!function(t) {
    var e = function(t) {
        function e() {
            t.apply(this, arguments),
                this._boneRefs = [],
                this._objectRefs = []
        }
        return __extends(e, t),
            Object.defineProperty(e.prototype, "boneRefs", {
                get: function() {
                    return this._boneRefs
                },
                enumerable: !0,
                configurable: !0
            }),
            e.prototype.addBoneRef = function(t) {
                this._boneRefs.push(t)
            }
            ,
            Object.defineProperty(e.prototype, "objectRefs", {
                get: function() {
                    return this._objectRefs
                },
                enumerable: !0,
                configurable: !0
            }),
            e.prototype.addObjectRef = function(t) {
                this._objectRefs.push(t)
            }
            ,
            e
    }(t.Key);
    t.KeyMainline = e
}(Spriter || (Spriter = {}));
var Spriter;
!function(t) {
    var e = function(t) {
        function e() {
            t.apply(this, arguments)
        }
        return __extends(e, t),
            Object.defineProperty(e.prototype, "tagsOn", {
                get: function() {
                    return this._tagsOn
                },
                set: function(t) {
                    this._tagsOn = t
                },
                enumerable: !0,
                configurable: !0
            }),
            e
    }(t.Key);
    t.KeyTag = e
}(Spriter || (Spriter = {}));
var Spriter;
!function(t) {
    var e = function(t) {
        function e(e, i, s) {
            t.call(this, e, i),
                this._value = s
        }
        return __extends(e, t),
            Object.defineProperty(e.prototype, "value", {
                get: function() {
                    return this._value
                },
                enumerable: !0,
                configurable: !0
            }),
            e
    }(t.Key);
    t.KeyVariable = e
}(Spriter || (Spriter = {}));
var Spriter;
!function(t) {
    !function(t) {
        t[t.UNKNOWN = 0] = "UNKNOWN",
            t[t.MAIN_LINE = 1] = "MAIN_LINE",
            t[t.TIME_LINE = 2] = "TIME_LINE",
            t[t.SOUND_LINE = 3] = "SOUND_LINE",
            t[t.EVENT_LINE = 4] = "EVENT_LINE",
            t[t.TAG_LINE = 5] = "TAG_LINE",
            t[t.VAR_LINE = 6] = "VAR_LINE"
    }(t.eTimelineType || (t.eTimelineType = {}));
    var e = t.eTimelineType
        , i = function(t) {
        function i(i, s) {
            void 0 === s && (s = null),
                t.call(this, i, s),
                this._type = e.UNKNOWN
        }
        return __extends(i, t),
            Object.defineProperty(i.prototype, "type", {
                get: function() {
                    return this._type
                },
                set: function(t) {
                    this._type = t
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(i.prototype, "keys", {
                get: function() {
                    return this._keys
                },
                enumerable: !0,
                configurable: !0
            }),
            i.prototype.add = function(t) {
                null !== this._keys && void 0 !== this._keys || (this._keys = []),
                    this._keys.push(t)
            }
            ,
            i.prototype.at = function(t, e) {
                if (void 0 === e && (e = !0),
                    0 > t)
                    return null;
                var i = this._keys.length;
                return t >= i && (e ? t %= i : t = i - 1),
                    this._keys[t]
            }
            ,
            i
    }(t.Item);
    t.Baseline = i
}(Spriter || (Spriter = {}));
var Spriter;
!function(t) {
    function e(t, e, i) {
        return (e - t) * i + t
    }
    function i(t, i, s, n) {
        return e(e(t, i, n), e(i, s, n), n)
    }
    function s(t, s, n, r, o) {
        return e(i(t, s, n, o), i(s, n, r, o), o)
    }
    function n(t, i, n, r, o, a) {
        return e(s(t, i, n, r, a), s(i, n, r, o, a), a)
    }
    function r(t, i, s, r, o, a, h) {
        return e(n(t, i, s, r, o, h), n(i, s, r, o, a, h), h)
    }
    function o(t, e, i) {
        var s = 1
            , n = 1 - i
            , r = i * i
            , o = n * n
            , a = r * i;
        return 0 + 3 * o * i * t + 3 * n * r * e + a * s
    }
    function a(t, e, i, s, n) {
        for (var r = .001, a = 10, h = 0, l = 1, c = (l + h) / 2, u = o(t, i, c), d = 0; Math.abs(n - u) > r && a > d; )
            n > u ? h = c : l = c,
                c = (l + h) / 2,
                u = o(t, i, c),
                ++d;
        return o(e, s, c)
    }
    function h(t, e, i, s) {
        return 0 === i ? t : (i > 0 ? e > t && (e -= 360) : t > e && (e += 360),
            this.linear(t, e, s))
    }
    t.linear = e,
        t.quadratic = i,
        t.cubic = s,
        t.quartic = n,
        t.quintic = r,
        t.bezier = a,
        t.angleLinear = h
}(Spriter || (Spriter = {}));
var Spriter;
!function(t) {
    var e = function(t) {
        function e(e, i, s, n) {
            t.call(this, e, i),
                this._type = s,
                this._default = n,
                this.reset()
        }
        return __extends(e, t),
            e.prototype.clone = function() {
                return new e(this.id,this.name,this.type,this._default)
            }
            ,
            e.prototype.reset = function() {
                this.value = this._default
            }
            ,
            Object.defineProperty(e.prototype, "type", {
                get: function() {
                    return this._type
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "value", {
                get: function() {
                    return this._value
                },
                set: function(t) {
                    0 === this._type ? this._value = Math.floor(t) : this._value = t
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "int", {
                get: function() {
                    return this._value
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "float", {
                get: function() {
                    return this._value
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "string", {
                get: function() {
                    return this._value
                },
                enumerable: !0,
                configurable: !0
            }),
            e
    }(t.Item);
    t.Variable = e
}(Spriter || (Spriter = {}));
var Spriter;
!function(t) {
    var e = function(e) {
        function i(i, s) {
            e.call(this, i, null),
                this._varDefId = s,
                this.type = t.eTimelineType.VAR_LINE
        }
        return __extends(i, e),
            Object.defineProperty(i.prototype, "varDefId", {
                get: function() {
                    return this._varDefId
                },
                enumerable: !0,
                configurable: !0
            }),
            i
    }(t.Baseline);
    t.Varline = e
}(Spriter || (Spriter = {}));
var Spriter;
!function(t) {
    var e = function(t) {
        function e(e, i, s, n, r, o, a) {
            t.call(this, e, i),
                this._type = s,
                this._width = n,
                this._height = r,
                this._pivotX = o,
                this._pivotY = a
        }
        return __extends(e, t),
            Object.defineProperty(e.prototype, "type", {
                get: function() {
                    return this._type
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "width", {
                get: function() {
                    return this._width
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "height", {
                get: function() {
                    return this._height
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "pivotX", {
                get: function() {
                    return this._pivotX
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "pivotY", {
                get: function() {
                    return this._pivotY
                },
                enumerable: !0,
                configurable: !0
            }),
            e
    }(t.Item);
    t.ObjectInfo = e
}(Spriter || (Spriter = {}));
var Spriter;
!function(t) {
    var e = function() {
        function t() {}
        return t.getObjectTypeForName = function(e) {
            var i = t.nameToObjectType[e];
            return void 0 === i && console.error("Unknown type of object: " + e),
                i
        }
            ,
            t.getCurveTypeForName = function(e) {
                var i = t.nameToCurveType[e];
                return void 0 === i && console.error("Unknown type of curve: " + e),
                    i
            }
            ,
            t.getVariableTypeForName = function(e) {
                var i = t.nameToVariableType[e];
                return void 0 === i && console.error("Unknown type of variable: " + e),
                    i
            }
            ,
            t.nameToObjectType = {
                sprite: 0,
                bone: 1,
                box: 2,
                point: 3,
                sound: 4
            },
            t.nameToCurveType = {
                instant: 1,
                linear: 0,
                quadratic: 2,
                cubic: 3,
                quartic: 4,
                quintic: 5,
                bezier: 6
            },
            t.nameToVariableType = {
                "int": 0,
                "float": 1,
                string: 2
            },
            t
    }();
    t.Types = e
}(Spriter || (Spriter = {}));
var Spriter;
!function(t) {
    var e = function() {
        function t(t, e, i, s, n) {
            void 0 === n && (n = 0),
                this.id = t,
                this.parent = e,
                this.timeline = i,
                this.key = s,
                this.z = n
        }
        return t
    }();
    t.Ref = e
}(Spriter || (Spriter = {}));
var Spriter;
!function(t) {
    var e = function(e) {
        function i(i, s, n, r) {
            void 0 === n && (n = 0),
            void 0 === r && (r = -1),
                e.call(this, i, s),
                this.type = t.eTimelineType.TIME_LINE,
                this._objectType = n,
                this._objectRef = r
        }
        return __extends(i, e),
            Object.defineProperty(i.prototype, "objectType", {
                get: function() {
                    return this._objectType
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(i.prototype, "objectRef", {
                get: function() {
                    return this._objectRef
                },
                enumerable: !0,
                configurable: !0
            }),
            i
    }(t.Baseline);
    t.Timeline = e
}(Spriter || (Spriter = {}));
var Spriter;
!function(t) {
    var e = function(e) {
        function i(i, s, n) {
            e.call(this, i, s),
                this._info = new t.SpatialInfo,
                this._spin = n,
                this.setCurve(0)
        }
        return __extends(i, e),
            i.prototype.setCurve = function(t, e, i, s, n) {
                void 0 === e && (e = 0),
                void 0 === i && (i = 0),
                void 0 === s && (s = 0),
                void 0 === n && (n = 0),
                    this._curveType = t,
                    this._c1 = e,
                    this._c2 = i,
                    this._c3 = s,
                    this._c4 = n
            }
            ,
            Object.defineProperty(i.prototype, "spin", {
                get: function() {
                    return this._spin
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(i.prototype, "curveType", {
                get: function() {
                    return this._curveType
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(i.prototype, "c1", {
                get: function() {
                    return this._c1
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(i.prototype, "c2", {
                get: function() {
                    return this._c2
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(i.prototype, "c3", {
                get: function() {
                    return this._c3
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(i.prototype, "c4", {
                get: function() {
                    return this._c4
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(i.prototype, "info", {
                get: function() {
                    return this._info
                },
                enumerable: !0,
                configurable: !0
            }),
            i
    }(t.Key);
    t.KeyTimeline = e
}(Spriter || (Spriter = {}));
var Spriter;
!function(t) {
    var e = function() {
        function t() {
            this.x = 0,
                this.y = 0,
                this.scaleX = 1,
                this.scaleY = 1,
                this.pivotX = 0,
                this.pivotY = 0,
                this.alpha = 1,
                this.angle = 0
        }
        return t
    }();
    t.SpatialInfo = e
}(Spriter || (Spriter = {}));
var Spriter;
!function(t) {
    var e = function(t) {
        function e() {
            t.apply(this, arguments)
        }
        return __extends(e, t),
            e.prototype.setFolderAndFile = function(t, e) {
                this._folder = t,
                    this._file = e
            }
            ,
            Object.defineProperty(e.prototype, "folder", {
                get: function() {
                    return this._folder
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "file", {
                get: function() {
                    return this._file
                },
                enumerable: !0,
                configurable: !0
            }),
            e
    }(t.KeyTimeline);
    t.KeyObject = e
}(Spriter || (Spriter = {}));
var Spriter;
!function(t) {
    var e = function(t) {
        function e() {
            t.apply(this, arguments)
        }
        return __extends(e, t),
            e
    }(t.KeyTimeline);
    t.KeyBone = e
}(Spriter || (Spriter = {}));
var Spriter;
!function(t) {
    var e = function() {
        function e() {}
        return e.prototype.load = function(e) {
            this._spriter = new t.Spriter,
                this._fileType = e.getType();
            var i = e.getNodes("folder");
            this.loadFolders(this._spriter, i),
                i.processed();
            var s = e.getNodes("tag_list");
            this.loadTags(this._spriter, s),
                s.processed();
            var n = e.getNodes("entity");
            return this.loadEntities(this._spriter, n),
                n.processed(),
                this._spriter
        }
            ,
            e.prototype.loadFolders = function(t, e) {
                for (var i = 0; i < e.length(); i++) {
                    var s = e.getFolder(i)
                        , n = e.getChildNodes(i, "file");
                    this.loadFiles(s, n),
                        n.processed(),
                        t.addFolder(s)
                }
            }
            ,
            e.prototype.loadFiles = function(t, e) {
                for (var i = 0; i < e.length(); i++) {
                    var s = e.getFile(i);
                    null !== s && t.addFile(s)
                }
            }
            ,
            e.prototype.loadTags = function(e, i) {
                if (0 !== i.length()) {
                    var s;
                    s = this._fileType !== t.eFileType.JSON ? i.getChildNodes(0, "i") : i;
                    for (var n = 0; n < s.length(); n++) {
                        var r = s.getTag(n);
                        e.addTag(r)
                    }
                    this._fileType !== t.eFileType.JSON && s.processed()
                }
            }
            ,
            e.prototype.loadEntities = function(t, e) {
                for (var i = 0; i < e.length(); i++) {
                    var s = e.getEntity(i)
                        , n = e.getChildNodes(i, "obj_info");
                    this.loadObjInfo(s, n),
                        n.processed();
                    var r = e.getChildNodes(i, "character_map");
                    this.loadCharMaps(s, r),
                        r.processed();
                    var o = e.getChildNodes(i, "var_defs");
                    this.loadVariables(s, o),
                        o.processed();
                    var a = e.getChildNodes(i, "animation");
                    this.loadAnimations(s, a),
                        a.processed(),
                        t.addEntity(s)
                }
            }
            ,
            e.prototype.loadObjInfo = function(t, e) {
                for (var i = 0; i < e.length(); i++) {
                    var s = e.getObjectInfo(i);
                    t.addObjectInfo(s)
                }
            }
            ,
            e.prototype.loadCharMaps = function(t, e) {
                for (var i = 0; i < e.length(); i++) {
                    var s = e.getCharMap(i)
                        , n = e.getChildNodes(i, "map");
                    this.loadCharMapEntries(s, n),
                        n.processed(),
                        t.addCharMap(s)
                }
            }
            ,
            e.prototype.loadCharMapEntries = function(t, e) {
                for (var i = 0; i < e.length(); i++)
                    e.getCharMapEntry(i, t, this._spriter)
            }
            ,
            e.prototype.loadVariables = function(e, i) {
                if (0 !== i.length()) {
                    var s;
                    s = this._fileType !== t.eFileType.JSON ? i.getChildNodes(0, "i") : i;
                    for (var n = 0; n < s.length(); n++) {
                        var r = s.getVariable(n);
                        e.addVariable(r)
                    }
                    this._fileType !== t.eFileType.JSON && s.processed()
                }
            }
            ,
            e.prototype.loadAnimations = function(e, i) {
                for (var s = 0; s < i.length(); s++) {
                    var n = i.getAnimation(s)
                        , r = i.getChildNodes(s, "mainline");
                    this.loadMainline(n, r),
                        r.processed();
                    var o = i.getChildNodes(s, "timeline");
                    this.loadTimelines(n, o),
                        o.processed();
                    var a = i.getChildNodes(s, "soundline");
                    this.loadSoundlines(n, a),
                        a.processed();
                    var h = i.getChildNodes(s, "eventline");
                    this.loadEventlines(n, h),
                        h.processed();
                    var l = i.getChildNodes(s, "meta");
                    if (l.length() > 0) {
                        var c = l.getChildNodes(0, this._fileType !== t.eFileType.JSON ? "varline" : "valline");
                        this.loadVarlines(e, n, c),
                            c.processed();
                        var u = l.getChildNodes(0, "tagline");
                        this.loadTaglines(n, u),
                            u.processed()
                    }
                    l.processed(),
                        e.addAnimation(n)
                }
            }
            ,
            e.prototype.loadMainline = function(e, i) {
                var s = i.getMainline(0);
                s.type = t.eTimelineType.MAIN_LINE;
                var n = i.getChildNodes(0, "key");
                this.loadMainlineKeys(s, n),
                    n.processed(),
                    e.mainline = s
            }
            ,
            e.prototype.loadMainlineKeys = function(t, e) {
                for (var i = 0; i < e.length(); i++) {
                    for (var s = e.getMainlineKey(i), n = e.getChildNodes(i, "bone_ref"), r = 0; r < n.length(); r++)
                        s.addBoneRef(n.getRef(r));
                    n.processed();
                    for (var o = e.getChildNodes(i, "object_ref"), a = 0; a < o.length(); a++)
                        s.addObjectRef(o.getRef(a));
                    o.processed(),
                        t.add(s)
                }
            }
            ,
            e.prototype.loadTimelines = function(t, e) {
                for (var i = 0; i < e.length(); i++) {
                    var s = e.getTimeline(i)
                        , n = e.getChildNodes(i, "key");
                    this.loadTimelineKeys(s, n),
                        n.processed(),
                        t.addTimeline(s)
                }
            }
            ,
            e.prototype.loadTimelineKeys = function(t, e) {
                for (var i = 0; i < e.length(); i++) {
                    var s = e.getTimelineKey(i, this._spriter);
                    t.add(s)
                }
            }
            ,
            e.prototype.loadSoundlines = function(e, i) {
                for (var s = 0; s < i.length(); s++) {
                    var n = i.getSoundline(s);
                    n.type = t.eTimelineType.SOUND_LINE;
                    var r = i.getChildNodes(s, "key");
                    this.loadKeys(n, r),
                        r.processed(),
                        e.addLine(n)
                }
            }
            ,
            e.prototype.loadKeys = function(t, e) {
                for (var i = 0; i < e.length(); i++) {
                    var s = e.getKey(i);
                    t.add(s)
                }
            }
            ,
            e.prototype.loadEventlines = function(e, i) {
                for (var s = 0; s < i.length(); s++) {
                    var n = i.getEventline(s);
                    n.type = t.eTimelineType.EVENT_LINE;
                    var r = i.getChildNodes(s, "key");
                    this.loadKeys(n, r),
                        r.processed(),
                        e.addLine(n)
                }
            }
            ,
            e.prototype.loadTaglines = function(e, i) {
                for (var s = 0; s < i.length(); s++) {
                    var n = i.getTagline(s);
                    n.type = t.eTimelineType.TAG_LINE;
                    var r = i.getChildNodes(s, "key");
                    this.loadTagKeys(n, r),
                        r.processed(),
                        e.addLine(n)
                }
            }
            ,
            e.prototype.loadTagKeys = function(t, e) {
                for (var i = 0; i < e.length(); i++) {
                    var s = e.getTagKey(i)
                        , n = e.getChildNodes(i, "tag")
                        , r = n.getTagChanges(this._spriter);
                    n.processed(),
                        s.tagsOn = r,
                        t.add(s)
                }
            }
            ,
            e.prototype.loadVarlines = function(t, e, i) {
                for (var s = 0; s < i.length(); s++) {
                    var n = i.getVarline(s)
                        , r = t.getVariableById(n.varDefId).type
                        , o = i.getChildNodes(s, "key");
                    this.loadVariableKeys(n, o, r),
                        o.processed(),
                        e.addLine(n)
                }
            }
            ,
            e.prototype.loadVariableKeys = function(t, e, i) {
                for (var s = 0; s < e.length(); s++) {
                    var n = e.getVariableKey(s, i);
                    t.add(n)
                }
            }
            ,
            e
    }();
    t.Loader = e
}(Spriter || (Spriter = {}));
var Spriter;
!function(t) {
    var e = function() {
        function e() {
            this._folders = new t.IdNameMap,
                this._tags = new t.IdNameMap,
                this._entities = new t.IdNameMap
        }
        return e.prototype.addFolder = function(t) {
            this._folders.add(t, t.id, t.name)
        }
            ,
            e.prototype.getFolderById = function(t) {
                return this._folders.getById(t)
            }
            ,
            e.prototype.getFolderByName = function(t) {
                return this._folders.getByName(t)
            }
            ,
            e.prototype.addEntity = function(t) {
                this._entities.add(t, t.id, t.name)
            }
            ,
            e.prototype.getEntityById = function(t) {
                return this._entities.getById(t)
            }
            ,
            e.prototype.getEntityByName = function(t) {
                return this._entities.getByName(t)
            }
            ,
            e.prototype.addTag = function(t) {
                this._tags.add(t, t.id, t.name)
            }
            ,
            e.prototype.getTagById = function(t) {
                return this._tags.getById(t)
            }
            ,
            e.prototype.getTagByName = function(t) {
                return this._tags.getByName(t)
            }
            ,
            Object.defineProperty(e.prototype, "tagsLength", {
                get: function() {
                    return this._tags.length
                },
                enumerable: !0,
                configurable: !0
            }),
            e
    }();
    t.Spriter = e
}(Spriter || (Spriter = {}));
var Spriter;
!function(t) {
    var e = function() {
        function e() {
            this.timeline = -1,
                this.timelineKey = -1,
                this.transformed = new t.SpatialInfo
        }
        return e.prototype.setOn = function(t) {
            this._on = t
        }
            ,
            Object.defineProperty(e.prototype, "on", {
                get: function() {
                    return this._on
                },
                enumerable: !0,
                configurable: !0
            }),
            e.prototype.setKey = function(i, s, n, r) {
                this.timeline = n,
                    this.timelineKey = r;
                var o = s.getTimelineById(n);
                this.name = o.name,
                    this.objectInfo = -1 === o.objectRef ? null : i.getObjectInfoById(o.objectRef);
                var a = o.at(r)
                    , h = o.at(r + 1, s.loopType !== t.eAnimationLooping.NO_LOOPING);
                this.key = a,
                    this.timeFrom = a.time,
                    this.timeTo = h.time,
                this.timeTo < this.timeFrom && (this.timeTo = s.length),
                    this.from = a.info,
                    this.to = h.info,
                    this.updateMask = 0,
                Math.abs(this.from.x - this.to.x) > .001 && (this.updateMask += e.UPDATE_X),
                Math.abs(this.from.y - this.to.y) > .001 && (this.updateMask += e.UPDATE_Y),
                Math.abs(this.from.scaleX - this.to.scaleX) > .001 && (this.updateMask += e.UPDATE_SCALE_X),
                Math.abs(this.from.scaleY - this.to.scaleY) > .001 && (this.updateMask += e.UPDATE_SCALE_Y),
                Math.abs(this.from.pivotX - this.to.pivotX) > .001 && (this.updateMask += e.UPDATE_PIVOT_X),
                Math.abs(this.from.pivotY - this.to.pivotY) > .001 && (this.updateMask += e.UPDATE_PIVOT_Y),
                Math.abs(this.from.alpha - this.to.alpha) > .001 && (this.updateMask += e.UPDATE_ALPHA),
                Math.abs(this.from.angle - this.to.angle) > .001 && (this.updateMask += e.UPDATE_ANGLE),
                    this.transformed.x = this.from.x,
                    this.transformed.y = this.from.y,
                    this.transformed.scaleX = this.from.scaleX,
                    this.transformed.scaleY = this.from.scaleY,
                    this.transformed.pivotX = this.from.pivotX,
                    this.transformed.pivotY = this.from.pivotY,
                    this.transformed.angle = this.from.angle,
                    this.transformed.alpha = this.from.alpha
            }
            ,
            e.prototype.tween = function(i) {
                var s = this.updateMask > 0 ? this.getTweenTime(i) : 0;
                this.transformed.x = (this.updateMask & e.UPDATE_X) > 0 ? t.linear(this.from.x, this.to.x, s) : this.from.x,
                    this.transformed.y = (this.updateMask & e.UPDATE_Y) > 0 ? t.linear(this.from.y, this.to.y, s) : this.from.y,
                    this.transformed.scaleX = (this.updateMask & e.UPDATE_SCALE_X) > 0 ? t.linear(this.from.scaleX, this.to.scaleX, s) : this.from.scaleX,
                    this.transformed.scaleY = (this.updateMask & e.UPDATE_SCALE_Y) > 0 ? t.linear(this.from.scaleY, this.to.scaleY, s) : this.from.scaleY,
                    this.transformed.pivotX = (this.updateMask & e.UPDATE_PIVOT_X) > 0 ? t.linear(this.from.pivotX, this.to.pivotX, s) : this.from.pivotX,
                    this.transformed.pivotY = (this.updateMask & e.UPDATE_PIVOT_Y) > 0 ? t.linear(this.from.pivotY, this.to.pivotY, s) : this.from.pivotY,
                    this.transformed.alpha = (this.updateMask & e.UPDATE_ALPHA) > 0 ? t.linear(this.from.alpha, this.to.alpha, s) : this.from.alpha,
                    this.transformed.angle = (this.updateMask & e.UPDATE_ANGLE) > 0 ? t.angleLinear(this.from.angle, this.to.angle, this.key.spin, s) : this.from.angle
            }
            ,
            e.prototype.update = function(t) {
                this.transformed.angle *= Phaser.Math.sign(t.scaleX) * Phaser.Math.sign(t.scaleY),
                    this.transformed.angle += t.angle,
                    this.transformed.scaleX *= t.scaleX,
                    this.transformed.scaleY *= t.scaleY,
                    this.scalePosition(t.scaleX, t.scaleY),
                    this.rotatePosition(t.angle),
                    this.translatePosition(t.x, t.y),
                    this.transformed.alpha *= t.alpha
            }
            ,
            e.prototype.scalePosition = function(t, e) {
                this.transformed.x *= t,
                    this.transformed.y *= e
            }
            ,
            e.prototype.rotatePosition = function(t) {
                var e = this.transformed.x
                    , i = this.transformed.y;
                if (0 !== e || 0 !== i) {
                    var s = t * (Math.PI / 180)
                        , n = Math.cos(s)
                        , r = Math.sin(s);
                    this.transformed.x = e * n - i * r,
                        this.transformed.y = e * r + i * n
                }
            }
            ,
            e.prototype.translatePosition = function(t, e) {
                this.transformed.x += t,
                    this.transformed.y += e
            }
            ,
            e.prototype.getTweenTime = function(e) {
                if (1 === this.key.curveType)
                    return 0;
                var i = Phaser.Math.clamp((e - this.timeFrom) / (this.timeTo - this.timeFrom), 0, 1);
                switch (this.key.curveType) {
                    case 0:
                        return i;
                    case 2:
                        return t.quadratic(0, this.key.c1, 1, i);
                    case 3:
                        return t.cubic(0, this.key.c1, this.key.c2, 1, i);
                    case 4:
                        return t.quartic(0, this.key.c1, this.key.c2, this.key.c3, 1, i);
                    case 5:
                        return t.quintic(0, this.key.c1, this.key.c2, this.key.c3, this.key.c4, 1, i);
                    case 6:
                        return t.bezier(this.key.c1, this.key.c2, this.key.c3, this.key.c4, i)
                }
                return 0
            }
            ,
            e.UPDATE_X = 1,
            e.UPDATE_Y = 2,
            e.UPDATE_SCALE_X = 4,
            e.UPDATE_SCALE_Y = 8,
            e.UPDATE_PIVOT_X = 16,
            e.UPDATE_PIVOT_Y = 32,
            e.UPDATE_ANGLE = 64,
            e.UPDATE_ALPHA = 128,
            e
    }();
    t.SpriterBone = e
}(Spriter || (Spriter = {}));
var Spriter;
!function(t) {
    var e = function(e) {
        function i(i, s, n, r, o, a) {
            e.call(this, i, null),
                this.onLoop = new Phaser.Signal,
                this.onFinish = new Phaser.Signal,
                this.onSound = new Phaser.Signal,
                this.onEvent = new Phaser.Signal,
                this.onTagChange = new Phaser.Signal,
                this.onVariableSet = new Phaser.Signal,
                this._mainlineStepper = new t.LineStepper,
                this._lineSteppers = [],
                this._lineSteppersCount = 0,
                this._bones = [],
                this._objects = [],
                this._tags = 0,
                this._vars = [],
                this._paused = !1,
                this._spriter = s,
                this._entityName = r,
                this._entity = s.getEntityByName(r),
                this._textureKey = n,
                this._root = new t.SpatialInfo;
            for (var h = 0; h < this._entity.variablesLength; h++)
                this._vars[h] = this._entity.getVariableById(h).clone();
            this._charMapStack = new t.CharMapStack(this._entity),
            void 0 === a && (a = 100),
                this.setAnimationSpeedPercent(a),
                void 0 === o || null === o ? this.playAnimationById(0) : "number" == typeof o ? this.playAnimationById(o) : this.playAnimationByName(o)
        }
        return __extends(i, e),
            Object.defineProperty(i.prototype, "spriter", {
                get: function() {
                    return this._spriter
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(i.prototype, "entity", {
                get: function() {
                    return this._entity
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(i.prototype, "charMapStack", {
                get: function() {
                    return this._charMapStack
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(i.prototype, "paused", {
                get: function() {
                    return this._paused
                },
                set: function(t) {
                    this.paused = t
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(i.prototype, "animationsCount", {
                get: function() {
                    return this._entity.animationsLength
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(i.prototype, "currentAnimationName", {
                get: function() {
                    return this._animationName
                },
                enumerable: !0,
                configurable: !0
            }),
            i.prototype.pushCharMap = function(t) {
                this._charMapStack.push(t),
                    this.resetSprites()
            }
            ,
            i.prototype.removeCharMap = function(t) {
                this._charMapStack.remove(t),
                    this.resetSprites()
            }
            ,
            i.prototype.clearCharMaps = function() {
                this._charMapStack.reset(),
                    this.resetSprites()
            }
            ,
            i.prototype.resetSprites = function() {
                for (var t = 0; t < this._objects.length; t++)
                    this._objects[t].resetFile()
            }
            ,
            i.prototype.isTagOn = function(t) {
                return this.isTagOnById(this._spriter.getTagByName(t).id)
            }
            ,
            i.prototype.isTagOnById = function(t) {
                return (this._tags & 1 << t) > 0
            }
            ,
            i.prototype.getVariable = function(t) {
                return this.getVariableById(this._entity.getVariableByName(t).id)
            }
            ,
            i.prototype.getVariableById = function(t) {
                return this._vars[t]
            }
            ,
            i.prototype.getObject = function(t) {
                for (var e = 0; e < this._objects.length; e++) {
                    var i = this._objects[e];
                    if (i.name === t)
                        return i
                }
                return null
            }
            ,
            i.prototype.setAnimationSpeedPercent = function(t) {
                void 0 === t && (t = 100),
                    this._animationSpeed = t / 100
            }
            ,
            i.prototype.playAnimationById = function(t) {
                var e = this._entity.getAnimationById(t);
                return void 0 === e || null === e ? void console.warn("Animation " + t + " for entity " + this._entityName + " does not exist!") : void this.playAnimation(e)
            }
            ,
            i.prototype.playAnimationByName = function(t) {
                var e = this._entity.getAnimationByName(t);
                return void 0 === e || null === e ? void console.warn("Animation " + t + " for entity " + this._entityName + " does not exist!") : void this.playAnimation(e)
            }
            ,
            i.prototype.playAnimation = function(t) {
                this._animationName = t.name,
                    this._animation = t,
                    this._finished = !1,
                    this._mainlineStepper.reset(),
                    this._mainlineStepper.line = this._animation.mainline,
                    this._time = 0,
                    this.resetLines(),
                    this._tags = 0;
                for (var e = 0; e < this._vars.length; e++)
                    this._vars[e].reset();
                this.loadKeys(this._animation.mainline.at(0), !0),
                    this.updateCharacter()
            }
            ,
            i.prototype.resetLines = function() {
                this._lineSteppersCount = 0;
                for (var e = 0; e < this._animation.linesLength; e++) {
                    var i = this._animation.getLineById(e);
                    this._lineSteppersCount >= this._lineSteppers.length && (this._lineSteppers[this._lineSteppersCount] = new t.LineStepper);
                    var s = this._lineSteppers[this._lineSteppersCount++];
                    s.reset(),
                        s.line = i
                }
            }
            ,
            i.prototype.setBones = function(e, i) {
                void 0 === i && (i = !1);
                for (var s = 0; s < this._bones.length; s++)
                    void 0 !== this._bones[s] && this._bones[s].setOn(!1);
                for (var s = 0; s < e.length; s++) {
                    var n = e[s];
                    if (void 0 === this._bones[n.id]) {
                        var r = new t.SpriterBone;
                        r.type = 1,
                            this._bones[n.id] = r
                    }
                    var o = this._bones[n.id];
                    o.setOn(!0),
                        o.parent = n.parent,
                    (o.timelineKey !== n.key || o.timeline !== n.timeline || i) && o.setKey(this._entity, this._animation, n.timeline, n.key)
                }
            }
            ,
            i.prototype.setObjects = function(e, i) {
                void 0 === i && (i = !1);
                for (var s = 0; s < this._objects.length; s++)
                    void 0 !== this._objects[s] && this._objects[s].setOn(!1);
                for (var n = !1, s = 0; s < e.length; s++) {
                    var r = e[s]
                        , o = null
                        , a = null;
                    void 0 === this._objects[r.id] ? (a = new Phaser.Sprite(this.game,0,0,this._textureKey),
                        o = new t.SpriterObject(this,a),
                        this._objects[r.id] = o,
                        this.add(a)) : (o = this._objects[r.id],
                        a = o.sprite),
                        o.parent = r.parent,
                        o.type = this._animation.getTimelineById(r.timeline).objectType,
                    0 === o.type && (o.setOn(!0),
                    o.sprite.z !== r.z && (o.sprite.z = r.z,
                        n = !0)),
                    (o.timelineKey !== r.key || o.timeline !== r.timeline || i) && o.setKey(this._entity, this._animation, r.timeline, r.key)
                }
                n && this.sort()
            }
            ,
            i.prototype.loadKeys = function(t, e) {
                void 0 === e && (e = !1),
                    this.setBones(t.boneRefs, e),
                    this.setObjects(t.objectRefs, e)
            }
            ,
            i.prototype.updateAnimation = function() {
                if (!this._paused && !this._finished) {
                    var e = this._mainlineStepper;
                    this._time > this._animation.length && (this._animation.loopType === t.eAnimationLooping.NO_LOOPING ? (this._time = this._animation.length,
                        this._finished = !0) : (this._time -= this._animation.length,
                        this.onLoop.dispatch(this)));
                    for (var i; null !== (i = e.step(this._time)); )
                        this.loadKeys(i),
                            e.lastTime = i.time;
                    this.updateCharacter(),
                        this.updateLines(),
                    this._finished && this.onFinish.dispatch(this),
                        this._time += this.game.time.physicsElapsedMS * this._animationSpeed
                }
            }
            ,
            i.prototype.updateCharacter = function() {
                for (var t = 0; t < this._bones.length; t++) {
                    var e = this._bones[t];
                    if (e.on) {
                        var i = -1 === e.parent ? this._root : this._bones[e.parent].transformed;
                        e.tween(this._time),
                            e.update(i)
                    }
                }
                for (var t = 0; t < this._objects.length; t++) {
                    var s = this._objects[t];
                    if (s.on) {
                        var i = -1 === s.parent ? this._root : this._bones[s.parent].transformed;
                        s.tween(this._time),
                            s.update(i)
                    }
                }
            }
            ,
            i.prototype.updateLines = function() {
                for (var e = this._lineSteppersCount - 1; e >= 0; e--)
                    for (var i, s = this._lineSteppers[e], n = s.line; null !== (i = s.step(this._time)); ) {
                        switch (n.type) {
                            case t.eTimelineType.SOUND_LINE:
                                this.onSound.dispatch(this, n.name);
                                break;
                            case t.eTimelineType.EVENT_LINE:
                                this.onEvent.dispatch(this, n.name);
                                break;
                            case t.eTimelineType.TAG_LINE:
                                var r = i.tagsOn
                                    , o = this._tags ^ r;
                                this._tags = r;
                                for (var a = 0; a < this._spriter.tagsLength; a++) {
                                    var h = 1 << a;
                                    o & h && this.onTagChange.dispatch(this, this._spriter.getTagById(a).name, (r & h) > 0)
                                }
                                break;
                            case t.eTimelineType.VAR_LINE:
                                var l = i.value
                                    , c = this._vars[n.varDefId];
                                c.value = l,
                                    this.onVariableSet.dispatch(this, c)
                        }
                        s.lastTime = i.time
                    }
            }
            ,
            i
    }(Phaser.Group);
    t.SpriterGroup = e
}(Spriter || (Spriter = {}));
var Spriter;
!function(t) {
    var e = function(t) {
        function e(e, i) {
            t.call(this),
                this._spriter = e.spriter,
                this._charMapStack = e.charMapStack,
                this._sprite = i
        }
        return __extends(e, t),
            Object.defineProperty(e.prototype, "sprite", {
                get: function() {
                    return this._sprite
                },
                enumerable: !0,
                configurable: !0
            }),
            e.prototype.setOn = function(e) {
                t.prototype.setOn.call(this, e),
                    this._sprite.exists = e,
                    this._sprite.visible = e && !this._hide
            }
            ,
            e.prototype.setKey = function(e, i, s, n) {
                if (t.prototype.setKey.call(this, e, i, s, n),
                    0 === this.type) {
                    var r = this.key
                        , o = this._spriter.getFolderById(r.folder).getFileById(r.file);
                    this._file = o,
                        this.setFile(o)
                } else
                    this._file = null
            }
            ,
            e.prototype.resetFile = function() {
                0 === this.type && this.setFile(this._file)
            }
            ,
            e.prototype.setFile = function(t) {
                t = this._charMapStack.getFile(t),
                    null !== t ? (this._hide = !1,
                        this._sprite.frameName = t.name) : (this._hide = !0,
                        this._sprite.visible = !1)
            }
            ,
            e.prototype.update = function(e) {
                t.prototype.update.call(this, e),
                    this.updateSprite()
            }
            ,
            e.prototype.updateSprite = function() {
                var t = this.transformed
                    , e = this.sprite;
                e.position.set(t.x, t.y),
                    e.scale.set(t.scaleX, t.scaleY),
                    e.anchor.set(t.pivotX, t.pivotY),
                    e.alpha = t.alpha,
                    e.angle = t.angle
            }
            ,
            e
    }(t.SpriterBone);
    t.SpriterObject = e
}(Spriter || (Spriter = {}));