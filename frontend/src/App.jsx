
import { Routes, Route, Navigate } from 'react-router-dom'
import { PersonalRoute, SummaryRoute, ExperienceRoute, EducationRoute, SkillsRoute, ProjectsRoute } from './components/builder/SectionRoutes';
import './App.css'
import Home from './pages/Home'
import Layout from './pages/Layout'
import Dashboard from './pages/Dashboard';
import Preview from './pages/preview';
import ResumeBuilder from './pages/ResumeBuilder';
import Login from './pages/Login';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='login' element={<Login />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path='app' element={<Layout />} >
            <Route index element={<Dashboard />} />
            <Route path='builder/:resumeId' element={<ResumeBuilder />}>
              <Route index element={<Navigate to="personal" replace />} />
              <Route path='personal' element={<PersonalRoute />} />
              <Route path='summary' element={<SummaryRoute />} />
              <Route path='experience' element={<ExperienceRoute />} />
              <Route path='education' element={<EducationRoute />} />
              <Route path='skills' element={<SkillsRoute />} />
              <Route path='projects' element={<ProjectsRoute />} />
            </Route>
          </Route>
          <Route path='builder/:resumeId' element={<Preview />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
