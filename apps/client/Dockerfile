FROM node:20-alpine

WORKDIR /usr/src/app

# Copy root package files
COPY package.json package-lock.json tsconfig.json ./

# Copy packages
COPY packages/common ./packages/common
COPY apps/client ./apps/client

# Install dependencies
RUN npm ci

# Setup workdir
WORKDIR /usr/src/app/apps/client

# Expo Web Port
EXPOSE 8081

# Start Expo Web
# --web: starts web mode
# --lan: accessible from other containers/host
CMD ["npx", "expo", "start", "--web", "--lan", "--port", "8081"]
