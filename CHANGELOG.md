# Changelog

All notable changes to this project are documented in this file.

This file is a hand-written summary of project releases: version, date, and
the key changes at the project level. Detailed per-package changelogs
(`backend/CHANGELOG.md`, `frontend/CHANGELOG.md`) are generated automatically
by [release-please](https://github.com/googleapis/release-please) from
Conventional Commits — do not edit them manually.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and the project follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
While the version is `0.x`, the API is considered unstable; see
[CONTRIBUTING.md](./CONTRIBUTING.md), "Versioning & Releases".

## [Unreleased]

- Nothing yet. Next changes will be summarized here after the next release.

---

## [0.2.0] - 2026-11-17

### Highlights

- **Release automation refined:** `release-please` now scopes releases by package path (`backend/` and `frontend/`). Root-level commits (docs, configs, workflows) no longer trigger component releases, reducing noise in changelogs and unnecessary version bumps.
- **Path-based scoping implemented:** added `"path"` fields in `release-please-config.json` so that only relevant package directories affect their own versions and changelogs.
- **Root CHANGELOG updated:** clarified roles of root vs. per-package changelogs; added comparison links for quick diff review.

### Backend (backend-v0.2.0)

- **Auth module:** added JWT middleware and protected routes.
- **Token flow:** implemented JWT token generation and integrated with existing auth flow.
- **Minimal config:** added basic configuration and user registration setup.
- **Tests:** stabilized DB sync races and simplified Docker environment.

### Frontend (frontend-v0.2.0)

- **Home screen:** implemented `HomeScreen` with stats cards and action button.
- **UI components:** added simple layout with responsive stats cards.
- **Testing:** added widget tests for the new home screen.

### Infrastructure & Docs

- **Config update:** added path scoping to `release-please-config.json`.
- **Documentation:** updated `CONTRIBUTING.md` with release scope rules; clarified root changelog purpose.

### Comparison Links

- Backend: [Compare backend-v0.1.0...backend-v0.2.0](https://github.com/ViktorAH14/CarPlanner/compare/backend-v0.1.0...backend-v0.2.0)
- Frontend: [Compare frontend-v0.1.0...frontend-v0.2.0](https://github.com/ViktorAH14/CarPlanner/compare/frontend-v0.1.0...frontend-v0.2.0)

---

## [0.1.0] - 2026-11-17

First working state of the project. Versioning starts at `0.1.0` because the
public API is still evolving; a `1.0.0` release will follow once the API
surface stabilizes.

### Added

- Authentication module: registration and login endpoints returning signed JWT tokens; protected routes require `Authorization: Bearer <token>`.
- Flutter frontend with a feature-based architecture: Home Screen with statistic cards, Material 3 design, widget tests for `HomeScreen`.
- Containerized backend (Node.js + Express + Sequelize) and PostgreSQL via Docker Compose, with an isolated test database (`carplanner_test_db`) initialized by a script in `docker/postgres/`.
- Issue templates for bugs, features, tasks, tests, security, documentation, and performance reports.
- PR templates: default plus seven typed variants mirroring the issue templates (#12).
- `CONTRIBUTING.md`: developer setup, branch naming convention (`type/<issue#>-<short-name>`), Conventional Commits style, PR workflow, versioning and release policy (#12, #14).
- Russian documentation (`README_RU.md`) mirroring the English version (#12).
- Release automation with release-please: per-component versions (`backend-vX.Y.Z`, `frontend-vX.Y.Z`), automated per-package changelogs, and a hand-written root summary (#14).

### Fixed

- Typos in `README.md` (`presentation/`, `pubspec.lock`, `generates`, `browser`) (#12).
