import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  try {
    // Supprimer le cookie d'authentification
    (await cookies()).delete("auth_token");

    return NextResponse.json({ message: "Déconnexion réussie" });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la déconnexion", message: error },
      { status: 500 }
    );
  }
}
