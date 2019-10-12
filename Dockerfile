FROM node:8
WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npm run backend:build
COPY . .
RUN ls -la dist


EXPOSE 3000
CMD [ "npm", "start" ]