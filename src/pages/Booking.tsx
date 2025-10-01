import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Profile from '../components/Profile'
import RecentActivities from '../components/RecentActivities'
import { booking_ride, my_booking, support } from '../assets'
import { useNavigate } from 'react-router-dom'

const Booking:React.FC = () => {

  const navigate = useNavigate()
  const linkPage = [
    {
      image: booking_ride,
      text: "Book a ride",
      disc: "Schedule your transportation",
      link: "book"
    },
    {
      image: my_booking,
      text: "My bookings",
      disc: "View your trips",
      link: "history"
    },
    {
      image: support,
      text: "Contact support",
      disc: "Get help anytime",
      link: "contact"
    },
  ]
  return (

    <div>
      <Navbar />

      <div className='p-4'>
        <Profile />

        <div className='my-4 gap-4 grid'>
          {
            linkPage.map((link, idx) => (
              <div key={idx} onClick={() => navigate(`${link.link}`)} className='bg-[#F1FCE6] border flex justify-start gap-4 border-[#4FA000] p-4 rounded-xl'>
                <img src={link.image} alt="" />
                <div className='space-y-1'>
                  <p className='text-sm'>{link.text}</p>
                  <p className='text-xs text-[#61656B]'>{link.disc}</p>
                </div>
              </div>
            ))
          }
        </div>

        <RecentActivities />
      </div>
      <Footer />
    </div>
  )
}

export default Booking