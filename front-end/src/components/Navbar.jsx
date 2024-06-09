import { useState, useContext } from 'react';
import { FiSearch } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { axioslib } from '../lib/axioslib';

const Navbar = () => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
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

  const handleSearchInputChange = async (e) => {
    const keyword = e.target.value;
    setSearchInput(keyword);
    if (keyword.length > 0) {
      try {
        const response = await axioslib.post('/api/user/searchshop', { keyword });
        setSearchResults(response.data);
      } catch (error) {
        console.error('Search failed', error);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleResultClick = (restaurantID) => {
    navigate(`/${restaurantID}`);
    setShowSearchBar(false);
    setSearchResults([]);
    setSearchInput('');
  };

  if (user && (window.location.pathname === '/login' || window.location.pathname === '/signup')) {
    navigate('/');
  }

  return (
    <nav className="p-2 sm:p-4 flex justify-between items-center shadow-xl relative">
      <div className="flex items-center space-x-2 lg:ml-20 gap-2">
        <Link to="/" className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary lg:mr-3">QuickQ</Link>
        <Link to="/explore" className="text-sm lg:text-lg sm:inline">Explore</Link>
        <button
          className="bg-primary-light transition-all duration-300 transform hover:scale-105 text-black text-sm sm:text-base font-bold rounded-3xl px-2 sm:px-4 lg:px-8 h-10 sm:h-12"
          onClick={toggleSearchBar}
        >
          <FiSearch className="mr-1 sm:mr-2" />
        </button>
      </div>
      <div className={`flex items-center justify-center flex-grow transition-all duration-300 ${showSearchBar ? 'opacity-100' : 'opacity-0'} max-w-xs sm:max-w-sm lg:max-w-none relative`}>
        {showSearchBar && (
          <div className="relative w-full">
            <input
              type="text"
              value={searchInput}
              onChange={handleSearchInputChange}
              placeholder="Search"
              className="px-2 py-1 sm:px-4 sm:py-2 rounded-3xl border border-gray-600 focus:outline-none focus:border-primary w-full"
            />
            {searchResults.length > 0 && (
              <div className="absolute top-full left-0 w-full bg-white border border-gray-300 shadow-lg rounded-lg mt-1 z-50">
                {searchResults.map((result) => (
                  <div
                    key={result._id}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center"
                    onClick={() => handleResultClick(result._id)}
                  >
                    <img src={result.rest_logo} className="h-8 w-8 rounded-full object-cover mr-2" alt="Logo" />
                    <div>
                      <div className="font-bold text-base">{result.rest_name}</div>
                      <div className="text-gray-600 text-sm">{result.province}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <div className="flex space-x-2 sm:space-x-4 lg:mr-24">
        {isLogin ? (
          <div className="flex items-center space-x-2 sm:space-x-4 pl-2 sm:pl-3 md:pl-8">
            <span className="text-sm sm:text-base font-bold text-primary">{user.username}</span>
            <button
              onClick={handleLogout}
              className="bg-primary transition-all duration-300 transform hover:scale-105 text-white text-sm sm:text-base font-bold rounded-3xl px-2 sm:px-4 lg:px-6 h-8 sm:h-10"
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <div className="lg:hidden relative">
              <button
                className="ml-2 border-primary border-2 transition-all duration-300 transform hover:scale-105 hover:bg-primary hover:text-white text-primary text-sm sm:text-base font-bold rounded-3xl px-2 sm:px-4 lg:px-6 h-8 sm:h-10"
                onClick={toggleDropdown}
              >
                {!showDropdown ? 'Account' : 'Close'}
              </button>
              {showDropdown && (
                <div className="absolute top-10 right-0 bg-white border border-gray-300 shadow-lg rounded-lg p-2">
                  <Link to="/login" className="block py-1 sm:py-2 px-2 sm:px-4 text-sm text-gray-800 hover:bg-gray-100 rounded-md">Login</Link>
                  <Link to="/signup" className="block py-1 sm:py-2 px-2 sm:px-4 text-sm text-gray-800 hover:bg-gray-100 rounded-md">Sign Up</Link>
                </div>
              )}
            </div>
            <div className="hidden lg:flex space-x-2 sm:space-x-4">
              <Link to="/login">
                <button className="border-primary border-2 transition-all duration-300 transform hover:scale-105 text-primary text-sm sm:text-base font-bold rounded-3xl px-2 sm:px-4 lg:px-6 h-8 sm:h-10">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="bg-primary transition-all duration-300 transform hover:scale-105 text-white text-sm sm:text-base font-bold rounded-3xl px-2 sm:px-4 lg:px-6 h-8 sm:h-10">
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
