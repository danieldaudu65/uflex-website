import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import BookingForm from '../components/BookingForm'

const BookingDetails:React.FC = () => {
    return (
        <div>
            <Navbar />
            <BookingForm />
            <Footer />
        </div>
    )
}

export default BookingDetails