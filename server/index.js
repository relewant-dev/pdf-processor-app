import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.get('/health', (_, res) => res.json({ ok: true, service: 'smart-ide-api' }));
app.get('/api/microfrontends', (_, res) => {
  res.json({ shell: 5173, remotes: { chatMf: 5174, sidebarMf: 5175 } });
});

app.listen(3001, () => console.log('API listening on http://localhost:3001'));
