 #!/bin/bash
 
 # Change to the app source directory
 pushd src
 
 # Install app dependencies
 npm install
 
 # Start the app
 npm start
 
 # Go back to the revious directory
 popd
