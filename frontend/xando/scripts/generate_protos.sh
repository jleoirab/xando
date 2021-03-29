#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

# Directory to write generated code to (.js and .d.ts files)
OUT_DIR="${DIR}/../src/generated"

PROTO_DIR="${DIR}/../../../protos/src/main/proto"

rm -f ${OUT_DIR}/*

PROTOS=$(ls ${PROTO_DIR})
# protoc \
#     --ts_out="${OUT_DIR}" \
#     --proto_path ${PROTO_DIR} \
#     ${PROTO_DIR}/*.proto

pbjs -t static-module --es6 -w es6 -o ${OUT_DIR}/compiled.js ${PROTO_DIR}/*.proto
pbts -o ${OUT_DIR}/compiled.d.ts ${OUT_DIR}/compiled.js

# pbjs -t static-module -w commonjs -o ${OUT_DIR}/compiled.js ${PROTO_DIR}/*.proto
# # pbts -o ${OUT_DIR}/compiled.d.ts ${OUT_DIR}/compiled.js