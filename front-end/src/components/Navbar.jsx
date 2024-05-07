import { useState } from 'react';
import { FiSearch, FiX } from 'react-icons/fi'; // Assuming you have the react-icons package installed
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <nav className="p-4 flex justify-between items-center shadow-xl">
      <div className="flex items-center space-x-2">
        <Link to="/" className="lg:ml-24 text-2xl sm:text-3xl font-bold text-primary mr-4">QuickQ</Link>
        <Link to="/Explore" className="">Explore</Link> {/* Hidden on mobile */}
        <button
          className="bg-primary-light transition-all duration-300 transform hover:scale-105 text-black ml-4 text-sm lg:text-base font-bold whitespace-nowrap rounded-3xl px-4 lg:px-8 h-12"
          onClick={toggleSearchBar}
        >
          <FiSearch className="mr-2" />
        </button>
      </div>
      <div className={`flex items-center justify-center flex-grow transition-all duration-300 ${showSearchBar ? 'opacity-100' : 'opacity-0'} max-w-sm lg:max-w-none`}>
        <input
          type="text"
          placeholder="Search"
          className={`px-4 py-2 rounded-3xl border border-gray-600 focus:outline-none focus:border-primary w-full ${showSearchBar ? 'visible' : 'invisible'}`}
        />
        <FiX
          className={`ml-2 cursor-pointer text-gray-500 hover:text-gray-700 ${showSearchBar ? 'block' : 'hidden'}`}
          onClick={toggleSearchBar}
        />
      </div>
      <div className="flex space-x-4 lg:mr-24">
        {/* Show Mobile */}
        <div className="lg:hidden relative">
          <button
            className=" ml-2 border-primary border-2 transition-all duration-300 transform hover:scale-105 text-primary text-sm lg:text-base font-bold whitespace-nowrap rounded-3xl px-4 lg:px-6 h-10"
            onClick={toggleDropdown}
          >
            {!showDropdown ? 'Account' : 'Close'}
          </button>
          {showDropdown && (
            <div className="absolute top-10 right-0 bg-white border border-gray-300 shadow-lg rounded-lg p-2">
              <a className="block py-2 px-4 text-sm text-gray-800 hover:bg-gray-100 rounded-md">Login</a>
              <a className="block py-2 px-4 text-sm text-gray-800 hover:bg-gray-100 rounded-md">Sign Up</a>
            </div>
          )}
        </div>
        {/* Show Desktop */}
        <div className="hidden lg:flex space-x-4">
          <button className="border-primary border-2 transition-all duration-300 transform hover:scale-105 text-primary text-sm lg:text-base font-bold whitespace-nowrap rounded-3xl px-4 lg:px-6 h-10">
            Login
          </button>
          <button className="bg-primary transition-all duration-300 transform hover:scale-105 text-white text-sm lg:text-base font-bold whitespace-nowrap rounded-3xl px-4 lg:px-6 h-10">
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
