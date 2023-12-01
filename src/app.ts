import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/router';
const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// aplication routes
app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

// global error handler middleware
app.use(globalErrorHandler);

// api not found middleware
app.use(notFound);

export default app;
