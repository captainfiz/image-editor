# Use the official Node.js image from the Docker Hub
FROM node:20

# Create and set the working directory
WORKDIR /image-editor

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install 

# Copy the rest of the application code
COPY . .

# Build the Next.js project
RUN npm run build

# Set the PORT environment variable
ENV PORT 8004

# Expose the port the app runs on
EXPOSE 8004

# Command to run the Next.js server
CMD ["npm", "start"]
