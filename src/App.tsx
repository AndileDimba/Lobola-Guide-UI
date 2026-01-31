import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ZuluGuidePage from './pages/ZuluGuidePage';
import FAQPage from './pages/FAQPage';
import NotFoundPage from './pages/NotFoundPage';
import Navigation from './components/Layout/Navigation';
import Footer from './components/Layout/Footer';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-stone-50 font-sans flex flex-col">
      <Navigation />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/guide/zulu" element={<ZuluGuidePage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
