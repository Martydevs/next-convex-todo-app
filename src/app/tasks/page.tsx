"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { SquarePen, Trash2 } from "lucide-react";
import { Task } from "@/interfaces/task";
import { DialogHeader } from "@/components/ui/dialog";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export default function TasksPage() {
  const [task, setTask] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState("");

  const mutate = useMutation(api.tasks.add);
  const updateTask = useMutation(api.tasks.updateTask);
  const tasks = useQuery(api.tasks.get) as Task[];

  const handleSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    mutate({ text: task });
  };

  const handleUpdateTask = ({ _id }: Task) => {
    const task = tasks?.find((task) => task._id === _id);

    if (task) {
      updateTask({
        _id: task._id,
        text: taskToUpdate || task.text,
        isCompleted: isCompleted,
      });
    }
  };

  return (
    <main className="min-h-dvh w-full flex flex-col items-center">
      <section className="w-3/4 mx-auto h-full flex flex-row items-start justify-between">
        <section className="w-1/2">
          <h2>Tareas</h2>

          <ul className="flex flex-col gap-4">
            {tasks?.map((task) => (
              <li
                key={task._id}
                className="flex flex-row justify-between items-center gap-2"
              >
                <div>
                  <p>{task.text}</p>
                  {task.isCompleted ? (
                    <p className="text-green-500">✔ Completada</p>
                  ) : (
                    <p className="text-red-500">❌ Pendiente</p>
                  )}
                </div>
                <span className="flex flex-col items-start">
                  <Button variant={"link"} size={"icon"}>
                    <Trash2 />
                  </Button>
                  <Dialog>
                    <DialogTrigger onClick={() => setTaskToUpdate(task.text)} asChild>
                    <Button variant={"link"} size={"icon"}>
                      <SquarePen />
                    </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Modificar tarea</DialogTitle>
                        <DialogDescription>
                          <Input
                            placeholder="Escriba aqui"
                            value={taskToUpdate}
                            onChange={(ev) => setTaskToUpdate(ev.target.value)}
                          />

                          <label
                            htmlFor="task-completed"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            <input
                              type="checkbox"
                              name="task-completed"
                              id="task-completed"
                              onChange={(ev) =>
                                setIsCompleted(ev.target.checked)
                              }
                            />
                            Marcar como completada
                          </label>

                          <Button
                            variant={"default"}
                            onClick={() => handleUpdateTask(task)}
                          >
                            Modificar
                          </Button>
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </span>
              </li>
            ))}
          </ul>
        </section>
        <section className="w-1/2">
          <form
            onSubmit={handleSubmit}
            id="task-form"
            className="flex flex-col items-start gap-2"
          >
            <label htmlFor="task" className="text-zinc-100 flex flex-col">
              Ingrese una tarea
              <input
                onChange={(ev) => setTask(ev.target.value)}
                type="text"
                className="bg-zinc-800 rounded-md outline-none border-zinc-600 px-2 text-zinc-100"
                name="task"
                id="task"
                placeholder="Escriba aqui"
              />
            </label>

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 rounded-md outline-none border-zinc-600 px-2 text-zinc-100"
            >
              Agregar
            </button>
          </form>
        </section>
      </section>
    </main>
  );
}
