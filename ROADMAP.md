# Realtime Chat — Product & Engineering Roadmap

This roadmap records how the current React/Redux/Socket.IO client can evolve without presenting future ideas as current capabilities.

## Status legend

- ✅ Implemented / evidenced
- 🔄 Priority engineering direction
- 🧭 Strategic evolution, not a current claim

Current evidence is documented in [`README.md`](./README.md) and [`ENGINEERING_EVIDENCE.md`](./ENGINEERING_EVIDENCE.md).

## Current baseline

- ✅ React 18 client.
- ✅ Redux Toolkit state management.
- ✅ authenticated route flow.
- ✅ multi-channel chat behavior.
- ✅ Socket.IO realtime events.
- ✅ Formik + Yup forms/validation.
- ✅ i18next internationalization.
- ✅ profanity filtering.
- ✅ automated frontend tests.
- ✅ production frontend build in GitHub Actions.
- ✅ backend dependency identified honestly as `@hexlet/chat-server`, not custom backend evidence.

## Dependency/build modernization

- 🔄 Review and reduce the current npm audit findings.
- 🔄 Refresh stale browser-compatibility metadata.
- 🔄 plan migration away from the aging Create React App toolchain when compatibility allows.
- 🧭 Vite or another maintained modern build tool after migration testing.
- 🧭 dependency update automation and reviewed lockfile maintenance.

## Test maturity

- 🔄 expand Redux reducer/state tests.
- 🔄 add component tests for login, channel creation/rename/removal and message flow.
- 🔄 mock Socket.IO events deterministically.
- 🔄 add error/empty/loading-state tests.
- 🧭 browser E2E for a representative authenticated chat journey using a controlled test server.
- 🧭 accessibility smoke testing.

## Architecture evolution

- 🔄 clarify boundaries between API access, socket event handling and Redux state transitions.
- 🔄 centralize error handling and user-facing failure states.
- 🔄 formalize environment configuration without exposing tokens.
- 🧭 migrate selected modules to TypeScript if it improves maintainability rather than as a cosmetic rewrite.
- 🧭 typed socket/API event contracts if TypeScript is adopted.

## Product evolution

Potential future capabilities:

- 🧭 user presence/online state;
- 🧭 typing indicators;
- 🧭 message search;
- 🧭 reactions/replies;
- 🧭 moderation/reporting workflows;
- 🧭 file/media attachment architecture with explicit security limits;
- 🧭 notification preferences;
- 🧭 channel roles/permissions if supported by a maintained backend.

These are not current features.

## UX and portfolio maturity

- 🔄 verify responsive behavior and accessibility.
- 🔄 replace unverified demo claims with a revalidated deployment before publishing a live-demo badge.
- 🧭 sanitized screenshots or short demo media.
- 🧭 performance/bundle analysis after build-tool modernization.

## Promotion rule

An item becomes ✅ only when implementation is versioned, relevant verification exists, documentation is updated and CI remains green.
