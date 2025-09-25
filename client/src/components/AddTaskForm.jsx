import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";

const AddTaskForm = () => {
  const [Task, setTask] = useState("");
  const [dueDate, setDueDate] = useState("");
  return (
    <div>
      <form className="w-full max-w-sm bg-white border border-gray-100 shadow-md rounded-xl p-6">
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
            value={Task}
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
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none 
            focus:shadow-outline inline-flex items-center duration-300 transition-colors"
            type="button"
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
