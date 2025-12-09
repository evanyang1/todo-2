import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import useTaskStore from "../store/taskStore";

const AddTaskForm = () => {
  const [task, setTask] = useState("");
  const [dueDate, setDueDate] = useState("");
  const addTask = useTaskStore((state) => state.addTask);
  let tasks = useTaskStore((state) => state.tasks);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!task || !dueDate) return;
    if (tasks.length >= 5) {
      alert("You can only add up to 5 tasks. Try completing some first.");
      return;
    }
    try {
      await addTask({ name: task, dueDate });
      setTask("");
      setDueDate("");
    } catch (error) {
      alert("Failed to add task");
    }
  };


  return (
    <div>
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white border border-gray-100 shadow-md rounded-xl p-6">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="task"
          >
            Task
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight 
            focus:outline-none focus:shadow-outline resize"
            id="task"
            type="text"
            placeholder="Enter task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="dueDate"
          >
            Due Date
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="dueDate"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none 
            focus:shadow-outline inline-flex items-center duration-300 transition-colors"
          >
            <span className="mr-2">
              <FaPlus />
            </span>
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTaskForm;
