import { Sequelize } from 'sequelize';

/**
 * Database connection to SQLite database
 */
const db = new Sequelize({
  dialect: 'sqlite',
  storage: 'htn.sqlite3',
});

export default db;
