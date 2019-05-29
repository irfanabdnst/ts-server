import { OAuth2Client } from 'google-auth-library';
import { TokenPayload } from 'google-auth-library/build/src/auth/loginticket';
import uuid from 'uuid';

import { db, pgp } from '../../../db/db';
import * as dbModel from '../../../db/model_generated';
import { CustomRequestHandler } from '../../../model/express';
import { apiSessionGenerate } from './session-gengerate';

const CLIENT_ID =
  '343955122104-krc5s4j22fmd2tharimhftjg1fpch6c9.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);

export const apiTokenSignin: CustomRequestHandler = (req, res, next) => {
  client
    .verifyIdToken({
      idToken: req.body.idtoken,
      audience: CLIENT_ID
    })
    .then(ticket => {
      const payload = ticket.getPayload() as TokenPayload;
      const email = payload.email as string;
      // return res.json(payload);
      db.one('select * from users where email = ${email}', { email: email })
        .then((user: dbModel.users) => {
          // res.json(user);
          // Generate Session Token
          req.user = user;
          apiSessionGenerate(req, res, next);
        })
        .catch(err => {
          if (err.code == pgp.errors.queryResultErrorCode.noData) {
            // Create user in database
            const user: dbModel.users = {
              id: uuid(),
              email: email,
              family_name: payload.family_name || null,
              given_name: payload.given_name || null
            };
            db.none(pgp.helpers.insert(user, undefined, 'users')).then(() => {
              // res.json(user);
              // Generate Session Token
              req.user = user;
              apiSessionGenerate(req, res, next);
            });
          }
        });
    });
};
