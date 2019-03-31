# JABC Application Production Deployment Process

This is the process you should follow when deploying the JABC HR system onto a client machine. We are under the assumption that the latest Docker images are built and pushed into the  `oecmjabc/jabc-hr_backend` and `oecmjabc/jabc-hr_database` repositories on Docker Hub. 

1. Ensure you have [Docker](https://docs.docker.com/install/) and [Docker Compose](https://docs.docker.com/compose/install/) installed on your system. To test that it is working, running these commands should output the version of the programs. 
    
    `$ docker-compose -v`
    
    `$ docker v`
    
2. Copy the contents of the docker-compose.prod.yml file to your desired directory and name the file _docker-compose.yml_.

3. Run:
    
    `docker-compose up` 

The system should now be running on `http://localhost:8080`.