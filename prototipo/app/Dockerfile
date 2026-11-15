# Contexto de build: a pasta prototipo (ver docker-compose.yml), para que prototipo/config
# fique ao lado de app/ e o alias @config (../config) funcione no build.

# Etapa 1: compila o app com Node 24.
FROM node:24-alpine AS build
WORKDIR /work/app

COPY app/package.json app/package-lock.json ./
RUN npm ci

COPY app/ ./
COPY config/ ../config/
RUN npm run build

# Etapa 2: serve o dist/ com nginx. Nenhuma requisição externa em tempo de execução.
FROM nginx:1.27-alpine
COPY app/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /work/app/dist /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s --retries=3 CMD wget -q --spider http://127.0.0.1/ || exit 1
