FROM node:16.14-alpine

WORKDIR /app-frontend

RUN npm install -g npm@9.3.0 

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "start"]