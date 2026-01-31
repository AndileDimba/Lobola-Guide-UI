import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { zuluData } from "../data/zulu";
import StepCard from "../components/UI/StepCard";
import { Shield } from "../components/Icons/Shield";

const ZuluGuidePage = () => {
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
      const arr: string[] = JSON.parse(saved);
      return new Set(arr);
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

  const progressPercentage = Math.round((completedSteps.size / steps.length) * 100);

  return (
    <div className="bg-yellow-50 min-h-screen">
      {/* Header */}
      <header className="bg-gradient-to-br from-yellow-500 to-amber-600 text-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-yellow-100 hover:text-white mb-6 transition-colors"
          >
            <span>←</span>
            <span>Back to Lobola Hub</span>
          </Link>
          
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl">
              <Shield
                color="#ffffff"
                className="w-12 h-12"
              />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-widest">
            {currentNation.nationName}
          </h1>
          <p className="mt-3 text-lg text-yellow-100 italic font-medium">
            Step-by-Step Lobola Guide
          </p>
          
          {/* Progress Bar */}
          <div className="mt-8 max-w-md mx-auto">
            <div className="flex justify-between text-sm text-yellow-100 mb-2">
              <span>Progress</span>
              <span>{completedSteps.size} of {steps.length} steps completed</span>
            </div>
            <div className="h-3 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Steps */}
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

      {/* Reset Button */}
      <div className="py-12 text-center">
        <button
          onClick={resetProgress}
          className="px-6 py-3 bg-stone-200 text-stone-600 rounded-xl font-medium hover:bg-stone-300 transition-colors"
        >
          Reset Progress
        </button>
      </div>
    </div>
  );
};

export default ZuluGuidePage;
