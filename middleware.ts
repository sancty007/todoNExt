import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token");

  const isLoginPage = request.nextUrl.pathname === "/login";

  // Si l'utilisateur n'est pas connecté et n'est pas sur la page de connexion
  if (!token && !isLoginPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Si l'utilisateur est connecté et essaie d'accéder à la page de connexion
  if (token && isLoginPage) {
    return NextResponse.redirect(new URL("/tasks", request.url));
  }

  return NextResponse.next();
}

// Configuration des chemins protégés
export const config = {
  matcher: ["/tasks/:path*", "/login"],
};
