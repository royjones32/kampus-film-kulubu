import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './components/Home';
import ShowDetail from './components/ShowDetail';
import Footer from './components/Footer';
import './App.css';

function Header() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <header className="app-header">
      <div className="header-content">
        <Link to="/" className="header-link">
          <h1>🎬 Kampüs Film Kulübü</h1>
        </Link>
        {!isHomePage && (
          <Link to="/" className="btn-home">
            🏠 Anasayfa
          </Link>
        )}
      </div>
      <p>Süleyman Demirel Üniversitesi Film Kulübü</p>
    </header>
  );
}

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/show/:id" element={<ShowDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;


