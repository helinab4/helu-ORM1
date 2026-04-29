import { Database } from 'bun:sqlite';
import { drizzle } from 'drizzle-orm/bun-sqlite';
import { eq } from 'drizzle-orm';
import { comments, posts, users } from './schema.ts';

// initialize SQLite and enable foreign keys
const sqlite = new Database('dev.db');
sqlite.exec('PRAGMA foreign_keys = ON');

// create tables with relationships if not exist
sqlite.exec(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL
)`);

sqlite.exec(`CREATE TABLE IF NOT EXISTS posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  content TEXT,
  authorId INTEGER NOT NULL,
  FOREIGN KEY(authorId) REFERENCES users(id) ON DELETE CASCADE
)`);

sqlite.exec(`CREATE TABLE IF NOT EXISTS comments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  text TEXT NOT NULL,
  postId INTEGER NOT NULL,
  FOREIGN KEY(postId) REFERENCES posts(id) ON DELETE CASCADE
)`);

export const db = drizzle(sqlite, { schema: { users, posts, comments } });
export { sqlite };
export { eq };
export { comments, posts, users };
