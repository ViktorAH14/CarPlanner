# CarPlanner

> A cross-platform application for managing car expenses: refueling, maintenance, repairs, average fuel consumption, and service reminders.

## 🚀 About the Project

CarPlanner helps users track refueling costs, calculate average fuel consumption, log any car-related expenses, and never miss maintenance deadlines thanks to smart reminders.

The app supports data synchronization across all user devices and works in offline mode: all changes are saved locally and sent to the server when internet connectivity is restored.

**Tech Stack:**

- **Frontend:** Flutter (Android, Windows, Linux) with Material3 design
- **Backend:** Node.js + Express + Sequelize
- **Database:** PostgreSQL
- **State Management:** Riverpod (planned for next iteration)
- **Containerization:** Docker & Docker Compose

---

## 🗺 Project Structure

This is a monorepo organized as follows:

```text
CarPlanner/
├── backend/                              # Backend source code (Node.js, Express, Sequelize)
│   ├── src/
│   │   ├── config/                       # Database configuration
│   │   ├── controllers/                  # HTTP request handlers
│   │   ├── middleware/                   # JWT authentication middleware
│   │   ├── models/                       # Sequelize models
│   │   ├── routes/                       # API route definitions
│   │   ├── services/                     # Business logic
│   │   └── utils/                        # Shared utilities (logger)
│   ├── tests/                            # API tests (Jest + Supertest)
│   └── package.json
├── frontend/                             # Frontend source code (Flutter)
│   ├── lib/                              # Flutter packages
│       ├── main.dart                     # Entry point of the CarPlanner application
│   │   ├── app.dart                      # Root widget and app configuration
│   │   └── features/
│   │       └── home/
│   │           └── presentetion/
│   │               └── home_screen.dart  # Main dashboard with stats cards and action
│   ├── test/                             # Flutter tests (Flutter Test)
│   │   └── home_screen_test.dart         # Widget tests for HomeScreen
│   ├── pubspec.yaml                      # Flutter project configuration
│   └── pubspec.loc
├── docker/
│   └── postgres/
│       └── init-test-db.sql              # Creates carplanner_test_db on first DB init
├── docker-compose.yml                    # Container orchestration
├── .env.example                          # Environment variables template
├── README.md                             # This documentation (English)
├── README_RU.md                          # Documentation in Russian
└── LICENSE                               # MIT License
```

---

## 📱 Frontend Highlights (Current State)

The frontend implements a clean feature-based architecture with a Material 3 UI and full test coverage for the main dashboard.

**Key Features**

- **Home Screen** (lib/features/home/presentation/home_screen.dart): Displays a descriptive header, three statistic cards (Fuel, Service, Repair and other things), and an “Add record” action button.
- **Responsive Layout:** Uses SingleChildScrollView to ensure proper rendering on different screen sizes.
- **Material 3 Design:** Applies ThemeData(useMaterial3: true) with a seed color for a consistent visual style.
- **Widget Tests:** Includes comprehensive widget tests in test/home_screen_test.dart verifying UI rendering and interaction (e.g., SnackBar display on button press).
- **Documentation Ready:** All public classes and methods include DartDocs comments (///) compatible with dart doc generation.

**How to Generate Frontend Documentation**
From the frontend/ directory, run:

```bash
dart doc --open
```

This generetes HTML documentation in CarPlanner/frontend/doc/api and opens it in your brouser.

---

## 💻 Developer Setup (Backend)

The backend is fully containerized. You do not need to install Node.js or PostgreSQL locally.

### 1. Configure Environment

Copy the template and set your values:

```bash
cp .env.example .env
```

Required variables in `.env`:

| Variable            | Description                          |
| ------------------- | ------------------------------------ |
| `POSTGRES_USER`     | PostgreSQL username                  |
| `POSTGRES_PASSWORD` | PostgreSQL password                  |
| `POSTGRES_DB`       | Main database name (`carplanner_db`) |
| `JWT_SECRET`        | Secret key for signing JWT tokens    |

Docker Compose builds `DATABASE_URL` and `TEST_DATABASE_URL` from these values automatically. Do not add connection URLs to `.env`.

### 2. Start the Full Stack (Backend + DB)

```bash
docker compose up
```

The server runs on port **3000**. Node.js debugger is available on port **9229**.

On the first start, Postgres creates both `carplanner_db` and `carplanner_test_db` via the init script in `docker/postgres/`.

### 3. Run Backend Tests

Tests use an isolated database (`carplanner_test_db`). Connection URLs come from Docker Compose; the test script only sets `NODE_ENV=test` and a fixed `JWT_SECRET` for middleware tests.

```bash
docker compose run --rm backend npm run test
```

Before each run, the test suite drops and recreates all tables (`sequelize.sync({ force: true })`).

### Auto-reload

`nodemon` is enabled inside the container. Saving files in `backend/src` triggers an automatic restart.

---

### 🧪 Frontend Testing

To run Flutter tests for the frontend:

```bash
cd frontend
flutter test
```

All widget tests (e.g., test/home_screen_test.dart) must pass before merging any frontend changes.

---

## 📡 API Documentation (Current Status)

The authentication module is fully implemented and tested. Login returns a signed JWT token. Protected routes require a valid `Authorization: Bearer <token>` header.

### Public Endpoints

| Method | Endpoint             | Description         | Success     | Errors                                      |
| ------ | -------------------- | ------------------- | ----------- | ------------------------------------------- |
| POST   | `/api/auth/register` | Register a new user | 201 Created | 400 (missing fields), 409 (email exists)    |
| POST   | `/api/auth/login`    | Authenticate user   | 200 OK      | 401 (invalid credentials), 400 (empty body) |

**Login response** includes a JWT token:

```json
{
  "data": {
    "user": { "id": 1, "email": "user@example.com" },
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

### Protected Endpoints

| Method | Endpoint                 | Description                 | Success | Errors                              |
| ------ | ------------------------ | --------------------------- | ------- | ----------------------------------- |
| GET    | `/api/protected/profile` | Return user from token      | 200 OK  | 401 (missing/invalid/expired token) |
| POST   | `/api/protected/data`    | Example authenticated write | 200 OK  | 401 (missing/invalid/expired token) |

---

## 🤝 Contributing

We welcome contributions!

1. Create an issue to discuss your idea or bug.
2. Fork the repo, create a branch (`feature/your-feature-name`).
3. Make changes and ensure all tests pass:

   ```bash
   # Backend
   docker compose run --rm backend npm run test

   # Frontend
   cd frontend && flutter test
   ```

4. Submit a Pull Request.

Please follow the [Conventional Commits](https://www.conventionalcommits.org/) style for commit messages.

**License:** MIT — see [LICENSE](./LICENSE).

Read this documentation in Russian: [README_RU.md](./README_RU.md)

---

Copyright © 2026 ViktorAH14
