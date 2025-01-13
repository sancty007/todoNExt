"use server";

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Vérifier si l'utilisateur existe
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        tasks: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Email ou mot de passe incorrect" },
        { status: 401 }
      );
    }

    // Vérifier le mot de passe (simple comparaison pour l'exemple)
    if (user.passwords !== password) {
      return NextResponse.json(
        { error: "Email ou mot de passe incorrect" },
        { status: 401 }
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwords, ...userWithoutPassword } = user;

    return NextResponse.json({
      user: userWithoutPassword,
      token: `token_${Date.now()}`,
    });
  } catch (error) {
    console.error("Erreur de connexion:", error);
    return NextResponse.json(
      { error: "Erreur lors de la connexion" },
      { status: 500 }
    );
  }
}
