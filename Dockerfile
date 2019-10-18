FROM node:12.8.0
WORKDIR /usr/src/app
COPY package.json ./package.json
RUN npm install
RUN npm install bcrypt
COPY . .
RUN npm run backend:build
