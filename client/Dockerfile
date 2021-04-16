FROM bayesimpact/react-base
RUN npm install -g serve
RUN npm install -g yarn && \
yarn install \
RUN yarn build
CMD ["serve", "-s", "build", "-l", "8200"]