#!/bin/bash

# Change to the app source directory
pushd src

# Install app dependencies
npm install

# Start the app as a background process
npm run start80 &>>../app.log &

# Go back to the revious directory
popd

# Change to the server directory
pushd server

# Install its dependencies
npm install

# Backto root directory...
popd

# Start the other part of the server

echo -ne "Would you like to use the \033[4ma\033[0mws or \033[4mt\033[0mabletop database? "

read usrin

if [[ $usrin =~ ^[Aa] ]]; then
  database="aws"
else
  database="tabletop"
fi

npm run start-server $database &>>server.log &
