import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import styles from '../../styles/ContactConfirmation.module.css'
import btnStyles from '../../styles/Button.module.css'
import appStyles from '../../App.module.css'
import { useRedirect } from '../../hooks/useRedirect'

import {
  Form,
  Button,
  Col,
  Row,
  Container,
  Alert
} from 'react-bootstrap'
import { axiosReq } from '../../api/axiosDefaults'

const ContactForm = () => {
  useRedirect('loggedOut')
  const [contactData, setContactData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    content: ''
  })

  const { firstname, lastname, email, content } = contactData
  const [errors, setErrors] = useState({})
  const history = useHistory()

  const handleChange = (event) => {
    setContactData({
      ...contactData,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await axiosReq.post('/contact/', contactData)
      history.push('/confirmation')
    } catch (err) {
      setErrors(err.response?.data)
    }
  }

  return (
    <Row className={styles.Row}>

      <Col>
        <Container className={`${appStyles.Content} p-4 `}>
          <h1 className={styles.Header}>Contact Us</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>First name</Form.Label>
              <Form.Control
                type="text"
                name="firstname"
                value={firstname}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.firstname?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <Form.Group>
              <Form.Label>Last name</Form.Label>
              <Form.Control
                type="text"
                name="lastname"
                value={lastname}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.lastname?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                name="email"
                value={email}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.email?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <Form.Group>
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="content"
                value={content}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.content?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <Button
            className={btnStyles.Button}
            type="submit"
            >
              Submit
            </Button>
            {errors.non_field_errors?.map((message, idx) => (
              <Alert key={idx} variant="warning" className="mt-3">
                {message}
              </Alert>
            ))}
            </Form>
        </Container>
      </Col>
    </Row>
  )
}

export default ContactForm
