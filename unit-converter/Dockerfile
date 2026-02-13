FROM node:22.13.0-alpine

WORKDIR /unit-converter

COPY package.json tsconfig.json ./

RUN npm i 
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start"]
