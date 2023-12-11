import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import apiRouter from './routes';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (_, res) => {
  res.send('Register Server!');
});

app.use('/api', apiRouter);

console.log(process.env.PORT);

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
