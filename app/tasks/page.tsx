"use client";

import { useSelector } from "react-redux";
import { TaskCard } from "../../components/task-card";
import { NewTaskForm } from "@/components/new-task-form";

export default function TaskManagement() {
  const tasks = useSelector(
    (state: { tasks: [{ title: string; description: string; id: number }] }) =>
      state.tasks
  );

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="w-[300px] bg-[#1B4D4B] p-4 flex flex-col">
        <NewTaskForm />
        <div className="mt-auto pb-4 text-white/60 text-sm">
          © Nanocreatives
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6">
            <h1 className="text-xl font-medium mb-2">Liste des taches</h1>
            <p className="text-gray-600">
              Choisissez le secteur auquel appartient votre entreprise. Cette
              personnalisation nous aide à vous offrir une expérience sur mesure
              et pertinente.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {tasks.map(
              (task: { title: string; description: string; id: number }) => (
                <TaskCard
                  key={task.id}
                  title={task.title}
                  description={task.description}
                  isSelected={false} // Assuming isSelected is not needed in this context
                  id={task.id}
                />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
