FROM node:alpine3.19

WORKDIR /myreactdd

COPY public/ public/
COPY src/ src/
COPY package.json ./
COPY tailwind.config.js ./
COPY postcss.config.js ./

RUN npm install

CMD [ "npm", "start" ]
