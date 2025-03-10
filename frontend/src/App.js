import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ArtistDashboard from './pages/ArtistDashboard';
import CustomerDashboard from './pages/CustomerDashboard';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import ArtworkDetail from './pages/ArtworkDetail';
import Gallery from './pages/Gallery';
import Artists from './pages/Artists';
import ArtistProfile from './pages/Artists'; 
import Contact from './pages/Contact';
import Chat from './pages/Chat';
import './styles/App.css';
import './pages/chatbotKnowledgeBase';
import './pages/chat-data';
import TermsAndConditions from './pages/TermsAndConditions';
import { useState } from 'react';


// Layout component for pages with header and footer
const LayoutWithHeaderFooter = ({ children }) => (
  
  <>
    <Header />
    <main>{children}</main>
    <Footer />
  </>
);

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Routes>
            {/* Route without Header/Footer */}
            <Route path="/login" element={<Login setIsSignedIn={setIsSignedIn} />} />
            <Route path="/register" element={<Register />} />

            {/* Layout with Header and Footer */}
            <Route path="/" element={<LayoutWithHeaderFooter><Home isSignedIn={isSignedIn} /></LayoutWithHeaderFooter>} />
            <Route path="/artist-dashboard" element={<LayoutWithHeaderFooter><ArtistDashboard /></LayoutWithHeaderFooter>} />
            <Route path="/customer-dashboard" element={<LayoutWithHeaderFooter><CustomerDashboard /></LayoutWithHeaderFooter>} />
            <Route path="/product/:id" element={<LayoutWithHeaderFooter><ProductDetails /></LayoutWithHeaderFooter>} />
            <Route path="/cart" element={<LayoutWithHeaderFooter><Cart /></LayoutWithHeaderFooter>} />
            <Route path="/checkout" element={<LayoutWithHeaderFooter><Checkout /></LayoutWithHeaderFooter>} />
            <Route path="/profile" element={<LayoutWithHeaderFooter><Profile /></LayoutWithHeaderFooter>} />
            <Route path="/gallery" element={<LayoutWithHeaderFooter><Gallery /></LayoutWithHeaderFooter>} />
            <Route path="/artists" element={<LayoutWithHeaderFooter><Artists /></LayoutWithHeaderFooter>} />
            <Route path="/artist/:id" element={<LayoutWithHeaderFooter><ArtistProfile /></LayoutWithHeaderFooter>} />
            <Route path="/contact" element={<LayoutWithHeaderFooter><Contact /></LayoutWithHeaderFooter>} />
            <Route path="/artwork/:id" element={<LayoutWithHeaderFooter><ArtworkDetail /></LayoutWithHeaderFooter>} />
            <Route path="/terms-and-conditions" element={<LayoutWithHeaderFooter><TermsAndConditions /></LayoutWithHeaderFooter>} />


          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
