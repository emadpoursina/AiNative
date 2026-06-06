# MongoDB

- Data folder: `/data/db`

## Backup and restore

```bash
mongosh
mongodump --host mongodb.example.com --username username --password your_password --db dbName
mongodump --uri "mongodb://username:password@localhost:27017/?authSource=admin" --out ./backup --gzip --archive
mongorestore --uri="mongodb://username:password@localhost:27017" --host <hostname> --port <port> --username <user> --password <pass> --db mydb --gzip --archive=file.archive ./backup
```
