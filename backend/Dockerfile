FROM node:latest
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 3001
# CMD ["sleep", "3600"]
# hit an ERR_OSSL_EVP_UNSUPPORTED error
ENV NODE_OPTIONS=--openssl-legacy-provider
CMD [ "npm", "start"]

# docker build -t superheatedboy/productsapi:latest .
# docker run -it -p 3001:3001 superheatedboy/productsapi:latest ls

# docker exec -it a41e891db264 sh 
