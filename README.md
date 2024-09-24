# ACTIVITY-TRACKER

Activity Tracker

## To Start docker container

docker compose -f .\postgres-docker-compose.yml up -d

## To go to bash shell inside a docker container

docker container exec -ti container_id /bin/bash

## Front End

- State management :
  -- redux/toolkit and recoil
- captcha :
  -- react-turnstile (cloudflare)

## Backend

- ORM :
  -- Prisma
- express rate limiter
- redis for caching
- type validation - zod
- OpenAPI compliant - Swagger

## Commons :

- npm package hosted in npm registry

## websocket-server:

- using ws as a websocket server for real time chat app.

## Signalling server:

- For establishing P2P connection for video calling using webRTC

## Graphql-server:

- using Apollo client as graphql server to fetch/add/update activities, users, documents.
- Users - has activities
- Activity - has Users list.
- 