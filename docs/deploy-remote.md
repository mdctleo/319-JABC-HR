# JABC Application Deployment Process

This is the process you should follow when deploying master to remote

## Deployment

1. Make sure master is up-to-date:
* `git checkout master`
* `git pull`

2. Take down containers: `docker-compose down`
3. Copy the production environment variables from `.env-prod` to `.env`. Perform this command at the root: `cp .env-prod .env`
4. Build the container (at root): `docker-compose build`
5. Run the container (at root): `docker-compose up -d`

At this point, you should verify whether the virtual machine has pports `8080` (our application port) and `3307` (database port) up. This may take some time, so hang tight. You can use the command `netstat -tulnp` to check the ports.

## Inserting a User into the Database 

This part is crucial, since we cannot use our application without a user to log in with.

1. Obtain the container ID of the database: `docker ps -a`
2. Open a terminal instance of the container: `docker exec -it <CONTAINER ID FROM PART 1> /bin/bash`
3. Open a MySQL terminal from the terminal in part 2 `mysql -uroot -proot`
3. Run `use jabc_db;` from the MySQL terminal
4. Insert an admin role: `CALL create_role('admin', '');`
5. Insert a super admin: `CALL create_employee(NULL, 1, 1420804, 'admin@jabc.com', 'admin', 'admin', '', '1997-02-20', 2, 1, 1, 1, 'admin', 123, '1997-02-20', 2, '1242142');`
6. Exit the MySQL terminal: `exit`
7. Exit the docker container: `exit`

At this point, you should test if you are able to log in without any issues at: `http://40.117.138.12:8080/`
