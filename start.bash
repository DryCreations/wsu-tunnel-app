 #!/bin/bash
 
 # Change to the app source directory
 pushd src
 
 # Install app dependencies
 npm install &>> ~/error.log
 
 # Start the app
 pm2 start App.js &>> ~/error.log
 
 # Go back to the revious directory
 popd
