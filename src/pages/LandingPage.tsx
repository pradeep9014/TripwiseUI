import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles, Brain, BarChart3, Cloud, CalendarDays, RefreshCw,
  MapPin, Star, ChevronRight, Globe, Shield, Zap, Compass
} from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Planning',
    description: 'Gemini AI understands your unique preferences and crafts the perfect itinerary.',
    color: 'text-violet-400',
    bg: 'bg-violet-500/10 border-violet-500/20',
  },
  {
    icon: CalendarDays,
    title: 'Personalized Itineraries',
    description: 'Day-by-day schedules tailored to your travel style, budget, and interests.',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10 border-blue-500/20',
  },
  {
    icon: BarChart3,
    title: 'Smart Budget Planning',
    description: 'Transparent budget breakdown across accommodation, food, and activities.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10 border-emerald-500/20',
  },
  {
    icon: Cloud,
    title: 'Weather Insights',
    description: 'Real-time weather data for your destination to help you pack and plan.',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10 border-cyan-500/20',
  },
  {
    icon: Sparkles,
    title: 'Day-by-Day Activities',
    description: 'Detailed timelines with locations, durations, and estimated costs.',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10 border-amber-500/20',
  },
  {
    icon: RefreshCw,
    title: 'AI Trip Refinement',
    description: 'Change anything with a simple request. "Make Day 3 more adventurous."',
    color: 'text-pink-400',
    bg: 'bg-pink-500/10 border-pink-500/20',
  },
];

const stats = [
  { value: '50+', label: 'Destinations', icon: Globe },
  { value: '10K+', label: 'Trips Planned', icon: MapPin },
  { value: '4.9★', label: 'User Rating', icon: Star },
  { value: '2 min', label: 'Avg Generation', icon: Zap },
];

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen no-overflow-x">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-20 pb-16">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-600/12 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-cyan-600/8 rounded-full blur-3xl" />
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `
                linear-gradient(rgba(79, 70, 229, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(79, 70, 229, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        <div className="relative max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 text-sm font-medium text-indigo-300 border border-indigo-500/20">
            <Sparkles size={14} className="text-indigo-400" />
            Powered by Google Gemini AI
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tight">
            Plan Smarter.{' '}
            <span className="text-gradient">Travel Better.</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Tell us where you want to go, what you love, and your budget.
            <br className="hidden sm:block" />
            AI will create a personalized travel experience just for you.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button
              onClick={() => navigate('/plan')}
              className="btn-primary px-8 py-4 text-base w-full sm:w-auto"
              id="hero-plan-trip-btn"
            >
              <Compass size={20} />
              Plan My Trip
              <ChevronRight size={18} />
            </button>
            <a
              href="#features"
              className="btn-secondary px-8 py-4 text-base w-full sm:w-auto text-center justify-center"
              id="hero-explore-features-btn"
            >
              Explore Features
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="card p-4 text-center">
                <stat.icon size={20} className="text-indigo-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 text-sm font-medium text-indigo-300 border border-indigo-500/20">
              <Zap size={14} />
              Everything you need
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Travel Planning,{' '}
              <span className="text-gradient">Reimagined</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              From the first idea to a complete itinerary — all in minutes, not hours.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <div
                key={feature.title}
                className={`card card-hover p-6 slide-up`}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className={`w-12 h-12 rounded-xl ${feature.bg} border flex items-center justify-center mb-4`}>
                  <feature.icon size={22} className={feature.color} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-4 bg-slate-900/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              How It <span className="text-gradient">Works</span>
            </h2>
            <p className="text-slate-400 text-lg">Three simple steps to your perfect trip</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Tell us your dream',
                description: 'Enter your destination, dates, travellers, interests, and budget through our intuitive form.',
                icon: MapPin,
              },
              {
                step: '02',
                title: 'AI refines the plan',
                description: 'Our AI asks targeted follow-up questions to understand exactly what you want.',
                icon: Brain,
              },
              {
                step: '03',
                title: 'Get your itinerary',
                description: 'Receive a complete day-by-day plan with activities, budgets, tips, and weather.',
                icon: CalendarDays,
              },
            ].map((item, idx) => (
              <div key={item.step} className="relative text-center">
                {idx < 2 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-indigo-500/40 to-transparent z-0" style={{ width: 'calc(100% - 2rem)', left: '50%' }} />
                )}
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-6 shadow-lg shadow-indigo-500/20">
                    <item.icon size={28} className="text-white" />
                  </div>
                  <div className="text-xs font-bold text-indigo-400 mb-2 tracking-widest">STEP {item.step}</div>
                  <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="card p-8 md:p-12 relative overflow-hidden">
            <div className="absolute inset-0 gradient-primary opacity-5" />
            <div className="relative">
              <div className="flex items-center justify-center gap-2 mb-6">
                <Shield size={20} className="text-emerald-400" />
                <span className="text-emerald-400 font-semibold text-sm">Privacy First</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Your Journey, Your Data
              </h2>
              <p className="text-slate-400 max-w-xl mx-auto mb-8 leading-relaxed">
                Your API keys are never exposed to the frontend. All AI processing happens
                securely on our backend. No account required — your trips are saved locally.
              </p>
              <button
                onClick={() => navigate('/plan')}
                className="btn-primary px-8 py-4 text-base mx-auto"
                id="trust-cta-btn"
              >
                Start Planning Free
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <Compass size={16} className="text-white" />
              </div>
              <span className="font-bold text-gradient text-lg">TripWise</span>
            </div>
            <p className="text-slate-500 text-sm text-center">
              © {new Date().getFullYear()} TripWise. Powered by Google Gemini AI.
            </p>
            <div className="flex items-center gap-4 text-sm text-slate-500">
              <a href="#features" className="hover:text-slate-300 transition-colors">Features</a>
              <button onClick={() => navigate('/plan')} className="hover:text-slate-300 transition-colors">Plan Trip</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
