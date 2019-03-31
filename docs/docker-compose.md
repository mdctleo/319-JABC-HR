# Docker Developer Guide and Walkthrough 

The JABC project is installed and launched by a docker-compose file that will pull pre-compiled images from Docker Hub. 
The following is a guide for developers to understand and update the latest images to Docker Hub. 

## Setup 

#### Linux and Unix Systems 

1. Install Docker: 
   
   For MacOS Systems, run: `brew cask install docker`
   
   For Amazon Linux systems, run `sudo yum install docker`
   
   For other systems, check the [Docker installation documentation](https://docs.docker.com/install/).

2. Install [Docker Compose](https://docs.docker.com/compose/install/). 
   
   If running `docker-compose -v` returns an error like: 
   
   ```ERROR: Couldn't connect to Docker daemon at http+docker://localunixsocket - is it running?```
    
    Try starting the docker engine by running: `sudo service docker start`

#### Windows Systems 

1. Install Docker
 
    If running Microsoft Windows 10 Professional or Enterprise 64-bit install [Docker for Windows](https://hub.docker.com/editions/community/docker-ce-desktop-windows). 

    For other Windows versions, install [Docker Toolbox](https://docs.docker.com/toolbox/overview/) and follow all of the instructions, including launching the Docker Quickstart Terminal. 
    
2. Install [Docker Compose](https://docs.docker.com/compose/install/). 

    Docker Compose should be included in Windows installations.  
   
Note that you may need to restart your system in order for Docker to run properly.  

## Using Docker Hub 

Before deploying to production, ensure that the latest version of the Docker images are on the Docker Hub repository. 

1. Build your images locally by running: `docker-compose build`

2. Tag your images to be pushed into the Docker Hub repositories: 

    `docker tag jabc-hr_database oecmjabc/jabc-hr_backend`
    
    `docker tag jabc-hr_backend oecmjabc/jabc-hr_database`
    
    If your Docker images have a different name, check for the image name by running: 
    
    `docker images`
    
    And tag them accordingly as such: 
    
    `docker tag <local image name> oecmjabc/jabc-hr_<backend or database>`
    
3. Log into Docker. This is needed to push into the repository: 

    `docker login`
    
    Enter the Docker Hub credentials for OECM when prompted.
    
4. Push the images into Docker Hub by running: 

    `docker push oecmjabc/jabc-hr_backend`
    
    `docker push oecmjabc/jabc-hr_database`
    
## Persistent Volumes and Deployment

As specified in the _docker-compose.prod.yml_ file, running 

`docker-compose up` 

will spin up a container each for backend and database. It will also spin up a volume called _jabc-hr_database-volume_ that will persist data stored in the database container (mounted onto /var/lib/mysql). 

#### Persisting Data

Running `docker-compose down` only stops and removes the containers, and rerunning
  `docker-compose up` 
   will attach the new containers onto the old volume, therefore persisting the data. 

#### Deleting the Data volume

If you would like to delete the data volume, running 

`docker-compose down -v` 

will remove all containers and volumes, and a new volume will be created on the next `docker-compose up`. 
      

