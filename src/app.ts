import express from 'express';
import db from './db/index';
import router from './routes/index';
import cors from 'cors';

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(router);

app.listen(PORT, async () => {
  try {
    await db.authenticate();
    await db.sync();
    console.log(`Successfully listening on port ${PORT}`);
  } catch (error) {
    console.error('Failed to start server / connect to database:', error);
  }
});
