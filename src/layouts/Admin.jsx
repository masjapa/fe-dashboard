import React, { useState, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IoClose, IoMenu, IoGrid } from "react-icons/io5";
import { RiHome5Fill } from "react-icons/ri";
import { IoIosSearch } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import { searchByName } from '../store/dataSlice';

const Sidebar = ({ isActive, setSidebarOpen }) => (
  <aside className="relative flex-1 flex flex-col max-w-xs bg-white w-full">
    <div className="absolute top-0 right-0 -mr-12 pt-2">
      <button
        className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:bg-gray-600"
        onClick={() => setSidebarOpen(false)}
      >
        <IoClose className="h-6 w-6 text-gray-500" />
      </button>
    </div>
    <div className="p-6 text-xl text-center font-semibold border-b">
      Admin Panel
    </div>
    <nav className="flex-1 text-left text-gray-500 text-sm">
      <ul>
        <li className={`p-4 ${isActive('/')}`}>
          <Link to="/" className='flex gap-2' onClick={() => setSidebarOpen(false)}>
            <IoGrid className="h-4 w-4" />Data Tables
          </Link>
        </li>
        <li className={`p-4 ${isActive('/another-page')}`}>
          <Link to="/another-page" className='flex gap-2' onClick={() => setSidebarOpen(false)}>
            <RiHome5Fill className='h-4 w-4' />Another Page
          </Link>
        </li>
      </ul>
    </nav>
  </aside>
);

const ProfileDropdown = ({ isProfileOpen, toggleProfileDropdown }) => (
  <div className="relative">
    <button
      onClick={toggleProfileDropdown}
      className="flex items-center space-x-2 focus:outline-none"
    >
      <div className="bg-indigo-950 p-3 flex-shrink-0 rounded-full text-xs text-white">AP</div>
    </button>

    {isProfileOpen && (
      <div className="absolute right-0 mt-4 w-48 bg-white backdrop-blur-lg rounded-[20px] text-sm shadow-lg">
        <div className='p-4 border-b'>
          <p>Hey, Ariq</p>
        </div>
        <ul className='py-2'>
          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Profile Settings</li>
          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Newsletter Settings</li>
          <li className="px-4 py-2 text-red-400 hover:bg-gray-100 cursor-pointer">Logout</li>
        </ul>
      </div>
    )}
  </div>
);

const AdminLayout = ({ children }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleProfileDropdown = useCallback(() => {
    setIsProfileOpen((prev) => !prev);
  }, []);

  const handleSearch = useCallback((e) => {
    const value = e.target.value;
    setSearchTerm(value);
    dispatch(searchByName(value));
  }, [dispatch]);

  const isActive = useCallback((path) => {
    return location.pathname === path ? 'border-r-4 border-[#0000FF] text-[#0000FF]' : 'text-gray-500';
  }, [location.pathname]);

  return (
    <div className="flex h-screen">
      <div className={`fixed inset-0 z-40 flex md:hidden ${sidebarOpen ? '' : 'hidden'}`}>
        <div className="fixed inset-0 bg-white bg-opacity-75" onClick={() => setSidebarOpen(false)}></div>
        <Sidebar isActive={isActive} setSidebarOpen={setSidebarOpen} />
      </div>
      
      <aside className="hidden md:flex md:w-64 flex-col">
        <div className="p-6 text-xl text-center font-semibold border-b">
          Admin Panel
        </div>
        <nav className="flex-1 text-left text-gray-500 text-sm">
          <ul>
            <li className={`p-4 ${isActive('/')}`}>
              <Link to="/" className='flex gap-2'>
                <IoGrid className="h-4 w-4" />Data Tables
              </Link>
            </li>
            <li className={`p-4 ${isActive('/another-page')}`}>
              <Link to="/another-page" className='flex gap-2'>
                <RiHome5Fill className='h-4 w-4' />Another Page
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="w-full flex justify-between items-center p-4 text-gray-500 md:hidden">
          <button
            className="flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:bg-gray-600"
            onClick={() => setSidebarOpen(true)}
          >
            <IoMenu className="h-6 w-6" />
          </button>
          <div className="text-xl font-semibold">Admin Panel</div>
        </header>
        <main className="flex-1 bg-[#F5F7FD] p-8 overflow-auto">
          {
            location.pathname === '/another-page' ? (
              <></>
            ) : (
              <nav className="bg-gray-100 bg-opacity-10 backdrop-filter backdrop-blur-sm w-8/12 lg:w-9/12 fixed z-10">
                <div className="px-4">
                  <div className="flex justify-between items-center py-4">
                    <div>
                      <p className='text-sm'>Pages / Data Tables</p>
                      <h1 className="hidden lg:block text-[30px] font-bold text-gray-800">Data Tables</h1>
                    </div>
    
                    <div className='flex gap-2 bg-white rounded-full p-2 justify-between'>
                      <div className="relative flex items-center">
                        <input
                          type="text"
                          placeholder="Search..."
                          value={searchTerm}
                          onChange={handleSearch}
                          className="bg-[#F5F7FD] backdrop-blur-lg rounded-full py-2 pl-10 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                        />
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <IoIosSearch className="text-gray-600" />
                        </div>
                      </div>
                      <ProfileDropdown 
                        isProfileOpen={isProfileOpen} 
                        toggleProfileDropdown={toggleProfileDropdown} 
                      />
                    </div>
                  </div>
                </div>
              </nav>
            )
          }
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
