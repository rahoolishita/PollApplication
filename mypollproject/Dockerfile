# Dockerfile for Svelte front-end

# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Svelte application
RUN npm run build

# Install a simple HTTP server to serve the static files
RUN npm install -g serve

# Expose the port the app runs on
EXPOSE 5000

# Start the server
CMD ["serve", "-s", "public"]
