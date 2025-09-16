import React from 'react'
import Navbar from '../components/Navbar'
import { aboutBg, button } from '../assets'
import { vision_mission } from '../data/About'
import Footer from '../components/Footer'

const About: React.FC = () => {
    return (
        <div>
            <Navbar />
            <img src={aboutBg} alt="" />
            <div className='text-center p-4'>
                <h2 className='text-2xl font-[900] p-5'>Giving safe and comfortable rides for people coming
                    into Nigeria
                </h2>
                <p className='p-4 py-2'>Our drivers are trained, our cars are top quality, and we make sure you feel welcome and safe from the very first moment you arrive.

                </p>
                <img className='flex justify-center m-auto my-8' src={button} alt="" />
            </div>

            {/* // Visio and Mission */}
            <div className='grid px-4 gap-8'>
                {
                    vision_mission.map((int, idx) => (
                        <div>
                            <div className={`flex  ${idx === 1 ? 'flex-row-reverse' : ""}`}>

                                <h2
                                    dangerouslySetInnerHTML={{ __html: int.topic }}
                                    className='text-2xl p-4 break-words font-extrabold'>
                                </h2>
                                <img src={int.image} alt="" />
                            </div>
                            <p className='w-2/3 mt-4 mb-6 text-[#181A1D] text-sm'>  {int.text}</p>
                        </div>
                    ))
                }
            </div>
            <Footer />
        </div>
    )
}

export default About