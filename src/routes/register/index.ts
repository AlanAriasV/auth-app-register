import { Router } from 'express';

import { UserController } from '@/src/controllers';
import { generateToken } from '@/src/common';

const registerRouter = Router();

registerRouter.post('/', async (req, res) => {
  const body = req.body;

  if (!body.name || !body.email || !body.password) {
    return res.status(400).json({
      message: 'Missing required fields',
    });
  }

  const { status, data: user, message } = await UserController.register(body);

  if (status === 200) {
    const token = generateToken(user!);

    // res.cookie('token', token, COOKIE_OPTIONS);

    return res.status(status).json({ ...user, token });
  }

  res.status(status).json({ message });
});

export default registerRouter;
