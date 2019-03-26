#!/bin/sh
npm run build
rm -rf ../server/build
cp -r build ../server/