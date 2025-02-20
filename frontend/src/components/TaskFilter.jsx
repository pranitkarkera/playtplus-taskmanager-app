// TaskFilter.js
import React from "react";

const TaskFilter = ({
  filterBy,
  setFilterBy,
  dueDateFilter,
  setDueDateFilter,
}) => {
  return (
    <div className="flex flex-col md:flex-row w-full md:w-auto space-y-2 md:space-y-0 md:space-x-2">
      <select
        onChange={(e) => setFilterBy(e.target.value)}
        className="p-2 border rounded"
        value={filterBy}
      >
        <option value="all">All Tasks</option>
        <option value="completed">Completed</option>
        <option value="pending">Pending</option>
      </select>
      <select
        onChange={(e) => setDueDateFilter(e.target.value)}
        className="p-2 border rounded"
        value={dueDateFilter}
      >
        <option value="all">All Due Dates</option>
        <option value="today">Due Today</option>
        <option value="thisWeek">Due This Week</option>
      </select>
    </div>
  );
};

export default TaskFilter;
