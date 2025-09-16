import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ChatApp from './pages/ChatApp';
import Layout from './components/Layout';
import RegistrationForm from './pages/Registration';
import { Toaster } from './components/ui/sonner';


function App() {
  return (
   
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
         <Layout>
          <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/chat" element={<ChatApp />} />
          <Route path="/registration" element={<RegistrationForm />} />
        </Routes>
        <Toaster />
        </Layout>
      </div>
    </Router>
  );
}

export default App;