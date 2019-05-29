import { Router } from 'express';

import { apiCreateUser } from './api-create-user';
import { apiDeleteUser } from './api-delete-user';
import { apiGetUserDetail } from './api-get-user-detail';
import { apiUpdateUser } from './api-update-user';

export let userRouter = Router();

userRouter
    .route('/:id')
    .get(apiGetUserDetail)
    .delete(apiDeleteUser)
    .patch(apiUpdateUser);

userRouter.post('/', apiCreateUser);
