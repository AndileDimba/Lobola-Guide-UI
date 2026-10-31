import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ZuluGuidePage from './pages/ZuluGuidePage';
import FAQPage from './pages/FAQPage';
import LetterPage from './pages/LetterPage';
import NotFoundPage from './pages/NotFoundPage';
import Navigation from './components/Layout/Navigation';
import Footer from './components/Layout/Footer';
import UpdatePrompt from './components/Layout/UpdatePrompt';

function App() {
  return (
    <div className="min-h-screen bg-paper flex flex-col">
      <Navigation />
      <main className="flex flex-1 flex-col">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/guide/zulu" element={<ZuluGuidePage />} />
          <Route path="/guide/zulu/:stageId" element={<ZuluGuidePage />} />
          <Route path="/letter" element={<LetterPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
      <UpdatePrompt />
    </div>
  );
}

export default App;
