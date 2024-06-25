import { BrowserRouter, Routes, Route  } from "react-router-dom";
import AIFlowchart from "./components/AIFlowchart"
import Dashboard from "./components/Dashboard"
import Projects from "./components/Projects"
import ProjectView from "./components/ProjectView"





function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>

      <Route path="/" element={<ProjectView />} />
      <Route path="/ai" element={<AIFlowchart />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/projects" element={<Projects />} />

      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
