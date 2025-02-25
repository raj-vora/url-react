
import React, { useContext } from 'react'
import { BrowserRouter, Navigate, Route, Routes, Outlet, useLocation } from 'react-router';

// Import components
import { Links } from './components/links'
import { Login } from './components/login';
import { Redirect } from './components/redirect'

// Import styles
import './styles/styles.css'

export const App = () => {

    // Check for authentication
    const isAuthenticated = () => {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');
        return token && username;
    }

    // Protect routes that require authentication
    const PrivateRoutes = () => {
        const location = useLocation();


        return isAuthenticated === null ? <Outlet /> : <Navigate to="/login" replace state={{ from: location }} />
    }

    return (<BrowserRouter>
        <Routes>
            <Route path='/' element={<PrivateRoutes />} />
            <Route path="/login" element={<Login />} />
            <Route path="/links" element={<Links />} />
            <Route path="/:code" element={<Redirect />} />
        </Routes>
    </BrowserRouter>);
}