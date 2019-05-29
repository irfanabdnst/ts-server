import uuid from 'uuid';

import { db, pgp } from '../../../db/db';
import { CustomRequestHandler } from '../../../model/express';
import { APIError, PublicInfo } from '../../../model/shared/messages';

export const apiCreateTour: CustomRequestHandler = (req, res, next) => {
  const requiredFields = ['tourTitle', 'location'];
  const givenFields = Object.getOwnPropertyNames(req.body);
  if (!requiredFields.every(field => givenFields.includes(field))) {
    return next(APIError.errMissingBody());
  }
  if (!req.user) {
    next(APIError.errUnauthorized());
  }
  const newTour = {
    id: uuid(),
    location: req.body.location || null,
    tour_title: req.body.tourTitle || null,
    tour_category: req.body.tourCategory || null,
    tour_description: req.body.tourDescription || null,
    price: req.body.price || null,
    currency: req.body.currency || null,
    img: [],
    user_id: req.user!.id
  };
  db.none(pgp.helpers.insert(newTour, undefined, 'tours')).then(() => {
    res.status(201).json(PublicInfo.infoCreated({ newTour: newTour }));
  });
};
