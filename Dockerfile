FROM node:22-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies first (including devDependencies for build)
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Remove devDependencies after build to reduce image size
RUN npm ci --only=production && npm cache clean --force

# Create data directory
RUN mkdir -p /app/data

# Set default environment variables
ENV DATA_DIR=/app/data

EXPOSE 3000

CMD ["node", "build"]
