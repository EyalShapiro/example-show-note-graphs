// src/Pages/Home.tsx
import React from 'react'
import { Link } from 'react-router-dom'

const Home: React.FC = () => {
  return (
    <div className="">
      <h1>Welcome to the App</h1>
      <div className="navbar navbar-center">
        <Link to="/card">
          <button className="btn btn-outline btn-accent link link-accent m-2">
            Go to Kanban Board
          </button>
        </Link>
        <Link to="/Dashboard">
          <button className="btn btn-outline btn-accent link link-accent m-2">
            Go to Dashboard
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Home
