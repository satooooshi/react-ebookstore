FROM node:latest
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 3000
# CMD ["sleep", "3600"]
# this API is finally updated rather than in .env rather than in package.json proxy
# ENV REACT_APP_DEV_API_URL=http://productsapi:3001
# axios should use nginx reserse proxy
ENV REACT_APP_DEV_API_URL=http://localhost:3050
# hit an ERR_OSSL_EVP_UNSUPPORTED error
ENV NODE_OPTIONS=--openssl-legacy-provider
# development mode
CMD [ "npm", "run", "start-client"]
# production mode in order for react front to be able to access to backend from host browser
# RUN npm run build
# RUN npm install -g serve 
# CMD ["serve", "-s", "build"] 


# docker build -t reactbookfront:latest .
# docker run -p 3000:3000 reactbookfront:latest ls

# docker run -it -p 3000:3000 reactbookfront:latest
# docker exec -it a41e891db264 sh 
# REACT_APP_DEV_API_URL=http://localhost:3001 npm run start-client
