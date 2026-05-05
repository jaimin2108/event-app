import React, { useState } from 'react'
import axios from 'axios'
import './Contact.css'

function Contact() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await axios.post("http://localhost:5000/api/contact", formData)
      alert("Message Sent Successfully")

      setFormData({
        name: "",
        email: "",
        phone: "",
        message: ""
      })
    } catch (error) {
      console.log(error)
      alert("Error sending message")
    }
  }

  return (
    <div className='contact'>
      
      <div className='contactimg'>
        <p>Contact Us Now</p>
        <h2>KEEP IN TOUCH</h2>
      </div>

      <form className='contactform' onSubmit={handleSubmit}>
        <h2>Contact Us</h2>

        <div className='form-row'>
          <input name="name" value={formData.name} onChange={handleChange} placeholder='Your Name' />
          <input name="email" value={formData.email} onChange={handleChange} placeholder='Your Email' />
        </div>

        <input name="phone" value={formData.phone} onChange={handleChange} placeholder='Phone Number' />

        <textarea name="message" value={formData.message} onChange={handleChange} placeholder='Your Message'></textarea>

        <button type="submit">Send Message</button>
      </form>

    </div>
  )
}

export default Contact
