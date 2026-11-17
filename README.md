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
│   └── package.json                      # Backend manifest (version managed by release-please)
├── frontend/                             # Frontend source code (Flutter)
│   ├── lib/                              # Flutter packages
│   │   ├── main.dart                     # Entry point of the CarPlanner application
│   │   ├── app.dart                      # Root widget and app configuration
│   │   └── features/
│   │       └── home/
│   │           └── presentation/         # Home feature UI layer
│   │               └── home_screen.dart  # Main dashboard with stats cards and actions
│   ├── test/                             # Flutter tests (Flutter Test)
│   │   └── home_screen_test.dart         # Widget tests for HomeScreen
│   ├── pubspec.yaml                      # Flutter project configuration (version managed by release-please)
│   └── pubspec.lock                      # Dependency lock file
├── docker/
│   └── postgres/
│       └── init-test-db.sql              # Creates carplanner_test_db on first DB init
├── .github/
│   ├── ISSUE_TEMPLATE/                   # Issue templates (bug, feature, task, test, security, docs, performance)
│   ├── PULL_REQUEST_TEMPLATE/            # PR templates (default + typed variants)
│   └── workflows/
│       └── release.yml                   # Release automation (release-please)
├── docker-compose.yml                    # Container orchestration
├── .env.example                          # Environment variables template
├── release-please-config.json            # Release-please configuration (per-component releases)
├── .release-please-manifest.json         # Last released version of each component
├── CHANGELOG.md                          # Hand-written release summary (root)
├── CONTRIBUTING.md                       # Contribution guide
├── README.md                             # This documentation (English)
├── README_RU.md                          # Documentation in Russian
└── LICENSE                               # MIT License
```

---

## 📱 Frontend Highlights (Current State)

The frontend implements a clean feature-based architecture with a Material 3 UI and full test coverage for the main dashboard.

**Key Features**

- **Home Screen** (`lib/features/home/presentation/home_screen.dart`): Displays a descriptive header, three statistic cards (Fuel, Service, Repair and other things), and an "Add record" action button.
- **Responsive Layout:** Uses `SingleChildScrollView` to ensure proper rendering on different screen sizes.
- **Material 3 Design:** Applies `ThemeData(useMaterial3: true)` with a seed color for a consistent visual style.
- **Widget Tests:** Includes comprehensive widget tests in `test/home_screen_test.dart` verifying UI rendering and interaction (e.g., SnackBar display on button press).
- **Documentation Ready:** All public classes and methods include Dart doc comments (`///`) compatible with `dart doc` generation.

**How to Generate Frontend Documentation**

From the `frontend/` directory, run:

```bash
dart doc --open
```

This generates HTML documentation in `CarPlanner/frontend/doc/api` and opens it in your browser.

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

All widget tests (e.g., `test/home_screen_test.dart`) must pass before merging any frontend changes.

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

## 📦 Versioning & Releases

The project follows [Semantic Versioning](https://semver.org/) with **per-component versions**: the backend and the frontend are released and versioned independently.

- Backend: version lives in `backend/package.json`, release tags look like `backend-vX.Y.Z`
- Frontend: version lives in `frontend/pubspec.yaml`, release tags look like `frontend-vX.Y.Z`

Releases are automated with [release-please](https://github.com/googleapis/release-please):

- `feat` and `fix` commits merged into `main` trigger a Release PR per component.
- Merging the Release PR bumps the version, updates the component's `CHANGELOG.md`, tags the release, and creates a GitHub Release.
- While the version is `0.x`, breaking changes bump the MINOR version; once the API stabilizes, the project graduates to `1.0.0`.

**Changelog layout:**

- `backend/CHANGELOG.md` and `frontend/CHANGELOG.md` are generated automatically from Conventional Commits — do not edit them manually.
- The root [`CHANGELOG.md`](./CHANGELOG.md) is a hand-written summary of each release.

**Never change version numbers manually** in `package.json` or `pubspec.yaml` — the version is updated only by the Release PR. See [CONTRIBUTING.md](./CONTRIBUTING.md), "Versioning & Releases", for details on breaking changes and commit conventions.

---

## 🤝 Contributing

We welcome contributions! Please read our [CONTRIBUTING.md](./CONTRIBUTING.md) for setup instructions, branch naming convention, commit style, versioning, and the PR workflow.

Quick start:

1. Check the [Sprint Board](https://github.com/users/ViktorAH14/projects/4) and open an issue using a template.
2. Fork the repo and create a branch following the naming rule: `type/<issue#>-<short-name>` (e.g. `task/12-create-pr-templates`).
3. Ensure all tests pass (see [CONTRIBUTING.md](./CONTRIBUTING.md) for commands).
4. Submit a Pull Request using the matching PR template.

Please follow the [Conventional Commits](https://www.conventionalcommits.org/) style for commit messages.

---

## 🎯 Project Management

All project work is tracked on the CarPlanner Sprint Board: https://github.com/users/ViktorAH14/projects/4

**Workflow**

Items move through the following columns:

| Column      | Meaning                                 |
| ----------- | --------------------------------------- |
| Backlog     | New items awaiting triage               |
| To Do       | Accepted for the current/planned sprint |
| In Progress | Actively being worked on                |
| Review      | Pull request under review               |
| Testing     | Implementation is being verified        |
| Done        | Completed (issue closed / PR merged)    |

**Custom Fields**

- **Priority** — urgency of the item.
- **Component** — affected part of the system.
- **Estimate (hours)** — estimated effort in hours.

**Automation Rules**

The board uses built-in GitHub Projects workflows to keep statuses consistent:

- New items added to the project automatically start in **Backlog**.
- Closed issues and merged pull requests automatically move to **Done**.
- Reopened issues automatically return to **Backlog** for re-triage.
- When a reviewer requests changes on a PR, its status moves back to **In Progress**.
- Closed items that have not been updated for one month are auto-archived to keep the board clean.

---

**License:** MIT — see [LICENSE](./LICENSE).

Read this documentation in Russian: [README_RU.md](./README_RU.md)

---

Copyright © 2026 ViktorAH14
