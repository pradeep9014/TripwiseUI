import type { Itinerary, PackingItem } from '../types';

const STORAGE_KEY = 'tripwise_saved_trip';

export const storageUtils = {
  saveTrip: (itinerary: Itinerary): void => {
    try {
      const data = {
        itinerary,
        savedAt: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.warn('Failed to save trip to localStorage:', error);
    }
  },

  loadTrip: (): { itinerary: Itinerary; savedAt: string } | null => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      return JSON.parse(raw) as { itinerary: Itinerary; savedAt: string };
    } catch (error) {
      console.warn('Failed to load trip from localStorage:', error);
      return null;
    }
  },

  clearTrip: (): void => {
    localStorage.removeItem(STORAGE_KEY);
  },

  hasSavedTrip: (): boolean => {
    return localStorage.getItem(STORAGE_KEY) !== null;
  },
};

export const packingUtils = {
  initializePackingList: (itinerary: Itinerary): PackingItem[] => {
    return itinerary.packingList.flatMap((category) =>
      category.items.map((item) => ({
        item,
        checked: false,
        category: category.category,
      }))
    );
  },

  savePackingList: (items: PackingItem[], tripDestination: string): void => {
    try {
      localStorage.setItem(
        `tripwise_packing_${tripDestination}`,
        JSON.stringify(items)
      );
    } catch (error) {
      console.warn('Failed to save packing list:', error);
    }
  },

  loadPackingList: (tripDestination: string): PackingItem[] | null => {
    try {
      const raw = localStorage.getItem(`tripwise_packing_${tripDestination}`);
      if (!raw) return null;
      return JSON.parse(raw) as PackingItem[];
    } catch {
      return null;
    }
  },
};

export const formatCurrency = (amount: number, currency: string): string => {
  const symbols: Record<string, string> = {
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
  const symbol = symbols[currency] || currency;
  return `${symbol}${amount.toLocaleString()}`;
};

export const formatDate = (dateStr: string): string => {
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return dateStr;
  }
};

export const getWeatherIconUrl = (icon: string): string => {
  return `https://openweathermap.org/img/wn/${icon}@2x.png`;
};
