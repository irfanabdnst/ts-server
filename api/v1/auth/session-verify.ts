import jwt from 'jsonwebtoken';

import { sessionTokenSecret } from '../../../config';
import { db } from '../../../db/db';
import * as dbModel from '../../../db/model_generated';
import { CustomRequestHandler } from '../../../model/express';
import { APIError } from '../../../model/shared/messages';

export const apiSessionVerivy: CustomRequestHandler = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, sessionTokenSecret, (err, decoded: any) => {
      if (err) {
        next(APIError.errUnauthorized());
      } else {
        const userId = decoded.userId;
        db.one<dbModel.users>('select * from users where id = ${userId}', {
          userId: userId
        }).then(user => {
          console.log(user);
          req.user = user;
          next();
        });
      }
    });
  } else {
    next();
  }
};
