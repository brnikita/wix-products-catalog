# Use node official image as base for the build stage
FROM node:14 AS builder

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and yarn.lock
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Use nginx for serving the application
FROM nginx:alpine

# Copy the build output to nginx html folder 
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

# Expose the default nginx port
EXPOSE 80

# Run nginx
CMD ["nginx", "-g", "daemon off;"]