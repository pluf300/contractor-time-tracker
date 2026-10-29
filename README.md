# Contractor Time & Task Tracker

A static, sample-data demonstration hosted on GitHub Pages.

**[Open the demo](https://pluf300.github.io/contractor-time-tracker/)** · **[Source repository](https://github.com/pluf300/contractor-time-tracker)**

## Use the demo

1. Choose **Try contractor view** or **Try administrator view**. No account or password is needed.
2. Select a sample task and enter a work date, minutes, and sample notes.
3. Save, edit, or delete sample time entries. The totals update automatically.
4. In administrator view, assign another sample task to the fictional contractor.
5. Reload the page to restore the starting sample data. Exit demo returns to the welcome screen.

This is a demo, not a secure multi-user application. Both views are available to everyone. All data is held only in memory in the current browser tab; nothing is sent to an application server or saved in local storage. Do not enter personal, confidential, or real work information. Registration, password resets, real administrator grants, and shared database storage are not included.

## Structure

- `index.html`: welcome screen, task workspace, time-entry forms, and sample administrator view.
- `style.css`: responsive styling.
- `app.js`: sample data and browser-only interactions.
- `.nojekyll`: serves the files directly through GitHub Pages.

```text
Visitor → GitHub Pages (HTTPS) → HTML + CSS + JavaScript
                                      ↓
                              In-memory sample data
```

There are no API calls, API keys, Firebase SDKs, backend dependencies, or application credentials. GitHub serves the static files and may collect standard hosting access logs under its own privacy policy. The public repository contains only the demo; deployment reports, screenshots, user records, and cloud configuration from the former application are not part of this source tree.

## Run locally

From this folder, run `python3 -m http.server 8080`, then open `http://localhost:8080`.

## Publish

GitHub repository Settings → Pages → Deploy from a branch → `main` → `/ (root)`.

## AI disclosure

OpenAI Codex assisted with drafting code and documentation, running tests, and configuring deployment through the authenticated browser and Cloud Shell.
