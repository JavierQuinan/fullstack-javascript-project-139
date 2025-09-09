# ---------- STAGE 1: BUILD ----------
FROM node:20-alpine AS build
WORKDIR /app

# Instala dependencias raíz y frontend (caché eficiente)
COPY package.json package-lock.json ./
COPY frontend/package.json frontend/package-lock.json ./frontend/
RUN npm ci && cd frontend && npm ci

# Copia código y build
COPY . .
# CRA inyecta REACT_APP_* en build time (opcional)
# ARG REACT_APP_API_URL
# ENV REACT_APP_API_URL=$REACT_APP_API_URL
RUN cd frontend && npm run build


# ---------- STAGE 2: SERVE STATIC WITH NGINX ----------
FROM nginx:stable-alpine
# Nginx config con proxy a backend (3001 por defecto)
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copia el build
COPY --from=build /app/frontend/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
