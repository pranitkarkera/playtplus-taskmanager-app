import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateTaskApi, deleteTaskApi } from "../redux/api/taskApi";
import TaskForm from "./TaskForm";
import Modal from "./Modal";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-200 text-red-600";
      case "Medium":
        return "bg-yellow-200 text-yellow-600";
      case "Low":
        return "bg-green-200 text-green-600";
      default:
        return "";
    }
  };

  const handleStatusToggle = async () => {
    const updatedStatus = task.status === "Completed" ? "Pending" : "Completed";
    setIsUpdating(true);
    try {
      await dispatch(
        updateTaskApi(task._id, { ...task, status: updatedStatus })
      );
    } catch (error) {
      console.error("Error updating task status:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleUpdate = async (updatedTaskData) => {
    setIsUpdating(true);
    try {
      await dispatch(updateTaskApi(task._id, updatedTaskData));
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating task:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteTaskApi(task._id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <>
      <tr className="border-b border-gray-200">
        <td className="py-2 px-4">
          <input
            type="checkbox"
            checked={task.status === "Completed"}
            onChange={handleStatusToggle}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
        </td>
        <td className="py-2 px-4">{task.title}</td>
        <td className="py-2 px-4">{task.description}</td>
        <td className="py-2 px-4">
          <span
            className={`px-2 py-1 rounded-lg text-xs ${getPriorityBadge(
              task.priority
            )}`}
          >
            {task.priority}
          </span>
        </td>
        <td className="py-2 px-4">
          {new Date(task.dueDate).toLocaleDateString()}
        </td>
        <td className="py-2 px-4 flex flex-col md:flex-row">
          <button
            className="text-blue-600 mr-2 mb-2 md:mb-0"
            onClick={() => setIsEditing(true)}
          >
            <FaEdit size={20} />
          </button>
          <button className="text-red-600" onClick={handleDelete}>
            <RiDeleteBin5Fill size={20} />
          </button>
        </td>
      </tr>

      {isUpdating && (
        <tr>
          <td colSpan="6" className="text-center py-2">
            Loading...
          </td>
        </tr>
      )}

      <Modal isOpen={isEditing} onClose={() => setIsEditing(false)}>
        <h2 className="text-lg font-bold mb-4">Edit Task</h2>
        <TaskForm
          initialData={task}
          onSubmit={handleUpdate}
          onCancel={() => setIsEditing(false)}
        />
      </Modal>
    </>
  );
};

export default TaskItem;
