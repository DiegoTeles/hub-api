# Base image
FROM node:latest

LABEL mantainer="Telles TT:@UnicornCoder"
LABEL version="1.0"

# Create app directory
WORKDIR /var/www/back

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN npm run build

# Start the server using the production build
CMD [ "node", "dist/main.js" ]