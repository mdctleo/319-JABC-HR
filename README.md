# JABC HR Solution

This is a working repository for Team OECM's JABC HR Solution. This README will document major components of this solution. If you are a maintainer of this repository, please remember to keep this document up-to-date with important latest changes.

## Contributing

Features are to be developed in branches off of master, and merged into master with the approval of _at least_ one external reviewer. When you have branched off of master, please remember to pull master often to mitigate the risk of merge conflicts. A basic Git workflow for development of the JABC HR solution is as follows

1. Create a feature branch off of master in the format [initials]/[JIRA issue number]. For example, the associated branch name for a developer named "Paul Carter" who is assigned the ticket JA-12 (write unit tests for database facade) would be `pc/JA-12`.
2. Once you have completed the feature to your satisfaction, please make a pull request with the title [Jira Issue number]: [brief description], and tag all team members for review. For example, the pull request title for the branch `pc/JA-12` would be "JA-12: write unit tests for DBFacade".
3. Do _not_ merge branches into master without the approval of at least one other team member.


## Requirements 
 
[Docker](https://www.docker.com/get-started) and [Yarn](https://yarnpkg.com/lang/en/docs/install/) should be installed on your machine. 
 

## Backend
1. Run `yarn build` from the root directory to compile TypeScript source files.
2. Run `yarn start` from the root directory to start the server.
3. The server will be listening on port 8080.

## Frontend
1. Run `yarn build` from the root of `frontend/` to compile React source files.
2. Run `yarn start` from directory to start client.
3. The client will exist on port 3000.

## Docker compose 
1. Run `docker-compose up` from the root directory to start the system. 
2. You should be able to access the JABC system on `localhost:3000`

## Database
To run database as a standalone
Developing requires `mysql`, `docker`, `docker-compose` to create a local database container.

```sh
brew cask install docker
# Note: You'll need to open up the Docker app Homebrew installed to set it up
```

After installing the tools, at the db directory of this repository, run:
```sh
# Initialize and start mysql on :3306 and phpmyadmin on :80
docker-compose up -d
```

Here are some useful commands:
```sh
docker-compose start         # start the containers
docker-compose stop          # stop the containers
docker-compose down          # to destroy the containers
docker-compose logs --follow # tail the container logs
docker-compose ps -a         # see the status of your containers
docker-compose up --build -d # rebuild image
```

Access database through phpmyadmin at http://192.168.99.100:80, using jabc_db, root, root 
