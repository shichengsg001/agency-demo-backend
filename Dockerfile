FROM mhart/alpine-node:6

ARG test1
ARG test2

RUN env
RUN echo ${test1}



RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app

EXPOSE 3000
CMD ["npm", "start"]
