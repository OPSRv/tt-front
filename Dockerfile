FROM node:14-alpine
WORKDIR /react
COPY . .
RUN npm install -g npm@8.3.0
RUN npm rebuild node-sass
RUN npm run build
