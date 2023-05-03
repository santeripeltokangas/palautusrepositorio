FROM node:16-alpine

WORKDIR /usr/src/app

# Dependencies
COPY package*.json ./
RUN npm ci --only=production

# Source
COPY . .

USER node
EXPOSE 3001
CMD [ "node", "index.js" ]