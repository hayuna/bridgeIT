FROM node:12.8.0
WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN ls -la

RUN npm run client:build
RUN ls -la
RUN ls -la client
RUN ls -la client/build

RUN npm run clean
RUN ls -la
RUN ls -la client
RUN ls -la client/build

RUN npm run backend:build
RUN ls -la
RUN ls -la client
RUN ls -la client/build
RUN ls -la dist
RUN npm install bcrypt

RUN node dist/index.js