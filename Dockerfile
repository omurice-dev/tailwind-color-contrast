FROM node:20.9.0 AS base
ARG GIT_COMMIT_HASH
ENV VITE_GIT_COMMIT_HASH=${GIT_COMMIT_HASH}
WORKDIR /app/
COPY package.json package-lock.json ./
RUN npm ci
COPY . .

FROM base AS ci
RUN npm run lint && npm run format:check

FROM base AS build
RUN npm run build

FROM nginx:alpine AS run
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
