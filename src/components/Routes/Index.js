import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import messages from '../AutoDismissAlert/messages'
import Card from '../Home/Card'

const Businesses = props => {
  const [businesses, setBusiness] = useState([])

  useEffect(() => {
    const { msgAlert } = props
    axios(`${apiUrl}/businesses/`, {
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
      .then(res => setBusiness(res.data.businesses))
      .then(() => msgAlert({
        heading: 'Gift List',
        message: messages.indexSuccess,
        variant: 'Look at your Wish List You Generous Beast!'
      }))
      .catch(console.error)
      .catch(() => msgAlert({
        heading: 'Gift List',
        message: messages.indexFailure,
        variant: 'Your list didn\'t load try again'
      }))
  }, [])

  return (
    <React.Fragment>
      {businesses.map(business => (
        <div key={business._id}>
          <Link to={`/businesses/${business._id}`}>
            <Card business={business}/>
          </Link>
        </div>
      ))}
    </React.Fragment>
  )
}

export default Businesses
