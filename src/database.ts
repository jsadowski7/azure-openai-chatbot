import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

sqlite3.verbose();

export async function openDb() {
  return open({
    filename: './chatbot.db',
    driver: sqlite3.Database
  });
}

export async function setupDb() {
  const db = await openDb();
  await db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user TEXT,
      message TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
}