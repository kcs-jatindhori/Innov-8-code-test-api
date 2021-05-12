import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import db from './config/database';
import apiV1 from './api/v1/route';
import response from './helper/response';
let app = express();
app.server = http.createServer(app);

// logger
app.use(morgan('dev'));

// 3rd party middleware for security
app.use(helmet());
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
db();

app.use('/api/v1', apiV1);

/**
 * Page not found
 */
app.use('/*', response.res404);

export default app;
