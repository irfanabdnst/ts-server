import { Router } from 'express';
import express = require('express');
import path from 'path';

import { apiCors } from './general/cors';
import { apiErrorHandler } from './general/error-handling';
import { logger } from './general/logging';
import { apiValidation } from './general/validation';
import { apiDownloadImg } from './tours/api-download-img';
import { tourRouter } from './tours/api-tours-route';
import { userRouter } from './users/api-users';

export let mongoRouter = Router();

mongoRouter.use(logger);
mongoRouter.use(apiCors);
mongoRouter.use(apiValidation);

mongoRouter.get('/headers', (req, res, next) => res.json(req.headers));

mongoRouter.use('/static', express.static(path.resolve('./', 'public', 'img')));

mongoRouter.get('/', (req, res, next) => {
    res.status(200).send('Tour Booking API');
});

mongoRouter.use('/users', userRouter);

mongoRouter.use('/tours', tourRouter);

mongoRouter.get('/static/download/:id', apiDownloadImg);

// v1Router.param('fromDate', dateParam);
// v1Router.param('toDate', dateParam);
// v1Router.get(`/bookings/:fromDate/:toDate`, (req, res, next) => res.json(req.params););

mongoRouter.use(apiErrorHandler);
