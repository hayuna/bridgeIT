FROM node:12.8.0
WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npm run backend:build
