import React from "react";
import { useAuth } from "./AuthContext";

// PUBLIC_INTERFACE
export default function Dashboard() {
  const { user } = useAuth();
  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded shadow p-8 mt-12 flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-2 text-center" style={{ color: "#2563eb" }}>Welcome to the Dashboard!</h2>
      <p className="mb-4 text-gray-700 text-center">This is a protected area. Only logged-in users can see this page.</p>
      <div className="rounded bg-gray-50 border text-gray-800 text-sm p-4 w-full mb-4">
        <div className="mb-2">
          <span className="font-medium text-gray-600">User ID:</span> <span className="text-xs break-all">{user?.id}</span>
        </div>
        <div>
          <span className="font-medium text-gray-600">Email:</span> <span>{user?.email}</span>
        </div>
      </div>
      <div className="mt-4 text-center text-gray-500 text-sm">
        Dashboard features coming soon!
      </div>
    </div>
  );
}
