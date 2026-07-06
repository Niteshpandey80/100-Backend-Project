import express from 'express'
import mongoose, { mongo } from 'mongoose'
import cors from 'cors'
import noteRouter from './routes/noteRoutes.js'

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/noteappp')
.then(()=>{
  console.log('Connted to DB');
})
.catch((err)=>{
  console.log(err);
})

app.use('/notes' , noteRouter);

app.listen(3000 , ()=>{
  console.log("Runing on port ");
  
})