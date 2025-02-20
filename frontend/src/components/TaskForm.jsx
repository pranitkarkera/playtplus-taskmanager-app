// TaskForm.js
import React, { useState, useEffect } from "react";
import { FiLoader } from "react-icons/fi";

const TaskForm = ({ initialData, onSubmit, onCancel }) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [dueDate, setDueDate] = useState(initialData?.dueDate || "");
  const [priority, setPriority] = useState(initialData?.priority || "Medium");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      setDueDate(initialData.dueDate);
      setPriority(initialData.priority);
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    if (!title.trim() || !description.trim()) {
      setError("Title and description are required.");
      return;
    }

    if (new Date(dueDate) < new Date()) {
      setError("Due date cannot be in the past.");
      return;
    }

    setError("");
    setLoading(true);

    const taskData = { title, description, dueDate, priority };
    try {
      await onSubmit(taskData);
    } catch (err) {
      setError(err.message || "An error occurred while saving the task.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="w-full p-2 border rounded"
      >
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <div className="flex flex-col md:flex-row space-x-0 md:space-x-2">
        <button
          type="submit"
          className={`flex-1 flex items-center justify-center ${
            loading ? "bg-blue-500" : "bg-blue-600"
          } text-white p-2 rounded`}
          disabled={loading}
        >
          {loading ? (
            <FiLoader className="animate-spin" />
          ) : initialData ? (
            "Save Changes"
          ) : (
            "Create Task"
          )}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-500 text-white p-2 rounded mt-2 md:mt-0"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;
