FROM node:lts-alpine

ENV NODE_ENV development

RUN mkdir /admin
WORKDIR /admin

COPY --chown=node:node package*.json .
RUN npm install
RUN chown -R node:node /admin/node_modules

COPY --chown=node:node . .

EXPOSE 2030

CMD npm start