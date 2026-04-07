"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { Pencil, Check, X } from "lucide-react";
import axios from "axios";

interface UserData {
  id: string;
  email: string;
  username: string | null;
  createdAt: string;
}

export default function DashboardPage() {
  const { user } = useUser();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [editing, setEditing] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      const getUser = async () => {
        const { data } = await axios.get("/api/get-user");
        setUserData(data.user);
        setNewUsername(data.user.username ?? "");
      };
      getUser();
    }
  }, [user]);

  const handleSave = async () => {
    setLoading(true);
    const { data } = await axios.post("/api/update-username", {
      username: newUsername,
    });
    const updatedUser = data.user
    setUserData((prev) =>
      prev ? { ...prev, username: updatedUser.username } : prev,
    );
    setEditing(false);
    setLoading(false);
  };

  if (!userData) {
    return (
      <main className="min-h-screen bg-[#0a0f1e] flex items-center justify-center">
        <p className="text-white/40 text-sm">Loading...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0f1e] text-white px-6 py-16">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-extrabold text-amber-400 mb-2">
          Dashboard
        </h1>
        <p className="text-white/40 text-sm mb-10">Your account details</p>

        <div className="bg-white/5 border border-white/10 rounded-2xl divide-y divide-white/10">
          {/* Email */}
          <div className="flex items-center justify-between px-6 py-5">
            <span className="text-white/40 text-sm">Email</span>
            <span className="text-white text-sm">{userData.email}</span>
          </div>

          {/* ID */}
          <div className="flex items-center justify-between px-6 py-5">
            <span className="text-white/40 text-sm">User ID</span>
            <span className="text-white/60 text-xs font-mono truncate max-w-50">
              {userData.id}
            </span>
          </div>

          {/* Username */}
          <div className="flex items-center justify-between px-6 py-5">
            <span className="text-white/40 text-sm">Username</span>
            <div className="flex items-center gap-2">
              {editing ? (
                <>
                  <input
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    className="bg-white/10 border border-amber-400/40 text-white text-sm rounded-lg px-3 py-1.5 outline-none focus:border-amber-400 w-36"
                    autoFocus
                  />
                  <button
                    onClick={handleSave}
                    disabled={loading}
                    className="text-amber-400 hover:text-amber-300 transition">
                    <Check size={16} />
                  </button>
                  <button
                    onClick={() => setEditing(false)}
                    className="text-white/40 hover:text-white transition">
                    <X size={16} />
                  </button>
                </>
              ) : (
                <>
                  <span className="text-white text-sm">
                    {userData.username ?? "—"}
                  </span>
                  <button
                    onClick={() => setEditing(true)}
                    className="text-white/30 hover:text-amber-400 transition">
                    <Pencil size={14} />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Date Joined */}
          <div className="flex items-center justify-between px-6 py-5">
            <span className="text-white/40 text-sm">Joined</span>
            <span className="text-white text-sm">
              {new Date(userData.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
