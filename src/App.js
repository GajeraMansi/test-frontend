import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  // backend URL (use localhost when testing locally)
  const backendUrl = "http://localhost:5000/api/todos";

  useEffect(() => {
    axios.get(backendUrl).then((res) => setTodos(res.data));
  }, []);

  const addTodo = async () => {
    if (!text) return;
    const res = await axios.post(backendUrl, { text });
    setTodos([...todos, res.data]);
    setText("");
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${backendUrl}/${id}`);
    setTodos(todos.filter((t) => t._id !== id));
  };

  return (
    <div className="App">
      <h1>✅ Todo App</h1>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add todo..."
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            {todo.text}{" "}
            <button onClick={() => deleteTodo(todo._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
