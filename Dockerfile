FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Create data directory
RUN mkdir -p /app/data

# Set default environment variables
ENV DATA_DIR=/app/data

EXPOSE 3000

CMD ["node", "build"]