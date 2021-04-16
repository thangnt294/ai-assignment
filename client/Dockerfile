FROM node:12-alpine
ENV DIR=/client
RUN npm install -gf serve
RUN npm install -gf yarn
WORKDIR ${DIR}
RUN yarn install
RUN yarn build
CMD ["serve", "-s", "build", "-l", "8200"]