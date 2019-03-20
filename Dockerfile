FROM node:8.15.0-alpine

ADD app.js /home/

ADD package.json /home/

ADD ./.env /home/.env

ADD ./src/ /home/src

ADD ./util/ /home/util

ADD ./tsconfig.json /home/

ADD ./frontend/build /home/frontend/build

WORKDIR /home/

RUN npm install -g -s --no-progress yarn && \
    yarn && \
    yarn build

EXPOSE 8080

CMD ["yarn", "start"]
