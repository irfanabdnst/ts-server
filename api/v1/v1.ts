import express = require('express');
import { Router } from 'express';
import path from 'path';
import { apiLocalSignup } from './auth/local-signup';
import { apiSessionVerivy } from './auth/session-verify';
import { apiTokenSignin } from './auth/token-signin';
import { jsonParser, urlEncodedParser } from './general/body-parser';
import { apiCors } from './general/cors';
import { apiErrorHandler } from './general/error-handling';
import { logger } from './general/logging';
import { apiValidation } from './general/validation';
import { apiDownloadImg } from './tours/api-download-img';
import { tourRouter } from './tours/api-tours-route';
import { userRouter } from './users/api-users';
import { apiLocalSignin } from './auth/local-signin';

export let v1Router = Router();

v1Router.use(logger);
v1Router.use(apiCors);
v1Router.use(apiValidation);
v1Router.use(apiSessionVerivy);

v1Router.get('/headers', (req, res, next) => res.json(req.headers));

v1Router.use('/static', express.static(path.resolve('./', 'public', 'img')));

v1Router.get('/', (req, res, next) => {
  res.status(200).send('Tour Booking API');
});

v1Router.use('/users', userRouter);

v1Router.use('/tours', tourRouter);

v1Router.post('/tokensignin', urlEncodedParser, apiTokenSignin);

v1Router.post('/localsignup', jsonParser, apiLocalSignup);

v1Router.post('/localsignin', jsonParser, apiLocalSignin);

v1Router.get('/static/download/:id', apiDownloadImg);

// v1Router.param('fromDate', dateParam);
// v1Router.param('toDate', dateParam);
// v1Router.get(`/bookings/:fromDate/:toDate`, (req, res, next) => res.json(req.params););

v1Router.use(apiErrorHandler);
