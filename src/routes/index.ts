import registerRouter from './register';

import { Router } from 'express';

const apiRouter = Router();

apiRouter.use('/register', registerRouter);

export default apiRouter;
