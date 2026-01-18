import React from 'react';
import type { Step, Theme } from '../../data/types';

interface StepCardProps {
  step: Step;
  isActive: boolean;
  onClick: () => void;
  theme: Theme;
}

const StepCard: React.FC<StepCardProps> = ({ step, isActive, onClick, theme }) => {
  return (
    <div 
      onClick={onClick}
      className={`bg-white rounded-xl shadow-sm border-2 transition-all cursor-pointer p-6 ${
        isActive ? `${theme.border} ${theme.ring} ring-2` : 'border-transparent hover:border-gray-200'
      }`}
    >
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-full ${isActive ? theme.primary + ' text-white' : 'bg-gray-100 text-gray-500'}`}>
          <span className="font-bold text-lg">{isActive ? '●' : '○'}</span>
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-800">{step.title}</h3>
          <p className="text-gray-600 mt-1">{step.description}</p>
          
          {isActive && (
            <div className="mt-6 pt-6 border-t border-gray-100 animate-fade-in">
              <h4 className="font-semibold text-gray-700 mb-3">Key Requirements:</h4>
              <ul className="space-y-3">
                {step.details.map((detail, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-600">
                    <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${theme.primary}`} />
                    {detail}
                  </li>
                ))}
              </ul>
              <button className={`mt-8 w-full text-white py-3 rounded-lg font-medium transition-colors ${theme.button}`}>
                Mark Step as Completed
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StepCard;