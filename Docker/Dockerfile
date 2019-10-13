FROM debian:stretch-20190910

# Expose the ports that will be used by the app, 
#   80 for the front end, 5000 for the path finding server
EXPOSE 80
EXPOSE 5000
EXPOSE 3000

WORKDIR /root/repo

# Install dependencies
RUN apt update -y
RUN apt install -y apt-utils build-essential curl git gnupg lsb-release software-properties-common wget

# Install node and npm
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt install -y nodejs

# Setup react
RUN npm install -g react-scripts

# Download the course repo
RUN git clone https://github.com/RLey/wsu-tunnel-app.git /root/repo

# Install app javascript dependencies
WORKDIR /root/repo/src
RUN npm install
WORKDIR /root/repo/server
RUN npm install
WORKDIR /root/repo

# Add the "bootstrap" files (files that will be needed independently from the repo branch selected)
COPY setup.sh /usr/bin/startServer
RUN chmod 0755 /usr/bin/startServer
COPY databaseData.sql /root/databaseData.sql

ENTRYPOINT [ "/bin/bash" ]