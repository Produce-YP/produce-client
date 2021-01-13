import React from 'react'

import './main.css'

function Card ({ business }) {
  return (
    <div className="content-container">
      <div className="image">Image container</div>
      <div className="content-info">
        <h3>{business.name}</h3>
        <h3>{business.address}</h3>
        <h3>{business.phone}</h3>
        <p>more info about stuff and things related to company blah blah</p>
      </div>
    </div>
  )
}

export default Card
