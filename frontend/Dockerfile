# ─────────────────────────────────────────
# Étape 1 : Build Angular
# ─────────────────────────────────────────
FROM node:20-alpine AS build

WORKDIR /app

# Copier package.json et installer les dépendances
COPY package*.json ./
RUN npm install

# Copier le code source et builder
COPY . .
RUN npm run build -- --configuration production

# ─────────────────────────────────────────
# Étape 2 : Servir avec Nginx
# ─────────────────────────────────────────
FROM nginx:alpine

# Supprimer la config par défaut de Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copier les fichiers buildés depuis l'étape précédente
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html

# Copier la configuration Nginx personnalisée
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exposer le port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
