# Local shared services

Machine-wide databases and admin UIs run in Docker — one compose file, shared across all local projects.

## Canonical location

```text
/Users/emad/docker-infrastructure/docker-compose.yml
```

Snippet copy (for reference only — edit the canonical file): [shared-services.yml](../../5.%20snippets/docker-compose/shared-services.yml)

## Services

| Service | Container | Host port | Notes |
|---------|-----------|-----------|-------|
| MariaDB 10.11 | `shared_mariadb` | 3306 | MySQL-compatible |
| MongoDB 7 | `shared_mongodb` | 27017 | |
| Adminer | `shared_adminer` | 8081 | DB UI — http://localhost:8081 |

Data persists in Docker volumes: `mariadb_data`, `mongodb_data`.

## Lifecycle

```bash
cd /Users/emad/docker-infrastructure

docker compose up -d          # start all
docker compose ps             # status
docker compose logs -f        # follow logs
docker compose stop           # stop (keep data)
docker compose down           # stop and remove containers (volumes kept)
docker compose pull && docker compose up -d   # upgrade images
```

See [docker.md](../commands/docker.md) for general Docker commands.

## Connection strings

Local dev only — not for production.

**MariaDB**

```text
Host:     localhost
Port:     3306
User:     root
Password: rootpass
```

```text
mysql://root:rootpass@localhost:3306/<database>
```

**MongoDB**

```text
mongodb://root:rootpass@localhost:27017/?authSource=admin
```

**Adminer**

Open http://localhost:8081 — default server is `mariadb` (set in compose). For MongoDB, use a Mongo client or `mongosh` instead.

## Project setup

Point app `.env` files at `localhost` and the ports above. Create per-project databases inside the shared instances rather than spinning up new containers per repo.

When starting a new project, link here from [new-project.md](./new-project.md) database setup.
