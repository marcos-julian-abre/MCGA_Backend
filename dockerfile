FROM node:18-alpine

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm i react-scripts
RUN npm i nodemon
RUN npm i concurrently
RUN npm install --production

COPY . .

CMD ["npm", "run", "dev"]