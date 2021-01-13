import React, { useState, useEffect } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Sidebar from './Sidebar'
import Main from './Main'
import messages from '../AutoDismissAlert/messages'
import './home.css'

const Home = props => {
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
  console.log('this is b in app', businesses[0])
  return (
    <div className="home">
      <Sidebar />
      <Main businesses={businesses} />
    </div>
  )
}

export default Home
