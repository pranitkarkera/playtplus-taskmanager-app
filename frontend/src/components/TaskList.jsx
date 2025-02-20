import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTasks, createTask } from "../redux/api/taskApi";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";
import Modal from "./Modal";
import { ToastContainer } from "react-toastify";
import { handleSuccess, handleError } from "../utils";
import TaskFilter from "./TaskFilter";
import TaskSort from "./TaskSort";

const TaskList = () => {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasks);
  const [sortBy, setSortBy] = useState("dueDate");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterBy, setFilterBy] = useState("all");
  const [dueDateFilter, setDueDateFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 10;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchTasks());
      } catch (error) {
        handleError(error.message || "Error fetching tasks");
      }
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);
    return () => clearTimeout(debounceTimeout);
  }, [searchQuery]);

  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task) => {
        if (filterBy === "completed") return task.status === "Completed";
        if (filterBy === "pending") return task.status === "Pending";
        return true;
      })
      .filter((task) => {
        if (dueDateFilter === "today") {
          const today = new Date();
          return new Date(task.dueDate).toDateString() === today.toDateString();
        }
        if (dueDateFilter === "thisWeek") {
          const today = new Date();
          const startOfWeek = new Date(
            today.setDate(today.getDate() - today.getDay())
          );
          const endOfWeek = new Date(today.setDate(startOfWeek.getDate() + 6));
          return (
            new Date(task.dueDate) >= startOfWeek &&
            new Date(task.dueDate) <= endOfWeek
          );
        }
        return true;
      })
      .filter((task) =>
        task.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
      );
  }, [tasks, filterBy, debouncedSearchQuery, dueDateFilter]);

  const sortedTasks = useMemo(() => {
    return [...filteredTasks].sort((a, b) => {
      if (sortBy === "title") {
        return sortOrder === "asc"
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      }
      if (sortBy === "dueDate") {
        return sortOrder === "asc"
          ? new Date(a.dueDate) - new Date(b.dueDate)
          : new Date(b.dueDate) - new Date(a.dueDate);
      }
      if (sortBy === "priority") {
        const priorityOrder = { High: 1, Medium: 2, Low: 3 };
        return sortOrder === "asc"
          ? priorityOrder[a.priority] - priorityOrder[b.priority]
          : priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      return 0;
    });
  }, [filteredTasks, sortBy, sortOrder]);

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = sortedTasks.slice(indexOfFirstTask, indexOfLastTask);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleCreateTask = async (taskData) => {
    if (isCreating) return;
    setIsCreating(true);
    try {
      console.log("Creating task...");
      await dispatch(createTask(taskData));
      setIsModalOpen(false);
      handleSuccess("Task created successfully!");
    } catch (error) {
      handleError(error.message || "Error creating task");
    } finally {
      setIsCreating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader">Loading tasks...</div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="mt-4 px-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-2 md:space-y-0">
        <div className="flex flex-col md:flex-row w-full md:w-auto space-y-2 md:space-y-0 md:space-x-2">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 border rounded w-full md:w-1/3"
          />
          <TaskSort
            sortBy={sortBy}
            setSortBy={setSortBy}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />
          <TaskFilter
            filterBy={filterBy}
            setFilterBy={setFilterBy}
            dueDateFilter={dueDateFilter}
            setDueDateFilter={setDueDateFilter}
          />
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white p-2 rounded"
        >
          New Task
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left">Title</th>
              <th className="py-2 px-4 text-left">Description</th>
              <th className="py-2 px-4 text-left">Priority</th>
              <th className="py-2 px-4 text-left">Due Date</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentTasks.map((task) => (
              <TaskItem key={task._id} task={task} />
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h2 className="text-lg font-bold mb-4">Create Task</h2>
          <TaskForm
            onSubmit={handleCreateTask}
            onCancel={() => setIsModalOpen(false)}
          />
        </Modal>
      )}
      <div className="flex justify-center mt-4">
        {Array.from({
          length: Math.ceil(sortedTasks.length / tasksPerPage),
        }).map((_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-3 py-1 ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default React.memo(TaskList);
