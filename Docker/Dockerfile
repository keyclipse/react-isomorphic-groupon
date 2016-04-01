FROM node:5.8
MAINTAINER Samuel Kitono <samuel@kitono.id>

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Bundle the app
ADD react-isomorprhic-trinity.tar /usr/src/app

# Install dependencies
RUN npm install

# Expose port and then start the app
EXPOSE 8080
CMD [ "npm", "run", "build-start" ]

