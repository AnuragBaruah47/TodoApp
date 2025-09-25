import { useEffect, useState } from "react";
import "./App.css";
import { TodoContextProvider } from "./Context/index";
import TodoForm from "./Components/TodoForm";
import TodoItems from "./Components/TodoItems";

function App() {
  const [todos, settodos] = useState([]);

  const addTodo = (todo) => {
    settodos((prevtodo) => [...prevtodo, { id: Math.random(), ...todo }]);
  };
 
  const updateTodo = (id, todo) => {
    (prev) => prev.map((prevtodo) => (prevtodo.id === id ? todo : prevtodo));
  };

  const deleteTodo =(id)=>{
    settodos((prev)=>prev.filter((value)=> value.id !== id))
  }

  const toggleComplete = (id)=>{
    settodos((prev)=> prev.map((value)=>value.id === id? {...value,completed:!value.completed} : value))
  }


  useEffect(()=>{
    const todos=JSON.parse(localStorage.getItem("todos"))
    if(todos && todos.length>0){
      settodos(todos)
    }
  },[])

  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  },[todos])

  return (
    <TodoContextProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
    >
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4"><TodoForm/></div>
          <div className="flex flex-wrap gap-y-3">
            {todos.map((value)=>(
              <div key={value.id} className="w-full">
                <TodoItems todo={value}/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoContextProvider>
  );
}

export default App;
