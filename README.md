# Smart IDE App

[![Build Status](https://img.shields.io/github/actions/workflow/status/relewant-dev/smart-ide-app/ci.yaml?style=for-the-badge&logo=github-actions&logoColor=white&color=2ecc71)](https://github.com/relewant-dev/smart-ide-app/actions)
[![Latest Version](https://img.shields.io/github/v/release/relewant-dev/smart-ide-app?style=for-the-badge&logo=semver&logoColor=white&color=3498db)](https://github.com/relewant-dev/smart-ide-app/releases)
[![License](https://img.shields.io/github/license/relewant-dev/smart-ide-app?style=for-the-badge&logo=opensourceinitiative&logoColor=white&color=f39c12)](./LICENSE)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg?style=for-the-badge&logo=git&logoColor=white&color=e74c3c)](https://conventionalcommits.org)

## Local API proxy

The frontend sends prompt executions to the local Next.js API route `/api/prompts/execute`. That route proxies the request to the backend service, which avoids browser CORS preflight failures such as `OPTIONS /api/prompts/execute 405 Method Not Allowed` during local development.

By default, the proxy forwards requests to `http://localhost:8000`. Set `BACKEND_URL` when the backend runs elsewhere:

```bash
BACKEND_URL=http://127.0.0.1:8000 npm run dev
```
