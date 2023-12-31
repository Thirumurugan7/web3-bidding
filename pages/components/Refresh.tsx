import React from "react";

const RefreshButton = () => {
  const handleRefreshClick = () => {
    window.location.reload();
  };

  return (
    <div
      className="fixed bottom-6 right-6 flex cursor-pointer items-center justify-center rounded-full bg-blue-500 p-4 text-white shadow-lg transition hover:bg-blue-600"
      onClick={handleRefreshClick}
    >
      <button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M13.5 2c-5.621 0-10.211 4.443-10.475 10h-3.025l5 6.625 5-6.625h-2.975c.257-3.351 3.06-6 6.475-6 3.584 0 6.5 2.916 6.5 6.5s-2.916 6.5-6.5 6.5c-1.863 0-3.542-.793-4.728-2.053l-2.427 3.216c1.877 1.754 4.389 2.837 7.155 2.837 5.79 0 10.5-4.71 10.5-10.5s-4.71-10.5-10.5-10.5z" />
        </svg>
      </button>
    </div>
  );
};

export default RefreshButton;
