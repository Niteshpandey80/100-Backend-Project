import mongoose from "mongoose";
const todoSchema = new mongoose.Schema({
    title:String ,
    value:String
})
const Todo = new mongoose.model('Todo' , todoSchema) ; 
export default Todo ;