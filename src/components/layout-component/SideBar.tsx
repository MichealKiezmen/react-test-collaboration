import React from 'react';
import {
    Sun,
    Moon
  } from 'lucide-react';
import { Link } from 'react-router-dom';

const lists = [
  {
    name: 'Trending Stories',
    url:"/"
  },
  {
    name: 'User Dashboard',
    url:"/dashboard"
  },
  {
    name:  'Data Marketplace',
    url:""
  },
  {
    name: 'Settings',
    url:""
  },
  {
    name:'AI Chatbot',
    url:"/ai"
  },
  {
    name: 'Projects',
    url:"/projects"
  },





  ]

function SideBar({ darkMode, toggleDarkMode }){
  return (
    <div className={`w-64
    ${darkMode ? 'bg-gray-900' : 'bg-white'}
    ${darkMode ? 'text-gray-300' : 'text-gray-800'}
    h-full p-6 flex flex-col transition-colors duration-300`}>
      <div className="flex items-center mb-10">
        <div className={`${darkMode ? 'text-white' : 'text-gray-800'} text-2xl font-bold mr-2`}>PolicyWeb</div>
        <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>By OpenPolitica</div>
      </div>
      <nav className="flex-grow">
        <ul className="space-y-4">
          {
          lists.map((item) => (
            <li key={item.name}
            className={`hover:${darkMode ? 'text-white' : 'text-gray-900'}
            transition-colors duration-200 cursor-pointer`}
            >
              <Link to={item.url}> {item.name}</Link>
              </li>
          ))}
          <li className="flex items-center text-blue-500 font-semibold">
            <Link to=""> Projects
            <span
            className="ml-2 text-xs bg-blue-500 text-white
             px-1.5 py-0.5 rounded-full">Beta</span></Link>

          </li>
        </ul>
      </nav>
      <div className="mt-auto flex items-center justify-between">
        <span className="text-sm">{darkMode ? 'Dark' : 'Light'} Mode</span>
        <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-gray-700 transition-colors duration-200">
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </div>
  );
}

export default SideBar
