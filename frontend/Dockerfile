# Build stage
FROM node:20-alpine AS build-stage

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build args
ARG VITE_BASE_URL
ARG VITE_CLERK_PUBLISHABLE_KEY

# Build the app for production
RUN VITE_BASE_URL=${VITE_BASE_URL} VITE_CLERK_PUBLISHABLE_KEY=${VITE_CLERK_PUBLISHABLE_KEY} npm run build

# Production stage
FROM nginx:stable-alpine AS production-stage

# Copy the build output from the build-stage to the Nginx html directory
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Copy custom nginx config if you have one, otherwise use default
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
