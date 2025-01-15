"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useDispatch } from "react-redux";
import { addTask } from "../app/store/store";

type newTasks = {
  id: number;
  title: string;
  description: string;
};
export function NewTaskForm() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Créer une nouvelle tâche avec un ID unique
    const newTask: newTasks = {
      id: Date.now(), // ID unique basé sur le timestamp
      title: formData.title,
      description: formData.description,
    };

    // dispatch les donnees
    dispatch(addTask(newTask));

    // Réinitialiser le formulaire
    setFormData({
      title: "",
      description: "",
    });
  };

  return (
    <Card className="w-full">
      <CardContent className="pt-6 px-6 pb-8">
        <CardTitle className="text-xl font-medium mb-6">
          Nouvelle Tâche
        </CardTitle>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm">
              Titre<span className="text-[#1B4D4B]">*</span>
            </label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              required
              placeholder="titre"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm">
              Description<span className="text-[#1B4D4B]">*</span>
            </label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              required
              placeholder="Description"
              className="min-h-[100px] resize-none"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-[#1B4D4B] hover:bg-[#163e3c] text-white"
          >
            Ajouter
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
