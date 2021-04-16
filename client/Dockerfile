FROM node:12-alpine
RUN npm install -g serve
RUN npm install -g yarn && \
yarn install \
RUN yarn build
CMD ["serve", "-s", "build", "-l", "8200"]