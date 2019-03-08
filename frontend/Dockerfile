FROM node:8.15.0-jessie

ADD . /home/

WORKDIR /home/

RUN npm install -g -s --no-progress yarn && \
    yarn && \
    yarn build:clean && \
    yarn build
