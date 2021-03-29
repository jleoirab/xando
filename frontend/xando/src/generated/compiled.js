/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const com = $root.com = (() => {

    /**
     * Namespace com.
     * @exports com
     * @namespace
     */
    const com = {};

    com.jleoirab = (function() {

        /**
         * Namespace jleoirab.
         * @memberof com
         * @namespace
         */
        const jleoirab = {};

        jleoirab.xando = (function() {

            /**
             * Namespace xando.
             * @memberof com.jleoirab
             * @namespace
             */
            const xando = {};

            xando.events = (function() {

                /**
                 * Namespace events.
                 * @memberof com.jleoirab.xando
                 * @namespace
                 */
                const events = {};

                events.MoveEvent = (function() {

                    /**
                     * Properties of a MoveEvent.
                     * @memberof com.jleoirab.xando.events
                     * @interface IMoveEvent
                     * @property {com.jleoirab.xando.protos.IGamePlayer|null} [gamePlayer] MoveEvent gamePlayer
                     * @property {number|null} [cellIndex] MoveEvent cellIndex
                     * @property {com.jleoirab.xando.protos.PlayerTag|null} [playerTag] MoveEvent playerTag
                     */

                    /**
                     * Constructs a new MoveEvent.
                     * @memberof com.jleoirab.xando.events
                     * @classdesc Represents a MoveEvent.
                     * @implements IMoveEvent
                     * @constructor
                     * @param {com.jleoirab.xando.events.IMoveEvent=} [properties] Properties to set
                     */
                    function MoveEvent(properties) {
                        if (properties)
                            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * MoveEvent gamePlayer.
                     * @member {com.jleoirab.xando.protos.IGamePlayer|null|undefined} gamePlayer
                     * @memberof com.jleoirab.xando.events.MoveEvent
                     * @instance
                     */
                    MoveEvent.prototype.gamePlayer = null;

                    /**
                     * MoveEvent cellIndex.
                     * @member {number} cellIndex
                     * @memberof com.jleoirab.xando.events.MoveEvent
                     * @instance
                     */
                    MoveEvent.prototype.cellIndex = 0;

                    /**
                     * MoveEvent playerTag.
                     * @member {com.jleoirab.xando.protos.PlayerTag} playerTag
                     * @memberof com.jleoirab.xando.events.MoveEvent
                     * @instance
                     */
                    MoveEvent.prototype.playerTag = 0;

                    /**
                     * Creates a new MoveEvent instance using the specified properties.
                     * @function create
                     * @memberof com.jleoirab.xando.events.MoveEvent
                     * @static
                     * @param {com.jleoirab.xando.events.IMoveEvent=} [properties] Properties to set
                     * @returns {com.jleoirab.xando.events.MoveEvent} MoveEvent instance
                     */
                    MoveEvent.create = function create(properties) {
                        return new MoveEvent(properties);
                    };

                    /**
                     * Encodes the specified MoveEvent message. Does not implicitly {@link com.jleoirab.xando.events.MoveEvent.verify|verify} messages.
                     * @function encode
                     * @memberof com.jleoirab.xando.events.MoveEvent
                     * @static
                     * @param {com.jleoirab.xando.events.IMoveEvent} message MoveEvent message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    MoveEvent.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.gamePlayer != null && Object.hasOwnProperty.call(message, "gamePlayer"))
                            $root.com.jleoirab.xando.protos.GamePlayer.encode(message.gamePlayer, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                        if (message.cellIndex != null && Object.hasOwnProperty.call(message, "cellIndex"))
                            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.cellIndex);
                        if (message.playerTag != null && Object.hasOwnProperty.call(message, "playerTag"))
                            writer.uint32(/* id 3, wireType 0 =*/24).int32(message.playerTag);
                        return writer;
                    };

                    /**
                     * Encodes the specified MoveEvent message, length delimited. Does not implicitly {@link com.jleoirab.xando.events.MoveEvent.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof com.jleoirab.xando.events.MoveEvent
                     * @static
                     * @param {com.jleoirab.xando.events.IMoveEvent} message MoveEvent message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    MoveEvent.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };

                    /**
                     * Decodes a MoveEvent message from the specified reader or buffer.
                     * @function decode
                     * @memberof com.jleoirab.xando.events.MoveEvent
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {com.jleoirab.xando.events.MoveEvent} MoveEvent
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    MoveEvent.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.jleoirab.xando.events.MoveEvent();
                        while (reader.pos < end) {
                            let tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.gamePlayer = $root.com.jleoirab.xando.protos.GamePlayer.decode(reader, reader.uint32());
                                break;
                            case 2:
                                message.cellIndex = reader.int32();
                                break;
                            case 3:
                                message.playerTag = reader.int32();
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };

                    /**
                     * Decodes a MoveEvent message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof com.jleoirab.xando.events.MoveEvent
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {com.jleoirab.xando.events.MoveEvent} MoveEvent
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    MoveEvent.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a MoveEvent message.
                     * @function verify
                     * @memberof com.jleoirab.xando.events.MoveEvent
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    MoveEvent.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.gamePlayer != null && message.hasOwnProperty("gamePlayer")) {
                            let error = $root.com.jleoirab.xando.protos.GamePlayer.verify(message.gamePlayer);
                            if (error)
                                return "gamePlayer." + error;
                        }
                        if (message.cellIndex != null && message.hasOwnProperty("cellIndex"))
                            if (!$util.isInteger(message.cellIndex))
                                return "cellIndex: integer expected";
                        if (message.playerTag != null && message.hasOwnProperty("playerTag"))
                            switch (message.playerTag) {
                            default:
                                return "playerTag: enum value expected";
                            case 0:
                            case 1:
                            case 2:
                                break;
                            }
                        return null;
                    };

                    /**
                     * Creates a MoveEvent message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof com.jleoirab.xando.events.MoveEvent
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {com.jleoirab.xando.events.MoveEvent} MoveEvent
                     */
                    MoveEvent.fromObject = function fromObject(object) {
                        if (object instanceof $root.com.jleoirab.xando.events.MoveEvent)
                            return object;
                        let message = new $root.com.jleoirab.xando.events.MoveEvent();
                        if (object.gamePlayer != null) {
                            if (typeof object.gamePlayer !== "object")
                                throw TypeError(".com.jleoirab.xando.events.MoveEvent.gamePlayer: object expected");
                            message.gamePlayer = $root.com.jleoirab.xando.protos.GamePlayer.fromObject(object.gamePlayer);
                        }
                        if (object.cellIndex != null)
                            message.cellIndex = object.cellIndex | 0;
                        switch (object.playerTag) {
                        case "PLAYER_TAG_UNKNOWN":
                        case 0:
                            message.playerTag = 0;
                            break;
                        case "PLAYER_TAG_X":
                        case 1:
                            message.playerTag = 1;
                            break;
                        case "PLAYER_TAG_O":
                        case 2:
                            message.playerTag = 2;
                            break;
                        }
                        return message;
                    };

                    /**
                     * Creates a plain object from a MoveEvent message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof com.jleoirab.xando.events.MoveEvent
                     * @static
                     * @param {com.jleoirab.xando.events.MoveEvent} message MoveEvent
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    MoveEvent.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        let object = {};
                        if (options.defaults) {
                            object.gamePlayer = null;
                            object.cellIndex = 0;
                            object.playerTag = options.enums === String ? "PLAYER_TAG_UNKNOWN" : 0;
                        }
                        if (message.gamePlayer != null && message.hasOwnProperty("gamePlayer"))
                            object.gamePlayer = $root.com.jleoirab.xando.protos.GamePlayer.toObject(message.gamePlayer, options);
                        if (message.cellIndex != null && message.hasOwnProperty("cellIndex"))
                            object.cellIndex = message.cellIndex;
                        if (message.playerTag != null && message.hasOwnProperty("playerTag"))
                            object.playerTag = options.enums === String ? $root.com.jleoirab.xando.protos.PlayerTag[message.playerTag] : message.playerTag;
                        return object;
                    };

                    /**
                     * Converts this MoveEvent to JSON.
                     * @function toJSON
                     * @memberof com.jleoirab.xando.events.MoveEvent
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    MoveEvent.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    return MoveEvent;
                })();

                events.JoinGameEvent = (function() {

                    /**
                     * Properties of a JoinGameEvent.
                     * @memberof com.jleoirab.xando.events
                     * @interface IJoinGameEvent
                     * @property {com.jleoirab.xando.protos.IGamePlayer|null} [gamePlayer] JoinGameEvent gamePlayer
                     */

                    /**
                     * Constructs a new JoinGameEvent.
                     * @memberof com.jleoirab.xando.events
                     * @classdesc Represents a JoinGameEvent.
                     * @implements IJoinGameEvent
                     * @constructor
                     * @param {com.jleoirab.xando.events.IJoinGameEvent=} [properties] Properties to set
                     */
                    function JoinGameEvent(properties) {
                        if (properties)
                            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * JoinGameEvent gamePlayer.
                     * @member {com.jleoirab.xando.protos.IGamePlayer|null|undefined} gamePlayer
                     * @memberof com.jleoirab.xando.events.JoinGameEvent
                     * @instance
                     */
                    JoinGameEvent.prototype.gamePlayer = null;

                    /**
                     * Creates a new JoinGameEvent instance using the specified properties.
                     * @function create
                     * @memberof com.jleoirab.xando.events.JoinGameEvent
                     * @static
                     * @param {com.jleoirab.xando.events.IJoinGameEvent=} [properties] Properties to set
                     * @returns {com.jleoirab.xando.events.JoinGameEvent} JoinGameEvent instance
                     */
                    JoinGameEvent.create = function create(properties) {
                        return new JoinGameEvent(properties);
                    };

                    /**
                     * Encodes the specified JoinGameEvent message. Does not implicitly {@link com.jleoirab.xando.events.JoinGameEvent.verify|verify} messages.
                     * @function encode
                     * @memberof com.jleoirab.xando.events.JoinGameEvent
                     * @static
                     * @param {com.jleoirab.xando.events.IJoinGameEvent} message JoinGameEvent message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    JoinGameEvent.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.gamePlayer != null && Object.hasOwnProperty.call(message, "gamePlayer"))
                            $root.com.jleoirab.xando.protos.GamePlayer.encode(message.gamePlayer, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                        return writer;
                    };

                    /**
                     * Encodes the specified JoinGameEvent message, length delimited. Does not implicitly {@link com.jleoirab.xando.events.JoinGameEvent.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof com.jleoirab.xando.events.JoinGameEvent
                     * @static
                     * @param {com.jleoirab.xando.events.IJoinGameEvent} message JoinGameEvent message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    JoinGameEvent.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };

                    /**
                     * Decodes a JoinGameEvent message from the specified reader or buffer.
                     * @function decode
                     * @memberof com.jleoirab.xando.events.JoinGameEvent
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {com.jleoirab.xando.events.JoinGameEvent} JoinGameEvent
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    JoinGameEvent.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.jleoirab.xando.events.JoinGameEvent();
                        while (reader.pos < end) {
                            let tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.gamePlayer = $root.com.jleoirab.xando.protos.GamePlayer.decode(reader, reader.uint32());
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };

                    /**
                     * Decodes a JoinGameEvent message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof com.jleoirab.xando.events.JoinGameEvent
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {com.jleoirab.xando.events.JoinGameEvent} JoinGameEvent
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    JoinGameEvent.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a JoinGameEvent message.
                     * @function verify
                     * @memberof com.jleoirab.xando.events.JoinGameEvent
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    JoinGameEvent.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.gamePlayer != null && message.hasOwnProperty("gamePlayer")) {
                            let error = $root.com.jleoirab.xando.protos.GamePlayer.verify(message.gamePlayer);
                            if (error)
                                return "gamePlayer." + error;
                        }
                        return null;
                    };

                    /**
                     * Creates a JoinGameEvent message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof com.jleoirab.xando.events.JoinGameEvent
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {com.jleoirab.xando.events.JoinGameEvent} JoinGameEvent
                     */
                    JoinGameEvent.fromObject = function fromObject(object) {
                        if (object instanceof $root.com.jleoirab.xando.events.JoinGameEvent)
                            return object;
                        let message = new $root.com.jleoirab.xando.events.JoinGameEvent();
                        if (object.gamePlayer != null) {
                            if (typeof object.gamePlayer !== "object")
                                throw TypeError(".com.jleoirab.xando.events.JoinGameEvent.gamePlayer: object expected");
                            message.gamePlayer = $root.com.jleoirab.xando.protos.GamePlayer.fromObject(object.gamePlayer);
                        }
                        return message;
                    };

                    /**
                     * Creates a plain object from a JoinGameEvent message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof com.jleoirab.xando.events.JoinGameEvent
                     * @static
                     * @param {com.jleoirab.xando.events.JoinGameEvent} message JoinGameEvent
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    JoinGameEvent.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        let object = {};
                        if (options.defaults)
                            object.gamePlayer = null;
                        if (message.gamePlayer != null && message.hasOwnProperty("gamePlayer"))
                            object.gamePlayer = $root.com.jleoirab.xando.protos.GamePlayer.toObject(message.gamePlayer, options);
                        return object;
                    };

                    /**
                     * Converts this JoinGameEvent to JSON.
                     * @function toJSON
                     * @memberof com.jleoirab.xando.events.JoinGameEvent
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    JoinGameEvent.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    return JoinGameEvent;
                })();

                events.GameEvent = (function() {

                    /**
                     * Properties of a GameEvent.
                     * @memberof com.jleoirab.xando.events
                     * @interface IGameEvent
                     * @property {com.jleoirab.xando.events.IMoveEvent|null} [moveEvent] GameEvent moveEvent
                     * @property {com.jleoirab.xando.events.IJoinGameEvent|null} [joinGameEvent] GameEvent joinGameEvent
                     * @property {com.jleoirab.xando.protos.IGame|null} [game] GameEvent game
                     */

                    /**
                     * Constructs a new GameEvent.
                     * @memberof com.jleoirab.xando.events
                     * @classdesc Represents a GameEvent.
                     * @implements IGameEvent
                     * @constructor
                     * @param {com.jleoirab.xando.events.IGameEvent=} [properties] Properties to set
                     */
                    function GameEvent(properties) {
                        if (properties)
                            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * GameEvent moveEvent.
                     * @member {com.jleoirab.xando.events.IMoveEvent|null|undefined} moveEvent
                     * @memberof com.jleoirab.xando.events.GameEvent
                     * @instance
                     */
                    GameEvent.prototype.moveEvent = null;

                    /**
                     * GameEvent joinGameEvent.
                     * @member {com.jleoirab.xando.events.IJoinGameEvent|null|undefined} joinGameEvent
                     * @memberof com.jleoirab.xando.events.GameEvent
                     * @instance
                     */
                    GameEvent.prototype.joinGameEvent = null;

                    /**
                     * GameEvent game.
                     * @member {com.jleoirab.xando.protos.IGame|null|undefined} game
                     * @memberof com.jleoirab.xando.events.GameEvent
                     * @instance
                     */
                    GameEvent.prototype.game = null;

                    // OneOf field names bound to virtual getters and setters
                    let $oneOfFields;

                    /**
                     * GameEvent event.
                     * @member {"moveEvent"|"joinGameEvent"|undefined} event
                     * @memberof com.jleoirab.xando.events.GameEvent
                     * @instance
                     */
                    Object.defineProperty(GameEvent.prototype, "event", {
                        get: $util.oneOfGetter($oneOfFields = ["moveEvent", "joinGameEvent"]),
                        set: $util.oneOfSetter($oneOfFields)
                    });

                    /**
                     * Creates a new GameEvent instance using the specified properties.
                     * @function create
                     * @memberof com.jleoirab.xando.events.GameEvent
                     * @static
                     * @param {com.jleoirab.xando.events.IGameEvent=} [properties] Properties to set
                     * @returns {com.jleoirab.xando.events.GameEvent} GameEvent instance
                     */
                    GameEvent.create = function create(properties) {
                        return new GameEvent(properties);
                    };

                    /**
                     * Encodes the specified GameEvent message. Does not implicitly {@link com.jleoirab.xando.events.GameEvent.verify|verify} messages.
                     * @function encode
                     * @memberof com.jleoirab.xando.events.GameEvent
                     * @static
                     * @param {com.jleoirab.xando.events.IGameEvent} message GameEvent message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    GameEvent.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.moveEvent != null && Object.hasOwnProperty.call(message, "moveEvent"))
                            $root.com.jleoirab.xando.events.MoveEvent.encode(message.moveEvent, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                        if (message.joinGameEvent != null && Object.hasOwnProperty.call(message, "joinGameEvent"))
                            $root.com.jleoirab.xando.events.JoinGameEvent.encode(message.joinGameEvent, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                        if (message.game != null && Object.hasOwnProperty.call(message, "game"))
                            $root.com.jleoirab.xando.protos.Game.encode(message.game, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                        return writer;
                    };

                    /**
                     * Encodes the specified GameEvent message, length delimited. Does not implicitly {@link com.jleoirab.xando.events.GameEvent.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof com.jleoirab.xando.events.GameEvent
                     * @static
                     * @param {com.jleoirab.xando.events.IGameEvent} message GameEvent message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    GameEvent.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };

                    /**
                     * Decodes a GameEvent message from the specified reader or buffer.
                     * @function decode
                     * @memberof com.jleoirab.xando.events.GameEvent
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {com.jleoirab.xando.events.GameEvent} GameEvent
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    GameEvent.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.jleoirab.xando.events.GameEvent();
                        while (reader.pos < end) {
                            let tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.moveEvent = $root.com.jleoirab.xando.events.MoveEvent.decode(reader, reader.uint32());
                                break;
                            case 2:
                                message.joinGameEvent = $root.com.jleoirab.xando.events.JoinGameEvent.decode(reader, reader.uint32());
                                break;
                            case 3:
                                message.game = $root.com.jleoirab.xando.protos.Game.decode(reader, reader.uint32());
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };

                    /**
                     * Decodes a GameEvent message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof com.jleoirab.xando.events.GameEvent
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {com.jleoirab.xando.events.GameEvent} GameEvent
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    GameEvent.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a GameEvent message.
                     * @function verify
                     * @memberof com.jleoirab.xando.events.GameEvent
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    GameEvent.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        let properties = {};
                        if (message.moveEvent != null && message.hasOwnProperty("moveEvent")) {
                            properties.event = 1;
                            {
                                let error = $root.com.jleoirab.xando.events.MoveEvent.verify(message.moveEvent);
                                if (error)
                                    return "moveEvent." + error;
                            }
                        }
                        if (message.joinGameEvent != null && message.hasOwnProperty("joinGameEvent")) {
                            if (properties.event === 1)
                                return "event: multiple values";
                            properties.event = 1;
                            {
                                let error = $root.com.jleoirab.xando.events.JoinGameEvent.verify(message.joinGameEvent);
                                if (error)
                                    return "joinGameEvent." + error;
                            }
                        }
                        if (message.game != null && message.hasOwnProperty("game")) {
                            let error = $root.com.jleoirab.xando.protos.Game.verify(message.game);
                            if (error)
                                return "game." + error;
                        }
                        return null;
                    };

                    /**
                     * Creates a GameEvent message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof com.jleoirab.xando.events.GameEvent
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {com.jleoirab.xando.events.GameEvent} GameEvent
                     */
                    GameEvent.fromObject = function fromObject(object) {
                        if (object instanceof $root.com.jleoirab.xando.events.GameEvent)
                            return object;
                        let message = new $root.com.jleoirab.xando.events.GameEvent();
                        if (object.moveEvent != null) {
                            if (typeof object.moveEvent !== "object")
                                throw TypeError(".com.jleoirab.xando.events.GameEvent.moveEvent: object expected");
                            message.moveEvent = $root.com.jleoirab.xando.events.MoveEvent.fromObject(object.moveEvent);
                        }
                        if (object.joinGameEvent != null) {
                            if (typeof object.joinGameEvent !== "object")
                                throw TypeError(".com.jleoirab.xando.events.GameEvent.joinGameEvent: object expected");
                            message.joinGameEvent = $root.com.jleoirab.xando.events.JoinGameEvent.fromObject(object.joinGameEvent);
                        }
                        if (object.game != null) {
                            if (typeof object.game !== "object")
                                throw TypeError(".com.jleoirab.xando.events.GameEvent.game: object expected");
                            message.game = $root.com.jleoirab.xando.protos.Game.fromObject(object.game);
                        }
                        return message;
                    };

                    /**
                     * Creates a plain object from a GameEvent message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof com.jleoirab.xando.events.GameEvent
                     * @static
                     * @param {com.jleoirab.xando.events.GameEvent} message GameEvent
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    GameEvent.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        let object = {};
                        if (options.defaults)
                            object.game = null;
                        if (message.moveEvent != null && message.hasOwnProperty("moveEvent")) {
                            object.moveEvent = $root.com.jleoirab.xando.events.MoveEvent.toObject(message.moveEvent, options);
                            if (options.oneofs)
                                object.event = "moveEvent";
                        }
                        if (message.joinGameEvent != null && message.hasOwnProperty("joinGameEvent")) {
                            object.joinGameEvent = $root.com.jleoirab.xando.events.JoinGameEvent.toObject(message.joinGameEvent, options);
                            if (options.oneofs)
                                object.event = "joinGameEvent";
                        }
                        if (message.game != null && message.hasOwnProperty("game"))
                            object.game = $root.com.jleoirab.xando.protos.Game.toObject(message.game, options);
                        return object;
                    };

                    /**
                     * Converts this GameEvent to JSON.
                     * @function toJSON
                     * @memberof com.jleoirab.xando.events.GameEvent
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    GameEvent.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    return GameEvent;
                })();

                return events;
            })();

            xando.protos = (function() {

                /**
                 * Namespace protos.
                 * @memberof com.jleoirab.xando
                 * @namespace
                 */
                const protos = {};

                protos.GamePlayer = (function() {

                    /**
                     * Properties of a GamePlayer.
                     * @memberof com.jleoirab.xando.protos
                     * @interface IGamePlayer
                     * @property {string|null} [playerId] GamePlayer playerId
                     * @property {string|null} [playerName] GamePlayer playerName
                     */

                    /**
                     * Constructs a new GamePlayer.
                     * @memberof com.jleoirab.xando.protos
                     * @classdesc Represents a GamePlayer.
                     * @implements IGamePlayer
                     * @constructor
                     * @param {com.jleoirab.xando.protos.IGamePlayer=} [properties] Properties to set
                     */
                    function GamePlayer(properties) {
                        if (properties)
                            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * GamePlayer playerId.
                     * @member {string} playerId
                     * @memberof com.jleoirab.xando.protos.GamePlayer
                     * @instance
                     */
                    GamePlayer.prototype.playerId = "";

                    /**
                     * GamePlayer playerName.
                     * @member {string} playerName
                     * @memberof com.jleoirab.xando.protos.GamePlayer
                     * @instance
                     */
                    GamePlayer.prototype.playerName = "";

                    /**
                     * Creates a new GamePlayer instance using the specified properties.
                     * @function create
                     * @memberof com.jleoirab.xando.protos.GamePlayer
                     * @static
                     * @param {com.jleoirab.xando.protos.IGamePlayer=} [properties] Properties to set
                     * @returns {com.jleoirab.xando.protos.GamePlayer} GamePlayer instance
                     */
                    GamePlayer.create = function create(properties) {
                        return new GamePlayer(properties);
                    };

                    /**
                     * Encodes the specified GamePlayer message. Does not implicitly {@link com.jleoirab.xando.protos.GamePlayer.verify|verify} messages.
                     * @function encode
                     * @memberof com.jleoirab.xando.protos.GamePlayer
                     * @static
                     * @param {com.jleoirab.xando.protos.IGamePlayer} message GamePlayer message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    GamePlayer.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.playerId != null && Object.hasOwnProperty.call(message, "playerId"))
                            writer.uint32(/* id 1, wireType 2 =*/10).string(message.playerId);
                        if (message.playerName != null && Object.hasOwnProperty.call(message, "playerName"))
                            writer.uint32(/* id 2, wireType 2 =*/18).string(message.playerName);
                        return writer;
                    };

                    /**
                     * Encodes the specified GamePlayer message, length delimited. Does not implicitly {@link com.jleoirab.xando.protos.GamePlayer.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof com.jleoirab.xando.protos.GamePlayer
                     * @static
                     * @param {com.jleoirab.xando.protos.IGamePlayer} message GamePlayer message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    GamePlayer.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };

                    /**
                     * Decodes a GamePlayer message from the specified reader or buffer.
                     * @function decode
                     * @memberof com.jleoirab.xando.protos.GamePlayer
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {com.jleoirab.xando.protos.GamePlayer} GamePlayer
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    GamePlayer.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.jleoirab.xando.protos.GamePlayer();
                        while (reader.pos < end) {
                            let tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.playerId = reader.string();
                                break;
                            case 2:
                                message.playerName = reader.string();
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };

                    /**
                     * Decodes a GamePlayer message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof com.jleoirab.xando.protos.GamePlayer
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {com.jleoirab.xando.protos.GamePlayer} GamePlayer
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    GamePlayer.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a GamePlayer message.
                     * @function verify
                     * @memberof com.jleoirab.xando.protos.GamePlayer
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    GamePlayer.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.playerId != null && message.hasOwnProperty("playerId"))
                            if (!$util.isString(message.playerId))
                                return "playerId: string expected";
                        if (message.playerName != null && message.hasOwnProperty("playerName"))
                            if (!$util.isString(message.playerName))
                                return "playerName: string expected";
                        return null;
                    };

                    /**
                     * Creates a GamePlayer message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof com.jleoirab.xando.protos.GamePlayer
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {com.jleoirab.xando.protos.GamePlayer} GamePlayer
                     */
                    GamePlayer.fromObject = function fromObject(object) {
                        if (object instanceof $root.com.jleoirab.xando.protos.GamePlayer)
                            return object;
                        let message = new $root.com.jleoirab.xando.protos.GamePlayer();
                        if (object.playerId != null)
                            message.playerId = String(object.playerId);
                        if (object.playerName != null)
                            message.playerName = String(object.playerName);
                        return message;
                    };

                    /**
                     * Creates a plain object from a GamePlayer message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof com.jleoirab.xando.protos.GamePlayer
                     * @static
                     * @param {com.jleoirab.xando.protos.GamePlayer} message GamePlayer
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    GamePlayer.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        let object = {};
                        if (options.defaults) {
                            object.playerId = "";
                            object.playerName = "";
                        }
                        if (message.playerId != null && message.hasOwnProperty("playerId"))
                            object.playerId = message.playerId;
                        if (message.playerName != null && message.hasOwnProperty("playerName"))
                            object.playerName = message.playerName;
                        return object;
                    };

                    /**
                     * Converts this GamePlayer to JSON.
                     * @function toJSON
                     * @memberof com.jleoirab.xando.protos.GamePlayer
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    GamePlayer.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    return GamePlayer;
                })();

                protos.GameBoard = (function() {

                    /**
                     * Properties of a GameBoard.
                     * @memberof com.jleoirab.xando.protos
                     * @interface IGameBoard
                     * @property {Array.<com.jleoirab.xando.protos.GameBoard.GameBoardCell>|null} [cell] GameBoard cell
                     */

                    /**
                     * Constructs a new GameBoard.
                     * @memberof com.jleoirab.xando.protos
                     * @classdesc Represents a GameBoard.
                     * @implements IGameBoard
                     * @constructor
                     * @param {com.jleoirab.xando.protos.IGameBoard=} [properties] Properties to set
                     */
                    function GameBoard(properties) {
                        this.cell = [];
                        if (properties)
                            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * GameBoard cell.
                     * @member {Array.<com.jleoirab.xando.protos.GameBoard.GameBoardCell>} cell
                     * @memberof com.jleoirab.xando.protos.GameBoard
                     * @instance
                     */
                    GameBoard.prototype.cell = $util.emptyArray;

                    /**
                     * Creates a new GameBoard instance using the specified properties.
                     * @function create
                     * @memberof com.jleoirab.xando.protos.GameBoard
                     * @static
                     * @param {com.jleoirab.xando.protos.IGameBoard=} [properties] Properties to set
                     * @returns {com.jleoirab.xando.protos.GameBoard} GameBoard instance
                     */
                    GameBoard.create = function create(properties) {
                        return new GameBoard(properties);
                    };

                    /**
                     * Encodes the specified GameBoard message. Does not implicitly {@link com.jleoirab.xando.protos.GameBoard.verify|verify} messages.
                     * @function encode
                     * @memberof com.jleoirab.xando.protos.GameBoard
                     * @static
                     * @param {com.jleoirab.xando.protos.IGameBoard} message GameBoard message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    GameBoard.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.cell != null && message.cell.length) {
                            writer.uint32(/* id 1, wireType 2 =*/10).fork();
                            for (let i = 0; i < message.cell.length; ++i)
                                writer.int32(message.cell[i]);
                            writer.ldelim();
                        }
                        return writer;
                    };

                    /**
                     * Encodes the specified GameBoard message, length delimited. Does not implicitly {@link com.jleoirab.xando.protos.GameBoard.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof com.jleoirab.xando.protos.GameBoard
                     * @static
                     * @param {com.jleoirab.xando.protos.IGameBoard} message GameBoard message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    GameBoard.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };

                    /**
                     * Decodes a GameBoard message from the specified reader or buffer.
                     * @function decode
                     * @memberof com.jleoirab.xando.protos.GameBoard
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {com.jleoirab.xando.protos.GameBoard} GameBoard
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    GameBoard.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.jleoirab.xando.protos.GameBoard();
                        while (reader.pos < end) {
                            let tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                if (!(message.cell && message.cell.length))
                                    message.cell = [];
                                if ((tag & 7) === 2) {
                                    let end2 = reader.uint32() + reader.pos;
                                    while (reader.pos < end2)
                                        message.cell.push(reader.int32());
                                } else
                                    message.cell.push(reader.int32());
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };

                    /**
                     * Decodes a GameBoard message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof com.jleoirab.xando.protos.GameBoard
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {com.jleoirab.xando.protos.GameBoard} GameBoard
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    GameBoard.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a GameBoard message.
                     * @function verify
                     * @memberof com.jleoirab.xando.protos.GameBoard
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    GameBoard.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.cell != null && message.hasOwnProperty("cell")) {
                            if (!Array.isArray(message.cell))
                                return "cell: array expected";
                            for (let i = 0; i < message.cell.length; ++i)
                                switch (message.cell[i]) {
                                default:
                                    return "cell: enum value[] expected";
                                case 0:
                                case 1:
                                case 3:
                                case 4:
                                    break;
                                }
                        }
                        return null;
                    };

                    /**
                     * Creates a GameBoard message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof com.jleoirab.xando.protos.GameBoard
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {com.jleoirab.xando.protos.GameBoard} GameBoard
                     */
                    GameBoard.fromObject = function fromObject(object) {
                        if (object instanceof $root.com.jleoirab.xando.protos.GameBoard)
                            return object;
                        let message = new $root.com.jleoirab.xando.protos.GameBoard();
                        if (object.cell) {
                            if (!Array.isArray(object.cell))
                                throw TypeError(".com.jleoirab.xando.protos.GameBoard.cell: array expected");
                            message.cell = [];
                            for (let i = 0; i < object.cell.length; ++i)
                                switch (object.cell[i]) {
                                default:
                                case "UNKNOWN":
                                case 0:
                                    message.cell[i] = 0;
                                    break;
                                case "UNOCCUPIED":
                                case 1:
                                    message.cell[i] = 1;
                                    break;
                                case "X":
                                case 3:
                                    message.cell[i] = 3;
                                    break;
                                case "O":
                                case 4:
                                    message.cell[i] = 4;
                                    break;
                                }
                        }
                        return message;
                    };

                    /**
                     * Creates a plain object from a GameBoard message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof com.jleoirab.xando.protos.GameBoard
                     * @static
                     * @param {com.jleoirab.xando.protos.GameBoard} message GameBoard
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    GameBoard.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        let object = {};
                        if (options.arrays || options.defaults)
                            object.cell = [];
                        if (message.cell && message.cell.length) {
                            object.cell = [];
                            for (let j = 0; j < message.cell.length; ++j)
                                object.cell[j] = options.enums === String ? $root.com.jleoirab.xando.protos.GameBoard.GameBoardCell[message.cell[j]] : message.cell[j];
                        }
                        return object;
                    };

                    /**
                     * Converts this GameBoard to JSON.
                     * @function toJSON
                     * @memberof com.jleoirab.xando.protos.GameBoard
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    GameBoard.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    /**
                     * GameBoardCell enum.
                     * @name com.jleoirab.xando.protos.GameBoard.GameBoardCell
                     * @enum {number}
                     * @property {number} UNKNOWN=0 UNKNOWN value
                     * @property {number} UNOCCUPIED=1 UNOCCUPIED value
                     * @property {number} X=3 X value
                     * @property {number} O=4 O value
                     */
                    GameBoard.GameBoardCell = (function() {
                        const valuesById = {}, values = Object.create(valuesById);
                        values[valuesById[0] = "UNKNOWN"] = 0;
                        values[valuesById[1] = "UNOCCUPIED"] = 1;
                        values[valuesById[3] = "X"] = 3;
                        values[valuesById[4] = "O"] = 4;
                        return values;
                    })();

                    return GameBoard;
                })();

                /**
                 * PlayerTag enum.
                 * @name com.jleoirab.xando.protos.PlayerTag
                 * @enum {number}
                 * @property {number} PLAYER_TAG_UNKNOWN=0 PLAYER_TAG_UNKNOWN value
                 * @property {number} PLAYER_TAG_X=1 PLAYER_TAG_X value
                 * @property {number} PLAYER_TAG_O=2 PLAYER_TAG_O value
                 */
                protos.PlayerTag = (function() {
                    const valuesById = {}, values = Object.create(valuesById);
                    values[valuesById[0] = "PLAYER_TAG_UNKNOWN"] = 0;
                    values[valuesById[1] = "PLAYER_TAG_X"] = 1;
                    values[valuesById[2] = "PLAYER_TAG_O"] = 2;
                    return values;
                })();

                /**
                 * GameState enum.
                 * @name com.jleoirab.xando.protos.GameState
                 * @enum {number}
                 * @property {number} GAME_STATE_UNKNOWN=0 GAME_STATE_UNKNOWN value
                 * @property {number} GAME_STATE_CREATED=1 GAME_STATE_CREATED value
                 * @property {number} GAME_STATE_IN_PROGRESS=2 GAME_STATE_IN_PROGRESS value
                 * @property {number} GAME_STATE_FINISHED=3 GAME_STATE_FINISHED value
                 */
                protos.GameState = (function() {
                    const valuesById = {}, values = Object.create(valuesById);
                    values[valuesById[0] = "GAME_STATE_UNKNOWN"] = 0;
                    values[valuesById[1] = "GAME_STATE_CREATED"] = 1;
                    values[valuesById[2] = "GAME_STATE_IN_PROGRESS"] = 2;
                    values[valuesById[3] = "GAME_STATE_FINISHED"] = 3;
                    return values;
                })();

                protos.GameStatus = (function() {

                    /**
                     * Properties of a GameStatus.
                     * @memberof com.jleoirab.xando.protos
                     * @interface IGameStatus
                     * @property {com.jleoirab.xando.protos.GameState|null} [state] GameStatus state
                     * @property {com.jleoirab.xando.protos.PlayerTag|null} [winner] GameStatus winner
                     */

                    /**
                     * Constructs a new GameStatus.
                     * @memberof com.jleoirab.xando.protos
                     * @classdesc Represents a GameStatus.
                     * @implements IGameStatus
                     * @constructor
                     * @param {com.jleoirab.xando.protos.IGameStatus=} [properties] Properties to set
                     */
                    function GameStatus(properties) {
                        if (properties)
                            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * GameStatus state.
                     * @member {com.jleoirab.xando.protos.GameState} state
                     * @memberof com.jleoirab.xando.protos.GameStatus
                     * @instance
                     */
                    GameStatus.prototype.state = 0;

                    /**
                     * GameStatus winner.
                     * @member {com.jleoirab.xando.protos.PlayerTag} winner
                     * @memberof com.jleoirab.xando.protos.GameStatus
                     * @instance
                     */
                    GameStatus.prototype.winner = 0;

                    /**
                     * Creates a new GameStatus instance using the specified properties.
                     * @function create
                     * @memberof com.jleoirab.xando.protos.GameStatus
                     * @static
                     * @param {com.jleoirab.xando.protos.IGameStatus=} [properties] Properties to set
                     * @returns {com.jleoirab.xando.protos.GameStatus} GameStatus instance
                     */
                    GameStatus.create = function create(properties) {
                        return new GameStatus(properties);
                    };

                    /**
                     * Encodes the specified GameStatus message. Does not implicitly {@link com.jleoirab.xando.protos.GameStatus.verify|verify} messages.
                     * @function encode
                     * @memberof com.jleoirab.xando.protos.GameStatus
                     * @static
                     * @param {com.jleoirab.xando.protos.IGameStatus} message GameStatus message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    GameStatus.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.state != null && Object.hasOwnProperty.call(message, "state"))
                            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.state);
                        if (message.winner != null && Object.hasOwnProperty.call(message, "winner"))
                            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.winner);
                        return writer;
                    };

                    /**
                     * Encodes the specified GameStatus message, length delimited. Does not implicitly {@link com.jleoirab.xando.protos.GameStatus.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof com.jleoirab.xando.protos.GameStatus
                     * @static
                     * @param {com.jleoirab.xando.protos.IGameStatus} message GameStatus message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    GameStatus.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };

                    /**
                     * Decodes a GameStatus message from the specified reader or buffer.
                     * @function decode
                     * @memberof com.jleoirab.xando.protos.GameStatus
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {com.jleoirab.xando.protos.GameStatus} GameStatus
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    GameStatus.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.jleoirab.xando.protos.GameStatus();
                        while (reader.pos < end) {
                            let tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.state = reader.int32();
                                break;
                            case 2:
                                message.winner = reader.int32();
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };

                    /**
                     * Decodes a GameStatus message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof com.jleoirab.xando.protos.GameStatus
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {com.jleoirab.xando.protos.GameStatus} GameStatus
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    GameStatus.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a GameStatus message.
                     * @function verify
                     * @memberof com.jleoirab.xando.protos.GameStatus
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    GameStatus.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.state != null && message.hasOwnProperty("state"))
                            switch (message.state) {
                            default:
                                return "state: enum value expected";
                            case 0:
                            case 1:
                            case 2:
                            case 3:
                                break;
                            }
                        if (message.winner != null && message.hasOwnProperty("winner"))
                            switch (message.winner) {
                            default:
                                return "winner: enum value expected";
                            case 0:
                            case 1:
                            case 2:
                                break;
                            }
                        return null;
                    };

                    /**
                     * Creates a GameStatus message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof com.jleoirab.xando.protos.GameStatus
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {com.jleoirab.xando.protos.GameStatus} GameStatus
                     */
                    GameStatus.fromObject = function fromObject(object) {
                        if (object instanceof $root.com.jleoirab.xando.protos.GameStatus)
                            return object;
                        let message = new $root.com.jleoirab.xando.protos.GameStatus();
                        switch (object.state) {
                        case "GAME_STATE_UNKNOWN":
                        case 0:
                            message.state = 0;
                            break;
                        case "GAME_STATE_CREATED":
                        case 1:
                            message.state = 1;
                            break;
                        case "GAME_STATE_IN_PROGRESS":
                        case 2:
                            message.state = 2;
                            break;
                        case "GAME_STATE_FINISHED":
                        case 3:
                            message.state = 3;
                            break;
                        }
                        switch (object.winner) {
                        case "PLAYER_TAG_UNKNOWN":
                        case 0:
                            message.winner = 0;
                            break;
                        case "PLAYER_TAG_X":
                        case 1:
                            message.winner = 1;
                            break;
                        case "PLAYER_TAG_O":
                        case 2:
                            message.winner = 2;
                            break;
                        }
                        return message;
                    };

                    /**
                     * Creates a plain object from a GameStatus message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof com.jleoirab.xando.protos.GameStatus
                     * @static
                     * @param {com.jleoirab.xando.protos.GameStatus} message GameStatus
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    GameStatus.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        let object = {};
                        if (options.defaults) {
                            object.state = options.enums === String ? "GAME_STATE_UNKNOWN" : 0;
                            object.winner = options.enums === String ? "PLAYER_TAG_UNKNOWN" : 0;
                        }
                        if (message.state != null && message.hasOwnProperty("state"))
                            object.state = options.enums === String ? $root.com.jleoirab.xando.protos.GameState[message.state] : message.state;
                        if (message.winner != null && message.hasOwnProperty("winner"))
                            object.winner = options.enums === String ? $root.com.jleoirab.xando.protos.PlayerTag[message.winner] : message.winner;
                        return object;
                    };

                    /**
                     * Converts this GameStatus to JSON.
                     * @function toJSON
                     * @memberof com.jleoirab.xando.protos.GameStatus
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    GameStatus.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    return GameStatus;
                })();

                protos.Game = (function() {

                    /**
                     * Properties of a Game.
                     * @memberof com.jleoirab.xando.protos
                     * @interface IGame
                     * @property {string|null} [uid] Game uid
                     * @property {string|null} [id] Game id
                     * @property {string|null} [gameCreatorPlayerId] Game gameCreatorPlayerId
                     * @property {com.jleoirab.xando.protos.IGamePlayer|null} [playerX] Game playerX
                     * @property {com.jleoirab.xando.protos.IGamePlayer|null} [playerO] Game playerO
                     * @property {com.jleoirab.xando.protos.IGameBoard|null} [gameBoard] Game gameBoard
                     * @property {com.jleoirab.xando.protos.PlayerTag|null} [currentPlayerTurn] Game currentPlayerTurn
                     * @property {com.jleoirab.xando.protos.IGameStatus|null} [gameStatus] Game gameStatus
                     */

                    /**
                     * Constructs a new Game.
                     * @memberof com.jleoirab.xando.protos
                     * @classdesc Represents a Game.
                     * @implements IGame
                     * @constructor
                     * @param {com.jleoirab.xando.protos.IGame=} [properties] Properties to set
                     */
                    function Game(properties) {
                        if (properties)
                            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * Game uid.
                     * @member {string} uid
                     * @memberof com.jleoirab.xando.protos.Game
                     * @instance
                     */
                    Game.prototype.uid = "";

                    /**
                     * Game id.
                     * @member {string} id
                     * @memberof com.jleoirab.xando.protos.Game
                     * @instance
                     */
                    Game.prototype.id = "";

                    /**
                     * Game gameCreatorPlayerId.
                     * @member {string} gameCreatorPlayerId
                     * @memberof com.jleoirab.xando.protos.Game
                     * @instance
                     */
                    Game.prototype.gameCreatorPlayerId = "";

                    /**
                     * Game playerX.
                     * @member {com.jleoirab.xando.protos.IGamePlayer|null|undefined} playerX
                     * @memberof com.jleoirab.xando.protos.Game
                     * @instance
                     */
                    Game.prototype.playerX = null;

                    /**
                     * Game playerO.
                     * @member {com.jleoirab.xando.protos.IGamePlayer|null|undefined} playerO
                     * @memberof com.jleoirab.xando.protos.Game
                     * @instance
                     */
                    Game.prototype.playerO = null;

                    /**
                     * Game gameBoard.
                     * @member {com.jleoirab.xando.protos.IGameBoard|null|undefined} gameBoard
                     * @memberof com.jleoirab.xando.protos.Game
                     * @instance
                     */
                    Game.prototype.gameBoard = null;

                    /**
                     * Game currentPlayerTurn.
                     * @member {com.jleoirab.xando.protos.PlayerTag} currentPlayerTurn
                     * @memberof com.jleoirab.xando.protos.Game
                     * @instance
                     */
                    Game.prototype.currentPlayerTurn = 0;

                    /**
                     * Game gameStatus.
                     * @member {com.jleoirab.xando.protos.IGameStatus|null|undefined} gameStatus
                     * @memberof com.jleoirab.xando.protos.Game
                     * @instance
                     */
                    Game.prototype.gameStatus = null;

                    /**
                     * Creates a new Game instance using the specified properties.
                     * @function create
                     * @memberof com.jleoirab.xando.protos.Game
                     * @static
                     * @param {com.jleoirab.xando.protos.IGame=} [properties] Properties to set
                     * @returns {com.jleoirab.xando.protos.Game} Game instance
                     */
                    Game.create = function create(properties) {
                        return new Game(properties);
                    };

                    /**
                     * Encodes the specified Game message. Does not implicitly {@link com.jleoirab.xando.protos.Game.verify|verify} messages.
                     * @function encode
                     * @memberof com.jleoirab.xando.protos.Game
                     * @static
                     * @param {com.jleoirab.xando.protos.IGame} message Game message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Game.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.uid != null && Object.hasOwnProperty.call(message, "uid"))
                            writer.uint32(/* id 1, wireType 2 =*/10).string(message.uid);
                        if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                            writer.uint32(/* id 2, wireType 2 =*/18).string(message.id);
                        if (message.gameCreatorPlayerId != null && Object.hasOwnProperty.call(message, "gameCreatorPlayerId"))
                            writer.uint32(/* id 3, wireType 2 =*/26).string(message.gameCreatorPlayerId);
                        if (message.playerX != null && Object.hasOwnProperty.call(message, "playerX"))
                            $root.com.jleoirab.xando.protos.GamePlayer.encode(message.playerX, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                        if (message.playerO != null && Object.hasOwnProperty.call(message, "playerO"))
                            $root.com.jleoirab.xando.protos.GamePlayer.encode(message.playerO, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
                        if (message.gameBoard != null && Object.hasOwnProperty.call(message, "gameBoard"))
                            $root.com.jleoirab.xando.protos.GameBoard.encode(message.gameBoard, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
                        if (message.currentPlayerTurn != null && Object.hasOwnProperty.call(message, "currentPlayerTurn"))
                            writer.uint32(/* id 7, wireType 0 =*/56).int32(message.currentPlayerTurn);
                        if (message.gameStatus != null && Object.hasOwnProperty.call(message, "gameStatus"))
                            $root.com.jleoirab.xando.protos.GameStatus.encode(message.gameStatus, writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();
                        return writer;
                    };

                    /**
                     * Encodes the specified Game message, length delimited. Does not implicitly {@link com.jleoirab.xando.protos.Game.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof com.jleoirab.xando.protos.Game
                     * @static
                     * @param {com.jleoirab.xando.protos.IGame} message Game message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Game.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };

                    /**
                     * Decodes a Game message from the specified reader or buffer.
                     * @function decode
                     * @memberof com.jleoirab.xando.protos.Game
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {com.jleoirab.xando.protos.Game} Game
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Game.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.jleoirab.xando.protos.Game();
                        while (reader.pos < end) {
                            let tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.uid = reader.string();
                                break;
                            case 2:
                                message.id = reader.string();
                                break;
                            case 3:
                                message.gameCreatorPlayerId = reader.string();
                                break;
                            case 4:
                                message.playerX = $root.com.jleoirab.xando.protos.GamePlayer.decode(reader, reader.uint32());
                                break;
                            case 5:
                                message.playerO = $root.com.jleoirab.xando.protos.GamePlayer.decode(reader, reader.uint32());
                                break;
                            case 6:
                                message.gameBoard = $root.com.jleoirab.xando.protos.GameBoard.decode(reader, reader.uint32());
                                break;
                            case 7:
                                message.currentPlayerTurn = reader.int32();
                                break;
                            case 8:
                                message.gameStatus = $root.com.jleoirab.xando.protos.GameStatus.decode(reader, reader.uint32());
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };

                    /**
                     * Decodes a Game message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof com.jleoirab.xando.protos.Game
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {com.jleoirab.xando.protos.Game} Game
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Game.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a Game message.
                     * @function verify
                     * @memberof com.jleoirab.xando.protos.Game
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    Game.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.uid != null && message.hasOwnProperty("uid"))
                            if (!$util.isString(message.uid))
                                return "uid: string expected";
                        if (message.id != null && message.hasOwnProperty("id"))
                            if (!$util.isString(message.id))
                                return "id: string expected";
                        if (message.gameCreatorPlayerId != null && message.hasOwnProperty("gameCreatorPlayerId"))
                            if (!$util.isString(message.gameCreatorPlayerId))
                                return "gameCreatorPlayerId: string expected";
                        if (message.playerX != null && message.hasOwnProperty("playerX")) {
                            let error = $root.com.jleoirab.xando.protos.GamePlayer.verify(message.playerX);
                            if (error)
                                return "playerX." + error;
                        }
                        if (message.playerO != null && message.hasOwnProperty("playerO")) {
                            let error = $root.com.jleoirab.xando.protos.GamePlayer.verify(message.playerO);
                            if (error)
                                return "playerO." + error;
                        }
                        if (message.gameBoard != null && message.hasOwnProperty("gameBoard")) {
                            let error = $root.com.jleoirab.xando.protos.GameBoard.verify(message.gameBoard);
                            if (error)
                                return "gameBoard." + error;
                        }
                        if (message.currentPlayerTurn != null && message.hasOwnProperty("currentPlayerTurn"))
                            switch (message.currentPlayerTurn) {
                            default:
                                return "currentPlayerTurn: enum value expected";
                            case 0:
                            case 1:
                            case 2:
                                break;
                            }
                        if (message.gameStatus != null && message.hasOwnProperty("gameStatus")) {
                            let error = $root.com.jleoirab.xando.protos.GameStatus.verify(message.gameStatus);
                            if (error)
                                return "gameStatus." + error;
                        }
                        return null;
                    };

                    /**
                     * Creates a Game message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof com.jleoirab.xando.protos.Game
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {com.jleoirab.xando.protos.Game} Game
                     */
                    Game.fromObject = function fromObject(object) {
                        if (object instanceof $root.com.jleoirab.xando.protos.Game)
                            return object;
                        let message = new $root.com.jleoirab.xando.protos.Game();
                        if (object.uid != null)
                            message.uid = String(object.uid);
                        if (object.id != null)
                            message.id = String(object.id);
                        if (object.gameCreatorPlayerId != null)
                            message.gameCreatorPlayerId = String(object.gameCreatorPlayerId);
                        if (object.playerX != null) {
                            if (typeof object.playerX !== "object")
                                throw TypeError(".com.jleoirab.xando.protos.Game.playerX: object expected");
                            message.playerX = $root.com.jleoirab.xando.protos.GamePlayer.fromObject(object.playerX);
                        }
                        if (object.playerO != null) {
                            if (typeof object.playerO !== "object")
                                throw TypeError(".com.jleoirab.xando.protos.Game.playerO: object expected");
                            message.playerO = $root.com.jleoirab.xando.protos.GamePlayer.fromObject(object.playerO);
                        }
                        if (object.gameBoard != null) {
                            if (typeof object.gameBoard !== "object")
                                throw TypeError(".com.jleoirab.xando.protos.Game.gameBoard: object expected");
                            message.gameBoard = $root.com.jleoirab.xando.protos.GameBoard.fromObject(object.gameBoard);
                        }
                        switch (object.currentPlayerTurn) {
                        case "PLAYER_TAG_UNKNOWN":
                        case 0:
                            message.currentPlayerTurn = 0;
                            break;
                        case "PLAYER_TAG_X":
                        case 1:
                            message.currentPlayerTurn = 1;
                            break;
                        case "PLAYER_TAG_O":
                        case 2:
                            message.currentPlayerTurn = 2;
                            break;
                        }
                        if (object.gameStatus != null) {
                            if (typeof object.gameStatus !== "object")
                                throw TypeError(".com.jleoirab.xando.protos.Game.gameStatus: object expected");
                            message.gameStatus = $root.com.jleoirab.xando.protos.GameStatus.fromObject(object.gameStatus);
                        }
                        return message;
                    };

                    /**
                     * Creates a plain object from a Game message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof com.jleoirab.xando.protos.Game
                     * @static
                     * @param {com.jleoirab.xando.protos.Game} message Game
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    Game.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        let object = {};
                        if (options.defaults) {
                            object.uid = "";
                            object.id = "";
                            object.gameCreatorPlayerId = "";
                            object.playerX = null;
                            object.playerO = null;
                            object.gameBoard = null;
                            object.currentPlayerTurn = options.enums === String ? "PLAYER_TAG_UNKNOWN" : 0;
                            object.gameStatus = null;
                        }
                        if (message.uid != null && message.hasOwnProperty("uid"))
                            object.uid = message.uid;
                        if (message.id != null && message.hasOwnProperty("id"))
                            object.id = message.id;
                        if (message.gameCreatorPlayerId != null && message.hasOwnProperty("gameCreatorPlayerId"))
                            object.gameCreatorPlayerId = message.gameCreatorPlayerId;
                        if (message.playerX != null && message.hasOwnProperty("playerX"))
                            object.playerX = $root.com.jleoirab.xando.protos.GamePlayer.toObject(message.playerX, options);
                        if (message.playerO != null && message.hasOwnProperty("playerO"))
                            object.playerO = $root.com.jleoirab.xando.protos.GamePlayer.toObject(message.playerO, options);
                        if (message.gameBoard != null && message.hasOwnProperty("gameBoard"))
                            object.gameBoard = $root.com.jleoirab.xando.protos.GameBoard.toObject(message.gameBoard, options);
                        if (message.currentPlayerTurn != null && message.hasOwnProperty("currentPlayerTurn"))
                            object.currentPlayerTurn = options.enums === String ? $root.com.jleoirab.xando.protos.PlayerTag[message.currentPlayerTurn] : message.currentPlayerTurn;
                        if (message.gameStatus != null && message.hasOwnProperty("gameStatus"))
                            object.gameStatus = $root.com.jleoirab.xando.protos.GameStatus.toObject(message.gameStatus, options);
                        return object;
                    };

                    /**
                     * Converts this Game to JSON.
                     * @function toJSON
                     * @memberof com.jleoirab.xando.protos.Game
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    Game.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    return Game;
                })();

                return protos;
            })();

            return xando;
        })();

        return jleoirab;
    })();

    return com;
})();

export { $root as default };
