import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [notes, setNotes] = useState([]);
  const [editId , setEditId] = useState(null)

  const findNote = async () => {
    try {
      const response = await axios.get("http://localhost:3000/notes");
      setNotes(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    findNote();
  }, []);

  const addNote = async () => {
    if (!title || !value) {
      alert("Please fill all fields");
      return;
    }

    try {
      await axios.post("http://localhost:3000/notes/add", {
        title,
        value,
      });

      setTitle("");
      setValue("");
      findNote();
    } catch (error) {
      console.log(error);
    }
  };
  const editNote =(note)=>{
   setTitle(note.value) ; 
   setValue(note.value) ; 
   setEditId(note._id) ; 
  }
  const updateNote = async()=>{
   if(!title || !value){
    alert("Please Fill All Fields");
      return;
   }
   try {
      await axios.put(`http://localhost:3000/notes/update/${editId}` , {title , value }) ; 
      setTitle("") ; 
      setValue("") ; 
      setEditId(null);
      findNote();
   } catch (error) {
     console.log(error);
     
   }
  } 
  const deleteNote = async (id) => {
   try {
       await axios.delete(`http://localhost:3000/notes/delete/${id}`) ; 
       findNote();
   } catch (error) {
     console.log(error);
   }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-xl p-8">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
          📝 Notes App
        </h1>

  
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <textarea
            placeholder="Enter Description"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            rows="4"
            className="w-full border border-gray-300 rounded-lg p-3 outline-none resize-none focus:ring-2 focus:ring-blue-500"
          />

          <button onClick={editId  ? updateNote : addNote} className={`w-full text-white py-3 rounded-lg font-semibold ${
              editId
                ? "bg-green-600 hover:bg-green-700"
                : "bg-blue-600 hover:bg-blue-700"
            }`}>
              {editId ? "Update Notes" : "Add Notes"}
          </button>
        </div>


        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">All Notes</h2>

          {notes.length === 0 ? (
            <p className="text-gray-500 text-center">No Notes Found</p>
          ) : (
            <div className="space-y-4">
              {notes.map((note) => (
                <div
                  key={note._id}
                  className="bg-gray-50 border border-gray-200 rounded-lg p-5 shadow flex justify-between items-center"
                >
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {note.title}
                    </h3>

                    <p className="text-gray-600 mt-2">{note.value}</p>
                  </div>
                  <button
                    onClick={() => editNote(note)}
                    className="bg-blue-500 hover:bg-blue-600 ml-60 text-white px-5 py-2 rounded-lg font-semibold right-14"
                  >
                    Edit 
                  </button>
                  <button
                    onClick={() => deleteNote(note._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg font-semibold"
                  >
                    Delete
                  </button>
                
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;