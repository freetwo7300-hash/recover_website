# Contributing to Recover

Thank you for your interest in contributing! Here's how to get started.

## Code of Conduct

By participating in this project you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md).

## How to Contribute

### Reporting Bugs

Before submitting a bug report, please check existing [Issues](../../issues) to avoid duplicates.

When filing a bug, include:
- A clear, descriptive title
- Steps to reproduce the issue
- Expected vs actual behavior
- Screenshots if applicable
- Your environment (OS, Node version, browser)

### Suggesting Features

Open an issue with the `enhancement` label and describe:
- The problem you're trying to solve
- Your proposed solution
- Any alternatives you considered

### Pull Requests

1. **Fork** the repository and create a branch from `main`:
   ```bash
   git checkout -b feat/your-feature-name
   ```

2. **Install** dependencies:
   ```bash
   npm install
   ```

3. **Make your changes** following the code style guidelines below.

4. **Test** your changes:
   ```bash
   npm run type-check
   npm run lint
   npm run build
   ```

5. **Commit** using [Conventional Commits](https://www.conventionalcommits.org/):
   ```
   feat: add patient export to CSV
   fix: resolve hydration mismatch in Header
   docs: update deployment guide
   chore: upgrade next-intl to v4
   ```

6. **Push** and open a Pull Request against `main`.

### PR Requirements

- [ ] Passes `npm run lint` and `npm run type-check`
- [ ] Passes `npm run build` without errors
- [ ] Translation keys added to both `src/messages/en.json` and `src/messages/ar.json`
- [ ] No secrets or sensitive data committed

## Code Style

- **TypeScript** — strict mode enabled, avoid `any`
- **Formatting** — run `npm run format` before committing (Prettier)
- **Linting** — run `npm run lint:fix` to auto-fix issues
- **Translations** — all user-visible strings must use `next-intl` hooks, never hardcode English
- **Namespaces** — use the correct translation namespace:
  - `common` — generic utility labels (Save, Cancel, Error…)
  - `navigation` — nav links, Sign In, Get Started, Sign Out, Dashboard
  - `auth` — authentication forms
  - `footer` — footer-specific labels
  - `dashboard` — dashboard page
  - `home` — marketing home page sections
  - `errors` — error pages

## Project Structure

See [README.md](README.md) for the full directory breakdown.

## Getting Help

Open a [Discussion](../../discussions) or reach out on our community channels.
