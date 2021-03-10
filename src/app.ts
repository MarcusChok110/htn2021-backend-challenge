import express from 'express';
import db from './db/index';

const PORT = process.env.PORT || 5000;

const app = express();

app.listen(PORT, async () => {
  try {
    await db.authenticate();
    await db.sync();
    console.log('success');
  } catch (error) {
    console.error('failure', error);
  }
});
