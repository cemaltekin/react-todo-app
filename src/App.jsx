import { useEffect } from "react";
import { useState } from "react";
import { MdEditSquare, MdDelete } from "react-icons/md";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState({
    id: "",
    title: "",
  });

  const addTodo = (e) => {
    e.preventDefault();
    setTodos([...todos, todo]);
    setTodo({
      id: "",
      title: "",
    });
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const updateTodo = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.title = prompt("Yeni başlık giriniz", todo.title);
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  useEffect(() => {
    document.onkeydown = () => {
      document.querySelector("#todoInput").focus();
    };
    document.querySelector("#todoInput").focus();
  }, []);

  return (
    <div className="bg-zinc-700 min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-[600px]  w-full mx-auto px-4">
        <div className="w-full">
          <h1 className="text-zinc-200 text-2xl text-center">
            Yapılacaklar Listem
          </h1>
          <form className="relative mt-5">
            <input
              id="todoInput"
              onChange={(e) =>
                setTodo({
                  title: e.target.value,
                  id: Math.floor(Math.random() * 1000),
                })
              }
              value={todo.title}
              type="text"
              className="w-full h-[60px] bg-transparent border border-zinc-300 rounded-lg outline-none px-5 text-white "
            />
            <button
              onClick={addTodo}
              className="absolute right-0 top-0 h-full px-10 rounded-lg bg-green-500 text-white"
            >
              Ekle
            </button>
          </form>
        </div>
        <div>
          <ul>
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="flex items-center justify-between bg-zinc-600 rounded-lg px-5 py-3 mt-5"
              >
                <span className="text-white">{todo.title}</span>
                <div className="flex items-center">
                  <MdEditSquare
                    className="text-white text-2xl mr-3 cursor-pointer"
                    onClick={() => updateTodo(todo.id)}
                  />
                  <MdDelete
                    className="text-white text-2xl cursor-pointer"
                    onClick={() => deleteTodo(todo.id)}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
