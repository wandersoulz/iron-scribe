FROM node:18-alpine

WORKDIR /usr/src/app

# Copy root package files
COPY package.json package-lock.json tsconfig.json ./

# Copy packages
COPY packages/common ./packages/common
COPY packages/api ./packages/api

# Install dependencies (from root to link workspaces)
RUN npm ci

# Build (if necessary - typically TS needs compilation)
WORKDIR /usr/src/app/packages/api
RUN npm run build --if-present

# Expose port
EXPOSE 3000

# Start
CMD ["npx", "ts-node", "app.ts"]
