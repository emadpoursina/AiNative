# Docker

Configure docker with log limit files.

## Commands

```bash
docker ps [-as]
docker images
docker rm [container]
docker rmi [image]
docker container ls -a
docker container prune
docker run -it --rm -p hostP:containerP --name name -v hostPath:containerPath --network network [image]
docker exec [-it] [container] [cmd]
docker start/stop/restart [container]
docker volume create [name]
docker volume ls
docker build -t tagName:vN [dockerFilePath]
docker network create [name]
docker network ls
docker system df [-v]
```

## Dockerfile basics

- `FROM [image]`
- `COPY`
- `RUN`

## Dockerizing a project section

1. Choose a base image
2. Dockerize backend/database/front-end(s)
3. Presenting data
