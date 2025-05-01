## Builder l'image
docker build -t my-app-image-name:tag .

## Lancer le conteneur
docker run -d \
  --name my-app-container \
  -p 8080:80 \
  -v /path/to/local/directory:/path/in/container \
  my-app-image-name:tag

## Lister les conteneurs
docker ps -a

## Supprimer un conteneur
docker rm -f my-app-container

## Supprimer une image
docker rmi my-app-image-name:tag

## Lister les images
docker images

## Lancer docker compose
docker-compose up -d

## Lister les conteneurs docker compose
docker-compose ps

## Arrêter docker compose
docker-compose down

## Voir les logs
docker-compose logs -f