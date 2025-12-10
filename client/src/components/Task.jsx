import { useState } from "react";
import useTaskStore from "../store/taskStore";
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";
import EditTaskModal from "./EditTaskModal";

const determineBackgroundColor = (date) => {
  const dayInMs = 86400000;
  const today = new Date();
  // if date is before today, return red
  if (new Date(date) < today) {
    return "bg-red-100";
  } else if (new Date(date) - today <= dayInMs) {
    // if date is today, return yellow
    return "bg-yellow-100";
  } else {
    return "bg-white";
  }
};

const Task = ({ task }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <>
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
        <div className="ml-auto flex items-center space-x-2">
          {/** edit task */}
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-1 rounded
              focus:outline-none focus:shadow-outline duration-300 transition-colors"
          >
            <MdOutlineEdit size={20} />
          </button>
          {/** delete task */}
          <button
            onClick={() => useTaskStore.getState().removeTask(task._id)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-1 rounded
              focus:outline-none focus:shadow-outline duration-300 transition-colors"
          >
            <MdDeleteOutline size={20} />
          </button>
        </div>
      </div>

      <EditTaskModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        task={task}
      />
    </>
  );
};

export default Task;
