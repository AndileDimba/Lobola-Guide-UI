import { useState } from 'react';
import { zuluData } from './data/zulu.ts';
import StepCard from './components/UI/StepCard';

function App() {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const currentNation = zuluData;

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <header className={`${currentNation.theme.primary} text-white py-12 px-6 shadow-lg`}>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-black tracking-tight">Lobolo Guide</h1>
          <p className="mt-2 text-lg opacity-90">
            Navigating the {currentNation.nationName} traditional process.
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-12 px-6">
        <div className="grid gap-6">
          {currentNation.steps.map((step, index) => (
            <StepCard 
              key={step.id}
              step={step}
              isActive={activeStepIndex === index}
              onClick={() => setActiveStepIndex(index)}
              theme={currentNation.theme}
            />
          ))}
        </div>
      </main>

      <footer className="py-12 text-center text-gray-400 text-sm">
        <p>© 2026 Lobolo Guide • Preserving African Traditions</p>
      </footer>
    </div>
  );
}

export default App;