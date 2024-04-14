import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import { router } from './routes/router';

const app = express();
app.use(express.json());

const corsOptions = {
  origin: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type', 'Authorization', 'Set-Cookie', 'Cookie',
    'Access-Control-Allow-Credentials', 'X-Requested-With'
  ],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return res.status(400).json({
      error: err.message,
    });
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
});

app.listen(8099, () => {
  console.log('Server is running on port 8099');
});
