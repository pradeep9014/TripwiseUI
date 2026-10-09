import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Check, Loader2, ArrowRight, Sparkles } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../hooks/useTripPlanner';
import { setFollowUpAnswer, setStep } from '../store/slices/tripSlice';
import { useTripPlanner } from '../hooks/useTripPlanner';

const FollowUpPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { tripState, submitFollowUpAnswers } = useTripPlanner(navigate);
  const { followUpQuestions, followUpAnswers, isLoading, error, step } = tripState;

  useEffect(() => {
    // Only redirect if we're actually on the 'questions' step and have no questions
    // (avoids false redirect on first mount before state is set)
    if (step === 'questions' && followUpQuestions.length === 0 && !isLoading) {
      navigate('/plan');
    }
  }, [step, followUpQuestions, isLoading, navigate]);

  const handleAnswer = (questionId: string, answer: string) => {
    dispatch(setFollowUpAnswer({ questionId, answer }));
  };

  const allAnswered = followUpQuestions.every(
    (q) => followUpAnswers[q.id]
  );

  const handleSubmit = async () => {
    await submitFollowUpAnswers(followUpAnswers);
  };

  const handleSkip = async () => {
    await submitFollowUpAnswers({});
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto mb-4">
            <MessageSquare size={28} className="text-indigo-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-3">
            A few quick questions
          </h1>
          <p className="text-slate-400">
            These help our AI craft a more personalized itinerary for you.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Questions */}
        <div className="space-y-6">
          {followUpQuestions.map((question, qIdx) => (
            <div key={question.id} className="card p-6 slide-up" style={{ animationDelay: `${qIdx * 0.1}s` }}>
              <div className="flex items-start gap-3 mb-5">
                <div className="w-8 h-8 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Sparkles size={14} className="text-white" />
                </div>
                <div>
                  <p className="text-xs text-indigo-400 font-semibold mb-1 uppercase tracking-wider">
                    Question {qIdx + 1} of {followUpQuestions.length}
                  </p>
                  <p className="text-white font-medium text-base leading-relaxed">
                    {question.question}
                  </p>
                </div>
              </div>

              <div className="space-y-2.5 ml-11">
                {question.options.map((option) => {
                  const isSelected = followUpAnswers[question.id] === option;
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => handleAnswer(question.id, option)}
                      className={`w-full flex items-center gap-3 p-3.5 rounded-xl border transition-all text-left ${
                        isSelected
                          ? 'border-indigo-500 bg-indigo-500/15 text-indigo-300'
                          : 'border-slate-700 bg-slate-800/50 text-slate-400 hover:border-slate-500 hover:text-slate-300 hover:bg-slate-800'
                      }`}
                      aria-pressed={isSelected}
                    >
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                          isSelected ? 'border-indigo-400 bg-indigo-500' : 'border-slate-600'
                        }`}
                      >
                        {isSelected && <Check size={10} className="text-white" />}
                      </div>
                      <span className="text-sm font-medium">{option}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-8 space-y-3">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading || !allAnswered}
            className="btn-primary w-full py-4 text-base justify-center"
            id="submit-answers-btn"
          >
            {isLoading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Generating your itinerary...
              </>
            ) : (
              <>
                <Sparkles size={18} />
                Generate My Itinerary
                <ArrowRight size={18} />
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleSkip}
            disabled={isLoading}
            className="btn-ghost w-full py-3 text-sm justify-center text-slate-500 hover:text-slate-400"
            id="skip-questions-btn"
          >
            Skip questions & generate anyway
          </button>
        </div>

        {!allAnswered && (
          <p className="text-center text-slate-500 text-xs mt-3">
            Please answer all questions to continue
          </p>
        )}
      </div>
    </div>
  );
};

export default FollowUpPage;
