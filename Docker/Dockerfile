FROM debian:stretch-20190910

# Expose the ports that will be used by the app, 
#   80 for the front end, 5000 for the path finding server
EXPOSE 80
EXPOSE 5000

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

# Setup mysql without needing interactivity
# Add the mysql key
RUN apt-key adv --keyserver pool.sks-keyservers.net --recv-keys 5072E1F5
# Add the apt repository
RUN echo "deb http://repo.mysql.com/apt/debian stretch mysql-8.0" > /etc/apt/sources.list.d/mysql80.list
RUN apt update
# Set up debian package installation automatic selections 
RUN echo "mysql-community-server mysql-community-server/root-pass password password" | debconf-set-selections
RUN echo  "mysql-community-server mysql-community-server/re-root-pass password password"| debconf-set-selections
RUN echo "mysql-community-server mysql-server/default-auth-override select Use Legacy Authentication Method (Retain MySQL 5.x Compatibility)" | debconf-set-selections

# Install mysql non-interactively
RUN DEBIAN_FRONTEND=noninteractive apt install -y mysql-server

CMD [ "/usr/bin/startServer" ]