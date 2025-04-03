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
import Community from './components/Community.jsx';
import Profile from './dashboard/Profile';
import Settings from './dashboard/Settings';
import { LanguageProvider } from './LanguageContext'; // Import the LanguageProvider
import Help from './components/Help'
import Resource from './dashboard/Resources.jsx'
import Donate from './components/Donate.jsx';
import About from './components/About.jsx';
import Support from './components/Support.jsx';
import Account from './components/Account.jsx';
import AdminLayout from './admin/AdminLayout.jsx'
import AdminView from './admin/AdminView.jsx'
import UserManagement from './admin/UserManagment.jsx';
import Donation from './admin/Donation.jsx'
import SupportPage from './admin/SupportPage.jsx';
import CommunityPage from './admin/CommunityPage.jsx';
import CalendaryScheduler from './admin/CalendaryScheduler.jsx';
import CommunityUser from './components/CommunityUser.jsx';

function App() {
  return (
    <LanguageProvider> {/* Wrap the application with LanguageProvider */}
      <div className='container'>
        {/* <BrowserRouter> */}
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route path='/' index element={<Home />} />
              <Route path='/Donate' element={<Donate />} />
              <Route path='/About' element={<About />} />
              <Route path='/Support' element={<Support />} />
              <Route path='/Community' element={<Community />} />
              <Route path='/Communityuser' element={<CommunityUser/>} />
              <Route path='/Dashboard' element={<Dashboardview />} />
              <Route path='/Account' element={<Account />} /> 
              <Route path='/Calendary' index element={<CalendaryPage />} />
              <Route path='/Settings' index element={<Settings />} />
              <Route path='/Profile' index element={<Profile />} /> 
              <Route path='/Register' index element={<Register />} />
            <Route path='/SignIn' index element={<SignIn />} />
            </Route>

          <Route  path='/' element={<AdminLayout />}>
          <Route  path='/Admin' element={<AdminView />}/>
          <Route  path='/user' element={<UserManagement />}/>
          <Route  path='/donation' element={<Donation />}/>
          <Route  path='/supportpage' element={<SupportPage />}/>
          <Route  path='/communitypage' element={<CommunityPage />}/>
          <Route  path='/calendaryscheduler' element={<CalendaryScheduler />}/>
          </Route>
           
            
          </Routes>
        {/* </BrowserRouter> */}
      </div>
    </LanguageProvider>
  );
}

export default App;