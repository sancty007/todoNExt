"use client";

import { useDispatch } from "react-redux";
import { updateTask, deleteTask } from "@/app/store/store";

interface TaskCardProps {
  id: number;
  title: string;
  description: string;
  isSelected: boolean;
}

export function TaskCard({
  id,
  title,
  description,
  isSelected,
}: TaskCardProps) {
  const dispatch = useDispatch();

  const handleToggleSelect = () => {
    dispatch(
      updateTask({
        id,
        title,
        description,
      })
    );
  };

  const handleDelete = () => {
    dispatch(deleteTask(id));
  };

  return (
    <div
      className={`p-4 rounded-lg border cursor-pointer transition-colors
        ${
          isSelected ? "bg-[#1B4D4B] text-white" : "bg-white hover:bg-gray-50"
        }`}
      onClick={handleToggleSelect}
    >
      <h3 className="font-medium mb-2">{title}</h3>
      <p
        className={`text-sm ${isSelected ? "text-white/80" : "text-gray-600"}`}
      >
        {description}
      </p>
      {isSelected && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDelete();
          }}
          className="mt-2 text-sm text-red-400 hover:text-red-500"
        >
          Supprimer
        </button>
      )}
    </div>
  );
}
