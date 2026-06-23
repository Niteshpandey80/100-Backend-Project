import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

const app = express() ;
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/todoooooooooo")
.then(()=>{
    console.log("Connected"); 
})
.catch((err)=>console.log(err)
)

const TodoSechema = new mongoose.Schema({
    text:String ,
})
const Todo = mongoose.model('Todo' , TodoSechema );

app.get('/todos' , async(req,res)=>{
   const todos =await Todo.find();
   res.json(todos)
})

app.post('/todos' , async(req,res)=>{
  const newTodo = new Todo({
    text:req.body.text,
  })
  await newTodo.save();
  res.json(newTodo);
})

app.delete("/todos/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({
    message: "Todo Deleted",
  });
});

app.listen(3000 ,()=>{
    console.log('Runing on the Port 3000');
})