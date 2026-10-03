# Changelog

## 1.0.2 — 2026-10-03

- Typecheck against Pi 1.0.0's real host and TUI declarations.
- Fix optional garbage-collection settings narrowing and custom-UI render typing.
- Declare sequential execution for the mutable task tool.
- Add isolated file-backed create/get/list/delete regression coverage through Pi's real extension loader.

Verification: `npm run check`, `npm test`; real Pi 1.0 extension-loader smoke check. Existing installation filters remain unchanged; this release does not re-enable a disabled todo extension.
