# JABC Application Dev Environment Setup

This is the process you should follow when setting up your development environment. It assumes that you already have Docker running on your machine.

1. In the root directory, run `yarn install` and `yarn build` to ensure you have all modules set up and the latest TypeScript files compiled.
2. Navigate to the `frontend` directory, and run `yarn build` to compile the React source files.
3. Run `docker-compose up` in the root directory to spin up the database - if you have errors at this stage, look to the troubleshooting section.
4. Once the steps above have been executed successfully, run  
* `yarn start`
* `grunt serve`
from the root directory. The application should now be listening on `localhost:8080` 	

## Unable to Log in?

This means that the database was likely wiped in your installation, just follow the steps below to insert a superuser into the database

1. Obtain the container ID of the database: `docker ps -a`
2. Open a terminal instance of the container: `docker exec -it <CONTAINER ID FROM PART 1> /bin/bash`
3. Open a MySQL terminal from the terminal in part 2 `mysql -uroot -proot`
3. Run `use jabc_db;` from the MySQL terminal
4. Insert an admin role: `CALL create_role('admin', '');`
5. Insert a super admin: `CALL create_employee(NULL, 1, 1420804, 'admin@jabc.com', 'admin', 'admin', '', '1997-02-20', 2, 1, 1, 1, 'admin', 123, '1997-02-20', 2, '1242142');`
6. Exit the MySQL terminal: `exit`
7. Exit the docker container: `exit`

## Troubleshooting

If you have a message which says something about dupliate docker containers, do the following. The error message should have provided you with the id of the container which is causing issues.
* `docker stop <CONTAINER ID>`
* `docker rm <CONTAINER ID>`
After these commands have been run, you should run `docker-compose up`
