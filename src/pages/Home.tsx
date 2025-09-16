import React from 'react'
import Navbar from '../components/Navbar'
import Landing from '../components/Landing'
import Footer from '../components/Footer'
import NewsLetter from '../components/NewsLetter'
import Testimonials from '../components/Testimonials'
import Offer from '../components/Offer'

const Home: React.FC = () => {
    return (
        <>
            <Navbar />
            <Landing />
            <Offer />
            <Testimonials />
            <NewsLetter />
            <Footer />
        </>
    )
}

export default Home