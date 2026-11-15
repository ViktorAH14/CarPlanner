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

### Frontend

```bash
cd frontend
flutter test
```

## 🌿 Branch Naming

Every branch must reference an issue number. Create the issue **before** opening a PR, and name the branch accordingly:

- `feature/<issue#>-<short-name>` — new features (e.g. `feature/12-fuel-stats-chart`)
- `task/<issue#>-<short-name>` — refactoring, cleanup, small fixes (e.g. `task/12-create-pr-templates`)
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

## 📝 Pull Requests

1. **Create an issue first.** Every PR must correspond to a tracked issue. If there is no issue for your change yet, open one using the matching issue template (bug, feature, task, test, security, documentation, or performance).
2. Create your branch from `main` following the [Branch Naming](#-branch-naming) convention — one topic per PR, referencing the issue number.
3. Make sure all tests pass:

   ```bash
   # Backend
   docker compose run --rm backend npm run test

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
