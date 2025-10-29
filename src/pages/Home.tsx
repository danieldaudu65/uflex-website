import React, { useRef } from 'react'
import Navbar from '../components/Navbar'
import Landing from '../components/Landing'
import Footer from '../components/Footer'
import NewsLetter from '../components/NewsLetter'
import Testimonials from '../components/Testimonials'
import Offer from '../components/Offer'
import CarCategories from '../components/CarCategories'

const Home: React.FC = () => {

    const carSectionRef = useRef<HTMLDivElement | null>(null);

    const scrollToCars = () => {
        carSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    return (
        <>
            <Navbar />
            <Landing onGetStarted={scrollToCars} />
            <Offer />
            <div ref={carSectionRef}>
                <CarCategories />
            </div>
            <Testimonials />
            <NewsLetter />
            <Footer />
        </>
    )
}

export default Home