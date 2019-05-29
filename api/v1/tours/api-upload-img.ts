import { RequestHandler } from 'express';

import { APIError, PublicInfo } from '../../../model/shared/messages';
import { getFileUploader } from '../general/static';
import { db } from '../../../db/db';

export const apiUploadImg: RequestHandler = (req, res, next) => {
    const tourID = req.params.id;

    const upload = getFileUploader(req.app.get('env'));
    upload(req, res, err => {
        if (err) {
            console.log(err);
            next(new APIError('Error', 'Upload file error', 500));
        } else {
            const sql = 'update tours set img = array_append(img, $1) where id = $2';
            db.none(sql, [req.file.filename, tourID]).then(() => {
                res.json(PublicInfo.infoCreated({ uploadedFile: req.file.filename }));
            });
        }
    });
};
