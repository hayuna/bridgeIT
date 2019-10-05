# Build stage 1
# This build created a staging docker image
# 
FROM node:10.15.2-alpine as appbuild
WORKDIR /usr/src/app
COPY package.json ./
COPY .babelrc ./
RUN npm install
COPY ./src ./src
RUN npm run build

# Build stage 2
# This build takes the production from staging build
# 
FROM node:10.15.2-alpine
WORKDIR /usr/src/app
COPY package.json ./
COPY .babelrc ./
RUN npm install
COPY --from=appbuild /usr/src/app/dist ./dist
EXPOSE 4002
RUN npm start