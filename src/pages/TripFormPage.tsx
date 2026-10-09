import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import {
  MapPin, Calendar, Users, Heart, Wallet, Settings,
  ArrowRight, ArrowLeft, Check, Loader2, Sparkles
} from 'lucide-react';
import type { TripFormData } from '../types';
import {
  TRIP_PURPOSES, INTERESTS,
  BUDGET_CATEGORIES, CURRENCIES
} from '../constants';
import { useTripPlanner } from '../hooks/useTripPlanner';

const TOTAL_STEPS = 6;

const stepConfig = [
  { label: 'Destination', icon: MapPin },
  { label: 'Trip Details', icon: Calendar },
  { label: 'Travellers', icon: Users },
  { label: 'Interests', icon: Heart },
  { label: 'Budget', icon: Wallet },
  { label: 'Preferences', icon: Settings },
];

const TripFormPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const { submitForm, tripState } = useTripPlanner(navigate);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<TripFormData>({
    defaultValues: {
      destination: '',
      days: 5,
      purpose: '',
      travellers: { count: 2 },
      interests: [],
      budget: { amount: 40000, currency: 'INR', category: 'moderate' },
      preferences: {},
    },
  });

  const watchedInterests = watch('interests') || [];
  const watchedPurpose = watch('purpose');
  const watchedBudgetCategory = watch('budget.category');

  const stepFields: Record<number, string[]> = {
    1: ['destination'],
    2: ['days', 'purpose'],
    3: [],
    4: ['interests'],
    5: ['budget.amount', 'budget.category'],
    6: [],
  };

  const handleNext = async () => {
    const fields = stepFields[currentStep] as Parameters<typeof trigger>[0];
    const valid = fields.length > 0 ? await trigger(fields) : true;
    if (valid) {
      setCurrentStep((s) => Math.min(s + 1, TOTAL_STEPS));
    }
  };

  const handleBack = () => {
    setCurrentStep((s) => Math.max(s - 1, 1));
  };

  const onSubmit = async (data: TripFormData) => {
    navigate('/generating');
    await submitForm(data);
  };

  const toggleInterest = (interest: string) => {
    const current = watchedInterests;
    const updated = current.includes(interest)
      ? current.filter((i) => i !== interest)
      : [...current, interest];
    setValue('interests', updated);
  };

  const progressPercent = ((currentStep - 1) / (TOTAL_STEPS - 1)) * 100;

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Plan Your Trip</h1>
          <p className="text-slate-400">Fill in the details and let AI craft your perfect itinerary</p>
        </div>

        {/* Step Indicator */}
        <div className="mb-8">
          {/* Progress bar */}
          <div className="relative h-1.5 bg-slate-800 rounded-full mb-6 overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 gradient-primary rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Step dots - scrollable on mobile */}
          <div className="flex items-center justify-between gap-2 overflow-x-auto scrollbar-hide pb-2">
            {stepConfig.map((step, idx) => {
              const stepNum = idx + 1;
              const isCompleted = currentStep > stepNum;
              const isCurrent = currentStep === stepNum;
              return (
                <div
                  key={step.label}
                  className="flex flex-col items-center gap-1.5 flex-shrink-0"
                >
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 ${isCompleted
                        ? 'gradient-primary shadow-lg shadow-indigo-500/30'
                        : isCurrent
                          ? 'border-2 border-indigo-500 bg-indigo-500/10'
                          : 'border border-slate-700 bg-slate-800'
                      }`}
                  >
                    {isCompleted ? (
                      <Check size={16} className="text-white" />
                    ) : (
                      <step.icon
                        size={15}
                        className={isCurrent ? 'text-indigo-400' : 'text-slate-600'}
                      />
                    )}
                  </div>
                  <span
                    className={`text-xs font-medium hidden sm:block ${isCurrent ? 'text-indigo-300' : isCompleted ? 'text-slate-400' : 'text-slate-600'
                      }`}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-2 sm:hidden">
            <span className="text-xs text-indigo-400 font-medium">
              Step {currentStep}: {stepConfig[currentStep - 1].label}
            </span>
          </div>
        </div>

        {/* Error display */}
        {tripState.error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {tripState.error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="card p-6 sm:p-8">
            {/* Step 1: Destination */}
            {currentStep === 1 && (
              <div className="slide-up">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                    <MapPin size={20} className="text-blue-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Where are you headed?</h2>
                    <p className="text-slate-400 text-sm">Enter your dream destination</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2" htmlFor="destination">
                      Destination *
                    </label>
                    <input
                      id="destination"
                      {...register('destination', {
                        required: 'Please enter a destination',
                        minLength: { value: 2, message: 'Destination must be at least 2 characters' },
                      })}
                      placeholder="e.g., Goa, India or Paris, France"
                      className={`input-field px-4 py-3.5 ${errors.destination ? 'error' : ''}`}
                    />
                    {errors.destination && (
                      <p className="text-red-400 text-xs mt-1.5">{errors.destination.message}</p>
                    )}
                    <p className="text-slate-500 text-xs mt-1.5">
                      Be specific for better results. Include city and country.
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2" htmlFor="startDate">
                      Start Date (optional)
                    </label>
                    <input
                      id="startDate"
                      type="date"
                      {...register('startDate')}
                      min={new Date().toISOString().split('T')[0]}
                      className="input-field px-4 py-3.5"
                      style={{ colorScheme: 'dark' }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Trip Details */}
            {currentStep === 2 && (
              <div className="slide-up">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                    <Calendar size={20} className="text-purple-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Trip Details</h2>
                    <p className="text-slate-400 text-sm">How long and what's the purpose?</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2" htmlFor="days">
                      Number of Days *
                    </label>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          const current = watch('days');
                          if (current > 1) setValue('days', current - 1);
                        }}
                        className="w-10 h-10 rounded-xl border border-slate-700 bg-slate-800 text-slate-300 hover:border-indigo-500 hover:text-indigo-400 transition-all flex items-center justify-center text-lg font-bold"
                      >
                        −
                      </button>
                      <input
                        id="days"
                        type="number"
                        {...register('days', {
                          required: 'Required',
                          min: { value: 1, message: 'Minimum 1 day' },
                          max: { value: 30, message: 'Maximum 30 days' },
                          valueAsNumber: true,
                        })}
                        className={`input-field px-4 py-3 text-center w-24 ${errors.days ? 'error' : ''}`}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const current = watch('days');
                          if (current < 30) setValue('days', current + 1);
                        }}
                        className="w-10 h-10 rounded-xl border border-slate-700 bg-slate-800 text-slate-300 hover:border-indigo-500 hover:text-indigo-400 transition-all flex items-center justify-center text-lg font-bold"
                      >
                        +
                      </button>
                      <span className="text-slate-400 text-sm">nights</span>
                    </div>
                    {errors.days && (
                      <p className="text-red-400 text-xs mt-1.5">{errors.days.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-3">
                      Purpose of Trip *
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {TRIP_PURPOSES.map((purpose) => (
                        <button
                          key={purpose.value}
                          type="button"
                          onClick={() => setValue('purpose', purpose.value, { shouldValidate: true })}
                          className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all text-sm font-medium ${watchedPurpose === purpose.value
                              ? 'border-indigo-500 bg-indigo-500/15 text-indigo-300'
                              : 'border-slate-700 bg-slate-800/50 text-slate-400 hover:border-slate-500 hover:text-slate-300'
                            }`}
                        >
                          <span className="text-xl">{purpose.emoji}</span>
                          <span className="text-xs">{purpose.label}</span>
                        </button>
                      ))}
                    </div>
                    {/* Hidden input for validation */}
                    <input
                      type="hidden"
                      value={watchedPurpose || ''}
                      {...register('purpose', { required: 'Please select a purpose' })}
                    />
                    {errors.purpose && (
                      <p className="text-red-400 text-xs mt-2">{errors.purpose.message}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Travellers */}
            {currentStep === 3 && (
              <div className="slide-up">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                    <Users size={20} className="text-emerald-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Who's travelling?</h2>
                    <p className="text-slate-400 text-sm">How many people are going?</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2" htmlFor="travellerCount">
                    Number of Travellers
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        const current = watch('travellers.count');
                        if (current > 1) setValue('travellers.count', current - 1);
                      }}
                      className="w-10 h-10 rounded-xl border border-slate-700 bg-slate-800 text-slate-300 hover:border-indigo-500 transition-all flex items-center justify-center text-lg font-bold"
                    >
                      −
                    </button>
                    <Controller
                      name="travellers.count"
                      control={control}
                      rules={{ min: 1, max: 50 }}
                      render={({ field }) => (
                        <input
                          {...field}
                          id="travellerCount"
                          type="number"
                          className="input-field px-4 py-3 text-center w-24"
                        />
                      )}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const current = watch('travellers.count');
                        if (current < 50) setValue('travellers.count', current + 1);
                      }}
                      className="w-10 h-10 rounded-xl border border-slate-700 bg-slate-800 text-slate-300 hover:border-indigo-500 transition-all flex items-center justify-center text-lg font-bold"
                    >
                      +
                    </button>
                    <span className="text-slate-400 text-sm">people</span>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Interests */}
            {currentStep === 4 && (
              <div className="slide-up">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center">
                    <Heart size={20} className="text-pink-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">What excites you?</h2>
                    <p className="text-slate-400 text-sm">Select all that apply</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {INTERESTS.map((interest) => (
                    <button
                      key={interest.value}
                      type="button"
                      onClick={() => toggleInterest(interest.value)}
                      className={`chip ${watchedInterests.includes(interest.value) ? 'selected' : ''}`}
                      aria-pressed={watchedInterests.includes(interest.value)}
                    >
                      <span>{interest.emoji}</span>
                      {interest.label}
                    </button>
                  ))}
                </div>

                {watchedInterests.length === 0 && (
                  <p className="text-slate-500 text-xs mt-3">
                    Select at least one interest for a personalized itinerary
                  </p>
                )}

                <div className="mt-4 text-xs text-slate-500">
                  {watchedInterests.length} selected
                </div>
              </div>
            )}

            {/* Step 5: Budget */}
            {currentStep === 5 && (
              <div className="slide-up">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                    <Wallet size={20} className="text-amber-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Budget Planning</h2>
                    <p className="text-slate-400 text-sm">Help us plan within your means</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-3">
                      Budget Category *
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {BUDGET_CATEGORIES.map((cat) => (
                        <button
                          key={cat.value}
                          type="button"
                          onClick={() => setValue('budget.category', cat.value as 'budget' | 'moderate' | 'premium' | 'luxury', { shouldValidate: true })}
                          className={`flex flex-col items-start gap-1 p-4 rounded-xl border transition-all text-left ${watchedBudgetCategory === cat.value
                              ? 'border-indigo-500 bg-indigo-500/15'
                              : 'border-slate-700 bg-slate-800/50 hover:border-slate-500'
                            }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{cat.emoji}</span>
                            <span className={`font-semibold text-sm ${watchedBudgetCategory === cat.value ? 'text-indigo-300' : 'text-slate-300'}`}>
                              {cat.label}
                            </span>
                          </div>
                          <span className="text-xs text-slate-500 leading-tight">{cat.description}</span>
                        </button>
                      ))}
                    </div>
                    <input
                      type="hidden"
                      value={watchedBudgetCategory || 'moderate'}
                      {...register('budget.category', { required: 'Select a budget category' })}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-slate-300 mb-2" htmlFor="budgetAmount">
                        Approximate Budget *
                      </label>
                      <input
                        id="budgetAmount"
                        type="number"
                        {...register('budget.amount', {
                          required: 'Enter your budget',
                          min: { value: 1, message: 'Budget must be positive' },
                          valueAsNumber: true,
                        })}
                        placeholder="40000"
                        className={`input-field px-4 py-3.5 ${errors.budget?.amount ? 'error' : ''}`}
                      />
                      {errors.budget?.amount && (
                        <p className="text-red-400 text-xs mt-1">{errors.budget.amount.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2" htmlFor="currency">
                        Currency
                      </label>
                      <select
                        id="currency"
                        {...register('budget.currency')}
                        className="input-field px-3 py-3.5 appearance-none"
                        style={{ colorScheme: 'dark' }}
                      >
                        {CURRENCIES.map((c) => (
                          <option key={c.value} value={c.value}>
                            {c.value}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 6: Preferences */}
            {currentStep === 6 && (
              <div className="slide-up">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                    <Settings size={20} className="text-cyan-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Preferences</h2>
                    <p className="text-slate-400 text-sm">All fields are optional</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    { name: 'preferences.food', label: 'Food Preferences', placeholder: 'e.g., Vegetarian, Seafood lover, No spicy food' },
                    { name: 'preferences.accommodation', label: 'Accommodation Type', placeholder: 'e.g., Beachfront resort, Budget hostel, Boutique hotel' },
                    { name: 'preferences.transportation', label: 'Transportation Preference', placeholder: 'e.g., Rental car, Public transport, Private cab' },
                    { name: 'preferences.thingsToAvoid', label: 'Things to Avoid', placeholder: 'e.g., Crowded places, Loud bars, Long walks' },
                  ].map((field) => (
                    <div key={field.name}>
                      <label className="block text-sm font-medium text-slate-300 mb-2" htmlFor={field.name}>
                        {field.label}
                      </label>
                      <input
                        id={field.name}
                        {...register(field.name as keyof TripFormData)}
                        placeholder={field.placeholder}
                        className="input-field px-4 py-3"
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2" htmlFor="additionalInfo">
                      Anything else we should know?
                    </label>
                    <textarea
                      id="additionalInfo"
                      {...register('preferences.additionalInfo')}
                      placeholder="Any special requirements, celebrations, or specific places you want to visit..."
                      rows={3}
                      className="input-field px-4 py-3 resize-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-800">
              <button
                type="button"
                onClick={currentStep === 1 ? () => navigate('/') : handleBack}
                className="btn-secondary px-5 py-2.5 text-sm"
              >
                <ArrowLeft size={16} />
                {currentStep === 1 ? 'Home' : 'Back'}
              </button>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">{currentStep} / {TOTAL_STEPS}</span>
              </div>

              {currentStep < TOTAL_STEPS ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="btn-primary px-5 py-2.5 text-sm"
                >
                  Next
                  <ArrowRight size={16} />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={tripState.isLoading}
                  className="btn-primary px-6 py-2.5 text-sm"
                  id="submit-trip-btn"
                >
                  {tripState.isLoading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Sparkles size={16} />
                      Generate Itinerary
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TripFormPage;
