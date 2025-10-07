"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth/client";
import Sidebar from "@/components/layout/Sidebar";
export default function AuthButton() {
  return (
    <div className="flex gap-4 justify-center">
      <Sidebar></Sidebar>
      <button
        onClick={() => authClient.signIn.social({ provider: "github" })}
        className="px-4 py-2 bg-black text-white rounded-lg"
      >
        Login con GitHub
      </button>

      <button
        onClick={() => authClient.signOut()}
        className="px-4 py-2 bg-gray-300 text-black rounded-lg"
      >
        Logout
      </button>
    <Button>holiwis</Button>
    </div>
  );
}