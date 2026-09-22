# Week 4 Implementation Summary

## 1. Docker installation

Install Docker Desktop on Windows/macOS or Docker Engine on Linux. Then verify:

```bash
docker --version
docker compose version
docker run --rm hello-world
```

Take a screenshot showing the successful installation and `hello-world` output.

## 2. Docker Hub image

Pull a public image:

```bash
docker pull nginx:alpine
docker images
```

Take a screenshot of the image list.

## 3. Container lifecycle practice

```bash
docker run -d --name demo-nginx -p 8081:80 nginx:alpine
docker ps
docker logs demo-nginx
docker exec -it demo-nginx sh
docker stop demo-nginx
docker rm demo-nginx
```

## 4. Custom image

The backend Dockerfile uses a multi-stage build, installs production dependencies, copies only required application files, and runs as a non-root user.

Build:

```bash
docker compose build backend
```

## 5. Compose deployment

Validate:

```bash
docker compose config
```

Deploy:

```bash
docker compose up -d --build
```

Verify:

```bash
docker compose ps
docker compose logs --tail=100
```

## 6. Volumes

The database uses the named volume `postgres_data`.

```bash
docker volume ls
docker volume inspect docker-week4-production_postgres_data
```

Restart without `-v` and verify that the database volume remains.

## 7. Networks

Two custom bridge networks are used:

- `edge`: frontend-facing network
- `backend`: internal network shared by frontend, backend and database

The backend network is marked `internal: true`, so the database is not directly published to the host.

Verify:

```bash
docker network ls
docker network inspect docker-week4-production_backend
```

## 8. Service communication

The frontend calls `/api/health`. Nginx proxies that request to `http://backend:3000`, using Docker Compose service-name DNS.

The backend connects to PostgreSQL using hostname `db`, not `localhost`.

This distinction is important: inside a container, `localhost` means that same container.

## 9. Docker Hub

Authenticate:

```bash
docker login
```

Build and push:

```bash
docker compose build
docker compose push
```

Verify both repositories/tags on Docker Hub.

## 10. Required screenshots

Capture:

1. Docker installation / `docker --version`
2. `docker images`
3. `docker compose ps`
4. Running application in browser
5. Docker Hub repository and tags
6. Optional: `docker volume ls`
7. Optional: `docker network ls`

## 11. Git submission

Suggested structure:

```text
docker-week4-production/
├── backend/
│   ├── src/server.js
│   ├── package.json
│   └── Dockerfile
├── frontend/
│   ├── index.html
│   ├── nginx.conf
│   └── Dockerfile
├── docs/
│   └── IMPLEMENTATION.md
├── .dockerignore
├── .env.example
├── .gitignore
├── compose.yaml
└── README.md
```

Do not commit `.env`, passwords, Docker credentials, or access tokens.
