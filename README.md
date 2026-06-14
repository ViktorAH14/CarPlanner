# CarPlanner

> A cross-platform application for managing car expenses: refueling, maintenance, repairs, average fuel consumption, and service reminders.

## 🚀 About the Project

CarPlanner helps users track refueling costs, calculate average fuel consumption, log any car-related expenses, and never miss maintenance deadlines thanks to smart reminders.

The app supports data synchronization across all user devices and works in offline mode: all changes are saved locally and sent to the server when internet connectivity is restored.

**Tech Stack:**

- **Frontend:** Flutter (Android, Windows, Linux)
- **Backend:** Node.js + Express
- **Database:** PostgreSQL
- **Containerization:** Docker & Docker Compose

---

## 🗺 Project Structure

This is a monorepo organized as follows: <br>

```CarPlanner/<br>
├── backend/ # Backend source code (Node.js, Express, Sequelize)<br>
│ ├── src/ <br>
│ │ ├── controllers/ <br>
│ │ ├── services/ <br>
│ │ └── models/ <br>
│ ├── tests/ # API Tests (Jest + Supertest) <br>
│ ├── .env <br>
│ └── package.json <br>
├── frontend/ # Frontend source code (Flutter) <br>
├── docker-compose.yml # Container orchestration <br>
├── README.md # This documentation (English) <br>
├── README_RU.md # Documentation in Russian <br>
└── LICENSE # MIT License <br>
```

---

## 💻 Developer Setup (Backend)

The backend is fully containerized. You do not need to install Node.js or PostgreSQL locally.

### Start the Full Stack (Backend + DB)

```bash
bash

docker compose up
The server will run on port 3000.
```

### Run Tests

Tests use an isolated test database (carplanner_test_db) and clean up after themselves.

```bash
bash

docker compose run --rm backend npm run test
```

All authentication endpoints have 100% test coverage.

### Auto-reload

nodemon is enabled inside the container. Saving files in backend/src triggers an automatic restart.

### API Documentation (Current Status)

Currently, the Authentication module is fully implemented and tested. JWT tokens are prepared in the code structure but not yet returned in responses (planned for next iteration).

| Method | Endpoint           | Description         | Success     | Errors                                      |
| ------ | ------------------ | ------------------- | ----------- | ------------------------------------------- |
| POST   | /api/auth/register | Register a new user | 201 Created | 400 (missing fields), 409 (email exists)    |
| POST   | /api/auth/login    | Authenticate user   | 200 OK      | 401 (invalid credentials), 400 (empty body) |

---

## 🤝 Contributing

We welcome contributions!

1. Create an issue to discuss your idea or bug.
2. Fork the repo, create a branch (feature/your-feature-name).
3. Make changes and ensure all tests pass (npm run test).
4. Submit a Pull Request.

Please follow the conventional commit style for messages.

**License**: MIT
The details are in the [LICENSE](./LICENSE) file

Read this documentation in Russian: [README_RU.md](./README_RU.md)

---

Copyright © [2026] [ViktorAH14].
