FROM node:latest
WORKDIR /backend
COPY package.json package.json
RUN npm install 
COPY . .
CMD [ "npm","run","start" ]