import React, { useEffect } from "react";
import axios from "axios";
import useTaskStore from "../store/taskStore";
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";
import Task from "./Task";

const TasksList = () => {
  useEffect(() => {
    // Fetch tasks from the server when the component mounts
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        // fetch user
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/task/`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        useTaskStore.setState({ tasks: response.data.tasks });
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const tasks = useTaskStore((state) => state.tasks);

  // Sort tasks by due date in ascending order
  const sortedTasks = [...tasks].sort(
    (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
  );

  return (
    <div>
      {sortedTasks.map((task) => (
        <Task task={task} key={task._id} />
      ))}
    </div>
  );
};

export default TasksList;
