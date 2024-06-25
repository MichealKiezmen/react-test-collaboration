import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  MessageCircle,
  Wallet,
  User,
  Edit,
  Send,
  Bell,
  ThumbsUp,
  Users,
  FileText,
  Calendar,
  ArrowRight,
} from 'lucide-react';
import SideBar from './layout-component/SideBar';

// ... (keep the generateAIResponse function from the previous version)

const ProjectView = () => {
  const [activeTab, setActiveTab] = useState('Post');
  const [projectData, setProjectData] = useState({
    name: 'Solar Group - Chicago',
    stage: 'Funding',
    needsExternalHelp: 'Yes',
    description: '',
    image: '/path-to-solar-image.jpg',
    author: 'Robert Coopers',
    collaborators: 12,
    documents: 4,
    votes: 89,
    dueDate: '2024-12-31'
  });
  const [isAIGenerating, setIsAIGenerating] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [darkMode, setDarkMode] = useState(true);


  // ... (keep the useEffect, handleInputChange, handleAIGenerate, and
  // handlePublish functions from the previous version)


// Simulated AI response generation
const generateAIResponse = (prompt) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`AI-generated response based on: "${prompt}".
        This is a placeholder for the actual AI integration.`);
    }, 1000);
  });
};


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProjectData(prev => ({ ...prev, [name]: value }));
  };

  const handleAIGenerate = async () => {
    setIsAIGenerating(true);
    const aiResponse = await generateAIResponse(aiPrompt || projectData.name);
    setProjectData((prev: any) => {
      return { ...prev, description: aiResponse }
    });
    setIsAIGenerating(false);
  };

  const handlePublish = () => {
    console.log('Publishing project:', projectData);
    // Implement publish logic here
  };





  useEffect(() => {
    // Simulating initial AI-generated description
    handleAIGenerate();
  }, []);

  return (
    <div
      className={`flex h-screen ${darkMode ? 'bg-gray-900': 'bg-gray-100'}
       text-gray-100 transition-all duration-300`}>
      <SideBar
      darkMode={darkMode}
      toggleDarkMode={() => setDarkMode(!darkMode)}
      />


      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header
          className={`${darkMode
            ? 'bg-gray-800 bg-opacity-40'
            : 'bg-white bg-opacity-70'} backdrop-blur-md p-4 flex justify-between items-center transition-all duration-300`}>
          <div className="flex-1 max-w-2xl relative">
            <input
              type="text"
              placeholder="Ask me a question..."
              className={`w-full ${darkMode
                ? 'bg-gray-700 text-white'
                : 'bg-gray-100 text-gray-800'} rounded-full py-2 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all`} />
            <Send
              className={`absolute right-3 top-2.5 ${darkMode
                ? 'text-gray-400'
                : 'text-gray-500'} cursor-pointer hover:text-blue-400 transition-all`} />
          </div>
          <div className="flex items-center ml-4 space-x-6">
            {
              [Bell, MessageCircle, Wallet, User].map((Icon, index) => (
                <Icon
                  key={index}
                  className={`${darkMode
                    ? 'text-gray-400'
                    : 'text-gray-500'} cursor-pointer hover:text-blue-400 transition-all`}
                  size={20} />
              ))
            }
          </div>
        </header>

        {/* Project Content */}
        <main className="flex-1 p-8 flex space-x-8 overflow-hidden">
        <div className="flex-1 overflow-y-auto pr-4">
            <div className="flex items-center mb-6">
              <ChevronLeft className="mr-2 cursor-pointer hover:text-blue-400 transition-colors" />
              <h2 className="text-2xl font-bold">{projectData.name}</h2>
            </div>
            <div className="flex space-x-4 mb-6">
              {['Post', 'AI Flowchart'].map((tab) => (
                <button
                  key={tab}
                  className={`px-4 py-2 rounded transition-colors
                    ${activeTab === tab ? 'bg-blue-500 text-white'
                       : 'bg-gray-700 hover:bg-gray-600'}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>


            {activeTab === 'Post' && (
              <div className="space-y-6">
                <img src={projectData.image} alt="Project"
                className="w-full h-64 object-cover rounded-lg shadow-lg" />
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-4">
                  <div>
                    <label className="block mb-2 font-semibold">Project Name:</label>
                    <input
                      type="text"
                      name="name"
                      value={projectData.name}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700 rounded p-2
                      focus:ring-2 focus:ring-blue-400 outline-none transition-all"
                    />
                  </div>
                  <div className="flex space-x-4">
                    <div className="flex-1">
                      <label className="block mb-2 font-semibold">Stage:</label>
                      <select
                        name="stage"
                        value={projectData.stage}
                        onChange={handleInputChange}
                        className="w-full bg-gray-700 rounded
                        p-2 focus:ring-2 focus:ring-blue-400 outline-none transition-all"
                      >
                        <option>Funding</option>
                        <option>Planning</option>
                        <option>Execution</option>
                      </select>
                    </div>
                    <div className="flex-1">
                      <label className="block mb-2 font-semibold">External Help:</label>
                      <select
                        name="needsExternalHelp"
                        value={projectData.needsExternalHelp}
                        onChange={handleInputChange}
                        className="w-full bg-gray-700 rounded p-2
                        focus:ring-2 focus:ring-blue-400 outline-none transition-all"
                      >
                        <option>Yes</option>
                        <option>No</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block mb-2 font-semibold">Project Description:</label>
                    <div className="bg-gray-700 p-4 rounded-lg relative">
                      <div className="flex items-center mb-2">
                        <img src="/path-to-bot-icon.png" alt="OpenPolitica Bot"
                        className="w-6 h-6 mr-2" />
                        <span className="font-bold">OpenPolitica Bot</span>
                      </div>
                      <p className="text-sm mb-4">{projectData.description}</p>
                      <div className="flex items-center">
                        <input
                          type="text"
                          placeholder="Customize AI prompt..."
                          value={aiPrompt}
                          onChange={(e) => setAiPrompt(e.target.value)}
                          className="flex-1 bg-gray-600 rounded-l p-2
                          focus:ring-2 focus:ring-blue-400 outline-none transition-all"
                        />
                        <button
                          onClick={handleAIGenerate}
                          disabled={isAIGenerating}
                          className="bg-blue-500 text-white px-4 py-2
                          rounded-r hover:bg-blue-600 transition-colors disabled:bg-blue-300"
                        >
                          {isAIGenerating ? 'Generating...' : 'Generate'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center
                 bg-gray-800 p-4 rounded-lg shadow-lg">
                  <div className="flex space-x-6">
                    <div className="flex items-center">
                      <Users className="mr-2 text-blue-400" />
                      <span>{projectData.collaborators} Collaborators</span>
                    </div>
                    <div className="flex items-center">
                      <FileText className="mr-2 text-green-400" />
                      <span>{projectData.documents} Documents</span>
                    </div>
                    <div className="flex items-center">
                      <ThumbsUp className="mr-2 text-yellow-400" />
                      <span>{projectData.votes} Votes</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="mr-2 text-red-400" />
                      <span>Due: {new Date(projectData.dueDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <button
                    onClick={handlePublish}
                    className="bg-green-500 text-white px-6 py-2
                     rounded-full hover:bg-green-600 transition-colors flex items-center"
                  >
                    Publish <ArrowRight className="ml-2" size={18} />
                  </button>
                </div>
              </div>
            )}


            {activeTab === 'AI Flowchart' && (
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4">AI-Generated Project Flowchart</h3>
                <p className="mb-4">This section will contain an AI
                  -generated flowchart for your project. You can customize
                   and edit the flowchart based on your specific needs.</p>
                <button className="bg-blue-500 text-white
                px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                  Generate Flowchart
                </button>
              </div>
            )}
          </div>



          {/* Related content and user needs */}
          <div className="w-80 space-y-6">
          <div className="w-80">
            <h3 className="text-xl font-bold mb-4">Related</h3>
            <div className="bg-gray-800 p-4 rounded mb-4">
              <h4 className="font-bold mb-2">H.R.25 - FairTax Act of 2023</h4>
              <p className="text-sm mb-2">Introduced on 01/09/2023</p>
              <p className="text-sm">This bill imposes a national sales tax on the use or consumption in the United States of taxable property or services in lieu of the current income taxes, payroll taxes, and estate and gift taxes...</p>
            </div>
            <div className="bg-gray-800 p-4 rounded">
              <h4 className="font-bold mb-2">Solar Government Incentive</h4>
              <p className="text-sm mb-2">Generated: 6/18/2024</p>
              <p className="text-sm">On March 4, 2024, Illinois has agreed to pass a bill that would allow for the incentivizing of solar grid production. Up to $7,500 per acre of land is limited to this jurisdiction.</p>
              <a href="#" className="text-blue-400 text-sm">Click here to read more...</a>
            </div>
            <div className="mt-4">
              <h4 className="font-bold mb-2">User Needs:</h4>
              <p className="text-sm">clean energy, sustainability, local community, crowdmaintenance</p>
            </div>
          </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProjectView;
