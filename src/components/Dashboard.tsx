import React, { useState } from 'react';
import { Search, Send, MessageCircle,
  Wallet, User,
  Plus, ChevronLeft, ChevronRight, Bell, Settings, LogOut, Sun, Moon } from 'lucide-react';
import SideBar from './layout-component/SideBar';



const ProjectCard = ({ title, author, stage, description, color, darkMode }) => (
  <div className={`${color} rounded-lg p-6 mb-6 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl ${darkMode ? 'bg-opacity-80' : 'bg-opacity-90'}`}>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-sm opacity-80">By: {author}</p>
    <p className="text-sm font-medium mt-2">Stage: {stage}</p>
    <p className="text-sm mt-3 line-clamp-3">{description}</p>
    <div className="flex mt-4 items-center">
      <MessageCircle size={18} className="mr-1 opacity-70" />
      <span className="text-sm mr-4">20</span>
      <User size={18} className="opacity-70" />
      <span className="text-sm ml-1">4</span>
    </div>
  </div>
);

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [searchFocus, setSearchFocus] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className={`flex h-screen ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'} transition-colors duration-300`}>
      <SideBar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <div className="flex-1 flex flex-col">
        <header className={`${darkMode ? 'bg-gray-900' : 'bg-white'} p-4 flex justify-between items-center shadow-md transition-colors duration-300`}>
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <input
                type="text"
                placeholder="Ask me a question..."
                className={`w-full ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'} rounded-full py-3 px-6 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${searchFocus ? 'shadow-lg' : ''}`}
                onFocus={() => setSearchFocus(true)}
                onBlur={() => setSearchFocus(false)}
              />
              <Search className={`absolute right-10 top-3.5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              <Send className="absolute right-4 top-3.5 text-blue-500" />
            </div>
          </div>
          <div className="flex items-center ml-4">
            <Bell className="mr-6 hover:text-blue-400 cursor-pointer transition-colors duration-200" />
            <MessageCircle className="mr-6 hover:text-blue-400 cursor-pointer transition-colors duration-200" />
            <Wallet className="mr-6 text-green-400 hover:text-green-300 cursor-pointer transition-colors duration-200" />
            <div className="relative group">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center cursor-pointer">
                <User size={20} />
              </div>
              <div className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} ring-1 ring-black ring-opacity-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out`}>
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                  <a href="#" className={`block px-4 py-2 text-sm ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`} role="menuitem">Your Profile</a>
                  <a href="#" className={`block px-4 py-2 text-sm ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`} role="menuitem">Settings</a>
                  <a href="#" className={`block px-4 py-2 text-sm ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`} role="menuitem">Sign out</a>
                </div>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 p-8 flex overflow-hidden">
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">My Projects</h2>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full flex items-center transition-colors duration-200">
                <Plus size={18} className="mr-2" /> Create New
              </button>
            </div>
            <div className="overflow-y-auto pr-4 flex-1 space-y-6">
              {['Solar Panels - Westshire Manor', 'Solar Project - Wendall Elementary', 'Energy Solutions - Project Idea'].map((title, index) => (
                <ProjectCard
                  key={index}
                  title={title}
                  author={['James Westshire', 'Principal Ross', 'Susan Reynolds'][index]}
                  stage={['Building', 'Funding', 'Planning'][index]}
                  description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                  color={`bg-gradient-to-br ${['from-green-500 to-green-600', 'from-pink-400 to-pink-500', 'from-purple-500 to-purple-600'][index]}`}
                  darkMode={darkMode}
                />
              ))}
            </div>
          </div>
          <div className={`transition-all duration-300 ease-in-out ${isSidebarOpen ? 'w-96' : 'w-12'} flex`}>
            <div
              className={`w-12 ${darkMode ? 'bg-gray-700' : 'bg-gray-300'} flex flex-col items-center justify-center cursor-pointer transition-colors duration-300`}
              onClick={toggleSidebar}
            >
              {isSidebarOpen ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
            </div>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isSidebarOpen ? 'w-84' : 'w-0'}`}>
              <div className={`w-84 h-full overflow-y-auto pl-8 pr-4 py-6 ${darkMode ? 'bg-gray-800' : 'bg-gray-200'} transition-colors duration-300`}>
                <h2 className="text-2xl font-bold mb-6">Available Projects</h2>
                {['Solar Grid - New Jersey', 'Solar - Chicago Brighton Park'].map((title, index) => (
                  <ProjectCard
                    key={index}
                    title={title}
                    author={['NewJerseyCommissionServices', 'Bob Miller Enterprises LLC'][index]}
                    stage="Funding"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    color={`bg-gradient-to-br ${['from-yellow-400 to-yellow-500', 'from-indigo-400 to-indigo-500'][index]}`}
                    darkMode={darkMode}
                  />
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
