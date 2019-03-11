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

  #### Database
    * Using https://github.com/mysqljs/mysql to access the database.
    * You will need to enter a password in src/config.js.

    1. git checkout -b test-branch
    2. git branch
    3. git push --set-upstream origin test-branch (only need upstream arg first tim)
    4. [pull request] cli using URL or GitHub

  #### Pathfinding Algorithm

### Credits
=======
# Server #
* Start before the client.
* Run by executing `npm run start-server` in the root directory.
* Run tests by execution `npm test` in the server directory.
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

