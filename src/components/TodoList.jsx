import { useTodos } from "../contexts/TodoContext";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const { todos, loading } = useTodos();

  if (loading) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 px-5 py-10 text-center text-slate-500">
        Loading your tasks...
      </div>
    );
  }

  if (!todos || todos.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-blue-200 bg-blue-50/70 px-5 py-10 text-center">
        <p className="text-lg font-semibold text-slate-900">No todos yet</p>
        <p className="mt-2 text-sm text-slate-500">
          Add one above and give your day a shape.
        </p>
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {todos.map((todo) => (
        <TodoItem key={todo._id} todo={todo} />
      ))}
    </ul>
  );
}
