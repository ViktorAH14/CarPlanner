# Contributing to CarPlanner

Thank you for considering a contribution! This guide describes how to set up the project, work on changes, and submit them.

## 📋 Before You Start

1. Check the [Sprint Board](https://github.com/users/ViktorAH14/projects/4) — your task may already be tracked.
2. For bigger ideas, start a discussion first: [Discussions](https://github.com/ViktorAH14/discussions).
3. For bugs and features, [open an issue](https://github.com/ViktorAH14/CarPlanner/issues) using one of the available issue templates.

## 🛠 Developer Setup

The project is fully containerized — you do not need to install Node.js or PostgreSQL locally.

### Backend

```bash
# 1. Configure environment
cp .env.example .env
#    Set POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, JWT_SECRET

# 2. Start the full stack (backend + database)
docker compose up

# 3. Run backend tests
docker compose run --rm backend npm run test
```

The server runs on port 3000; the Node.js debugger is available on port 9229.
Tests use an isolated database (`carplanner_test_db`) and recreate all tables on each run.

**Optional local CI checks (run from backend/):**

```bash
cd backend
npm run check-format      # Prettier formatting check
npm run lint              # ESLint checks
npm run test:coverage     # Generate coverage report
npm run generate:docs     # Generate JSDoc HTML docs
```

Reports and docs are placed in backend/coverage/ and backend/docs/jsdoc/ respectively.

### Frontend

```bash
cd frontend
flutter test
```

All widget tests (e.g., test/home_screen_test.dart) must pass before merging any frontend changes.

To generate Flutter documentation:

```bash
dart doc --open
```

Output: frontend/doc/api.

---

## 🌿 Branch Naming

Every branch must reference an issue number. Create the issue **before** opening a PR, and name the branch accordingly:

- `feature/<issue#>-<short-name>` — new features (e.g. `feature/12-fuel-stats-chart`)
- `task/<issue#>-<short-name>` — refactoring, cleanup, small fixes (e.g. `task/14-implement-versioning-changelog`)
- `bugfix/<issue#>-<short-name>` — bug fixes (e.g. `bugfix/7-fix-snackbar-on-add-record`)
- `docs/<issue#>-<short-name>` — documentation changes (e.g. `docs/5-update-api-docs`)

GitHub automatically links a branch to an issue when the number matches (e.g. in PR descriptions, commit messages, and the development sidebar).

## 💬 Commit Messages

We follow the [Conventional Commits](https://www.conventionalcommits.org/) style:

```text
<type>(<scope>): <short description>

<optional body with bullet points>
```

**Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

**Examples:**

```text
feat(backend): add fuel consumption calculation endpoint
fix(frontend): correct SnackBar display on Add record press
docs(readme): update API documentation for auth module
```

Breaking changes must be signaled in the commit itself — see
[Versioning & Releases](#-versioning--releases) below.

## 🔖 Versioning & Releases

The project follows [Semantic Versioning](https://semver.org/): `MAJOR.MINOR.PATCH`.

While the version is `0.x`, the public API is considered unstable — breaking
changes are allowed between minor releases. Once the API stabilizes, the project
will graduate to `1.0.0`.

### What Bumps What

| Change type                  | Example                                            | Version bump                          |
| ---------------------------- | -------------------------------------------------- | ------------------------------------- |
| Breaking change              | Changed request/response contract of `/api/auth/*` | **MINOR** while `0.x`, then **MAJOR** |
| New feature                  | New fuel statistics endpoint, new UI screen        | **MINOR**                             |
| Bug fix (no contract change) | Fixed SnackBar display, fixed migration bug        | **PATCH**                             |

### Signaling Breaking Changes

Use Conventional Commits markers so breaking changes are never lost:

```text
feat!: rename POST /api/protected/data to /api/protected/records

BREAKING CHANGE: the endpoint path changed; update all clients.
```

Either the `!` after the type (`feat!:`) or the `BREAKING CHANGE:` footer in
the commit body signals a breaking change. Use at least one of them.

### Changelog Mapping

- Map commit types to changelog sections: `feat` → **Added**, `fix` → **Fixed**,
  anything marked as a breaking change → **Changed**.
- Changes not intended for end users (internal refactoring, docs, CI) usually
  stay out of the changelog.

## 🤖 Release Automation

Releases are automated with [release-please](https://github.com/googleapis/release-please):

- The GitHub Action (`.github/workflows/release.yml`) watches `main` for
  Conventional Commits and maintains one Release PR per component.
- When a Release PR is merged, the tool bumps the version (`backend/package.json`
  or `frontend/pubspec.yaml`), updates the component's `CHANGELOG.md`, tags the
  release (`backend-vX.Y.Z` / `frontend-vX.Y.Z`) and creates a GitHub Release.
- Release timing is controlled by merging (or not merging) the Release PR.
- While the version is `0.x`, breaking changes bump the MINOR version
  (`bump-minor-pre-major` is enabled in the release-please config).
- Versioning is per component: the backend and the frontend have independent
  version numbers, each bumped from its own Conventional Commits.

**Never change the version number manually.** The version in
`package.json`/`pubspec.yaml` is updated only by the Release PR. Manual edits
desync it from `.release-please-manifest.json` and will be "reverted" by the
next release.

### Root Changelog

The per-package `CHANGELOG.md` files are generated automatically by
release-please. The root `CHANGELOG.md` is a hand-written summary of each
release: when you merge a Release PR, add a short block there — version,
date, key changes with links to the per-package changelogs and the
GitHub Release. Do not duplicate full commit lists in the root file.

## 📝 Pull Requests

1. **Create an issue first.** Every PR must correspond to a tracked issue. If there is no issue for your change yet, open one using the matching issue template (bug, feature, task, test, security, documentation, or performance).
2. Create your branch from `main` following the [Branch Naming](#-branch-naming) convention — one topic per PR, referencing the issue number.
3. Make sure all tests pass:

   ```bash
   # Backend
   docker compose run --rm backend npm run test
   cd backend && npm run check-format && npm run lint

   # Frontend
   cd frontend && flutter test
   ```

4. Open a Pull Request using the appropriate PR template — it should match the issue type.
5. Link the related issue in the PR description (`Closes #123`) so merging closes it automatically.
6. Wait for review. If changes are requested, push new commits to the same branch — the PR updates automatically.

## ✅ Definition of Done

A change is ready to merge when:

- [ ] All backend and frontend tests pass.
- [ ] New logic is covered by tests.
- [ ] CI checks are green (format, lint, coverage, docs where applicable).
- [ ] Public API contracts are unchanged (unless the change is explicitly a contract update).
- [ ] Documentation is updated where relevant.
- [ ] The PR description is complete and links the related issue.

## 🐞 Reporting Bugs

Use the **Bug Report** issue template and include:

- Steps to reproduce (minimal).
- Expected vs. actual behavior.
- Environment (OS, browser, app version).

For security vulnerabilities, do **not** open a public issue — see the Security Notice in the issue templates and contact the maintainer directly.

## 📄 License

By contributing, you agree that your contributions will be licensed under the [MIT License](./LICENSE).
