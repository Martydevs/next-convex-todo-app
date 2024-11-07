"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { FormEvent, useState } from "react";

export default function TasksPage() {
  const [task, setTask] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  const mutate = useMutation(api.tasks.add)
  const tasks = useQuery(api.tasks.get);

  const handleSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    mutate({ text: task, isCompleted: isCompleted });
  }

  return (
    <main className="min-h-dvh w-full flex flex-col items-center">
      <section className="w-3/4 mx-auto h-full flex flex-row items-start justify-between">
        <section className="w-1/2">
          <h2>Tareas</h2>

          <ul className="flex flex-col gap-2">
            {tasks?.map((task) => (
              <li key={task._id}>
                <p>{task.text}</p>
                {task.isCompleted ? <p className="text-green-500">✔ Completada</p> : <p className="text-red-500">❌ Pendiente</p>}
              </li>
            ))}
          </ul>
        </section>
        <section className="w-1/2">
          <form onSubmit={handleSubmit} id="task-form" className="flex flex-col items-start gap-2">
            <label htmlFor="task" className="text-zinc-100 flex flex-col">
              Ingrese una tarea
              <input onChange={(ev) => setTask(ev.target.value)} type="text" className="bg-zinc-800 rounded-md outline-none border-zinc-600 px-2 text-zinc-100" name="task" id="task" placeholder="Escriba aqui" />
            </label>

            <label className="text-zinc-100">
              <input type="checkbox" className="mr-2" name="isCompleted" id="isCompleted" onChange={() => setIsCompleted(value => !value)} />
              Marcar como completada
            </label>

            <button type="submit" className="bg-blue-500 hover:bg-blue-700 rounded-md outline-none border-zinc-600 px-2 text-zinc-100">
              Agregar
            </button>
          </form>
        </section>
      </section>
    </main>
  );
}
