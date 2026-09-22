# Docker Command Cheat Sheet

1. `docker --version` — show Docker version
2. `docker compose version` — show Compose version
3. `docker info` — daemon/system information
4. `docker login` — authenticate to a registry
5. `docker logout` — sign out
6. `docker pull nginx:alpine` — pull an image
7. `docker images` — list local images
8. `docker image ls` — list images
9. `docker build -t app:1.0 .` — build an image
10. `docker image inspect app:1.0` — inspect an image
11. `docker tag app:1.0 user/app:1.0` — tag an image
12. `docker push user/app:1.0` — push an image
13. `docker run --rm hello-world` — run a temporary container
14. `docker run -d --name web -p 8080:80 nginx:alpine` — run detached with port mapping
15. `docker ps` — list running containers
16. `docker ps -a` — list all containers
17. `docker logs web` — view logs
18. `docker logs -f web` — follow logs
19. `docker exec -it web sh` — open a shell
20. `docker inspect web` — inspect container configuration
21. `docker stop web` — stop a container
22. `docker start web` — start a stopped container
23. `docker restart web` — restart a container
24. `docker rm web` — remove a container
25. `docker network ls` — list networks
26. `docker network create app-net` — create a network
27. `docker network inspect app-net` — inspect a network
28. `docker volume ls` — list volumes
29. `docker volume inspect volume_name` — inspect a volume
30. `docker compose config` — validate/render Compose configuration
31. `docker compose up -d` — start Compose services
32. `docker compose up -d --build` — rebuild and start
33. `docker compose ps` — show Compose service status
34. `docker compose logs -f` — follow Compose logs
35. `docker compose exec backend sh` — shell into a service
36. `docker compose restart backend` — restart one service
37. `docker compose stop` — stop Compose services
38. `docker compose down` — remove containers/networks
39. `docker compose down -v` — remove containers/networks/volumes
40. `docker compose build` — build Compose images
41. `docker compose push` — push Compose images
