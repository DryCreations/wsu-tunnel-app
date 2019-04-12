# CS 3900 Practical Software Development

## Wright State University Tunnel Navigation Application

---

<a href="https://www.youtube.com/watch?v=oHg5SJYRHA0" target="_blank"><img 
src="https://i.imgur.com/2YS5Z6x.jpg" 
alt="This will eventually work" width="240" height="240" border="10" /></a>

### Video To Be Published

---

- [Summary](https://github.com/RLey/wsu-tunnel-app/#Summary)
- [Getting Started](https://github.com/RLey/wsu-tunnel-app/#Getting-Started)
- [Prerequisites](https://github.com/RLey/wsu-tunnel-app/#Prerequisites)
- [Features](https://github.com/RLey/wsu-tunnel-app/#Features)
- [Built With](https://github.com/RLey/wsu-tunnel-app/#Built-With)
- [Subprojects](https://github.com/RLey/wsu-tunnel-app/#Subprojects)
  - [UI](https://github.com/RLey/wsu-tunnel-app/#UI)
  - [Database](https://github.com/RLey/wsu-tunnel-app/#Database)
  - [Pathfinding Algorithm](https://github.com/RLey/wsu-tunnel-app/#Pathfinding-Algorithm)
  - [Server/AWS](https://github.com/RLey/wsu-tunnel-app/#Server/AWS)
- [Testing](https://github.com/RLey/wsu-tunnel-app/#Testing)
- [Credits](https://github.com/RLey/wsu-tunnel-app/#Credits)
  - [Contribution Link](https://github.com/RLey/wsu-tunnel-app/#Contribution-Link)

---

### Summary

Eventually this field will contain a short summary of our project, it's goals, and the results.

---

### Getting Started

This field will hold information on implementing our product, or at least running it for testing.

---

### Prerequisites

What things you need to install the software and how to install them

```
Give examples
```

---

### Features

This field will have a video demonstrating use of the app, as well as a list of features and corresponding descriptions.

---

## Built With

- [Example](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
- [Example1](https://maven.apache.org/) - Dependency Management
- [Example2](https://rometools.github.io/rome/) - Used to generate RSS Feeds

---

### Subprojects

---

#### UI

The User Interface was designed to feel both familiar and functional. The design pulls its inspiration from many common mobile applications. It has a static header and footer with dynamic content in the middle. Additional content is brought into view by means of a side loading menu.

---

#### Pathfinding Algorithm

---

#### Server/AWS

The server side of the app is divided into two parts:

- The app server, which serves the app and GUI info to the client and has instructions on how to use the pathfinding server.
- The pathfinding server, which takes requests from the client and serves as an interface to the dataase in order to find the path requested.

##### App Server

To start the react server, two options are available. To start the react scripts listening on the default port (3000, if availiable), run the 
  command `npm start`. If you want to start the react scripts listening on port 80, run the command `npm run start80` as root.

##### Pathfinding Server

- Start before the client.
- Run by executing `npm run start-server` in the root directory.
- Using https://github.com/mysqljs/mysql to access the database.
- Using https://github.com/expressjs/express to run the server.

---

##### AWS

Use the CloudFormation template AWS-Ububtu.yml to create the stack. Once
the stack has been created, log into its EC2 server and run the command
`sudo bash /var/lib/cloud/instances/*/user-data.txt <BRANCH>`, where `<BRANCH>` is
whatever branch from the repository you want the server to use. If no branch is
specified, the script will default to the master branch. After the command
finishes (it might take awhile), both the app server and the navigation server
should be up and running. If they aren't, logs can be found in `~/repo/app.log`
and `~/repo/server.log`.

---

### Testing

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

To view detailed information on all resources that AWS CloudFormation will create first create a change set:

```sh
$ aws cloudformation create-change-set --stack-name testing --change-set-name changes --change-set-type CREATE --template-body file://./AWS-UbuntuRDS.yml
```

Then to view those changes run:

```sh
$ aws cloudformation describe-change-set --change-set-name changes --stack-name testing
```

When done, clean up by running:

```sh
$ aws cloudformation delete-change-set --change-set-name changes --stack-name testing
$ aws cloudformation delete-stack --stack-name testing
```

Testing of the pathfinding is done by running `npm test` command in the server directory.

---

### Credits

#### Class/Project Members

- Jared Cole
- Matt Eilerman
- Eric Foy
- Ryan Ley
- Hayden Mankin
- Matt Masten
- Owen O'Connor
- Ryan Slater

#### Mentor/Instructors

- Michelle Cheatham
- Matt Kijowski

#### Additional Contributors

- Wright State University and the Wright State University Marketing Department
