# Stage 1: Build Stage
FROM node:18.16.0 AS build

# metadata about the image
LABEL maintainer="Fatemeh Zahedi <fzahedi1@myseneca.ca>"
LABEL description="Fragments node.js microservice"

#  environment variables
ENV PORT=8080
ENV NPM_CONFIG_LOGLEVEL=warn
ENV NPM_CONFIG_COLOR=false

# working directory
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json /app/

# Install node dependencies
RUN npm install

# Copy src directory
COPY ./src ./src

# Stage 2: Production Stage
FROM node:18.16.0

# Set working directory
WORKDIR /app

# Copy built files from the previous stage
COPY --from=build /app /app

# Copy our HTPASSWD file
COPY ./tests/.htpasswd ./tests/.htpasswd

# Start the container by running our server
CMD ["npm", "start"]

# Expose the service on port 8080
EXPOSE 8080
