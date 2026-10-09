import React, { useEffect, useState } from 'react';
import { Sparkles, CheckCircle, Loader2 } from 'lucide-react';
import { LOADING_STEPS } from '../constants';

const GeneratingPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  useEffect(() => {
    let stepIndex = 0;
    const interval = setInterval(() => {
      if (stepIndex < LOADING_STEPS.length - 1) {
        setCompletedSteps((prev) => [...prev, stepIndex]);
        stepIndex++;
        setCurrentStep(stepIndex);
      }
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md mx-auto text-center">
        {/* Animated icon */}
        <div className="relative inline-block mb-8">
          <div className="w-24 h-24 rounded-3xl gradient-primary flex items-center justify-center mx-auto shadow-2xl shadow-indigo-500/30">
            <Sparkles size={40} className="text-white" />
          </div>
          {/* Orbiting rings */}
          <div className="absolute inset-0 rounded-3xl border-2 border-indigo-500/30 animate-ping" style={{ animationDuration: '2s' }} />
          <div className="absolute -inset-2 rounded-3xl border border-indigo-400/20 animate-pulse" />
        </div>

        <h1 className="text-3xl font-bold text-white mb-3">
          ✨ Creating your personalized trip...
        </h1>
        <p className="text-slate-400 mb-10">
          Our AI is crafting the perfect itinerary just for you. This may take a minute.
        </p>

        {/* Progress Steps */}
        <div className="space-y-3 text-left">
          {LOADING_STEPS.map((step, idx) => {
            const isCompleted = completedSteps.includes(idx);
            const isCurrent = currentStep === idx;
            const isPending = idx > currentStep;

            return (
              <div
                key={idx}
                className={`flex items-center gap-3 p-3.5 rounded-xl transition-all duration-500 ${
                  isCurrent
                    ? 'bg-indigo-500/10 border border-indigo-500/20'
                    : isCompleted
                    ? 'opacity-60'
                    : 'opacity-25'
                }`}
              >
                <div className="flex-shrink-0">
                  {isCompleted ? (
                    <CheckCircle size={20} className="text-emerald-400" />
                  ) : isCurrent ? (
                    <Loader2 size={20} className="text-indigo-400 animate-spin" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-slate-700" />
                  )}
                </div>
                <span
                  className={`text-sm font-medium ${
                    isCompleted
                      ? 'text-slate-400 line-through decoration-emerald-500/50'
                      : isCurrent
                      ? 'text-indigo-300'
                      : 'text-slate-600'
                  }`}
                >
                  {step}
                </span>
              </div>
            );
          })}
        </div>

        {/* Progress bar */}
        <div className="mt-8 h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full gradient-primary rounded-full transition-all duration-1000"
            style={{
              width: `${((completedSteps.length) / LOADING_STEPS.length) * 100}%`,
            }}
          />
        </div>
        <p className="text-xs text-slate-600 mt-2">
          Powered by Google Gemini AI
        </p>
      </div>
    </div>
  );
};

export default GeneratingPage;
