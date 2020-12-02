import React, { useState } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import apiUrl from '../../apiConfig'
import messages from '../AutoDismissAlert/messages'

const BusinessCreate = props => {
  const [createdBusinessId, setCreatedBusinessId] = useState(null)
  const [business, setBusiness] = useState({ name: '', dob: '', item: '', price: '', location: '' })

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
      data: { wishlist: business },
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
      .then(res => setCreatedBusinessId(res.data.wishlist._id))
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
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <h3> Create Wish List</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
              <Form.Label>Gift Name</Form.Label>
              <Form.Control
                required
                type="text"
                name="name"
                value={name}
                placeholder="Enter Person's Name"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="addres">
              <Form.Label>Birthday</Form.Label>
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
              <Form.Label>Gift Name</Form.Label>
              <Form.Control
                required
                type="text"
                name="phone"
                value={phone}
                placeholder="What do you want to get them?"
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
