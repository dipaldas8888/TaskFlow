import { useState } from "react";
import { useTodos } from "../contexts/TodoContext";

export default function AddTodo() {
  const [text, setText] = useState("");
  const { addTodo } = useTodos();

  const submit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    await addTodo(text.trim());
    setText("");
  };

  return (
    <form onSubmit={submit} className="mb-5 flex flex-col gap-3 sm:flex-row">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task..."
        className="min-h-12 flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
      />
      <button className="min-h-12 rounded-2xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200">
        Add task
      </button>
    </form>
  );
}
