import React from "react";
import useTaskStore from "../store/taskStore";
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";

const determineBackgroundColor = (date) => {
  const today = new Date();
  // if date is before today, return red
  if (new Date(date) < today) {
    return "bg-red-100";
  } else {
    return "bg-white";
  }
};

const Task = ({ task }) => {
  return (
    <div
      key={task._id}
      className={`p-4 mb-4 ${determineBackgroundColor(task.dueDate)} rounded-lg shadow
          flex flex-row`}
    >
      <div className="flex flex-col mr-10">
        <h2 className="text-xl font-semibold text-gray-800">{task.name}</h2>
        <p className="text-gray-600">
          Due: {new Date(task.dueDate).toLocaleDateString()}
        </p>
      </div>
      <div className="ml-auto">
        {/** delete task */}
        <button
          onClick={() => useTaskStore.getState().removeTask(task._id)}
          className="ml-auto bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-1 rounded
            focus:outline-none focus:shadow-outline duration-300 transition-colors"
        >
          <MdDeleteOutline size={20} />
        </button>
        <button className="ml-4">
          <MdOutlineEdit size={20} />
        </button>
      </div>
    </div>
  );
};

export default Task;
