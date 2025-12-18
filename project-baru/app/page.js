"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleAuth = async (action) => {
    const res = await fetch(`/api/auth/${action}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    setMessage(data.message);

    if (action === "login" && data.success) {
      router.push("/dashboard");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Card className="rounded-2xl shadow-2xl">
          <CardContent className="p-8">
            <h1 className="text-3xl font-bold text-center mb-2">
              Sistem Login
            </h1>
            <p className="text-center text-gray-500 mb-6">
              Microservices Authentication
            </p>

            <div className="space-y-4">
              <Input
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                variant="outline"
                className="w-1/2"
                onClick={() => handleAuth("register")}
              >
                Register
              </Button>
              <Button
                className="w-1/2"
                onClick={() => handleAuth("login")}
              >
                Login
              </Button>
            </div>

            {message && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-6 text-center text-sm text-blue-600"
              >
                {message}
              </motion.p>
            )}
          </CardContent>
        </Card>

        <p className="text-center text-white/70 text-sm mt-6">
          © 2025 • Ardian Auth Service
        </p>
      </motion.div>
    </main>
  );
}
