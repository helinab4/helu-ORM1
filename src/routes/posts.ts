import { Hono } from 'hono';
import * as postService from '../services/postService.ts';
import * as commentService from '../services/commentService.ts';

const router = new Hono();

router.post('/', async (c) => {
  const body = await c.req.json();
  const post = await postService.createPost(body);
  return c.json(post);
});

router.get('/', async (c) => {
  const posts = await postService.getPosts();
  return c.json(posts);
});

router.get('/:id', async (c) => {
  const id = c.req.param('id');
  const post = await postService.getPostById(id);
  if (!post) return c.json({ error: 'Post not found' }, 404);
  return c.json(post);
});

router.get('/:id/comments', async (c) => {
  const id = c.req.param('id');
  const comments = await commentService.getCommentsByPost(id);
  return c.json(comments);
});

export default router;
