import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ZuluGuidePage from './pages/ZuluGuidePage';
import FAQPage from './pages/FAQPage';
import LetterPage from './pages/LetterPage';
import CattlePage from './pages/CattlePage';
import GuideArticlePage from './pages/GuideArticlePage';
import { zuluArticles } from './data/articles';
import NotFoundPage from './pages/NotFoundPage';
import Navigation from './components/Layout/Navigation';
import Footer from './components/Layout/Footer';
import UpdatePrompt from './components/Layout/UpdatePrompt';
import PageHead from './components/Layout/PageHead';

function App() {
  return (
    <div className="min-h-screen bg-paper flex flex-col">
      <PageHead />
      <Navigation />
      <main className="flex flex-1 flex-col">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/guide/zulu" element={<ZuluGuidePage />} />
          <Route path="/guide/zulu/cattle" element={<CattlePage />} />
          {zuluArticles.map((article) => (
            <Route key={article.id} path={`/guide/zulu/${article.id}`} element={<GuideArticlePage article={article} />} />
          ))}
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
