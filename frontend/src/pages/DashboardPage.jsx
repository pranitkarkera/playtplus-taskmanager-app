import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchTasks } from "../redux/api/taskApi";
import TaskList from "../components/TaskList";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Dashboard() {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadTasks = async () => {
      try {
        await dispatch(fetchTasks());
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };
    loadTasks();
  }, [dispatch]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Fixed Navbar */}
      <Navbar />

      {/* Dashboard Content */}
      <div className="flex-grow pt-29 md:pt-22 p-4">
        <div className="p-4 bg-white rounded shadow-md">
          {/* Responsive Heading Alignment */}
          <h1 className="text-2xl font-bold mb-4 text-center md:text-left px-4">
            Dashboard
          </h1>
          <TaskList />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Dashboard;
