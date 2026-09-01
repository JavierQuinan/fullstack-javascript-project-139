<div align="center">

# Realtime Chat

### React application with channels, authentication and Socket.IO events

[![Actions Status](https://github.com/JavierQuinan/fullstack-javascript-project-139/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/JavierQuinan/fullstack-javascript-project-139/actions)
![React](https://img.shields.io/badge/React-18-20232A?logo=react&logoColor=61DAFB)
![Redux Toolkit](https://img.shields.io/badge/Redux-Toolkit-764ABC?logo=redux&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.IO-Realtime-010101?logo=socketdotio&logoColor=white)
![License](https://img.shields.io/badge/license-ISC-blue)

</div>

## Overview

Realtime Chat is a React application that consumes the Hexlet Chat Server API and provides authenticated multi-channel messaging with real-time updates.

This repository is maintained as **verifiable React / frontend engineering evidence**. The README documents the capabilities supported by the current dependencies and codebase and avoids presenting educational infrastructure as a custom backend implementation.

## Verified stack

`React 18` · `Redux Toolkit` · `React Router` · `Socket.IO Client` · `Axios` · `Formik` · `Yup` · `i18next` · `React Bootstrap` · `Rollbar React` · `leo-profanity`

## Implemented capabilities

- user authentication flow
- protected application routes
- multiple chat channels
- real-time message/channel events through Socket.IO
- global client state with Redux Toolkit
- forms with Formik and Yup validation
- internationalization with react-i18next / i18next
- profanity filtering through `leo-profanity`
- Bootstrap / React Bootstrap UI components
- optional frontend error reporting through Rollbar dependencies
- production frontend build through Create React App tooling

## Architecture

```text
React UI
   │
   ├── React Router
   ├── Formik / Yup
   │
   ▼
Redux Toolkit state
   │
   ├── HTTP requests ──────> Hexlet Chat Server API
   │
   └── Socket.IO client ───> realtime server events
```

The backend dependency in this repository is `@hexlet/chat-server`; this project should therefore be read primarily as frontend/realtime-client evidence rather than as proof of a custom Node.js chat backend.

## Installation

```bash
git clone https://github.com/JavierQuinan/fullstack-javascript-project-139.git
cd fullstack-javascript-project-139
npm install
```

The root `postinstall` installs the frontend dependencies with `npm ci`.

## Development

Run the frontend:

```bash
cd frontend
npm start
```

Run the development chat server separately, for example:

```bash
npx start-server --port 5001
```

The frontend package currently proxies API requests to `http://localhost:5001`.

## Build

From the repository root:

```bash
npm run build
```

This delegates to the frontend build and outputs the CRA build to `frontend/dist`.

## Testing status

Testing Library packages are present in the frontend dependencies, but the repository does **not** currently expose a reliable non-interactive test command at the root: the root `npm test` script intentionally exits with an error. Automated test evidence should therefore not be claimed until a CI-safe test script and meaningful test suite are verified.

The same applies to linting: ESLint packages/configuration exist in the frontend, but there is no documented root `npm run lint` script in the current package metadata.

## Repository structure

```text
frontend/
  public/
  src/
    components/
    contexts/
    slices/
    locales/
    chatApi/
  package.json
package.json
Dockerfile
README.md
```

## Hardening backlog

Before promoting this repository as a flagship frontend showcase:

- add a deterministic CI test command and verified component/integration tests;
- expose a repeatable lint command;
- verify or replace any external deployment URL before advertising a live demo;
- document environment/error-reporting configuration without exposing tokens;
- review dependency age and upgrade strategy for the CRA-based stack;
- add screenshots or a sanitized live demo once current behavior is revalidated.

## Portfolio classification

**Category:** React / realtime frontend evidence  
**Visibility:** Public  
**Portfolio priority:** Medium-high  
**Current recommendation:** Strong supporting React evidence; candidate for featured status after tests, lint and demo verification are completed.

## Author

Francisco Quinteros — [GitHub](https://github.com/JavierQuinan)

## License

ISC. This project was developed as part of the Hexlet learning path.
