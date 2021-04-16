FROM node:12-alpine
RUN npm install
CMD ["node", "server.js"]