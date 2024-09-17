## Requirements

1. Node.js 20.x
2. Docker
3. Firebase Project

## Setup

1. Copy `.env.example` to `.env` and fill in the required environment variables.

```shell
NODE_ENV=development
PORT=3000

FIREBASE_API_KEY=your_firebase_api_key
GOOGLE_APPLICATION_CREDENTIALS=/path/to/credentials.json

DB_URL=mongodb://localhost/digitowltest?replicaSet=dbrs
```

To get `FIREBASE_API_KEY`, navigate to the project settings in the Firebase console. To get the `GOOGLE_APPLICATION_CREDENTIALS`, you need to create a service account in the Firebase console and download the credentials file.

2. Run `npm install` to install dependencies.
3. Run `docker compose up -d` to start the MongoDB replica set.
4. Run `npm run seed` to seed the database with sample data.

## Running GraphQL server (development)

1. Run the development server.

```bash
docker compose up -d
npm run dev
```

2. Open http://localhost:3000/graphql in your browser.

## Running tests (watch)

```bash
npm run test
```
