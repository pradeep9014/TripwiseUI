import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MapPin, Calendar, Users, Tag, Save, Trash2, Plus,
  Info, Utensils, Lightbulb, AlertCircle
} from 'lucide-react';
import { useTripPlanner, useAppDispatch } from '../hooks/useTripPlanner';
import {
  setStep, resetTrip, setItinerary, setError, setLoading
} from '../store/slices/tripSlice';
import { storageUtils, formatCurrency } from '../utils';
import DayCard from '../components/DayCard';
import WeatherCard from '../components/WeatherCard';
import BudgetCard from '../components/BudgetCard';
import PackingList from '../components/PackingList';
import AIRefinement from '../components/AIRefinement';

const ResultPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { tripState, refineItinerary } = useTripPlanner();
  const { itinerary, weather, isWeatherLoading, isLoading, error, formData, step } = tripState;

  useEffect(() => {
    // Only redirect if we're on the result step but have no itinerary (not during loadSavedTrip)
    if (step === 'result' && !itinerary) {
      navigate('/plan');
    }
  }, [itinerary, step, navigate]);

  if (!itinerary) return null;

  const isSaved = storageUtils.hasSavedTrip();

  const handleSave = () => {
    storageUtils.saveTrip(itinerary);
    window.alert('Trip saved! You can access it from "My Trip" page.');
  };

  const handleClearSave = () => {
    storageUtils.clearTrip();
    dispatch(resetTrip());
    navigate('/');
  };

  const handleNewTrip = () => {
    dispatch(resetTrip());
    navigate('/plan');
  };

  return (
    <div className="min-h-screen pt-16 pb-16 no-overflow-x">
      {/* Hero Banner */}
      <div className="relative bg-slate-900 border-b border-white/5 px-4 py-8 sm:py-12 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-600/8 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            {/* Trip info */}
            <div>
              <div className="flex items-center gap-2 text-indigo-400 text-sm font-medium mb-3">
                <MapPin size={14} />
                Your Personalized Itinerary
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
                {itinerary.destination}
              </h1>
              <p className="text-slate-400 text-base mb-4 max-w-xl leading-relaxed">
                {itinerary.summary}
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  { icon: Calendar, label: `${itinerary.days.length} Days` },
                  { icon: Users, label: formData ? `${formData.travellers.count} ${formData.travellers.type}` : 'Travellers' },
                  { icon: Tag, label: itinerary.tripStyle },
                ].map((tag) => (
                  <span
                    key={tag.label}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 text-sm"
                  >
                    <tag.icon size={13} className="text-indigo-400" />
                    {tag.label}
                  </span>
                ))}
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-semibold">
                  Est. {formatCurrency(itinerary.estimatedBudget.total, itinerary.estimatedBudget.currency)}
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleSave}
                className="btn-secondary px-4 py-2.5 text-sm"
                id="save-trip-btn"
              >
                <Save size={15} />
                Save Trip
              </button>
              {isSaved && (
                <button
                  onClick={handleClearSave}
                  className="btn-ghost px-4 py-2.5 text-sm text-red-400 hover:text-red-300"
                  id="clear-trip-btn"
                >
                  <Trash2 size={15} />
                  Clear Saved
                </button>
              )}
              <button
                onClick={handleNewTrip}
                className="btn-primary px-4 py-2.5 text-sm"
                id="new-trip-btn"
              >
                <Plus size={15} />
                New Trip
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Error */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-2">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main itinerary */}
          <div className="lg:col-span-2 space-y-6">
            {/* AI Refinement */}
            <AIRefinement
              isLoading={isLoading}
              onRefine={refineItinerary}
              error={error}
            />

            {/* Day-by-Day */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Calendar size={20} className="text-indigo-400" />
                Day-by-Day Itinerary
              </h2>
              <div className="space-y-4">
                {itinerary.days.map((day, idx) => (
                  <DayCard
                    key={day.day}
                    day={day}
                    currency={itinerary.estimatedBudget.currency}
                    defaultExpanded={idx === 0}
                  />
                ))}
              </div>
            </div>

            {/* Food Recommendations */}
            {itinerary.foodRecommendations && itinerary.foodRecommendations.length > 0 && (
              <div className="card p-6">
                <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Utensils size={15} />
                  Food Recommendations
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {itinerary.foodRecommendations.map((food, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-900/60 rounded-xl p-4 border border-white/5 hover:border-orange-500/20 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-semibold text-white text-sm">{food.name}</h3>
                        <div className="flex gap-1 flex-shrink-0">
                          {food.mustTry && (
                            <span className="text-xs px-1.5 py-0.5 rounded bg-orange-500/20 text-orange-400 font-medium">
                              Must Try
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-slate-400 text-xs leading-relaxed mb-2">{food.description}</p>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-500 capitalize">
                        {food.type}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Travel Tips */}
            {itinerary.travelTips && itinerary.travelTips.length > 0 && (
              <div className="card p-6">
                <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Lightbulb size={15} />
                  Travel Tips
                </h2>
                <div className="space-y-3">
                  {itinerary.travelTips.map((tip, idx) => (
                    <div key={idx} className="flex gap-3">
                      <div className="flex-shrink-0 mt-0.5">
                        <span className="text-xs px-2 py-0.5 rounded-lg bg-indigo-500/10 text-indigo-400 font-medium">
                          {tip.category}
                        </span>
                      </div>
                      <p className="text-slate-400 text-sm leading-relaxed">{tip.tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Important Notes */}
            {itinerary.importantNotes && itinerary.importantNotes.length > 0 && (
              <div className="card p-6 border-l-4 border-l-amber-500">
                <h2 className="text-sm font-semibold text-amber-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Info size={15} />
                  Important Notes
                </h2>
                <ul className="space-y-2">
                  {itinerary.importantNotes.map((note, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-slate-400 text-sm">
                      <span className="text-amber-400 mt-0.5">•</span>
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Weather */}
            <WeatherCard
              weather={weather || {
                destination: itinerary.destination,
                temperature: { current: 0, feelsLike: 0, min: 0, max: 0, unit: '°C' },
                condition: 'Loading',
                description: 'Fetching weather data...',
                humidity: 0,
                windSpeed: 0,
                windUnit: 'km/h',
                visibility: 0,
                icon: '',
                forecast: [],
                fetchedAt: new Date().toISOString(),
              }}
              isLoading={isWeatherLoading}
            />

            {/* Budget */}
            <BudgetCard budget={itinerary.estimatedBudget} />

            {/* Packing List */}
            {itinerary.packingList && itinerary.packingList.length > 0 && (
              <PackingList packingList={itinerary.packingList} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
