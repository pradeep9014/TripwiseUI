// Trip planning form types
export interface TravellerInfo {
  type?: string;
  count: number;
}

export interface BudgetInfo {
  amount: number;
  currency: string;
  category: 'budget' | 'moderate' | 'premium' | 'luxury';
}

export interface PreferencesInfo {
  food?: string;
  accommodation?: string;
  transportation?: string;
  accessibility?: string;
  thingsToAvoid?: string;
  specialRequirements?: string;
  additionalInfo?: string;
}

export interface TripFormData {
  destination: string;
  days: number;
  startDate?: string;
  purpose: string;
  travellers: TravellerInfo;
  interests: string[];
  budget: BudgetInfo;
  preferences: PreferencesInfo;
  followUpAnswers?: Record<string, string>;
}

// Itinerary types
export interface ActivityItem {
  time: string;
  title: string;
  description: string;
  location: string;
  duration: string;
  estimatedCost: number;
  type: 'meal' | 'attraction' | 'transport' | 'accommodation' | 'leisure' | 'shopping';
}

export interface ItineraryDay {
  day: number;
  title: string;
  summary: string;
  activities: ActivityItem[];
}

export interface BudgetBreakdown {
  accommodation: number;
  food: number;
  transportation: number;
  activities: number;
  miscellaneous: number;
  total: number;
  currency: string;
}

export interface FoodRecommendation {
  name: string;
  description: string;
  type: 'vegetarian' | 'non-vegetarian' | 'vegan' | 'seafood' | 'local' | 'street food';
  mustTry: boolean;
}

export interface PackingCategory {
  category: string;
  items: string[];
}

export interface TravelTip {
  category: 'Transportation' | 'Safety' | 'Culture' | 'Money' | 'General';
  tip: string;
}

export interface Itinerary {
  destination: string;
  summary: string;
  tripStyle: string;
  estimatedBudget: BudgetBreakdown;
  days: ItineraryDay[];
  foodRecommendations: FoodRecommendation[];
  packingList: PackingCategory[];
  travelTips: TravelTip[];
  importantNotes: string[];
}

// Follow-up questions types
export interface FollowUpQuestion {
  id: string;
  question: string;
  options: string[];
}

export interface FollowUpResponse {
  needsFollowUp: boolean;
  questions: FollowUpQuestion[];
}

// Weather types
export interface WeatherForecastDay {
  date: string;
  tempMin: number;
  tempMax: number;
  condition: string;
  description: string;
  icon: string;
  humidity: number;
}

export interface WeatherData {
  destination: string;
  temperature: {
    current: number;
    feelsLike: number;
    min: number;
    max: number;
    unit: string;
  };
  condition: string;
  description: string;
  humidity: number;
  windSpeed: number;
  windUnit: string;
  visibility: number;
  icon: string;
  forecast: WeatherForecastDay[];
  fetchedAt: string;
}

// App state types
export type AppStep = 'landing' | 'form' | 'questions' | 'generating' | 'result';

export interface ApiError {
  message: string;
  statusCode?: number;
}

// Packing list with checked state
export interface PackingItem {
  item: string;
  checked: boolean;
  category: string;
}
