import React from "react";
import useTaskStore from "../store/taskStore";

const TasksList = () => {
  return (
    <div>
      {useTaskStore((state) => state.tasks).map((task) => (
        <div key={task._id} className="p-4 mb-4 bg-white rounded-lg shadow">
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
