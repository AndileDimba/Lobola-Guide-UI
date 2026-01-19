import { useEffect, useState } from "react";
import { zuluData } from "./data/zulu";
import StepCard from "./components/UI/StepCard";
import { Shield } from "./components/Icons/Shield";

function App() {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(() => {
    const saved = localStorage.getItem("lobolo:activeIndex");
    if (saved) {
      const idx = Number(saved);
      if (!Number.isNaN(idx) && idx >= 0 && idx < zuluData.steps.length) {
        return idx;
      }
    }
    return 0;
  });
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(() => {
    const saved = localStorage.getItem("lobolo:completed");
    if (saved) {
      try {
        const arr: string[] = JSON.parse(saved);
        return new Set(arr);
      } catch (e) {
        // ignore parse errors
      }
    }
    return new Set();
  });
  const currentNation = zuluData;
  const steps = currentNation.steps;

  // Persist completed set and active index
  useEffect(() => {
    localStorage.setItem(
      "lobolo:completed",
      JSON.stringify(Array.from(completedSteps)),
    );
  }, [completedSteps]);

  useEffect(() => {
    localStorage.setItem("lobolo:activeIndex", String(activeStepIndex));
  }, [activeStepIndex]);

  const handleComplete = (index: number) => {
    const stepId = steps[index].id;
    // Mark this step as completed
    setCompletedSteps((prev) => {
      const next = new Set(prev);
      next.add(stepId);
      return next;
    });

    // Advance to the next step (if any)
    setActiveStepIndex((prev) => {
      const nextIndex = Math.min(prev + 1, steps.length - 1);
      return nextIndex;
    });
  };

  const handleActivateStep = (index: number) => {
    setActiveStepIndex(index);
  };

  const resetProgress = () => {
    localStorage.removeItem("lobolo:completed");
    localStorage.removeItem("lobolo:activeIndex");
    setCompletedSteps(new Set());
    setActiveStepIndex(0);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <header className="bg-white py-16 px-6 text-center border-b border-stone-200 shadow-sm">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-4">
            <Shield
              color={currentNation.theme.iconColor}
              className="w-12 h-12"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-widest text-yellow-600">
            Lobolo Guide
          </h1>
          <p className="mt-3 text-lg text-stone-500 italic font-medium">
            Preserving the {currentNation.nationName} Marriage Tradition
          </p>
        </div>
      </header>

      <main className="max-w-2xl mx-auto py-12 px-6 space-y-6">
        {steps.map((step, index) => (
          <StepCard
            key={step.id}
            step={step}
            isActive={activeStepIndex === index}
            isCompleted={completedSteps.has(step.id)}
            theme={currentNation.theme}
            onComplete={() => handleComplete(index)}
            onActivate={() => handleActivateStep(index)}
            index={index}
          />
        ))}
      </main>

      <footer className="py-12 text-center text-gray-400 text-sm space-y-2">
        <p>© 2026 Lobolo Guide • Preserving African Traditions</p>
        <button
          onClick={resetProgress}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Reset Progress
        </button>
      </footer>
    </div>
  );
}

export default App;
