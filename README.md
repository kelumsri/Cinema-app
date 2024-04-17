# RUN for the first time to create mysql container
docker run -p 3307:3306 --name mysql-docker-local -e MYSQL_ROOT_PASSWORD=Airarabia@123 -d mysql:latest

# Goto frontend folder and run below commands
docker build -t frontend .
docker run -p 5173:5173 -e VITE_APP_BASE_URL="http://localhost:8080" frontend

# Goto backend folder and run below commands
docker build -t backend .
docker run -p 8080:8080 -e MYSQL_HOST=172.17.0.1 -e MYSQL_PORT=3307 -e MYSQL_DB_NAME=cinema -e MYSQL_USER=root -e MYSQL_PASSWORD=Airarabia@123 backend

