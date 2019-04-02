# JABC Application Production Deployment Process

This is the process you should follow when deploying the JABC HR system onto a client machine. We are under the assumption that the latest Docker images are built and pushed into the  `oecmjabc/jabc-hr_backend` and `oecmjabc/jabc-hr_database` repositories on Docker Hub. 

1. Ensure you have [Docker](https://docs.docker.com/install/) and [Docker Compose](https://docs.docker.com/compose/install/) installed on your system. To test that it is working, running these commands should output the version of the programs. 
    
    `$ docker-compose -v`
    
    `$ docker v`
    
2. If running on a remote server, ensure that port `8080` is open to the world `0.0.0.0/0`. 
    
3. Copy the contents of the _docker-compose.prod.yml_ file to your desired directory and name the file _docker-compose.yml_.

4. Run:
    
    `docker-compose up` 

The system should now be running on `http://localhost:8080`.