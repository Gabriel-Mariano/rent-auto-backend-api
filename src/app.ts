import express, { json } from 'express';
import cors from 'cors';
import route from './routes';

const app  = express();
const port = 3008;

app.use(cors());
app.use(json());
app.use(route);

app.listen(port,()=>{
    console.log(`Server is running at port ${port}`);
});