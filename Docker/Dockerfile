FROM debian:stretch-20190910

# Expose the ports that will be used by the app, 
#   80 for the front end, 5000 for the path finding server
EXPOSE 80
EXPOSE 5000
EXPOSE 3000

WORKDIR /root/repo
# Install dependencies
RUN apt update -y
RUN apt install -y apt-utils
RUN apt install -y wget
RUN apt install -y build-essential
RUN apt install -y lsb-release
RUN apt install -y gnupg
RUN apt install -y git
RUN apt install -y nodejs
COPY setup.sh /usr/bin/startServer
RUN chmod 0755 /usr/bin/startServer
# RUN npm install -g react-scripts

ENTRYPOINT [ "/bin/bash" ]