# Use lightweight alpine image
FROM docker.io/node:9.3.0-alpine
WORKDIR /app
#Copy packages list for server and install
COPY package*.json ./
RUN npm install 
# Copy over rest of files
COPY / .
# Start everything going
CMD npm start