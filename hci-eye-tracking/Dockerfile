FROM oven/bun:1-alpine
WORKDIR /app
COPY package*.json ./
RUN bun install
COPY . .
RUN bun run build
EXPOSE 8001
CMD ["bunx", "serve", "-s", "dist", "-l", "8001"]