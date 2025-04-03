// src/db.js
import Dexie from 'dexie';

const db = new Dexie('MyAppDB');

db.version(2).stores({
  templates: '++id, name, data, createdAt',
  appState: 'key',
  bin: '++id, type, data, deletedAt', // type = 'section' or 'template'
});

export default db;