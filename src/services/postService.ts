import { db, eq, posts, sqlite } from '../db.ts';

export const createPost = async (data: { title: string; content?: string; authorId: number }) => {
  const stmt = sqlite.query('INSERT INTO posts (title, content, authorId) VALUES (?, ?, ?)');
  const result = stmt.run(data.title, data.content ?? null, data.authorId);
  const created = await db.select().from(posts).where(eq(posts.id, Number(result.lastInsertRowid)));

  return created[0]
    ? {
        ...created[0],
        content: created[0].body
      }
    : undefined;
};

export const getPosts = async () => {
  const result = await db.select().from(posts);
  return result.map(({ body, ...post }) => ({ ...post, content: body }));
};

export const getPostsByUser = async (userId: number | string) => {
  const result = await db.select().from(posts).where(eq(posts.authorId, Number(userId)));
  return result.map(({ body, ...post }) => ({ ...post, content: body }));
};

export const getPostById = async (id: number | string) => {
  const result = await db.select().from(posts).where(eq(posts.id, Number(id)));
  return result[0]
    ? {
        ...result[0],
        content: result[0].body
      }
    : undefined;
};
