FROM node:8.15.0

ADD . /home/

WORKDIR /home/

RUN npm install -g -s --no-progress yarn && \
    yarn && \
    yarn build

EXPOSE 3000

CMD ["yarn", "start"]
