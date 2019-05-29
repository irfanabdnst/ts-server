import { RequestHandler } from 'express';

export const apiGetUserDetail: RequestHandler = (req, res, next) => {
    res.send('Detail for user with id: ' + req.params.id);
};
