import { createContext, useContext, useEffect, useState } from "react";
import api from "../api";
import { useAuth } from "./AuthContext";

const TodoContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useTodos = () => useContext(TodoContext);

export function TodoProvider({ children }) {
  const { token } = useAuth();
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTodos = async () => {
    if (!token) return setTodos([]);
    setLoading(true);
    try {
      const res = await api.get("/todos");
      setTodos(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const addTodo = async (text) => {
    const res = await api.post("/todos", { text });
    setTodos((t) => [res.data, ...t]);
    return res.data;
  };

  const updateTodo = async (id, patch) => {
    const res = await api.put(`/todos/${id}`, patch);
    setTodos((t) => t.map((it) => (it._id === id ? res.data : it)));
    return res.data;
  };

  const deleteTodo = async (id) => {
    await api.delete(`/todos/${id}`);
    setTodos((t) => t.filter((it) => it._id !== id));
  };

  return (
    <TodoContext.Provider
      value={{ todos, loading, fetchTodos, addTodo, updateTodo, deleteTodo }}
    >
      {children}
    </TodoContext.Provider>
  );
}
