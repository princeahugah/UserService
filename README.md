# Introduction

Users micro-service for ToDo App :heart:


## Installation

Clone the repo
```bash
git clone https://github.com/princeahugah/UserService.git
```

Install sequelize cli and typescript
```bash
yarn global add sequelize-cli typescript
```

Install node modules
```bash
yarn install
```

Setup environment variables
```bash
port = 3001
NODE_ENV = development

DB_USERNAME = db-user
DB_PASSWORD = pass123

HASHING_ALGORITHM = sha256
AUTH_SECRET = XbSK5mSY2IHiJCKHChhpaObq8YLDUH60nTFkZDHBXNRDBGyQlCViHTaV9

CORS_ORIGIN_WHITELIST = ["http://localhost:3000"]
CORS_ALLOWED_HEADERS = ["Content-Type", "Authorization", "Origin", "X-Requested-With", "Accept"]
CORS_EXPOSED_HEADERS = ["x-response-time"]
CORS_METHODS = ["POST", "OPTIONS", "GET", "DELETE", "PUT"]
```


## Configure your database

Run DB migration: We are using sqlite3 as the database. You can check the configuration in *migrations/config.json*
```bash
yarn run migrate
```

Confirm your tables have been setup properly
```bash
sqlite3 dev_database.sqlite3
sqlite> .schema
```
ctrl + D to exit


## Compile and run the service

```bash
yarn run dev
```

## Tests
