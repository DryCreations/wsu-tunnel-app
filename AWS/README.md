# AWS templates

There are two templates for this repository that spin up Amazon servers 
  capable of hosting and running the app, but  with slightly different 
  configurations and capabilities. Both templates create a file 
  /var/lib/cloud/instances/*/user-data.txt that must be run as root to
  finish setting up the server. This start-up script will install all the 
  necessary software and start the server processes. Due to a lack of RAM 
  on the smaller EC2 options, they will also create a decently sized 
  swapfile.

Both templates will open ports 80, 3000, and 5000 globally. Port 22 will 
  be open to a limited IP range set by the value of SSHLocation. By 
  default, this is 130.108.0.0/16, which is the IP range used by the
  Wright State campus.

## AWS-Ubuntu.yml

This template spins up an Amazon EC2 server and creates a local mysql
  server with a database loaded from the repo. This instance will create 
  a 2GB swapfile. The estimated monthly cost for this template is $8.50.

## AWS-UbuntsRDS.yml

This template spins up Amazon EC2 and RDS servers. The EC2 server will 
  host and run the app itself, and the database will be stored separately 
  on the RDS server. This configuration was never used in development and 
  as such it is untested. Since this instance doesn't need mysql installed, 
  there is more room for swap and 4GB is used. The estimated monthly cost
  for this template is $23.25.