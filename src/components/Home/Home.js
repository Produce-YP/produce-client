import React from 'react'
import Sidebar from './Sidebar'
import Main from './Main'
import Maps from './Maps'
import './home.css'

function Home () {
  return (
    <div className="home">
      <Sidebar />
      <Main />
      <Maps />
    </div>
  )
}

export default Home
