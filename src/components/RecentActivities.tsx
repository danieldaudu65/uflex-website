import React from 'react'
import { arriw_right, car_icon } from '../assets'
// import { FaLongArrowAltRight } from "react-icons/fa";


const RecentActivities:React.FC = () => {
  const recent_activity = [
    {
      service: "Car rental",
      type: "Range Rover",
      status: "Assigned",
      amount: "₦50,000",
      time: "Yesterday, 2:30PM",
      location: {
        start: "Lagos Mainland",
        end: "Ikeja GRA"
      },
    }
  ]

  return (
    <div>
      <p className='py-3 text-[13px]'>Recent activity</p>
      <div className='gap-4 grid '>
        {recent_activity.map((rec, idx) => (
          <div key={idx} className='border border-gray-200 shadow-md rounded-2xl px-4'>
            <div className='flex  items-start justify-between text-sm  my-4'>

              <img src={car_icon} alt="" />
              <div className='space-y-1'>
                <p>{rec.service}</p>
                <div className='flex text-sm  gap-2'>
                  <p>{rec.location.start}</p>  <img src={arriw_right} alt="" />   <p>{rec.service}</p>
                </div>
                <p className='text-[#7A7E83]'>{rec.time}</p>
              </div>
              <p className={` p-1.5 rounded-full px-3 ${rec.status === "Assigned" ? "bg-[#FEEFE7] text-[#F56212]" : ""}`}>{rec.status}</p>
            </div>
            <hr className='text-gray-300 ' />
            <div className='flex justify-between text-sm p-1.5 py-6'>
              <div>
                <p className='text-[#393E46] text-xs'>Vehicle type</p>
                <p>{rec.type}</p>
              </div>
              <p className='text-[#4FA000] font-bold'>{rec.amount}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecentActivities
