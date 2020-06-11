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

CORS_ORIGIN_WHITELIST = ["http://localhost:3000", "http://95.179.201.200:3000"]
CORS_ALLOWED_HEADERS = ["Content-Type", "Authorization", "Origin", "X-Requested-With", "Accept"]
CORS_EXPOSED_HEADERS = ["x-response-time"]
CORS_METHODS = ["POST", "OPTIONS", "GET", "DELETE", "PUT"]
```

Setup log directory
```bash
sudo mkdir -p /var/apps/log
```

## Configure your database

Run DB migration: We are using sqlite3 as the database. You can check the configuration in **migrations/config.json**
```bash
yarn run migrate
```

Confirm your tables have been setup properly
```bash
sqlite3 dev_database.sqlite3
sqlite> .schema
```
ctrl + D to exit
Note: development and production files are stored in /tmp directory


## Compile and run the service

```bash
yarn run dev
```

Your web server is now exposed on http://localhost:3001

### GET   /api/users
```bash
curl -XGET http://localhost:3001/api/users
```

### GET   /api/users/{userId}
```bash
curl -XGET http://localhost:3001/api/users/24ce245e-8159-491f-8dc9-24c6d190baba
```

### POST   /api/users
```bash
curl -XPOST -H 'Content-Type: application/json' -d '{"name":"Prince"}' http://localhost:3001/api/users
```

### PUT   /api/users/{userId}
```bash
curl -XPUT -H 'Content-Type: application/json' -d '{"name":"Ahugah"}' http://localhost:3001/api/users/24ce245e-8159-491f-8dc9-24c6d190baba
```

### DELETE   /api/users/{userId}
```bash
curl -X DELETE http://localhost:3001/api/users/24ce245e-8159-491f-8dc9-24c6d190baba
```


## Tests

Mocha tests
```bash
yarn run test
```


## CI/CD

Within this repo is a **Jenkinsfile** with defines how this project should be built and deployed.
See a screenshot of a jenkins build job below. It logs the status of the build to a slack channel.

![Jenkins Slack](https://github.com/princeahugah/UserService/blob/master/jenkins-slack.png?raw=true)
