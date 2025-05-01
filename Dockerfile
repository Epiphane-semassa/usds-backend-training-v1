# Image de base
FROM node:23-alpine3.20

# Dossier de travail
WORKDIR /src

# Copie des fichiers de dépendances
COPY package*.json ./

# Installation des dépendances
RUN npm install

# Copie du code source
COPY . .

# Exposition du port
EXPOSE 5000

# Commande de démarrage
CMD ["npm", "run", "dev"]