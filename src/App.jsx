// src/App.js
import { useState } from 'react';
import "tailwindcss";
import Layout from './components/Layout';
import Home from './components/Home';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboardview from './dashboard/Dashboardview';
import DashboardLayout from './dashboard/DashboardLayout';
import Register from './components/Register';
import SignIn from './components/SignIn';
import CalendaryPage from './dashboard/CalendaryPage';
import Community from './dashboard/Community';
import Profile from './dashboard/Profile';
import Settings from './dashboard/Settings';
import { LanguageProvider } from './LanguageContext'; // Import the LanguageProvider
import Help from './components/Help'
import Resource from './dashboard/Resources.jsx'

function App() {
  return (
    <LanguageProvider> {/* Wrap the application with LanguageProvider */}
      <div className='container'>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route path='/' element={<Home />} />
            </Route>
            <Route path='/' element={<DashboardLayout />}>
              <Route path='/Dashboard' index element={<Dashboardview />} />
              <Route path='/Calendary' index element={<CalendaryPage />} />
              <Route path='/Community' index element={<Community />} />
              <Route path='/Profile' index element={<Profile />} />
              <Route path='/Settings' index element={<Settings />} />
              <Route path='/Help' index element={<Help />} />
              <Route path='/Resource' index element={<Resource />} />
            </Route>
            <Route path='/Register' index element={<Register />} />
            <Route path='/SignIn' index element={<SignIn />} />
          </Routes>
        </BrowserRouter>
      </div>
    </LanguageProvider>
  );
}

export default App;