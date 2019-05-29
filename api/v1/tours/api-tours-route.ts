import { Router } from 'express';

import { jsonParser } from '../general/body-parser';
import { apiCheckTourFilter } from './api-check-tour-filter';
import { apiCreateTour } from './api-create-tour';
import { apiDeleteTour } from './api-delete-tour';
import { apiGetTours } from './api-tours';
import { apiGetTourDetail } from './api-tours-detail';
import { apiUpdatePatchTour } from './api-update-patch-tour';
import { apiUploadImg } from './api-upload-img';

export let tourRouter = Router();

tourRouter
  .route('/')
  .get(apiCheckTourFilter, apiGetTours)
  .post(jsonParser, apiCreateTour);

tourRouter
  .route('/:id')
  .get(apiGetTourDetail)
  .delete(apiDeleteTour)
  .patch(jsonParser, apiUpdatePatchTour);

tourRouter.post('/:id/img', apiUploadImg);
