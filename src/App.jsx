import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import GalleryPage from './pages/GalleryPage';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/collections" element={<div className="min-h-screen flex items-center justify-center">Collections Page (Coming Soon)</div>} />
        <Route path="/virtual-tour" element={<div className="min-h-screen flex items-center justify-center">Virtual Tour Page (Coming Soon)</div>} />
        <Route path="/artists" element={<div className="min-h-screen flex items-center justify-center">Artists Page (Coming Soon)</div>} />
        <Route path="/exhibitions" element={<div className="min-h-screen flex items-center justify-center">Exhibitions Page (Coming Soon)</div>} />
        <Route path="/visit" element={<div className="min-h-screen flex items-center justify-center">Visit Page (Coming Soon)</div>} />
      </Routes>
    </Router>
  );
}

export default App;
