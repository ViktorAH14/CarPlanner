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

[Unreleased]: https://github.com/ViktorAH14/CarPlanner/compare/HEAD...HEAD
[0.1.0]: https://github.com/ViktorAH14/CarPlanner/compare/HEAD...backend-v0.1.0
