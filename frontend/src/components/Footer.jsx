import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 text-black dark:text-white p-4 w-full">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-sm sm:text-base md:text-lg lg:text-xl">
          &copy; 2025 Task Manager. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
