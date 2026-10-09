export const TRIP_PURPOSES = [
  { value: 'vacation', label: 'Vacation', emoji: '🏖️' },
  { value: 'adventure', label: 'Adventure', emoji: '🧗' },
  { value: 'honeymoon', label: 'Honeymoon', emoji: '💑' },
  { value: 'family', label: 'Family', emoji: '👨‍👩‍👧‍👦' },
  { value: 'business', label: 'Business', emoji: '💼' },
  { value: 'solo', label: 'Solo', emoji: '🧳' },
  { value: 'weekend-getaway', label: 'Weekend Getaway', emoji: '🌿' },
  { value: 'other', label: 'Other', emoji: '✈️' },
];

export const TRAVELLER_TYPES = [
  { value: 'solo', label: 'Solo', emoji: '🧳' },
  { value: 'couple', label: 'Couple', emoji: '💑' },
  { value: 'friends', label: 'Friends', emoji: '👫' },
  { value: 'family', label: 'Family', emoji: '👨‍👩‍👧' },
  { value: 'family-with-children', label: 'Family with Kids', emoji: '👶' },
  { value: 'group', label: 'Group', emoji: '👥' },
];

export const INTERESTS = [
  { value: 'beaches', label: 'Beaches', emoji: '🏖️' },
  { value: 'mountains', label: 'Mountains', emoji: '⛰️' },
  { value: 'adventure', label: 'Adventure', emoji: '🧗' },
  { value: 'food', label: 'Food', emoji: '🍜' },
  { value: 'nightlife', label: 'Nightlife', emoji: '🎉' },
  { value: 'shopping', label: 'Shopping', emoji: '🛍️' },
  { value: 'nature', label: 'Nature', emoji: '🌿' },
  { value: 'culture', label: 'Culture', emoji: '🏛️' },
  { value: 'photography', label: 'Photography', emoji: '📸' },
  { value: 'history', label: 'History', emoji: '📜' },
  { value: 'wildlife', label: 'Wildlife', emoji: '🦁' },
  { value: 'relaxation', label: 'Relaxation', emoji: '🧘' },
  { value: 'local-experiences', label: 'Local Experiences', emoji: '🤝' },
  { value: 'wellness', label: 'Wellness & Spa', emoji: '💆' },
];

export const BUDGET_CATEGORIES = [
  {
    value: 'budget',
    label: 'Budget',
    description: 'Hostels, street food, public transport',
    emoji: '💰',
  },
  {
    value: 'moderate',
    label: 'Moderate',
    description: '3-star hotels, casual dining, mix of transport',
    emoji: '💳',
  },
  {
    value: 'premium',
    label: 'Premium',
    description: '4-star hotels, nice restaurants, comfortable travel',
    emoji: '⭐',
  },
  {
    value: 'luxury',
    label: 'Luxury',
    description: '5-star resorts, fine dining, private transfers',
    emoji: '✨',
  },
];

export const CURRENCIES = [
  { value: 'INR', label: 'INR (₹)', symbol: '₹' },
  { value: 'USD', label: 'USD ($)', symbol: '$' },
  { value: 'EUR', label: 'EUR (€)', symbol: '€' },
  { value: 'GBP', label: 'GBP (£)', symbol: '£' },
  { value: 'AED', label: 'AED (د.إ)', symbol: 'د.إ' },
  { value: 'SGD', label: 'SGD (S$)', symbol: 'S$' },
  { value: 'THB', label: 'THB (฿)', symbol: '฿' },
  { value: 'JPY', label: 'JPY (¥)', symbol: '¥' },
  { value: 'AUD', label: 'AUD (A$)', symbol: 'A$' },
];

export const CURRENCY_SYMBOLS: Record<string, string> = {
  INR: '₹',
  USD: '$',
  EUR: '€',
  GBP: '£',
  AED: 'د.إ',
  SGD: 'S$',
  THB: '฿',
  JPY: '¥',
  AUD: 'A$',
};

export const ACTIVITY_COLORS: Record<string, string> = {
  meal: 'bg-orange-100 text-orange-700 border-orange-200',
  attraction: 'bg-blue-100 text-blue-700 border-blue-200',
  transport: 'bg-purple-100 text-purple-700 border-purple-200',
  accommodation: 'bg-green-100 text-green-700 border-green-200',
  leisure: 'bg-pink-100 text-pink-700 border-pink-200',
  shopping: 'bg-yellow-100 text-yellow-700 border-yellow-200',
};

export const API_BASE_URL = '/api';

export const LOADING_STEPS = [
  'Understanding your preferences...',
  'Planning destinations & routes...',
  'Optimizing your daily schedule...',
  'Calculating budget breakdown...',
  'Adding local recommendations...',
  'Preparing your personalized itinerary...',
];
