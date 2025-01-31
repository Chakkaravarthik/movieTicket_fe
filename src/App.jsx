import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import LoginComponent from "./assets/Components/Authentication/Login.jsx";
import TheaterRegistrationForm from "./assets/Components/theater/Theatercreation/theatercreation.jsx";
//import TicketBooking from "./assets/Components/tikcetBookingPage/ticketBooking.jsx";
import RegisterForm from './assets/Components/Authentication/register.jsx';
import HomeComponent from './assets/Components/home/home.jsx';
//import {Spinner , loadspinner, stopspinner} from './assets/Components/spinner/spinner.jsx'
import { MoonLoader} from "react-spinners";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(localStorage.getItem('IsAuthenticated')));
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false); // Global spinner state

  // Spinner control functions
  const loadspinner = () => setLoading(true);
  const stopspinner = () => setLoading(false);

  // Listen for changes in localStorage to update authentication state
  useEffect(() => {
    const checkAuth = () => setIsAuthenticated(Boolean(localStorage.getItem('IsAuthenticated')));
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  // Check if the user is an admin based on the token
  useEffect(() => {
    const updateAdminStatus = () => {
      const userToken = localStorage.getItem('UserToken');
      if (userToken) {
        const userDetails = jwtDecode(userToken);
        setIsAdmin(userDetails.role === 'admin');
      } else {
        setIsAdmin(false);
      }
    };

    window.addEventListener('storage', updateAdminStatus);
    updateAdminStatus(); // Run initially

    return () => window.removeEventListener('storage', updateAdminStatus);
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('IsAuthenticated');
    localStorage.removeItem('UserToken');
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  return (
    <BrowserRouter>
      {/* Show spinner globally when loading */}
      {loading && <Spinner />}

      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={
            <LoginComponent
              setIsAuthenticated={setIsAuthenticated}
              stopspinner={stopspinner} // Pass spinner controls
              loadspinner={loadspinner}
            />
          }
        />
        <Route path="/register" element={<RegisterForm />} />

        {/* Protected Routes for Regular Users */}
        {isAuthenticated && !isAdmin && (
          <>
            <Route path="/home" element={<HomeComponent handleLogout={handleLogout} />} />
            {/* <Route path="/book-tickets" element={<TicketBooking />} /> */}
          </>
        )}

        {/* Protected Routes for Admins */}
        {isAuthenticated && isAdmin && (
          <>
            <Route path="/home" element={<HomeComponent handleLogout={handleLogout} />} />
            <Route path="/register-theater" element={<TheaterRegistrationForm />} />
          </>
        )}

        {/* Redirect unauthenticated users */}
        {!isAuthenticated && <Route path="*" element={<Navigate to="/login" replace />} />}
        {isAuthenticated && <Route path="/" element={<Navigate to="/home" replace />} />}

        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

function Spinner() {
  return (
    <div
      className="sweet-loading d-flex align-items-center justify-content-center"
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: 'black',
        zIndex: '1000',
      }}
    >
      <MoonLoader color="#f30505" loading />
    </div>
  );
}

export default App;


