import React, { useState } from 'react';
import type { ItineraryDay, ActivityItem } from '../types';
import { Clock, MapPin, Timer, ChevronDown, ChevronUp } from 'lucide-react';
import { formatCurrency } from '../utils';
import { ACTIVITY_COLORS } from '../constants';

interface DayCardProps {
  day: ItineraryDay;
  currency: string;
  defaultExpanded?: boolean;
}

const activityTypeLabel: Record<string, string> = {
  meal: '🍽 Meal',
  attraction: '🏛 Attraction',
  transport: '🚌 Transport',
  accommodation: '🏨 Stay',
  leisure: '🌿 Leisure',
  shopping: '🛍 Shopping',
};

const DayCard: React.FC<DayCardProps> = ({ day, currency, defaultExpanded = true }) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const dayTotal = day.activities.reduce((sum, act) => sum + (act.estimatedCost || 0), 0);

  return (
    <div className="card overflow-hidden">
      {/* Day Header */}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-5 hover:bg-white/3 transition-colors text-left"
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl gradient-primary flex flex-col items-center justify-center shadow-lg shadow-indigo-500/20 flex-shrink-0">
            <span className="text-xs font-bold text-indigo-200 leading-none">DAY</span>
            <span className="text-lg font-extrabold text-white leading-none">
              {String(day.day).padStart(2, '0')}
            </span>
          </div>
          <div className="min-w-0">
            <h3 className="text-base font-bold text-white truncate">{day.title}</h3>
            <p className="text-slate-400 text-sm mt-0.5 line-clamp-1">{day.summary}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0 ml-3">
          {dayTotal > 0 && (
            <span className="text-sm font-semibold text-emerald-400 hidden sm:block">
              {formatCurrency(dayTotal, currency)}
            </span>
          )}
          <span className="text-xs text-slate-500 hidden sm:block">
            {day.activities.length} activities
          </span>
          {isExpanded ? (
            <ChevronUp size={18} className="text-slate-500" />
          ) : (
            <ChevronDown size={18} className="text-slate-500" />
          )}
        </div>
      </button>

      {/* Activities Timeline */}
      {isExpanded && (
        <div className="px-5 pb-5 border-t border-white/5">
          <div className="relative mt-4">
            {/* Vertical line */}
            <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500/40 via-slate-700/60 to-transparent rounded-full" />

            <div className="space-y-0">
              {day.activities.map((activity, idx) => (
                <ActivityRow
                  key={idx}
                  activity={activity}
                  currency={currency}
                  isLast={idx === day.activities.length - 1}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ActivityRow: React.FC<{
  activity: ActivityItem;
  currency: string;
  isLast: boolean;
}> = ({ activity, currency }) => {
  const colorClass = ACTIVITY_COLORS[activity.type] || 'bg-slate-100 text-slate-700 border-slate-200';

  return (
    <div className="relative flex gap-4 pb-4 last:pb-0">
      {/* Timeline dot */}
      <div className="relative z-10 flex flex-col items-center flex-shrink-0 w-10">
        <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-400">
          <Clock size={14} />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 bg-slate-900/60 rounded-xl p-4 border border-white/5 hover:border-indigo-500/20 transition-colors min-w-0">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-indigo-400 font-mono">{activity.time}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${colorClass}`}>
              {activityTypeLabel[activity.type] || activity.type}
            </span>
          </div>
          {activity.estimatedCost > 0 && (
            <span className="text-sm font-semibold text-emerald-400 flex-shrink-0">
              {formatCurrency(activity.estimatedCost, currency)}
            </span>
          )}
        </div>

        <h4 className="font-semibold text-white text-sm mb-1">{activity.title}</h4>
        <p className="text-slate-400 text-sm leading-relaxed mb-2">{activity.description}</p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
          {activity.location && (
            <span className="flex items-center gap-1">
              <MapPin size={11} />
              {activity.location}
            </span>
          )}
          {activity.duration && (
            <span className="flex items-center gap-1">
              <Timer size={11} />
              {activity.duration}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default DayCard;
