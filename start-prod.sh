#!/bin/bash

cd /usr/src/app
rm -r -f node_modules
npm install
npm run build
npm run start
