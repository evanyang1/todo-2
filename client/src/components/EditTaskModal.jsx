import { useState, useEffect } from "react";
import useTaskStore from "../store/taskStore";

const EditTaskModal = ({ isOpen, onClose, task }) => {
  const [name, setName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const updateTask = useTaskStore((state) => state.updateTask);

  useEffect(() => {
    if (task) {
      setName(task.name);
      // Format date for input field (YYYY-MM-DD)
      const date = new Date(task.dueDate);
      const formattedDate = date.toISOString().split("T")[0];
      setDueDate(formattedDate);
    }
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !dueDate) return;

    setIsLoading(true);
    try {
      await updateTask(task._id, {
        name: name.trim(),
        dueDate: new Date(dueDate).toISOString(),
      });
      onClose();
    } catch (error) {
      console.error("Failed to update task:", error);
      alert("Failed to update task. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <h2 className="text-xl font-semibold mb-4">Edit Task</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Task Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter task name"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="dueDate"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Due Date
            </label>
            <input
              type="date"
              id="dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors disabled:opacity-50"
              disabled={isLoading || !name.trim() || !dueDate}
            >
              {isLoading ? "Updating..." : "Update Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskModal;
