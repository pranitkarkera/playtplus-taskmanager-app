import React from "react";

const TaskSort = ({ sortBy, setSortBy, sortOrder, setSortOrder }) => {
  return (
    <div className="flex flex-col md:flex-row w-full md:w-auto space-y-2 md:space-y-0 md:space-x-2">
      <select
        onChange={(e) => setSortBy(e.target.value)}
        className="p-2 border rounded"
        value={sortBy}
      >
        <option value="title">Sort by Title</option>
        <option value="dueDate">Sort by Due Date</option>
        <option value="priority">Sort by Priority</option>
      </select>
      <select
        onChange={(e) => setSortOrder(e.target.value)}
        className="p-2 border rounded"
        value={sortOrder}
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  );
};

export default TaskSort;
