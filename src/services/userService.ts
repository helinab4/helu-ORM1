import { db, eq, users } from '../db.ts';

export const createUser = async (data: { name: string; email: string }) => {
  const result = await db.insert(users).values(data).returning();
  return result[0];
};

export const getUsers = async () => {
  return db.select().from(users);
};

export const getUserById = async (id: number | string) => {
  const result = await db.select().from(users).where(eq(users.id, Number(id)));
  return result[0];
};
