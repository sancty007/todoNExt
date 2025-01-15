"use client";

import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/app/store/store";
import { Button } from "@/components/ui/button";

export function LogoutButton() {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
      });

      dispatch(logoutUser());
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  return (
    <Button
      onClick={handleLogout}
      variant="ghost"
      className="text-white hover:text-white/80"
    >
      Déconnexion
    </Button>
  );
}
