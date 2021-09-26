FROM node:15.12

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3030

# npm startに書き換える
CMD [ "node", "app.js" ]
