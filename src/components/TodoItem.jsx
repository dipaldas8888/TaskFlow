import { useState } from "react";
import { useTodos } from "../contexts/TodoContext";

export default function TodoItem({ todo }) {
  const { updateTodo, deleteTodo } = useTodos();
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(todo.text);

  const save = async () => {
    const nextText = text.trim();
    if (!nextText) return;
    await updateTodo(todo._id, { text: nextText });
    setEditing(false);
  };

  const cancel = () => {
    setText(todo.text);
    setEditing(false);
  };

  return (
    <li className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-blue-200 hover:shadow-md">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 flex-1 items-start gap-3">
          <input
            type="checkbox"
            checked={!!todo.completed}
            onChange={() => updateTodo(todo._id, { completed: !todo.completed })}
            className="mt-1 h-5 w-5 accent-blue-600"
          />
          {editing ? (
            <input
              className="min-h-11 min-w-0 flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          ) : (
            <span
              className={`min-w-0 break-words text-base ${
                todo.completed ? "text-slate-400 line-through" : "text-slate-800"
              }`}
            >
              {todo.text}
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-2 sm:flex-nowrap">
          {editing ? (
            <>
              <button
                onClick={save}
                className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100"
              >
                Save
              </button>
              <button
                onClick={cancel}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-slate-300 focus:outline-none focus:ring-4 focus:ring-slate-100"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setEditing(true)}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-blue-200 hover:text-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100"
              >
                Edit
              </button>
              <button
                onClick={() => deleteTodo(todo._id)}
                className="rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100 focus:outline-none focus:ring-4 focus:ring-red-100"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </li>
  );
}
