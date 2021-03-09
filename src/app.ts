import express from 'express';
import sqlite3 from 'sqlite3';

const port = process.env.PORT || 5000;

const app = express();

app.listen(port, () => {
  console.log(`Example REST Express app listening at http://localhost:${port}`);
});
