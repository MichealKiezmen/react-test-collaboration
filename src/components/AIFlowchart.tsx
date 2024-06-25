import React, { useState, useEffect } from 'react';
import { ForceGraph2D } from 'react-force-graph';
import { Send, Plus, X, Edit, Trash2, Check } from 'lucide-react';

// Simulated AI response generation
const generateAIResponse = (prompt) => {
  return new Promise(resolve =>
    setTimeout(() => {
      const responses = [
        `Based on your request "${prompt}", I suggest focusing on task dependencies to optimize the project timeline.`,
        `Considering your input "${prompt}", it might be beneficial to allocate more resources to tasks in the 'in progress' state.`,
        `Analyzing "${prompt}", I recommend reviewing the critical path of your project to identify potential bottlenecks.`,
        `In response to "${prompt}", consider implementing agile methodologies to improve project flexibility and responsiveness.`
      ];
      resolve(responses[Math.floor(Math.random() * responses.length)]);
    }, 1000)
  );
};

const TaskNode = ({ task, onStatusChange, onAssigneeChange, onEdit, onDelete, onToggleCompletion }) => (
  <div className="bg-white p-4 rounded-lg shadow-md mb-4">
    <div className="flex justify-between items-center mb-2">
      <h4 className="font-bold">{task.title}</h4>
      <div>
        <button onClick={() => onToggleCompletion(task.id)} className="text-gray-600 mr-2">
          {task.status === 'done' ? <X size={16} /> : <Check size={16} />}
        </button>
        <button onClick={() => onEdit(task)} className="text-blue-500 mr-2">
          <Edit size={16} />
        </button>
        <button onClick={() => onDelete(task.id)} className="text-red-500">
          <Trash2 size={16} />
        </button>
      </div>
    </div>
    <p className="text-sm mb-2">{task.description}</p>
    <div className="flex justify-between items-center">
      <select
        value={task.status}
        onChange={(e) => onStatusChange(task.id, e.target.value)}
        className="p-1 border rounded"
      >
        <option value="backlog">Backlog</option>
        <option value="in_progress">In Progress</option>
        <option value="done">Done</option>
      </select>
      <input
        type="text"
        value={task.assignee}
        onChange={(e) => onAssigneeChange(task.id, e.target.value)}
        placeholder="Assignee"
        className="p-1 border rounded ml-2"
      />
    </div>
    <div className="mt-2 text-sm">
      <span>Due: {task.dueDate || 'Not set'}</span>
    </div>
  </div>
);

const AIFlowchart = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Project Initiation", description: "Kick-off the project", status: "done", assignee: "John", dueDate: "2023-07-01", dependencies: [] },
    { id: 2, title: "Requirements Gathering", description: "Collect and document requirements", status: "in_progress", assignee: "Sarah", dueDate: "2023-07-15", dependencies: [1] },
    { id: 3, title: "Design Phase", description: "Create project design", status: "backlog", assignee: "", dueDate: "2023-08-01", dependencies: [2] }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [aiResponses, setAiResponses] = useState([]);
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [projectMetrics, setProjectMetrics] = useState({ completionRate: 0, tasksOverdue: 0 });
  const [editingTask, setEditingTask] : any = useState(null);

  useEffect(() => {
    updateGraphData();
    updateProjectMetrics();
  }, [tasks]);

  const updateGraphData = () => {
    const nodes = tasks.map(task => ({
      id: task.id,
      name: task.title,
      color: task.status === 'done' ? '#10B981' : task.status === 'in_progress' ? '#3B82F6' : '#6B7280'
    }));
    const links = tasks.flatMap(task =>
      (task.dependencies || []).map(depId => ({
        source: task.id,
        target: depId
      }))
    );
    // setGraphData({ nodes, links });
  };

  const updateProjectMetrics = () => {
    const completedTasks = tasks.filter(task => task.status === 'done').length;
    const completionRate = (completedTasks / tasks.length) * 100;
    const today = new Date();
    const overdueTasks = tasks.filter(task =>
      new Date(task.dueDate) < today && task.status !== 'done'
    ).length;
    setProjectMetrics({ completionRate, tasksOverdue: overdueTasks });
  };

  const handleNewTask = () => {
    const newTask = {
      id: Date.now(),
      title: `New Task ${tasks.length + 1}`,
      description: '',
      status: 'backlog',
      assignee: '',
      dueDate: '',
      dependencies: []
    };
    setTasks([...tasks, newTask]);
  };

  const handleStatusChange = (taskId, newStatus) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  const handleAssigneeChange = (taskId, newAssignee) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, assignee: newAssignee } : task
    ));
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  const handleUpdateTask = (updatedTask) => {
    setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
    setEditingTask(null);
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleToggleCompletion = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, status: task.status === 'done' ? 'in_progress' : 'done' } : task
    ));
  };

  const handleAIChat = async () => {
    const aiResponse = await generateAIResponse(chatInput);
    const result: any = [...aiResponses, { input: chatInput, response: aiResponse }]
    setAiResponses(result);
    setChatInput('');
  };

  return (
    <div className="flex h-full">
      <div className="w-1/3 p-4 overflow-y-auto">
        <h3 className="text-xl font-bold mb-4">Project Tasks</h3>
        <div className="mb-4 bg-gray-100 p-4 rounded-lg">
          <h4 className="font-bold mb-2">Project Metrics</h4>
          <p>Completion Rate: {projectMetrics.completionRate.toFixed(2)}%</p>
          <p>Tasks Overdue: {projectMetrics.tasksOverdue}</p>
        </div>
        <button
          onClick={handleNewTask}
          className="mb-4 bg-blue-500 text-white p-2 rounded flex items-center"
        >
          <Plus size={16} className="mr-2" /> Add New Task
        </button>
        {tasks.map(task => (
          <TaskNode
            key={task.id}
            task={task}
            onStatusChange={handleStatusChange}
            onAssigneeChange={handleAssigneeChange}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            onToggleCompletion={handleToggleCompletion}
          />
        ))}
      </div>
      <div className="w-1/3 p-4 border-l border-r">
        <h3 className="text-xl font-bold mb-4">Project Flowchart</h3>
        <div className="h-96 border rounded">
          <ForceGraph2D
            graphData={graphData}
            nodeLabel="name"
            nodeColor="color"
            linkDirectionalArrowLength={3.5}
            linkDirectionalArrowRelPos={1}
          />
        </div>
      </div>
      <div className="w-1/3 p-4">
        <h3 className="text-xl font-bold mb-4">AI Planning Assistant</h3>
        <div className="mb-4 h-64 overflow-y-auto border rounded p-2">
          {aiResponses.map((item : any, index: number) => (
            <div key={index} className="mb-2">
              <p className="font-bold">You: {item.input}</p>
              <p>AI: {item.response}</p>
            </div>
          ))}
        </div>
        <div className="flex">
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder="Ask AI for planning suggestions..."
            className="flex-grow p-2 border rounded-l"
          />
          <button
            onClick={handleAIChat}
            className="bg-green-500 text-white p-2 rounded-r"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
      {editingTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg w-96">
            <h3 className="text-xl font-bold mb-4">Edit Task</h3>
            <input
              type="text"
              value={editingTask.title}
              onChange={(e) => setEditingTask({...editingTask, title: e.target.value})}
              className="w-full p-2 border rounded mb-2"
              placeholder="Task Title"
            />
            <textarea
              value={editingTask.description}
              onChange={(e) => setEditingTask({...editingTask, description: e.target.value})}
              className="w-full p-2 border rounded mb-2"
              placeholder="Task Description"
            />
            <input
              type="date"
              value={editingTask.dueDate}
              onChange={(e) => setEditingTask({...editingTask, dueDate: e.target.value})}
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="text"
              value={editingTask.dependencies.join(', ')}
              onChange={(e) => setEditingTask({...editingTask, dependencies: e.target.value.split(',').map(d => d.trim())})}
              className="w-full p-2 border rounded mb-4"
              placeholder="Dependencies (comma-separated task IDs)"
            />
            <div className="flex justify-end">
              <button
                onClick={() => handleUpdateTask(editingTask)}
                className="bg-blue-500 text-white p-2 rounded mr-2"
              >
                Save Changes
              </button>
              <button
                onClick={() => setEditingTask(null)}
                className="bg-gray-300 text-gray-800 p-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIFlowchart;
