import express from'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import path from "path";
import { fileURLToPath } from "url";
import connectDB from './utils/db.js';
import userRoute from './route/user_route.js';
import companyRoute from './route/company_route.js';
import JobRoute from './route/job_route.js';
import applicationRoute from './route/application_route.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, ".env") });

const app=express();

 app.use(cors({
    origin:['http://localhost:5173', 'http://localhost:5176', 'http://localhost:5174','http://localhost:5175'],
    credentials:true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use('/api/v1/user',userRoute);
app.use('/api/v1/company',companyRoute);
app.use('/api/v1/job',JobRoute);
app.use('/api/v1/application',applicationRoute); 

const PORT=process.env.PORT || 8000;

(async () => {
  try {
    await connectDB();
    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    process.exitCode = 1;
  }
})();





