import React, { useState } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import apiUrl from '../../apiConfig'
import messages from '../AutoDismissAlert/messages'

const BusinessCreate = props => {
  const [createdBusinessId, setCreatedBusinessId] = useState(null)
  const [business, setBusiness] = useState({ name: '', address: '', phone: '' })

  const handleChange = event => {
    event.persist()
    setBusiness(prevBusiness => {
      const updateFiled = { [event.target.name]: event.target.value }
      const editBusiness = Object.assign({}, prevBusiness, updateFiled)
      return editBusiness
    })
  }

  const handleSubmit = event => {
    event.preventDefault()
    const { msgAlert } = props
    axios({
      url: `${apiUrl}/businesses`,
      method: 'POST',
      data: { business: business },
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
      .then(res => setCreatedBusinessId(res.data.business._id))
      .then(() => msgAlert({
        heading: 'Looking 100',
        message: messages.businessCreateSuccess,
        variant: 'Looking Good!'
      }))
      .catch(console.error)
      .catch(() => msgAlert({
        heading: 'Sorry 5000 Try Again',
        message: messages.businessCreateFailure,
        variant: ':\'('
      }))
  }
  if (createdBusinessId) {
    return <Redirect to={`/businesses/${createdBusinessId}`} />
  }

  const { name, address, phone } = business

  return (
    <React.Fragment>
      <div className="row">
        <div className="">
          <h3> Add Business </h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
              <Form.Label>Business Name</Form.Label>
              <Form.Control
                required
                type="text"
                name="name"
                value={name}
                placeholder="Business Name"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="addres">
              <Form.Label>Business Address</Form.Label>
              <Form.Control
                required
                type="text"
                name="address"
                value={address}
                placeholder="Address"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="Phone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                required
                type="text"
                name="phone"
                value={phone}
                placeholder="Business Number"
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

export default BusinessCreate
