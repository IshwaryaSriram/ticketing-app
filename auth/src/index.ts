import express from 'express';
import { json } from 'body-parser';

import { currentUserRouter } from './routes/current-user';
import { logInRouter } from './routes/login';
import { logOutRouter } from './routes/logout';
import { signUpRouter } from './routes/signup';

import { errorHandler } from './middlewares/error-handler';

const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(logInRouter);
app.use(logOutRouter);
app.use(signUpRouter);

app.use(errorHandler);

app.listen(3000, () => {
    console.log("Listening on port: 3000");
})