"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc"
export default function LoginButton() {
  return (
    <button
      onClick={() => signIn("google")}
      className="flex justify-center items-center p-2 bg-white text-slate-800 rounded"
    >
      <FcGoogle size={24} />
      Se connecter avec Google
    </button>
  );
}
