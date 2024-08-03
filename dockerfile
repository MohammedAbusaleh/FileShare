FROM node:alpine3.19

WORKDIR /myreactdd

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY public/ public/
COPY src/ src/
COPY tailwind.config.js ./
COPY postcss.config.js ./

EXPOSE 3000

CMD [ "npm", "start" ]
