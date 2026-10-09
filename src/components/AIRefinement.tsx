import React, { useState } from 'react';
import { Send, Loader2, RefreshCw, Sparkles, X } from 'lucide-react';

interface AIRefinementProps {
  isLoading: boolean;
  onRefine: (instruction: string) => void;
  error: string | null;
}

const QUICK_SUGGESTIONS = [
  "Make Day 3 more adventurous",
  "Add more local food experiences",
  "Reduce the overall budget",
  "Make it suitable for children",
  "Add more relaxing activities",
  "Remove nightlife activities",
  "Focus more on culture and history",
  "Add a spa/wellness day",
];

const AIRefinement: React.FC<AIRefinementProps> = ({ isLoading, onRefine, error }) => {
  const [instruction, setInstruction] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (instruction.trim() && !isLoading) {
      onRefine(instruction.trim());
      setInstruction('');
    }
  };

  const handleSuggestion = (suggestion: string) => {
    setInstruction(suggestion);
  };

  return (
    <div className="card overflow-hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 hover:bg-white/3 transition-colors"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center">
            <Sparkles size={16} className="text-white" />
          </div>
          <div className="text-left">
            <div className="text-sm font-semibold text-white">Refine with AI</div>
            <div className="text-xs text-slate-400">Change anything about your itinerary</div>
          </div>
        </div>
        <RefreshCw size={16} className={`text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="p-5 pt-0 border-t border-white/5">
          <p className="text-slate-400 text-sm mb-4">
            Want to change something? Describe it below and AI will update your itinerary.
          </p>

          {/* Quick suggestions */}
          <div className="mb-4">
            <p className="text-xs text-slate-500 mb-2 font-medium">Quick suggestions:</p>
            <div className="flex flex-wrap gap-2">
              {QUICK_SUGGESTIONS.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => handleSuggestion(suggestion)}
                  className="chip text-xs"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-3 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Input */}
          <form onSubmit={handleSubmit}>
            <div className="relative">
              <textarea
                value={instruction}
                onChange={(e) => setInstruction(e.target.value)}
                placeholder='e.g., "Make Day 3 more adventurous" or "Reduce budget by 20%"'
                rows={3}
                className="input-field px-4 py-3 pr-12 resize-none"
                disabled={isLoading}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
              />
              {instruction && (
                <button
                  type="button"
                  onClick={() => setInstruction('')}
                  className="absolute right-3 top-3 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            <div className="flex items-center justify-between mt-3">
              <span className="text-xs text-slate-500">
                Press Enter to submit, Shift+Enter for new line
              </span>
              <button
                type="submit"
                disabled={!instruction.trim() || isLoading}
                className="btn-primary px-4 py-2.5 text-sm"
                id="refine-itinerary-btn"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    Refining...
                  </>
                ) : (
                  <>
                    <Send size={14} />
                    Refine Itinerary
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AIRefinement;
