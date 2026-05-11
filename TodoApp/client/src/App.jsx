import axios from 'axios'
import React, { useEffect, useState } from 'react'

const App = () => {
  const [input ,setInput ] = useState("")
  const [todo , setTodo ] = useState([])

  const getTodo = async()=>{
      const response = await axios.get('http://localhost:3000/todos');
      setTodo(response.data)
  }
  useEffect(()=>{
     getTodo();
  },[])
  const addTodo = async()=>{
     if(!input) return ; 
     await axios.post('http://localhost:3000/todos' , {text:input});
     setInput("");
     getTodo();
  };
  const handleDelete = async(id)=>{
   await axios.delete(`http://localhost:3000/todos/${id}`) ;
   getTodo();
  }
  
  return (
    <div className='h-screen flex items-center justify-center bg-gray-200'>
       <div className='bg-white p-6 rounded-xl '>
           <h1 className='text-2xl font-bold '>Todo App</h1>
           <div>
              <input type="text" placeholder='Enter Todo' value={input} onChange={(e)=>setInput(e.target.value)} className='border  rounded mt-1 mr-2 px-2' />
              <button onClick={addTodo} className='bg-blue-400 px-3 py-1 rounded text-white'>Add Todo </button>
              
           </div>

           {
            todo.map((todo)=>(
             <div className='mt-2' key={todo._id}>
              <p className='ml-2'>{todo.text} <button onClick={()=>handleDelete(todo._id)} className='bg-red-500 text-white px-2'>Delete</button> </p>
             </div>
            ))
           }
       </div>
    </div>
  )
}

export default App
