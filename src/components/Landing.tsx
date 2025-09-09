import React from 'react'
import { homeimg } from '../assets'

const Landing = () => {
    return (
        <div className='bg-green-secondary py-12 '>

            <div className='px-18 text-center mb-7 mt- ' >
                <h3 className=' text-2xl font-bold  text-[#F1FCE6]'>Get fast and trusted             rides near you.</h3>
                <h3 className='text-[#F1FCE6]'>With easy booking, friendly drivers,
                    and smooth rides,
                    every trip is made simply for you.</h3>
            </div>
            <button className='bg-green-main mb-6 m-auto p-4 rounded-lg py-2 mt-8 w-fit flex justify-center text-center'>Get Started </button>      
            <img src={homeimg} alt="" className='flex justify-center items-center w-full p-4'/>
        </div>
    )
}

export default Landing