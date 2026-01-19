import React from 'react';
import type { StepCardProps } from '../../data/types';
import { Shield } from '../Icons/Shield';

const StepCard: React.FC<StepCardProps> = ({
  step,
  isActive,
  isCompleted,
  onComplete,
  onActivate,
  theme,
  index,
}) => {
  return (
    <div
      id={`step-card-${index}`}
      className={`bg-white rounded-xl shadow-sm border-2 transition-all duration-300 overflow-hidden ${
        isActive ? `${theme.border} ${theme.ring} ring-4` : isCompleted ? 'border-green-100 bg-green-50/30' : 'border-transparent hover:border-stone-200'
      }`}
    >
      {/* Header Section - Clickable to go back/activate */}
      <div
        onClick={onActivate}
        className="p-6 flex items-start gap-4 cursor-pointer group"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if ((e.key === 'Enter' || e.key === ' ') && onActivate) onActivate();
        }}
      >
        <div className={`p-3 rounded-xl transition-colors ${isActive ? 'bg-zinc-900' : 'bg-stone-100 group-hover:bg-stone-200'}`}>
          <Shield color={isActive ? theme.iconColor : '#a8a29e'} className="w-6 h-6" />
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h3 className={`text-xl font-bold transition-colors ${isActive ? 'text-zinc-900' : 'text-stone-600'}`}>
              {step.title}
            </h3>
            {isCompleted && !isActive && (
              <span className="text-xs font-bold uppercase tracking-widest text-green-600 bg-green-100 px-2 py-1 rounded">
                Completed
              </span>
            )}
          </div>
          <p className={`mt-1 text-sm ${isActive ? 'text-stone-600' : 'text-stone-400'}`}>
            {step.description}
          </p>
        </div>
      </div>

      {/* Expanded Content - Only visible when active */}
      {isActive && (
        <div className="px-6 pb-6 animate-fade-in">
          <div className="pt-6 border-t border-stone-100">
            <h4 className="font-bold text-stone-900 mb-4 uppercase text-xs tracking-widest">Key Requirements</h4>
            <ul className="space-y-3 mb-8">
              {step.details.map((detail, i) => (
                <li key={i} className="flex items-start gap-3 text-stone-600 text-sm leading-relaxed">
                  <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${theme.primary}`} />
                  {detail}
                </li>
              ))}
            </ul>

            <button
              onClick={(e) => {
                e.stopPropagation(); // important: prevent activating header click
                onComplete();
              }}
              className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest transition-all shadow-lg active:transform active:scale-[0.98] ${theme.button}`}
            >
              Mark Step as Completed
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StepCard;