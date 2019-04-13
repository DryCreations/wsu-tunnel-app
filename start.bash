#!/bin/bash

# Change to the app source directory
pushd src

# Install app dependencies
npm install

# Start the app as a background process
# If the script is being run as root, start the server on port 80.
# Else, start it on port 3000
if [[ $EUID -e 0]]; then 
  npm run start80 &>>../app.log &
  portNumber=80
else
  npm run start80 &>>../app.log &
  portNumber=3000
fi

# Go back to the revious directory
popd

# Change to the server directory
pushd server

# Install its dependencies
npm install

# Backto root directory...
popd

# Start the other part of the server

echo -ne "Would you like to use the \033[4ml\033[0mocal \033[4mt\033[0mabletop database? "

read usrin

if [[ $usrin =~ ^[lL] ]]; then
  npm run start-server-local &>>server.log &
else
  npm run start-server &>>server.log &
fi

# Check to see if the server started correctly
thisip=`dig +short myip.opendns.com @resolver1.opendns.com` 

if lsof -n -i4TCP:5000 -i6TCP:5000 | grep -q LISTEN; then
  if lsof -n -i4TCP:$portNumber -i6TCP:$portNumber | grep -q LISTEN; then 
    echo -e "\033[32;1mServer should be up and running at $thisip:$portNumber\033[0m"
  else
    echo -e "\033[31;1mServer failed to start\033[0m"
  fi
else
  echo -e "\033[31;1mServer failed to start\033[0m"
fi