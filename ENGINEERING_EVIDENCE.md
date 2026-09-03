# Realtime Chat — Engineering Evidence

This file records evidence observed in source and GitHub Actions.

## Current source evidence

- React 18 frontend.
- Redux Toolkit state.
- React Router protected flows.
- Socket.IO client events.
- Axios API calls.
- Formik + Yup forms/validation.
- i18next internationalization.
- React Bootstrap UI.
- `leo-profanity` filtering.
- backend dependency is `@hexlet/chat-server`; the repository is therefore frontend/realtime-client evidence, not proof of a custom backend.

## Observed CI evidence

Independent workflow: `.github/workflows/ci.yml`.

Observed successful sequence:

```text
npm ci
npm test -- --watchAll=false
npm run build
```

Observed results:

```text
Test Suites: 2 passed, 2 total
Tests:       3 passed, 3 total
```

The Create React App production build also completed with `Compiled successfully`, and the GitHub Actions job concluded successfully.

## Dependency-health observation

The same observed `npm ci` run reported:

```text
81 vulnerabilities
14 low · 21 moderate · 42 high · 4 critical
```

The repository is therefore not presented as production-ready. A significant part of this debt is associated with the aging frontend toolchain/dependency graph and is tracked as modernization work in [`ROADMAP.md`](./ROADMAP.md).

## Current quality scope

The present tests cover a provider-aware anonymous navbar/auth rendering path plus Redux behavior for active channel/message handling. This is real automated evidence, but it is not full end-to-end chat coverage.

## Evidence rule

Future capabilities remain in the roadmap until source, reproducible verification and documentation support them.
