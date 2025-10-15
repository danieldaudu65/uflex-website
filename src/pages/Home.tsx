import React from 'react'
import Navbar from '../components/Navbar'
import Landing from '../components/Landing'
import Footer from '../components/Footer'
import NewsLetter from '../components/NewsLetter'
import Testimonials from '../components/Testimonials'
import Offer from '../components/Offer'
import CarCategories from '../components/CarCategories'

const Home: React.FC = () => {
    return (
        <>
            <Navbar />
            <Landing />
            <Offer />
            <CarCategories />
            <Testimonials />
            <NewsLetter />
            <Footer />
        </>
    )
}

export default Home