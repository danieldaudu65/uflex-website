import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Blog from './pages/Blog'
import Contact from './pages/Contact'
import Booking from './pages/Booking'
import BookingDetails from './pages/BookingDetails'
import SelectCar from './pages/SelectCar'
import PaymentPage from './pages/PaymentPage'
import History from './pages/History'
import ContactSupport from './pages/ContactSupport.'
import { Toaster } from 'react-hot-toast'  // 👈 import

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/booking/history" element={<History />} />
          <Route path="/booking/contact" element={<ContactSupport />} />
          <Route path="/booking/book" element={<BookingDetails />} />
          <Route path="/booking/book/cartype" element={<SelectCar />} />
          <Route path="/booking/book/cartype/payment" element={<PaymentPage />} />
        </Routes>
      </BrowserRouter>

      {/* Toast container (must be inside App root) */}
      <Toaster
        position="top-center"
        toastOptions={{
          // default options
          duration: 3000,
          style: {
            background: '#333',
            color: '#fff',
            fontSize: '14px',
          },
          // optional success + error overrides
          success: {
            duration: 3000,
          },
          error: {
            duration: 4000,
          },
        }}
      />

    </>
  )
}

export default App
