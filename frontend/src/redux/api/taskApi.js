import {
  getTasks,
  addTask,
  updateTask,
  deleteTask,
  setError,
} from "../slices/taskSlice";

const API_URL = import.meta.env.VITE_API_URL;

// fetch task
export const fetchTasks = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  if (!token) {
    dispatch(setError("No token found, please log in."));
    return;
  }

  try {
    const response = await fetch(`${API_URL}/tasks`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch tasks");
    }

    const data = await response.json();
    dispatch(getTasks(data.tasks));
  } catch (error) {
    console.error("Error fetching tasks:", error);
    dispatch(setError(error.message));
  }
};

// Create a new task
export const createTask = (taskData) => async (dispatch) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found, please log in.");
  }

  try {
    const response = await fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(taskData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Failed to create task: ${errorData.message || response.statusText}`
      );
    }

    const data = await response.json();
    dispatch(addTask(data.task));
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

// Update a task
export const updateTaskApi = (taskId, taskData) => async (dispatch) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found, please log in.");
  }

  try {
    const response = await fetch(`${API_URL}/tasks/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(taskData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Failed to update task: ${errorData.message || response.statusText}`
      );
    }

    const data = await response.json();
    dispatch(updateTask(data.task));
  } catch (error) {
    console.error("Error updating task:", error);
  }
};

// Delete a task
export const deleteTaskApi = (taskId) => async (dispatch) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found, please log in.");
  }

  try {
    const response = await fetch(`${API_URL}/tasks/${taskId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Failed to delete task: ${errorData.message || response.statusText}`
      );
    }

    dispatch(deleteTask(taskId));
  } catch (error) {
    console.error("Error deleting task:", error);
  }
};
