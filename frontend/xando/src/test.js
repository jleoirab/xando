const fs = require('fs');
const util = require('util');
const protobuf = require("protobufjs");
const Protos = require("./generated/compiled");

console.log("Running");
const output = fs.readFileSync('/Users/jleoirab/game_event_proto');
console.log(output)
console.log(output.length);

console.log(output);


const buf0 = [
  10, 52, 10, 46, 10, 36, 57, 52, 56, 98, 98, 97, 100, 52, 45, 102, 101, 49, 55, 45, 52, 98, 52, 50, 45, 56, 101, 55, 52, 45, 50, 52, 48, 54,
  97, 101, 50, 53, 52, 57, 97, 50, 18, 6, 100, 101, 98, 98, 105, 101, 16, 8, 24, 2, 26, 219, 1, 10, 24, 54, 48, 54, 49, 49, 99, 57, 51, 102,
  54, 98, 51, 101, 97, 50, 53, 57, 54, 50, 101, 101, 54, 97, 99, 18, 36, 57, 100, 57, 55, 52, 49, 56, 56, 45, 55, 56, 49, 50, 45, 52, 54, 50,
  98, 45, 98, 99, 98, 52, 45, 53, 52, 52, 98, 100, 52, 54, 56, 57, 51, 98, 54, 26, 36, 49, 99, 55, 56, 51, 55, 52, 98, 45, 52, 101, 57, 100,
  45, 52, 100, 101, 55, 45, 57, 55, 102, 57, 45, 49, 52, 53, 101, 55, 57, 101, 101, 98, 51, 49, 53, 34, 46, 10, 36, 49, 99, 55, 56, 51, 55,
  52, 98, 45, 52, 101, 57, 100, 45, 52, 100, 101, 55, 45, 57, 55, 102, 57, 45, 49, 52, 53, 101, 55, 57, 101, 101, 98, 51, 49, 53, 18, 6, 106,
  111, 115, 104, 117, 97, 42, 46, 10, 36, 57, 52, 56, 98, 98, 97, 100, 52, 45, 102, 101, 49, 55, 45, 52, 98, 52, 50, 45, 56, 101, 55, 52, 45,
  50, 52, 48, 54, 97, 101, 50, 53, 52, 57, 97, 50, 18, 6, 100, 101, 98, 98, 105, 101, 50, 11, 10, 9, 1, 1, 1, 3, 3, 4, 1, 1, 4, 56, 1, 66, 4, 8, 2, 16, 2,]

const buf = [
  10, 52, 10, 46, 10, 36, 57, 52, 56, 98, 98, 97, 100, 52, 45, 102, 101, 49, 55, 45, 52, 98, 52, 50, 45, 56, 101, 55, 52, 45, 50, 52, 48, 54,
  97, 101, 50, 53, 52, 57, 97, 50, 18, 6, 100, 101, 98, 98, 105, 101, 16, 8, 24, 2, 26, 239, 191, 189, 1, 10, 24, 54, 48, 54, 49, 49, 99, 57,
  51, 102, 54, 98, 51, 101, 97, 50, 53, 57, 54, 50, 101, 101, 54, 97, 99, 18, 36, 57, 100, 57, 55, 52, 49, 56, 56, 45, 55, 56, 49, 50, 45, 52,
  54, 50, 98, 45, 98, 99, 98, 52, 45, 53, 52, 52, 98, 100, 52, 54, 56, 57, 51, 98, 54, 26, 36, 49, 99, 55, 56, 51, 55, 52, 98, 45, 52, 101, 57,
  100, 45, 52, 100, 101, 55, 45, 57, 55, 102, 57, 45, 49, 52, 53, 101, 55, 57, 101, 101, 98, 51, 49, 53, 34, 46, 10, 36, 49, 99, 55, 56, 51, 55,
  52, 98, 45, 52, 101, 57, 100, 45, 52, 100, 101, 55, 45, 57, 55, 102, 57, 45, 49, 52, 53, 101, 55, 57, 101, 101, 98, 51, 49, 53, 18, 6, 106, 111,
  115, 104, 117, 97, 42, 46, 10, 36, 57, 52, 56, 98, 98, 97, 100, 52, 45, 102, 101, 49, 55, 45, 52, 98, 52, 50, 45, 56, 101, 55, 52, 45, 50, 52, 48,
  54, 97, 101, 50, 53, 52, 57, 97, 50, 18, 6, 100, 101, 98, 98, 105, 101, 50, 11, 10, 9, 1, 1, 1, 3, 3, 4, 1, 1, 4, 56, 1, 66, 4, 8, 2,];

console.log(buf.length);

const arrayBuffer2 = Uint8Array.of(...buf);

// let gameEvent = Protos.com.jleoirab.xando.events.GameEvent.decode(buf0);

// console.log(gameEvent);

// gameEvent = Protos.com.jleoirab.xando.events.GameEvent.decode(buf);

// console.log(gameEvent);

// console.log(gameEvent.game.gameBoard);

const message = `
4
.
$1c78374b-4e9d-4de7-97f9-145e79eeb315joshua�
60611c93f6b3ea25962ee6ac$9d974188-7812-462b-bcb4-544bd46893b6$1c78374b-4e9d-4de7-97f9-145e79eeb315".
$1c78374b-4e9d-4de7-97f9-145e79eeb315joshua*.
$948bbad4-fe17-4b42-8e74-2406ae2549a2debbie2
	8B`
const encoded = new util.TextEncoder().encode(message);

console.log(encoded.length);


printDecoded(Uint8Array.of(...output));
printDecoded(Uint8Array.of(...encoded));

function printDecoded(arr) {
  console.log(Protos.com.jleoirab.xando.events.GameEvent.decode(arr));
}
/*
pbjs -t static-module -w commonjs -o ${OUT_DIR}/compiled.js ${PROTO_DIR}/*.proto
# pbts -o ${OUT_DIR}/compiled.d.ts ${OUT_DIR}/compiled.js
*/