 #!/bin/bash
 
 # Change to the app source directory
 pushd src
 
 # Install app dependencies
 npm install
 
 # Start the app as a background process
 npm start &>>../app.log &
 
 # Go back to the revious directory
 popd
 
 # Change to the server directory
 pushd server
 
 # Install its dependencies
 npm install
 
 # Backto root directory...
 popd
 
 # Start the other part of the server
 npm run start-server &>>server.log &
 
