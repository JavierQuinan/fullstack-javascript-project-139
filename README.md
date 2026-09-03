<div align="center">

# Realtime Chat

### React application with channels, authentication and Socket.IO events

[![CI](https://github.com/JavierQuinan/fullstack-javascript-project-139/actions/workflows/ci.yml/badge.svg)](https://github.com/JavierQuinan/fullstack-javascript-project-139/actions/workflows/ci.yml)
![React](https://img.shields.io/badge/React-18-20232A?logo=react&logoColor=61DAFB)
![Redux Toolkit](https://img.shields.io/badge/Redux-Toolkit-764ABC?logo=redux&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.IO-Realtime-010101?logo=socketdotio&logoColor=white)
![License](https://img.shields.io/badge/license-ISC-blue)

</div>

## Overview

Realtime Chat is a React application that consumes the Hexlet Chat Server API and provides authenticated multi-channel messaging with real-time updates.

This repository is maintained as **verifiable React / realtime-client engineering evidence**. The backend dependency is `@hexlet/chat-server`; this project is therefore not presented as proof of a custom Node.js backend.

## Verified stack

`React 18` · `Redux Toolkit` · `React Router` · `Socket.IO Client` · `Axios` · `Formik` · `Yup` · `i18next` · `React Bootstrap` · `Rollbar React` · `leo-profanity`

## Implemented capabilities

- user authentication flow;
- protected application routes;
- multiple chat channels;
- real-time message/channel events through Socket.IO;
- global client state with Redux Toolkit;
- forms with Formik and Yup validation;
- internationalization with react-i18next / i18next;
- profanity filtering through `leo-profanity`;
- Bootstrap / React Bootstrap UI components;
- optional frontend error-reporting dependencies;
- production frontend build through Create React App tooling;
- automated frontend tests in GitHub Actions.

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

## Installation

```bash
git clone https://github.com/JavierQuinan/fullstack-javascript-project-139.git
cd fullstack-javascript-project-139
npm ci
```

The root `postinstall` installs frontend dependencies from the frontend lockfile.

Run the frontend locally:

```bash
cd frontend
npm start
```

Run the development chat server separately, for example:

```bash
npx start-server --port 5001
```

The frontend currently proxies API requests to `http://localhost:5001` during local development.

## Build and automated tests

From the repository root:

```bash
npm test
npm run build
```

The observed independent CI baseline produced:

```text
Test Suites: 2 passed, 2 total
Tests:       3 passed, 3 total
```

The production frontend build completed with `Compiled successfully`, and the GitHub Actions job concluded successfully.

See [`ENGINEERING_EVIDENCE.md`](./ENGINEERING_EVIDENCE.md) for the exact observed evidence and its scope.

## Dependency boundary

The same observed frontend install reported **81 npm audit findings** (`14 low`, `21 moderate`, `42 high`, `4 critical`) in the installed dependency graph. This is treated as real technical debt and is one reason the repository is not described as production-ready.

The current Create React App stack also emits several deprecation/staleness warnings. Dependency/build-tool modernization is therefore a priority engineering direction rather than something hidden from reviewers.

## Product & engineering roadmap

[`ROADMAP.md`](./ROADMAP.md) keeps the future vision visible with a strict status model:

- ✅ implemented/evidenced;
- 🔄 priority engineering direction;
- 🧭 strategic evolution, not current functionality.

The roadmap includes dependency/build modernization, broader component/realtime testing, architecture boundaries, accessibility and potential chat-product capabilities.

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

## Portfolio classification

**Category:** React / realtime frontend evidence  
**Visibility:** Public  
**Classification:** `PORTFOLIO EVIDENCE` / supporting React project

The strongest current evidence here is React state/UI architecture, Redux Toolkit, Socket.IO client integration, authenticated routing, forms/validation and verified automated frontend tests/builds.

## Resumen en español

Cliente de chat en **React 18 + Redux Toolkit + Socket.IO** con autenticación, canales, mensajes en tiempo real, formularios Formik/Yup e internacionalización. El CI observado tiene 2 suites y 3 tests pasando, además de build de producción exitoso. El backend utilizado es `@hexlet/chat-server`, por lo que el repositorio se presenta honestamente como evidencia frontend/realtime. El roadmap conserva la visión futura y la deuda de dependencias se documenta sin ocultarla.

## Author

Francisco Quinteros — [GitHub](https://github.com/JavierQuinan)

## License

ISC. This project was developed as part of the Hexlet learning path.
