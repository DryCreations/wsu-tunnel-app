#!/bin/bash

# Get the mysql repository
wget -c https://dev.mysql.com/get/mysql-apt-config_0.8.13-1_all.deb
echo "About to setup the mysql repository. Please select 'MySQL Server & Cluster'" \
    "for the product to configure and mysql-8.0 for the version"
dpkg -i mysql-apt-config_0.8.13-1_all.deb
rm mysql-apt-config_0.8.13-1_all.deb

# Update the package list to reflect the mysql server packages
apt update

echo "About to install the mysql server. You will need to enter a password"
# Install mysql (Note: this may need to be done interactively?)
apt install -y mysql-community-server

# Start mysql. Again, I have no clue why this works, but it does
runuser -l mysql -s /bin/bash -c '/usr/sbin/mysqld --defaults-file=/etc/mysql/my.cnf --basedir=/usr --datadir=/var/lib/mysql --pid-file=/var/run/mysqld/mysqld.pid --socket=/var/run/mysqld/mysqld.sock' &

echo "What branch would you like to use to run the server?"
read branch

# Get whatever branch the user specified and store it for future reference.
# If no branch was specified, default to master
branch=${branch:-'Docker'}


# Change directories to the downloaded repository
pushd /root/repo

git checkout $branch

# If no database was specified, use a default
sqlfile='/root/databaseData.sql'

echo "Using sql file $sqlfile"

# If the sqlfile doesn't exist, use it, else use a default
if [ -e $sqlfile ]; then
    mysql -p < $sqlfile
else
    mysql -p < /root/databaseData.sql
fi

# Create a non-admin user to access the database
echo "CREATE USER 'tunnelapp-user'@'localhost' IDENTIFIED BY 'Cs3900';" > makeUser
echo "GRANT SELECT ON wsutunnelapp.* TO 'tunnelapp-user'@'localhost';" >> makeUser
mysql -p < makeUser
rm makeUser

# Start the app as a background process on port 80
npm run start80 &>>app.log &

# Start the other part of the server
npm run start-server-local &>>server.log &