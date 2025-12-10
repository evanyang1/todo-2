import { createFileRoute, redirect } from "@tanstack/react-router";
import Header from "../components/header";
import AddTaskForm from "../components/AddTaskForm";
import useUserStore from "../store/userStore";
import TasksList from "../components/TasksList";
import AI from "../components/AI";

export const Route = createFileRoute("/home")({
  beforeLoad: () => {
    console.log(useUserStore.getState());
    if (!useUserStore.getState().isAuthenticated()) {
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
        <div className="flex flex-row items-center space-x-8 w-full max-w-4xl">
          <AddTaskForm />
          <TasksList />
        </div>
        <AI />
      </main>
    </div>
  );
};
