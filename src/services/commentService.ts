import { comments, db, eq } from '../db.ts';

export const createComment = async (data: { text: string; postId: number }) => {
  const result = await db.insert(comments).values(data).returning();
  return result[0];
};

export const getComments = async () => {
  return db.select().from(comments);
};

export const getCommentsByPost = async (postId: number | string) => {
  return db.select().from(comments).where(eq(comments.postId, Number(postId)));
};

export const getCommentById = async (id: number | string) => {
  const result = await db.select().from(comments).where(eq(comments.id, Number(id)));
  return result[0];
};
