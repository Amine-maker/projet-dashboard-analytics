FROM node:16
WORKDIR /usr/src/app/dashboard
COPY package*.json .
RUN npm install
EXPOSE 5173
COPY . .
CMD ["npm", "run", "dev"]