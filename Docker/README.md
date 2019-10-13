# Tunnel Raider docker configuration

## How to use

First, build the docker container image by running the command `docker build -t tunnelraider .` in this directory (`$REPO_ROOT/Docker`). 
The command may occasionally fail due to some servers not being reachable at run time. If this happens, wait a few seconds and run the
command again. When the build is successful, the last line printed will be something along the lines of `Successfully tagged tunnelraider:latest`.

Once the build has been run successfully, the server can be started at any time with the command `docker run -d -p 80:80 -p 5000:5000 tunnelraider`. 
If you would like to have to app listen on a port besides 80, specify it using <PORT> in the command `docker run -d -p <PORT>:80 -p 5000:5000 tunnelraider`. 
At this time, there is no option to change the port that the path finding server listens on.

By default, the server runs using the 'Docker' branch of this repository. If you would like to use a different branch <BRANCH>, run the 
command `docker run -d -p 80:80 -p 5000:5000 tunnelraider /usr/bin/startServer <BRANCH>`. If the branch specified is invalid, the Docker
branch will be used instead.

__*n.b.*__ All of these operations require [docker](https://docs.docker.com/get-started/) to be installed on your system