#!/bin/bash

# Google assisted dark magic to start mysql
runuser -l mysql -s /bin/bash -c '/usr/sbin/mysqld --defaults-file=/etc/mysql/my.cnf --basedir=/usr --datadir=/var/lib/mysql --pid-file=/var/run/mysqld/mysqld.pid --socket=/var/run/mysqld/mysqld.sock' &

# Wait for mysql to start
while ! echo 'exit' | mysql -ppassword &>/dev/null; do echo "Waiting for sql"; sleep 1; done

# Load the data onto the database
mysql -ppassword < /root/databaseData.sql

# Create a non-admin user to access the database
echo "CREATE USER 'tunnelapp-user'@'localhost' IDENTIFIED BY 'Cs3900';" > makeUser
echo "GRANT SELECT ON wsutunnelapp.* TO 'tunnelapp-user'@'localhost';" >> makeUser
mysql -ppassword < makeUser
rm makeUser

# Get whatever branch the user specified and store it for future reference.
# If no branch was specified, default to master
branch=${1:-'Docker'}


# Change directories to the downloaded repository
pushd /root/repo

git checkout 'Docker'
git checkout $branch

# Start the app as a background process on port 80
npm run start80 &>>app.log &

# Start the other part of the server
npm run start-server-local &>>server.log &

# Infinite loopy to keep the container up
while true; do echo "Server is up and running"; sleep 65535; done