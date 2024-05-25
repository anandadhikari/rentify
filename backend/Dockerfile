# Use an official Node.js runtime as a parent image
FROM node:20.11.0

# Set the working directory
WORKDIR /app

# Copy package.json and npm.lock (or package-lock.json if you're using npm)
COPY package.json package.json
COPY package-lock.json package-lock.json

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Expose the port the app runs on
EXPOSE 5000

# Run the application
CMD ["node", "server.js"]
