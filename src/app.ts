import express from 'express';
import { config } from 'dotenv';
import indexRouter from './routes/proof';
import logger from 'morgan';


config();
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use('/', indexRouter);

const port = Number(process.env.PORT || '3000');

app.listen(port, () => {
        console.log(`server started on port ${port}`);
    }
);