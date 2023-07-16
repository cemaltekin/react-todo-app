import { useEffect } from "react";
import { useState } from "react";
import { MdEditSquare, MdDelete } from "react-icons/md";
import classNames from "classnames";
export default function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState({
    id: "",
    title: "",
    confirmed: false,
  });

  const addTodo = (e) => {
    e.preventDefault();
    if (todo.title.length >= 3) {
      setTodos([...todos, todo]);
      setTodo({
        id: "",
        title: "",
      });
    } else {
      alert("3 karakterden az olamaz!");
    }
  };

  const deleteTodo = (id) => {
    e.stopPropagation();
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const updateTodo = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        const newTitle = prompt("Yeni başlık giriniz", todo.title);
        if (newTitle.length < 3) {
          alert("3 karakterden az olamaz!");
          return todo;
        }
        todo.title = newTitle;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const submitTodo = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.confirmed = !todo.confirmed;
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
          <ul className="mt-5">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className={classNames(
                  "flex justify-between items-center  rounded-lg mb-3 cursor-pointer",
                  {
                    "bg-zinc-600": !todo.confirmed,
                    "bg-green-500": todo.confirmed,
                  }
                )}
              >
                <span className="text-white px-5 py-3 w-full"  onClick={() => submitTodo(todo.id)}>{todo.title}</span>
                <div className="flex items-center px-5 py-3">
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
