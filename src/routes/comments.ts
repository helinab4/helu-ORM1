import { Hono } from 'hono';
import * as commentService from '../services/commentService.ts';

const router = new Hono();

router.post('/', async (c) => {
  const body = await c.req.json();
  const comment = await commentService.createComment(body);
  return c.json(comment);
});

router.get('/', async (c) => {
  const comments = await commentService.getComments();
  return c.json(comments);
});

router.get('/:id', async (c) => {
  const id = c.req.param('id');
  const comment = await commentService.getCommentById(id);
  if (!comment) return c.json({ error: 'Comment not found' }, 404);
  return c.json(comment);
});

export default router;
