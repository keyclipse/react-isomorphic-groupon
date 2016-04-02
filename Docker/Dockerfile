FROM node:5.8
MAINTAINER Samuel Kitono <samuel@kitono.id>

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install dependencies first so we do not have to this everytime
COPY package.json /usr/src/app
RUN npm install

# Bundle the app
ADD react-isomorprhic-trinity.tar /usr/src/app

# Expose port and then start the app
EXPOSE 8080
CMD [ "npm", "run", "build-start" ]

