import React from 'react'
import { arriw_right, arrow_left, car_icon } from '../assets'
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const History: React.FC = () => {

    const navigate = useNavigate();

    const recent_activity = [
        {
            service: "Car rental",
            type: "Range Rover",
            status: "Requested",
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
            <Navbar />
            <div className='p-4 min-h-[90vh]'>



                <div className="flex mb-6  gap-3 items-center">
                    <img
                        src={arrow_left}
                        onClick={() => navigate(-1)}
                        alt="back"
                        className="cursor-pointer"
                    />
                    <div>
                        <h3 className="text-lg font-medium">My bookings</h3>
                    </div>
                </div>



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

                        <div>
                            <button className='w-full py-2.5 mb-4 rounded-xl font-bold bg-[#D2F6B0]'>Book again</button>
                        </div>
                    </div>
                ))}
            </div>
            <Footer />
        </div>
    )
}

export default History