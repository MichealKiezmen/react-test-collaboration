import React, { useState, useEffect, useCallback } from 'react';
import { Search, MessageCircle, Wallet, User, Plus,
  ChevronLeft, ChevronRight, Bell, Sun, Moon,
  TrendingUp, Users, FileText, BarChart, Edit, Trash2,
  ThumbsUp, MoreVertical, Calendar, Flag, GitCommit, ArrowUpRight } from 'lucide-react';

// Simulated data fetch function (expanded)
const fetchProjects = () => new Promise(resolve =>
  setTimeout(() => resolve([
    {
      id: 1,
      title: "Solar Panels - Westshire Manor",
      author: "James Westshire",
      stage: "Building",
      progress: 65,
      collaborators: 12,
      documents: 4,
      votes: 89,
      comments: 23,
      dueDate: "2024-08-15",
      milestones: [
        { id: 1, title: "Feasibility Study", completed: true },
        { id: 2, title: "Funding Secured", completed: true },
        { id: 3, title: "Installation Begins", completed: false },
      ],
      impactMetrics: {
        environmentalImpact: 85,
        economicImpact: 70,
        socialImpact: 60
      }
    },
    // ... (other projects with similar structure)
  ]), 1000)
);

// ... (Sidebar component remains the same)

const ProjectCard = ({ project, darkMode, onEdit, onDelete, onVote }) => {
  const { id, title, author, stage, progress, collaborators,
     documents, votes, comments, dueDate, milestones, impactMetrics } = project;
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className={`${darkMode ? 'bg-gray-700' : 'bg-white'}
     rounded-lg p-6 mb-6 shadow-lg transition-all duration-300 hover:shadow-xl relative`}>
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="relative">
          <button onClick={() => setShowDropdown(!showDropdown)} className="focus:outline-none">
            <MoreVertical size={20} />
          </button>
          {showDropdown && (
            <div className={`absolute right-0 mt-2 w-48 rounded-md
            shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}
            ring-1 ring-black ring-opacity-5`}>
              <div className="py-1" role="menu" aria-orientation="vertical"
               aria-labelledby="options-menu">
                <button onClick={() => onEdit(project)}
                 className="block px-4 py-2 text-sm text-gray-
                 700 hover:bg-gray-100 hover:text-gray-900 w-full text-left">
                  Edit
                </button>
                <button onClick={() => onDelete(id)} className="block px-4 py-2
                text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-
                900 w-full text-left">
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <p className="text-sm opacity-80">By: {author}</p>
      <p className="text-sm font-medium mt-2">Stage: {stage}</p>
      <div className="mt-4 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center" title={`${collaborators} Collaborators`}>
          <Users size={18} className="mr-2" />
          <span className="text-sm">{collaborators}</span>
        </div>
        <div className="flex items-center" title={`${documents} Documents`}>
          <FileText size={18} className="mr-2" />
          <span className="text-sm">{documents}</span>
        </div>
        <div className="flex items-center" title={`${comments} Comments`}>
          <MessageCircle size={18} className="mr-2" />
          <span className="text-sm">{comments}</span>
        </div>
        <div className="flex items-center cursor-pointer"
         title={`${votes} Votes`} onClick={() => onVote(id)}>
          <ThumbsUp size={18} className="mr-2" />
          <span className="text-sm">{votes}</span>
        </div>
      </div>
      <div className="mt-4">
        <div className="flex items-center text-sm">
          <Calendar size={16} className="mr-2" />
          <span>Due: {new Date(dueDate).toLocaleDateString()}</span>
        </div>
      </div>
      <div className="mt-4">
        <h4 className="text-sm font-semibold mb-2">Milestones:</h4>
        {milestones.map((milestone) => (
          <div key={milestone.id} className="flex items-center text-sm mb-1">
            <GitCommit size={16} className={`mr-2
              ${milestone.completed ? 'text-green-500' : 'text-gray-400'}`} />
            <span className={milestone.completed ? 'line-through' : ''}>{milestone.title}</span>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <h4 className="text-sm font-semibold mb-2">Impact Assessment:</h4>
        <div className="flex justify-between">
          <div className="text-sm">
            <span className="mr-2">🌿</span>
            <span>{impactMetrics.environmentalImpact}%</span>
          </div>
          <div className="text-sm">
            <span className="mr-2">💼</span>
            <span>{impactMetrics.economicImpact}%</span>
          </div>
          <div className="text-sm">
            <span className="mr-2">👥</span>
            <span>{impactMetrics.socialImpact}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const PolicyTrendCard = ({ trend, darkMode }) => (
  <div className={`${darkMode ? 'bg-gray-700' : 'bg-white'} p-4 rounded-lg shadow-md mb-4`}>
    <div className="flex justify-between items-center">
      <h3 className="text-lg font-semibold">{trend.title}</h3>
      <ArrowUpRight size={20} className="text-green-500" />
    </div>
    <p className="text-sm mt-2">{trend.description}</p>
    <div className="mt-4 flex justify-between items-center text-sm">
      <span>{trend.category}</span>
      <span className="text-blue-500 cursor-pointer">Learn more</span>
    </div>
  </div>
);

const Projects = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('projects');
  const [searchQuery, setSearchQuery] = useState('');
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const loadProjects = useCallback(async () => {
    setIsLoading(true);
    try {
      const data : any = await fetchProjects();
      setProjects(data);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const handleEditProject = (project) => {
    setCurrentProject(project);
    setIsModalOpen(true);
  };

  const handleDeleteProject = (projectId) => {
    setProjects(projects.filter((p : any) => p.id !== projectId));
  };

  const handleVoteProject = (projectId : any) => {

    const data : any = projects.map((p : any) => p.id === projectId ? {...p, votes: p.votes + 1} : p)
    setProjects(data);
  };

  const handleSaveProject = (updatedProject) => {
    const data : any = projects.map((p : any) => p.id === updatedProject.id ? updatedProject : p)
    setProjects(data);
    setIsModalOpen(false);
  };

  const filteredProjects = projects.filter((project : any) =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const policyTrends = [
    { id: 1, title: "Renewable Energy Surge", description: "Increased adoption of solar and wind power globally", category: "Environment" },
    { id: 2, title: "AI in Governance", description: "Growing use of AI in public policy decision-making", category: "Technology" },
    { id: 3, title: "Universal Basic Income Pilots", description: "More countries experimenting with UBI programs", category: "Economy" },
  ];

  return (
    <div className={`flex h-screen ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'} transition-colors duration-300`}>
      {/* <Sidebar darkMode={darkMode} toggleDarkMode={toggleDarkMode} /> */}
      <div className="flex-1 flex flex-col">
        {/* Header remains the same */}
        <main className="flex-1 p-8 flex overflow-hidden">
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Policy Project Hub</h2>
              <div className="flex space-x-4">
                <button
                  className={`px-4 py-2 rounded-full ${activeTab === 'projects' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'}`}
                  onClick={() => setActiveTab('projects')}
                >
                  My Projects
                </button>
                <button
                  className={`px-4 py-2 rounded-full ${activeTab === 'analytics' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'}`}
                  onClick={() => setActiveTab('analytics')}
                >
                  Analytics
                </button>
                <button
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full flex items-center transition-colors duration-200"
                  onClick={() => {
                    setCurrentProject(null);
                    setIsModalOpen(true);
                  }}
                >
                  <Plus size={18} className="mr-2" /> New Project
                </button>
              </div>
            </div>
            {isLoading ? (
              <div className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
              </div>
            ) : activeTab === 'projects' ? (
              <div className="overflow-y-auto pr-4 flex-1 space-y-6">
                {filteredProjects.map((project : any) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    darkMode={darkMode}
                    onEdit={handleEditProject}
                    onDelete={handleDeleteProject}
                    onVote={handleVoteProject}
                  />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Add more detailed analytics components here */}
              </div>
            )}
          </div>
          <div className={`transition-all duration-300 ease-in-out ${isSidebarOpen ? 'w-96' : 'w-12'} flex`}>
            <div
              className={`w-12 ${darkMode ? 'bg-gray-700' : 'bg-gray-300'} flex flex-col items-center justify-center cursor-pointer transition-colors duration-300`}
              onClick={toggleSidebar}
            >
              {isSidebarOpen ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
            </div>
            {isSidebarOpen && (
              <div className={`w-84 h-full overflow-y-auto pl-8 pr-4 py-6 ${darkMode ? 'bg-gray-800' : 'bg-gray-200'} transition-colors duration-300`}>
                <h2 className="text-2xl font-bold mb-6">Policy Trends</h2>
                {policyTrends.map(trend => (
                  <PolicyTrendCard key={trend.id} trend={trend} darkMode={darkMode} />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
      {/* Modal for editing/creating projects (implementation details omitted for brevity) */}
    </div>
  );
};

export default Projects;
