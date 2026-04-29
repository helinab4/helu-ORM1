import { Hono } from 'hono';
import * as userService from '../services/userService.ts';
import * as postService from '../services/postService.ts';

const router = new Hono();

router.post('/', async (c) => {
  const body = await c.req.json();
  const user = await userService.createUser(body);
  return c.json(user);
});

router.get('/', async (c) => {
  const users = await userService.getUsers();
  return c.json(users);
});

router.get('/:id', async (c) => {
  const id = c.req.param('id');
  const user = await userService.getUserById(id);
  if (!user) return c.json({ error: 'User not found' }, 404);
  return c.json(user);
});

router.get('/:id/posts', async (c) => {
  const id = c.req.param('id');
  const posts = await postService.getPostsByUser(id);
  return c.json(posts);
});

export default router;
