import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import ShowDetail from './components/ShowDetail';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <Link to="/" className="header-link">
            <h1>🎬 Kampüs Film Kulübü</h1>
          </Link>
          <p>Süleyman Demirel Üniversitesi Film Kulübü</p>
        </header>
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


