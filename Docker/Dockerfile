# Use debian version 'jessie' to run the server, since the 
FROM debian:buster-20190910

# Expose the ports that will be used by the app, 
#   80 for the front end, 5000 for the path finding server
EXPOSE 80
EXPOSE 5000

# Install dependencies
RUN apt update -y
RUN apt install -y wget
RUN apt install -y build-essential
RUN apt install -y lsb-release
RUN apt install -y gnupg
RUN apt install -y git
RUN apt install -y nodejs
RUN apt install -y npm
RUN apt install -y lsof
RUN npm install -g react-scripts

COPY setup.sh /usr/bin/setup
RUN chmod 0755 /usr/bin/setup

ENTRYPOINT [ "/bin/bash" ]