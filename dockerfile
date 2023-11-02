# Building frontend artifacts
FROM node:18-alpine as vk-analyzer_frontend-builder

WORKDIR /usr/src/vk-analyzer/frontend

# Installing package manager. Must be the same varsion with engines field in package.json
RUN npm install pnpm@8.9.2 -g
# Copying frontend sorce fieles
COPY . .
# Installing frontend dependencies from package.json
RUN pnpm install --frozen-lockfile
# Building with env + .env.production variables
RUN pnpm run build

FROM nginx as vk-analyzer_frontend

COPY --from=vk-analyzer_frontend-builder /usr/src/vk-analyzer/frontend/dist /usr/share/nginx/html

EXPOSE 80
