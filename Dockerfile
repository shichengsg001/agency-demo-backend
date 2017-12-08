FROM mhart/alpine-node:6

ARG testArg1 $test1
ARG testArg2 $test2

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app

EXPOSE 3000
CMD ["npm", "start"]
