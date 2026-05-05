# Smart IDE App - Microfrontend Chat UI

A React + TypeScript + Node.js microfrontend setup inspired by modern conversational UIs.

## Architecture

- `apps/shell`: Host container app (React + Vite)
- `apps/chat-mf`: Chat experience microfrontend (React + TypeScript)
- `apps/sidebar-mf`: Sidebar/workspace microfrontend (React + TypeScript)
- `server`: Node.js gateway serving metadata/endpoints
- Module Federation via `@originjs/vite-plugin-federation`

## Run

```bash
npm install
npm run dev
```

This starts:
- Shell on `http://localhost:5173`
- Chat MF on `http://localhost:5174`
- Sidebar MF on `http://localhost:5175`
- Node API on `http://localhost:3001`

## Notes

This is intentionally not a clone of any proprietary UI. It is an original implementation using similar interaction patterns (sidebar + threaded chat + composer).
