# Old code (working), from Claude. Keeping as ref in case something breaks.

# FROM node:18-alpine AS build
# WORKDIR /app
# COPY package*.json ./
# RUN npm ci
# COPY . .
# RUN npm run build

# FROM node:18-alpine
# WORKDIR /app
# COPY --from=build /app/package*.json ./
# COPY --from=build /app/dist ./dist
# RUN npm ci --production
# EXPOSE 8000
# CMD ["npx", "serve", "-s", "dist", "-l", "8000"]

# Was redundant, this is much simpler.
FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build
EXPOSE 8000
CMD ["npx", "serve", "-s", "dist", "-l", "8000"]