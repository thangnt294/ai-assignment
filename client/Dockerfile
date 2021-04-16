FROM node:12-alpine
RUN npm install -gf serve
RUN npm install -gf yarn
RUN yarn install
RUN yarn build
CMD ["serve", "-s", "build", "-l", "8200"]