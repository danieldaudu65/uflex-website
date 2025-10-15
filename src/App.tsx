import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Booking from "./pages/Booking";
import BookingDetails from "./pages/BookingDetails";
import SelectCar from "./pages/SelectCar";
import PaymentPage from "./pages/PaymentPage";
import History from "./pages/History";
import ContactSupport from "./pages/ContactSupport.";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthModalProvider, useAuthModal } from "./components/AuthModalProvider";
import Signup from "./components/Signup";

function AppContent() {
  const { isOpen, closeModal } = useAuthModal();

  return (
    <>
      {/* Auth Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <Signup onClose={closeModal} />
        </div>
      )}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />

        {/* Protected Routes */}
        <Route path="/booking" element={<ProtectedRoute><Booking /></ProtectedRoute>} />
        <Route path="/booking/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
        <Route path="/booking/contact" element={<ProtectedRoute><ContactSupport /></ProtectedRoute>} />
        <Route path="/booking/book" element={<ProtectedRoute><BookingDetails /></ProtectedRoute>} />
        <Route path="/booking/book/cartype" element={<ProtectedRoute><SelectCar /></ProtectedRoute>} />
        <Route path="/booking/book/cartype/payment" element={<ProtectedRoute><PaymentPage /></ProtectedRoute>} />
      </Routes>

      {/* Toast Container */}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#333",
            color: "#fff",
            fontSize: "14px",
          },
          success: { duration: 3000 },
          error: { duration: 4000 },
        }}
      />
    </>
  );
}

function App() {
  return (
    <AuthModalProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthModalProvider>
  );
}

export default App;
