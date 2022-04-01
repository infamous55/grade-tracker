# School API

This is a REST API for a virtual scholar grades catalog.

## Overview

The project was built using the following technologies:

- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Prisma](https://www.prisma.io/)

## Requirements

The application uses [Docker](https://www.docker.com/) to run on a local machine.

## Database

![erd](./images/erd.jpg)

The email and password of the default administrator account are **admin<span></span>@admin.com** and **password**.

## Functionality

All routes are found at `/api/v1`.

The application uses JWT for authentication and authorization. The token should be passed in the `Authorization` header with a bearer prefix.

- `POST /auth/login` authenticates an user.
- `POST /auth/refresh` returns a new access token.

Administrators can perform CRUD operations on users at `/users`.

Routes ending in `/me` are for the current user.

- `GET /me` returns the current user.
- `PUT /me` updates the current user.

Years, semesters, classes, and disciplines are managed by administrators at `/years`, `/semesters`, `/classes`, and `/disciplines` respectively.

Teachers and administrators can perform CRUD operations on grades at `/grades`.

Nested routes allow for filtering and complete resource management for the following:

- `/users/:userId/grades`
- `/semesters/:semesterId/grades`
- `/disciplines/:disciplineId/grades`
- `/classes/:classId/users`
- `/years/:yearId/semesters`

Sorting and pagination are supported for all requests of type `GET /resource`.

## Running the application

```bash
git clone https://github.com/infamous55/school-api.git
cd school-api
sudo docker-compose build && sudo docker-compose up -d
```

Access at http://localhost:5000.
