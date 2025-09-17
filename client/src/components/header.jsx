import React from "react";

const Header = () => {
  return (
    <header className="p-4 flex justify-end">
      <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
        Log Out
      </button>
    </header>
  );
};

export default Header;
