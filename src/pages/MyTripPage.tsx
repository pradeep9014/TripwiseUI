import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Save, Plus, Clock, Compass } from 'lucide-react';
import { storageUtils, formatCurrency } from '../utils';
import { useTripPlanner, useAppDispatch } from '../hooks/useTripPlanner';
import { loadSavedTrip, resetTrip } from '../store/slices/tripSlice';

const MyTripPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { tripState } = useTripPlanner();

  const saved = storageUtils.loadTrip();
  const { itinerary } = tripState;

  const displayTrip = itinerary || saved?.itinerary;

  const handleLoadSaved = () => {
    if (saved?.itinerary) {
      dispatch(loadSavedTrip(saved.itinerary));
      navigate('/result');
    }
  };

  const handleViewCurrent = () => {
    navigate('/result');
  };

  if (!displayTrip && !saved) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="text-center max-w-sm">
          <div className="w-20 h-20 rounded-3xl bg-slate-800 border border-slate-700 flex items-center justify-center mx-auto mb-6">
            <Compass size={36} className="text-slate-500" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-3">No trips saved yet</h1>
          <p className="text-slate-400 mb-8 leading-relaxed">
            Plan your first trip and save it here for quick access anytime.
          </p>
          <button
            onClick={() => navigate('/plan')}
            className="btn-primary px-8 py-3.5 text-base mx-auto"
            id="plan-first-trip-btn"
          >
            <Plus size={18} />
            Plan Your First Trip
          </button>
        </div>
      </div>
    );
  }

  const tripToShow = displayTrip!;

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">My Trip</h1>
          <button
            onClick={() => navigate('/plan')}
            className="btn-primary px-4 py-2.5 text-sm"
            id="plan-new-trip-btn"
          >
            <Plus size={15} />
            Plan New Trip
          </button>
        </div>

        {/* Saved badge */}
        {saved && !itinerary && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-2 text-emerald-400 text-sm">
            <Save size={14} />
            <span>This trip was saved locally at {new Date(saved.savedAt).toLocaleString()}</span>
          </div>
        )}

        {/* Trip Card */}
        <div className="card p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-indigo-400 text-sm mb-2">
                <MapPin size={14} />
                Your Saved Itinerary
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">{tripToShow.destination}</h2>
              <p className="text-slate-400 text-sm mb-4 max-w-lg leading-relaxed">
                {tripToShow.summary}
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300">
                  <Calendar size={13} className="text-indigo-400" />
                  {tripToShow.days.length} Days
                </span>
                <span className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-semibold">
                  Est. {formatCurrency(tripToShow.estimatedBudget.total, tripToShow.estimatedBudget.currency)}
                </span>
                <span className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-400">
                  {tripToShow.tripStyle}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-2 flex-shrink-0">
              <button
                onClick={itinerary ? handleViewCurrent : handleLoadSaved}
                className="btn-primary px-5 py-2.5 text-sm whitespace-nowrap"
                id="view-trip-btn"
              >
                <MapPin size={15} />
                View Full Itinerary
              </button>
            </div>
          </div>
        </div>

        {/* Day Summary Grid */}
        <div>
          <h3 className="text-base font-semibold text-white mb-4">Trip at a Glance</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {tripToShow.days.map((day) => (
              <div
                key={day.day}
                className="card p-4 card-hover cursor-pointer"
                onClick={itinerary ? handleViewCurrent : handleLoadSaved}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-xl gradient-primary flex flex-col items-center justify-center flex-shrink-0">
                    <span className="text-xs text-indigo-200 leading-none font-bold">
                      {String(day.day).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white truncate">{day.title}</p>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <Clock size={10} />
                      {day.activities.length} activities
                    </p>
                  </div>
                </div>
                <p className="text-xs text-slate-400 line-clamp-2">{day.summary}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Clear saved */}
        {saved && (
          <div className="mt-8 text-center">
            <button
              onClick={() => {
                storageUtils.clearTrip();
                dispatch(resetTrip());
                navigate('/');
              }}
              className="btn-ghost px-4 py-2 text-sm text-red-400 hover:text-red-300"
              id="clear-saved-trip-btn"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="inline mr-1.5">
                <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />
              </svg>
              Clear Saved Trip
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTripPage;
