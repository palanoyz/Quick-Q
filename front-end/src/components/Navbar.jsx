import { useState, useContext } from 'react';
import { FiSearch } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { axioslib } from '../lib/axioslib';

const Navbar = () => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { user, setUser, isLogin, setIsLogin } = useContext(UserContext);
  const navigate = useNavigate();

  const toggleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await axioslib.post('/api/user/logout');
      setUser(null);
      setIsLogin(false);
      navigate('/');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  // user dropdown
  const [showUserMenu, setShowUserMenu] = useState(false);
  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  return (
    <nav className="p-4 flex justify-between items-center shadow-xl">
      <div className="flex items-center space-x-2">
        <Link to="/" className="lg:ml-24 text-2xl sm:text-3xl font-bold text-primary mr-4">QuickQ</Link>
        <Link to="/explore" className="">Explore</Link>
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

      </div>
      <div className="flex space-x-4 lg:mr-24">
        {isLogin ? (
          <div className="flex items-center space-x-4 select-none">
            <div>
              <span className="text-sm lg:text-base font-bold text-primary cursor-pointer" onClick={toggleUserMenu}>{user.username}</span>
              {showUserMenu && (
                <div className='absolute cursor-pointer'>
                  <div><Link to="/user-restaurant">Your Restaurant</Link></div>
                  <div><Link to="/user-queue">Your Q</Link></div>
                </div>
              )}
            </div>

            <button
              onClick={handleLogout}
              className="bg-primary transition-all duration-300 transform hover:scale-105 text-white text-sm lg:text-base font-bold whitespace-nowrap rounded-3xl px-4 lg:px-6 h-10"
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <div className="lg:hidden relative">
              <button
                className="ml-2 border-primary border-2 transition-all duration-300 transform hover:scale-105 hover:bg-primary hover:text-white text-primary text-sm lg:text-base font-bold whitespace-nowrap rounded-3xl px-4 lg:px-6 h-10"
                onClick={toggleDropdown}
              >
                {!showDropdown ? 'Account' : 'Close'}
              </button>
              {showDropdown && (
                <div className="absolute top-10 right-0 bg-white border border-gray-300 shadow-lg rounded-lg p-2">
                  <Link to="/login" className="block py-2 px-4 text-sm text-gray-800 hover:bg-gray-100 rounded-md">Login</Link>
                  <Link to="/signup" className="block py-2 px-4 text-sm text-gray-800 hover:bg-gray-100 rounded-md">Sign Up</Link>
                </div>
              )}
            </div>
            <div className="hidden lg:flex space-x-4">
              <Link to="/login">
                <button className="border-primary border-2 transition-all duration-300 transform hover:scale-105 text-primary text-sm lg:text-base font-bold whitespace-nowrap rounded-3xl px-4 lg:px-6 h-10">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="bg-primary transition-all duration-300 transform hover:scale-105 text-white text-sm lg:text-base font-bold whitespace-nowrap rounded-3xl px-4 lg:px-6 h-10">
                  Sign Up
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
