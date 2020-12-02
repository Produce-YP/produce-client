import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import messages from '../AutoDismissAlert/messages'

const Business = props => {
  const [business, setbusiness] = useState(null)
  const [deleted, setDeleted] = useState(false)

  useEffect(() => {
    const { msgAlert } = props
    axios(`${apiUrl}/businesses/${props.match.params.id}`, {
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
      .then(res => setbusiness(res.data.business))
      .then(() => msgAlert({
        heading: 'Gift List',
        message: messages.businessShowSuccess,
        variant: 'Looking Good!'
      }))
      .catch(console.error)
      .catch(() => msgAlert({
        heading: 'Gift List',
        message: messages.businessShowFailure,
        variant: 'Your list didn\'t load try again'
      }))
  }, [])

  const destroy = () => {
    const { msgAlert } = props
    axios({
      headers: {
        'Authorization': `Token token=${props.user.token}`
      },
      url: `${apiUrl}/businesses/${props.match.params.id}`,
      method: 'DELETE'
    })
      .then(() => setDeleted(true))
      .then(() => msgAlert({
        heading: 'Deleted',
        message: messages.businessDeletedSuccess,
        variant: 'It Is Gone Gone Gone'
      }))
      .catch(console.error)
      .catch(() => msgAlert({
        heading: 'Deleted',
        message: messages.businessDeletedFailure,
        variant: 'It Is Not Gone Gone Gone'
      }))
  }
  if (!business) {
    return <p> Loading...</p>
  }
  if (deleted) {
    return <Redirect to={
      { pathname: '/businesses', state: { msg: 'That\'s a wrap' } }
    } />
  }
  return (
    <React.Fragment>
      <h4>{business.name}</h4>
      <p>Birthday: { business.address }</p>
      <p>Item: {business.phone}</p>
      <button onClick={destroy}>Remove Gift</button>
      <Link to={`/businesses/${props.match.params.id}/edit`}>
        <button>Edit</button>
      </Link>
      <Link to="/businesses">Back to Your Wish List</Link>
    </React.Fragment>
  )
}

export default Business
