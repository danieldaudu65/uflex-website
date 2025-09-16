import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ContactForm from '../components/ContactForm'

const Contact = () => {
  return (
    <div>
      <Navbar />
      <div className='min-h-[70vh] p-4 mt-6'>
        <h2 className='font-extrabold text-2xl text-center'>Contact Us</h2>

        <p className='text-center'>We’re here to make your trip easy and safe.
          Have questions or want to book a ride?
        </p>
        <ContactForm />
      </div>
      <Footer />
    </div>
  )
}

export default Contact