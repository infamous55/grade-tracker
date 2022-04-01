#!/usr/bin/env bash

source .env

npx prisma db seed

if [ "$NODE_ENV" = "development" ]; then
  npm run dev
else
  npm run start
fi