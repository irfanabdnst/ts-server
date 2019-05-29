import express from 'express';

// import { connectMongo } from './api/mongo/db/mongoose';
import { mongoRouter } from './api/mongo/mongo';
import { v1Router } from './api/v1/v1';
import * as path from 'path';

const app = express();

// connectMongo();

app.disable('x-powered-by');

app.use('/v1', v1Router);
app.use('/mongo', mongoRouter);

app.get('/google_signin', (req, res, next) => {
    res.sendfile(path.join(__dirname, 'google_signin.html'));
});

app.listen(process.env.PORT || 5000, () => {
    console.log('Server started on port 5000....');
});
