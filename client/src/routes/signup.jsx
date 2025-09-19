import React, { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import axios from "axios";

export const Route = createFileRoute("/signup")({
  component: RouteComponent,
});

function handleSignup(event) {}

function RouteComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white border border-gray-100 shadow-md rounded-xl p-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Create your account
        </h1>
        <p className="text-sm text-gray-500 mb-6">Sign up to get started</p>

        <form className="space-y-4">
          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="text"
              placeholder="Choose a username"
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900
               placeholder:text-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2
                focus:ring-blue-500/30"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Create a password"
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 
              placeholder:text-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 
              focus:ring-blue-500/30"
            />
          </div>

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 
            py-2.5 text-white font-medium shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 
            focus:ring-blue-600/30 active:bg-blue-800 transition-colors"
          >
            Create account
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/"
            className="font-medium text-blue-600 hover:text-blue-700 underline-offset-4 hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
