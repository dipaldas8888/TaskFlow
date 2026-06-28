import { useAuth } from "../contexts/AuthContext";
import { useTodos } from "../contexts/TodoContext";
import AddTodo from "./AddTodo";
import NavBar from "./NavBar";
import TodoList from "./TodoList";

export default function TodoApp() {
  const { user } = useAuth();
  const { todos } = useTodos();
  const completed = todos.filter((todo) => todo.completed).length;
  const active = todos.length - completed;

  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl px-4 py-5 sm:px-6 lg:px-8">
      <NavBar />

      <section className="grid gap-5 lg:grid-cols-[0.72fr_1.28fr]">
        <aside className="rounded-3xl bg-slate-950 p-6 text-white shadow-2xl shadow-blue-950/15">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-200">
            Dashboard
          </p>
          <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">
            {user?.name ? `${user.name}'s tasks` : "Your tasks"}
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            Keep the list lean, finish the next thing, and let the rest wait its turn.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-white/10 p-4">
              <p className="text-3xl font-bold">{active}</p>
              <p className="mt-1 text-sm text-slate-300">active</p>
            </div>
            <div className="rounded-2xl bg-blue-500 p-4">
              <p className="text-3xl font-bold">{completed}</p>
              <p className="mt-1 text-sm text-blue-50">done</p>
            </div>
          </div>
        </aside>

        <section className="rounded-3xl border border-white/70 bg-white/85 p-4 shadow-2xl shadow-blue-950/10 backdrop-blur sm:p-6">
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
                Today
              </p>
              <h2 className="mt-2 text-2xl font-bold text-slate-950">Todo list</h2>
            </div>
            <p className="text-sm text-slate-500">{todos.length} total tasks</p>
          </div>

          <AddTodo />
          <TodoList />
        </section>
      </section>
    </main>
  );
}
