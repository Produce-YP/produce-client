import React from 'react'
import { Link } from 'react-router-dom'
import './main.css'
import Card from './Card'

function Main ({ businesses }) {
  console.log('this is b', businesses)
  return (
    <div className="main-feed">
      {businesses.map(business => (
        <div key={business._id}>
          <Link to={`/businesses/${business._id}`}>
            <Card business={business}/>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default Main
