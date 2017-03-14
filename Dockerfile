FROM node:boron-alpine

# Create app directory
RUN mkdir -p /usr/src/cta-app-instancedataservice
WORKDIR /usr/src/cta-app-instancedataservice

# Install app dependencies
COPY package.json /usr/src/cta-app-instancedataservice/
#RUN npm install

# note that "npm install" must be executed outside Dockerfile
# because it is reading private repositories and it is a nightmare
# to add credentials into a Dockerfile (without compromising security)
COPY node_modules /usr/src/cta-app-instancedataservice/node_modules/

# Bundle app source
COPY . /usr/src/cta-app-instancedataservice

EXPOSE 3000

CMD [ "npm", "start" ]