import jwt from 'jsonwebtoken';

import { sessionTokenLifetime, sessionTokenSecret } from '../../../config';
import { CustomRequestHandler } from '../../../model/express';

export const apiSessionGenerate: CustomRequestHandler = (req, res, next) => {
  if (req.user) {
    const token = jwt.sign({ userId: req.user.id }, sessionTokenSecret, {
      expiresIn: sessionTokenLifetime
    });
    res.status(200).json({ auth: true, token: token });
  }
};
