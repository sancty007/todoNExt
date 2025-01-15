import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  try {
    switch (method) {
      case "GET": // Récupérer toutes les tâches
        const tasks = await prisma.task.findMany();
        return res.status(200).json(tasks);

      case "POST": // Ajouter une tâche
        const { title, description } = req.body;
        const newTask = await prisma.task.create({
          data: { title, description },
        });
        return res.status(201).json(newTask);

      case "PUT": // Mettre à jour une tâche
        const { id, updatedTitle, updatedDescription } = req.body;
        const updatedTask = await prisma.task.update({
          where: { id: Number(id) },
          data: { title: updatedTitle, description: updatedDescription },
        });
        return res.status(200).json(updatedTask);

      case "DELETE": // Supprimer une tâche
        const { taskId } = req.body;
        await prisma.task.delete({
          where: { id: Number(taskId) },
        });
        return res.status(204).end();

      default:
        res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Une erreur est survenue" });
  }
}
