# DevOps Internship Week 4 — Docker & Docker Compose

Production-oriented reference implementation for the Week 4 Docker task.

## Architecture

Browser → Frontend (Nginx) → Backend (Node.js/Express) → PostgreSQL

- `frontend`: static HTML served by Nginx; `/api/*` is reverse-proxied to `backend`
- `backend`: Node.js/Express API, runs as a non-root user
- `db`: PostgreSQL with a named persistent volume
- `edge` network: browser-facing tier
- `backend` network: internal application/database tier

## Prerequisites

- Docker Desktop or Docker Engine + Compose v2
- Git
- Docker Hub account

Verify:

```bash
docker --version
docker compose version
docker run --rm hello-world
```

## Run locally

1. Copy environment template:

```bash
cp .env.example .env
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

2. Set `DOCKERHUB_USERNAME` in `.env` to your Docker Hub username.

3. Validate the Compose file:

```bash
docker compose config
```

4. Build and start:

```bash
docker compose up -d --build
```

5. Verify:

```bash
docker compose ps
docker compose logs --tail=100 backend
docker compose logs --tail=100 frontend
docker compose logs --tail=100 db
```

6. Open:

```text
http://localhost:8080
```

The page calls `/api/health` through Nginx. The backend checks PostgreSQL connectivity.

## Persistence test

```bash
docker compose down
docker compose up -d
```

The named PostgreSQL volume remains.

To intentionally delete database data:

```bash
docker compose down -v
```

## Push images to Docker Hub

First authenticate:

```bash
docker login
```

Build with your Docker Hub namespace:

```bash
docker compose build
```

Push:

```bash
docker compose push
```

Or push individual images:

```bash
docker push YOUR_DOCKERHUB_USERNAME/week4-backend:1.0.0
docker push YOUR_DOCKERHUB_USERNAME/week4-frontend:1.0.0
```

## Useful verification

```bash
docker images
docker volume ls
docker network ls
docker inspect week4-backend
docker inspect week4-db
docker compose exec backend node -e "console.log('backend shell OK')"
docker compose exec db pg_isready -U postgres -d appdb
```

## Cleanup

```bash
docker compose down
```

Delete volumes too:

```bash
docker compose down -v
```

Delete locally built images if required:

```bash
docker image rm YOUR_DOCKERHUB_USERNAME/week4-backend:1.0.0
docker image rm YOUR_DOCKERHUB_USERNAME/week4-frontend:1.0.0
```

## Security notes

- Do not commit `.env`.
- Use secrets management for real production credentials.
- Pin image versions in controlled environments and consider digest pinning.
- Run application processes as non-root.
- Expose only the frontend port to the host.
- Keep PostgreSQL on the internal network.
- Add CI image scanning before publishing production images.
