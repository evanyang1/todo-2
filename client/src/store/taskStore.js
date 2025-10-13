import { create } from "zustand";
import useUserStore from "./userStore";
import axios from "axios";

const useTaskStore = create((set, get) => ({
  tasks: useUserStore.getState().user?.tasks || [],

  addTask: async (taskData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/task/`,
        taskData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      set((state) => ({ tasks: [...state.tasks, response.data.task] }));
      return response.data.task;
    } catch (error) {
      console.error("Failed to add task:", error);
      throw error;
    }
  },

  updateTask: async (id, taskData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/task/${id}`,
        taskData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      set((state) => ({
        tasks: state.tasks.map((task) =>
          task._id === id ? response.data.task : task
        ),
      }));
      return response.data.task;
    } catch (error) {
      console.error("Failed to update task:", error);
      throw error;
    }
  },

  removeTask: async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/task/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      set((state) => ({
        tasks: state.tasks.filter((task) => task._id !== id),
      }));
    } catch (error) {
      console.error("Failed to remove task:", error);
      throw error;
    }
  },
}));

export default useTaskStore;
