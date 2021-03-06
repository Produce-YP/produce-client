import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
// import Layout from '../Layout'
import messages from '../AutoDismissAlert/messages'

const BusinessEdit = props => {
  const [business, setBusiness] = useState({ name: '', address: '', phone: '' })
  const [updated, setUpdated] = useState(false)

  useEffect(() => {
    axios(`${apiUrl}/businesses/${props.match.params.id}`, {
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
      .then(res => {
        setBusiness(res.data.business)
      })
      .catch(console.error)
  }, [])

  const handleChange = event => {
    event.persist()
    setBusiness(prevBusiness => {
      const updatedField = { [event.target.name]: event.target.value }
      const editedBusiness = Object.assign({}, prevBusiness, updatedField)
      return editedBusiness
    })
  }
  const handleSubmit = event => {
    event.preventDefault()
    const { msgAlert } = props
    axios({
      url: `${apiUrl}/businesses/${props.match.params.id}`,
      headers: {
        'Authorization': `Token token=${props.user.token}`
      },
      method: 'PATCH',
      data: { business: business }
    })
      .then(() => setUpdated(true))
      .then(() => msgAlert({
        heading: 'Updated!!',
        message: messages.editSuccess,
        variant: 'Good As New!'
      }))
      .catch(console.error)
      .catch(() => msgAlert({
        heading: 'Still Old',
        message: messages.editFailure,
        variant: 'Try Again'
      }))
  }
  if (updated) {
    return <Redirect to={`/businesses/${props.match.params.id}`} />
  }

  const { name, address, phone } = business

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <h3> Edit Business</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
              <Form.Label>Business Name</Form.Label>
              <Form.Control
                required
                type="text"
                name="name"
                value={name}
                placeholder="Enter Person's Name"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                required
                type="text"
                name="address"
                value={address}
                placeholder="Address"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="phone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                required
                type="text"
                name="phone"
                value={phone}
                placeholder="Phone Number"
                onChange={handleChange}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
            > Submit
            </Button>
          </Form>
        </div>
      </div>
    </React.Fragment>
  )
}

export default BusinessEdit
