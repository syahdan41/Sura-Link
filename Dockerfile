# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Salin semua source code
COPY . .

# Expose default port React
EXPOSE 3000

# Jalankan React dev server
CMD ["npm", "start"]
