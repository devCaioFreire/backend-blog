/* eslint-disable @typescript-eslint/no-unused-vars */
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import { router } from './routes/router';
import path from 'path';

const app = express();
app.use(express.json());
app.use(cors());
app.use(router);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return res.status(400).json({
      error: err.message,
    });
  }

  app.use('/uploads', (req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Content-Type', 'image/png');
    next();
  });

  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
});

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});
