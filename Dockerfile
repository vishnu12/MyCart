FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# uploads will be mounted by docker-compose
RUN mkdir -p /app/uploads

EXPOSE 5000

CMD ["npm", "start"]