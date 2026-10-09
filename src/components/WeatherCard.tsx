import React from 'react';
import { Thermometer, Wind, Droplets, Eye, Cloud, Sun, CloudRain, Snowflake } from 'lucide-react';
import type { WeatherData } from '../types';
import { getWeatherIconUrl } from '../utils';

interface WeatherCardProps {
  weather: WeatherData;
  isLoading: boolean;
}

const getWeatherIcon = (condition: string) => {
  const lower = condition.toLowerCase();
  if (lower.includes('rain') || lower.includes('drizzle')) return CloudRain;
  if (lower.includes('snow')) return Snowflake;
  if (lower.includes('cloud')) return Cloud;
  return Sun;
};

const WeatherCard: React.FC<WeatherCardProps> = ({ weather, isLoading }) => {
  if (isLoading) {
    return (
      <div className="card p-6">
        <div className="skeleton h-6 w-32 mb-4" />
        <div className="flex items-center gap-4">
          <div className="skeleton w-16 h-16 rounded-2xl" />
          <div className="flex-1 space-y-2">
            <div className="skeleton h-10 w-24" />
            <div className="skeleton h-4 w-28" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 mt-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="skeleton h-16 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  const WeatherIcon = getWeatherIcon(weather.condition);

  return (
    <div className="card p-6">
      <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
        🌤 Current Weather
      </h3>

      <div className="flex items-center gap-4 mb-5">
        {/* Weather icon from API */}
        <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center overflow-hidden">
          {weather.icon ? (
            <img
              src={getWeatherIconUrl(weather.icon)}
              alt={weather.condition}
              className="w-12 h-12 object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          ) : (
            <WeatherIcon size={28} className="text-blue-400" />
          )}
        </div>
        <div>
          <div className="text-4xl font-bold text-white">
            {weather.temperature.current}{weather.temperature.unit}
          </div>
          <div className="text-slate-400 text-sm capitalize mt-0.5">
            {weather.description}
          </div>
          <div className="text-slate-500 text-xs">
            Feels like {weather.temperature.feelsLike}{weather.temperature.unit}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          { icon: Droplets, label: 'Humidity', value: `${weather.humidity}%`, color: 'text-blue-400' },
          { icon: Wind, label: 'Wind', value: `${weather.windSpeed} ${weather.windUnit}`, color: 'text-cyan-400' },
          { icon: Eye, label: 'Visibility', value: `${weather.visibility}km`, color: 'text-purple-400' },
        ].map((stat) => (
          <div key={stat.label} className="bg-slate-900/60 rounded-xl p-3 text-center border border-white/5">
            <stat.icon size={16} className={`${stat.color} mx-auto mb-1.5`} />
            <div className="text-sm font-semibold text-white">{stat.value}</div>
            <div className="text-xs text-slate-500">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* 5-day forecast */}
      {weather.forecast && weather.forecast.length > 0 && (
        <div>
          <p className="text-xs text-slate-500 mb-2 font-medium">5-Day Forecast</p>
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
            {weather.forecast.slice(0, 5).map((day, idx) => {
              const ForecastIcon = getWeatherIcon(day.condition);
              return (
                <div
                  key={idx}
                  className="flex-shrink-0 flex flex-col items-center gap-1 bg-slate-900/60 rounded-xl p-2.5 border border-white/5 min-w-[60px]"
                >
                  <span className="text-xs text-slate-500">
                    {idx === 0
                      ? 'Today'
                      : new Date(day.date).toLocaleDateString('en', { weekday: 'short' })}
                  </span>
                  {day.icon ? (
                    <img
                      src={getWeatherIconUrl(day.icon)}
                      alt={day.condition}
                      className="w-8 h-8 object-contain"
                    />
                  ) : (
                    <ForecastIcon size={16} className="text-slate-400" />
                  )}
                  <span className="text-xs font-medium text-white">{day.tempMax}°</span>
                  <span className="text-xs text-slate-500">{day.tempMin}°</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <p className="text-xs text-slate-600 mt-3">
        Fetched {new Date(weather.fetchedAt).toLocaleTimeString()}
      </p>
    </div>
  );
};

export default WeatherCard;
