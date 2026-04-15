# Node.js Authentication App — Automated Testing with Mocha/Chai + Jenkins

## Project Overview
A Node.js/Express authentication system with Login and Signup functionality, fully tested using Mocha and Chai with a Page Object Model (POM) structure, and integrated into a Jenkins CI/CD pipeline.

## Testing Purpose
Automated tests ensure the authentication logic works correctly for all valid and invalid inputs, preventing regressions during development.

## Tech Stack
- Node.js + Express
- EJS (templating)
- Mocha (test runner)
- Chai (assertion library)
- Jenkins (CI/CD)

## Test Summary

| Type              | Count | Status |
|-------------------|-------|--------|
| Unit Tests        | 14    | ✅ Pass |
| Integration Tests  | 14    | ✅ Pass |
| **Total**         | **28**| ✅ Pass |

## Jenkins Pipeline Stages
1. **Checkout Code** — Pulls latest code from GitHub
2. **Install Dependencies** — Runs `npm install`
3. **Run Unit Tests** — Tests validation logic in isolation
4. **Run Integration Tests** — Tests full form interaction flows
5. **Generate Reports** — Outputs JSON test report

## How to Run Locally
```bash
npm install
npm start
npm test
npm run test:unit
npm run test:integration
```

## Screenshots
- Local test results
- Jenkins successful build
- Jenkins test report

## Author
- **Name:** Your Name Here
- **Submission Date:** April 2026
