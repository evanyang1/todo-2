import React from "react";
import { createFileRoute, redirect } from "@tanstack/react-router";
import Header from "../components/header";
import useUserStore from "../store/userStore";

import { FaPlus } from "react-icons/fa6";

export const Route = createFileRoute("/home")({
  beforeLoad: () => {
    if (!useUserStore.getState().user) {
      throw redirect({
        to: "/",
      });
    }
  },
  component: RouteComponent,
});

const RouteComponent = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto p-4 flex flex-col items-center space-y-8">
        <h1 className="text-4xl font-semibold text-gray-900">Tasks</h1>
        {/* Task list will go here */}
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center">
          <span className="mr-2">
            <FaPlus />
          </span>
          New Task
        </button>
      </main>
    </div>
  );
};
