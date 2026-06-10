# MongoDB

- Data folder: `/data/db`

## Backup and restore

```bash
mongosh
mongodump --host mongodb.example.com --username username --password your_password --db dbName
mongodump --uri "mongodb://username:password@localhost:27017/?authSource=admin" --out ./backup --gzip --archive
mongorestore --uri="mongodb://username:password@localhost:27017" --host <hostname> --port <port> --username <user> --password <pass> --db mydb --gzip --archive=file.archive ./backup
```

## Namespace filtering and rename (`mongorestore`)

A namespace is `database.collection`. Patterns accept `*` wildcards. Repeat `--nsInclude` or `--nsExclude` to match multiple patterns. If both are set, `--nsExclude` wins (e.g. `--nsExclude="prod.*"` with `--nsInclude="prod.trips"` restores nothing from `prod`).

| Option | Purpose |
|--------|---------|
| `--nsInclude` | Restore only namespaces that match |
| `--nsExclude` | Skip namespaces that match |
| `--nsFrom` / `--nsTo` | Rename namespaces during restore (use together) |

```bash
# One collection
mongorestore --nsInclude=test.purchaseorders dump/

# Whole database
mongorestore --nsInclude=transactions.* dump/

# Database minus dev collections
mongorestore --nsInclude='transactions.*' --nsExclude='transactions.*_dev' dump/

# Rename database on restore (archive or dump dir)
mongorestore --archive=mongodump-test-db --nsFrom="test.*" --nsTo="examples.*"
mongorestore --host localhost --nsFrom="test.*" --nsTo="mongorestore.*" dump/

# Rename with captured segments ($name$); escape literal * and \ with \
mongorestore --nsInclude='data.*' --nsFrom='data.$prefix$_$customer$' --nsTo='$customer$.$prefix$' dump/
```

Works with `--archive` and `--gzip`. Prefer `--nsInclude` over deprecated `--db` / `--collection` when restoring from a dump directory or archive.
