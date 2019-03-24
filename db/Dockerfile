# Derived from official mysql image (our base image)
FROM mysql:5.7.24

ENV MYSQL_DATABASE=jabc_db
# Add a database
# Add the content of the sql-scripts/ directory to your image
# All scripts in docker-entrypoint-initdb.d/ are automatically
# executed during container startup
COPY ./sql-scripts/init /docker-entrypoint-initdb.d/
COPY ./sql-scripts/procedures /docker-entrypoint-initdb.d/
