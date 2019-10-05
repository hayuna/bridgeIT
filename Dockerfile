FROM node:8-alpine
COPY . .
ENTRYPOINT [ "npm", "run", "start" ]