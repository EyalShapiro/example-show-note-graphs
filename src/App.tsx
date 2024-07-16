/** App.tsx */
import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import './App.css'
// import FormPages from './Pages/FormPages'
import KanbanBoardPages from './Pages/KanbanBoardPages'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import DashboardPage from './Pages/DashboardPage' // Ensure the import is correct
import Home from './Pages/Home' // Correctly import the Home component
import Header from './components/Header'

export default function App() {
  const methods = useForm()

  return (
    <div className="App relative max-h-full w-full">
      <Router>
        <div className="flex h-screen flex-col">
          <Header />
          <div className="flex-grow pt-20">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/card"
                element={
                  <FormProvider {...methods}>
                    <KanbanBoardPages /> {/* <FormPages></FormPages> */}
                  </FormProvider>
                }
              />
              <Route path="/Dashboard" element={<DashboardPage />} />
              <Route
                path="*"
                element={
                  <div>
                    Not found
                    <Link to={'/'}>
                      <b className="text-sky-400">Go to Home</b>
                    </Link>
                  </div>
                }
              />
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  )
}
