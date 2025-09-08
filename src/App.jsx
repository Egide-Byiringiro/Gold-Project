import { Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import ReadyToStart from "./components/ReadyToStart"
import HomePage from "./components/HomePage"
import ScenarioSelector from "./components/ScenarioSelector"
import CareerMatch from "./components/CareerMatch"
import GraduateStories from "./components/GraduateStories"
import EmployerDashboard from "./components/EmployerDashboard"
import ParentGuide from "./components/ParentGuide"
import JobPostings from "./components/JobPostings"
import EmployerStories from "./components/EmployerStories"

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/scenarios/:userType" element={<ScenarioSelector />} />
        <Route path="/career-match/:scenarioId" element={<CareerMatch />} />
        <Route path="/graduates/:careerId" element={<GraduateStories />} />
        <Route path="/ready/:careerId" element={<ReadyToStart />} />
        <Route path="/employers" element={<EmployerDashboard />} />
        <Route path="/employer-stories" element={<EmployerStories />} />
        <Route path="/jobs" element={<JobPostings />} />
        <Route path="/parents" element={<ParentGuide />} />
      </Routes>
    </Layout>
  )
}

export default App
