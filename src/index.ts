import { Hono } from 'hono';
import usersRouter from './routes/users.ts';
import postsRouter from './routes/posts.ts';
import commentsRouter from './routes/comments.ts';

const app = new Hono();

app.route('/users', usersRouter);
app.route('/posts', postsRouter);
app.route('/comments', commentsRouter);

app.get('/', (c) => c.json({ message: 'Hono Modular API (TypeScript)' }));

const port = Number(process.env.PORT ?? 3000);
console.log(`Listening on http://localhost:${port}`);

Bun.serve({ fetch: app.fetch, port });
