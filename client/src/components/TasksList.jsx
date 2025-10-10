import React from "react";
import useTaskStore from "../store/taskStore";

const determineBackgroundColor = (date) => {
  const today = new Date();
  // if date is before today, return red
  if (new Date(date) < today) {
    return "bg-red-100";
  } else {
    return "bg-white";
  }
};

const TasksList = () => {
  return (
    <div>
      {useTaskStore((state) => state.tasks).map((task) => (
        <div
          key={task._id}
          className={`p-4 mb-4 ${determineBackgroundColor(task.dueDate)} rounded-lg shadow`}
        >
          <h2 className="text-xl font-semibold text-gray-800">{task.name}</h2>
          <p className="text-gray-600">
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default TasksList;
