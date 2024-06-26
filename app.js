import express from 'express';
const app = express();
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan'
import {config} from 'dotenv'
import userRoutes from './routes/user.route.js'
import errorMiddleware from './middlewares/error.middleware.js';
import Courserouter from './routes/course.route.js';
import Paymentrouter from './routes/payment.routes.js';
config();


app.use(cors(
    {origin: [process.env.Frontend_URL], methods: ['GET', 'POST','PUT','DELETE'],credentials: true }

));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

app.get('/ping',(req,res)=>{
    res.send("Pong");
})

app.use('/api/v1/user',userRoutes);
app.use('/api/v1',Courserouter)
app.use('/api/v1/payments',Paymentrouter)
app.get('*',(req,res)=>{
    res.status(404).send('404 not fond')
})
app.use(errorMiddleware);

export default app;
