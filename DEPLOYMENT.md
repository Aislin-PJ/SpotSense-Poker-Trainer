# Poker Trainer Static PWA Deployment

Package date: 2026-05-29
Service worker cache: `poker-trainer-v6`

Deploy the files in this folder as static web assets from the same public root. HTTPS is required for installed-PWA and service worker behavior.

Post-upload checks:

- Open the deployed URL and confirm the app loads without console errors.
- Switch to All-Street mode and confirm role labels, scenario context, action buttons, and Strategy Coach glossary render.
- Run offline reload after the service worker controls the page.
- Keep the previous static package available for rollback.

Latest local verification evidence is recorded in `docs/latest-verification-report.md` in the source workspace.
