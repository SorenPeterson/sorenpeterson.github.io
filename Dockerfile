FROM node:alpine
WORKDIR /srv/app
COPY ./ /srv/app
RUN npm install
RUN npm run build
CMD npm start
