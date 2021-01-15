import React from 'react'

import './main.css'

function Card ({ business }) {
  return (
    <div className="content-container">
      <div className="image">Image container</div>
      <div className="content-info">
        <h4>{business.name}</h4>
        <h4>{business.address}</h4>
        <h4>{business.phone}</h4>
        <p>more info about stuff and things related to company blah blah</p>
      </div>
    </div>
  )
}

export default Card
