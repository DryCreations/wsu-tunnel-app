# CS 3900 Practical Software Development

## Wright State University Tunnel Navigation Application
____
- [Summary](https://github.com/RLey/wsu-tunnel-app/README.md#Summary)
- [Getting Started](https://github.com/RLey/wsu-tunnel-app/README.md)
- [Prerequisites](https://github.com/RLey/wsu-tunnel-app/README.md)
- [Features](https://github.com/RLey/wsu-tunnel-app/README.md)
- [Built With](https://github.com/RLey/wsu-tunnel-app/README.md)
- [Subprojects](https://github.com/RLey/wsu-tunnel-app/README.md)
  - [UI](https://github.com/RLey/wsu-tunnel-app/README.md)
  - [Database](https://github.com/RLey/wsu-tunnel-app/README.md)
  - [Pathfinding Algorithm](https://github.com/RLey/wsu-tunnel-app/README.md)
- [Credits](https://github.com/RLey/wsu-tunnel-app/README.md)
  - [Contribution Link](https://github.com/RLey/wsu-tunnel-app/README.md)


### Summary
Eventually this field will contain a short summary of our project, it's goals, and the results.
### Getting Started
This field will hold information on implementing our product, or at least running it for testing.

### Prerequisites

What things you need to install the software and how to install them

```
Give examples
```

### Features
This field will have a video demonstrating use of the app, as well as a list of features and corresponding descriptions.

## Built With

* [Example](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Example1](https://maven.apache.org/) - Dependency Management
* [Example2](https://rometools.github.io/rome/) - Used to generate RSS Feeds


### Subprojects

  #### UI

  #### Pathfinding Algorithm

### Credits
=======

# Server #
* Start before the client.
* Run by executing `npm run start-server` in the root directory.
* Using https://github.com/mysqljs/mysql to access the database.
* Using https://github.com/expressjs/express to run the server.

# AWS

Use the CloudFormation template AWS-Ububtu.yml to create the stack. Once 
  the stack has been created, log into its EC2 server and run the command 
  `sudo bash /var/lib/cloud/instances/*/user-data.txt <BRANCH>`, where `<BRANCH>` is
  whatever branch from the repository you want the server to use. If no branch is 
  specified, the script will default to the master branch. After the command
  finishes (it might take awhile), both the app server and the navigation server 
  should be up and running.  If they aren't, logs can be found in `~/repo/app.log` 
  and `~/repo/server.log`.

# Testing

Validation of CloudFormation templates is done by running the command:
```sh
$ aws cloudformation validate-template --template-body file://./TEMPLATE.yml
```
Where TEMPLATE.yml is the local filename of the template.

An example using AWS-Ubuntu.yml:
```sh
$ aws cloudformation validate-template --template-body file://./AWS-Ubuntu.yml
WSU CS-3900 Server Template: This template creates a server to be used by the Spring 2019 CS-3900 project.  
  The template automatcally sets up a EC2 server and peripherals, with a bash script for setup appearing in a file 
  matching the pattern /var/lib/cloud/instances/*/user-data.txt. To setup the server, run the command 
  "sudo bash /var/lib/cloud/instances/*/user-data.txt <BRANCH>", where <BRANCH> is the name of the branch from the git 
  repository that the server should use.  The setup script will then run the start.bash file in that branch.
PARAMETERS		Name of an existing EC2 KeyPair to enable SSH access to the instance	False	KeyName
PARAMETERS	0.0.0.0/0	 The IP address range that can be used to access the EC2 instance	False	SSHLocation
PARAMETERS	t2.micro	WebServer EC2 instance type	False	InstanceType
```

Testing of the pathfinding is done by running `npm test` command in the server directory.


