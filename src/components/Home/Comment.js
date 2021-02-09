import React, { useState } from 'react'
import axios from 'axios'

function Comment ({ user, business }) {
  const [comment, setComment] = useState('')
  const handleChange = (e) => {
    setComment(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefualt()

    const variables = {
      content: comment,
      user: user._id,
      business: business._id
    }

    axios.post('api/comment/saveComment', variables)
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <textarea
          style={{ width: '300px', borderRadius: '5px' }}
          placeholder='write some comments'
          onChange={handleChange}
          value={comment}
        />
        <br />
        <button>Submit</button>
      </form>
    </div>
  )
}

export default Comment
