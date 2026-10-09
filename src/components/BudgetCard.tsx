import React from 'react';
import type { BudgetBreakdown } from '../types';
import { formatCurrency } from '../utils';
import { Home, Utensils, Car, Star, Package } from 'lucide-react';

interface BudgetCardProps {
  budget: BudgetBreakdown;
}

const budgetItems = [
  { key: 'accommodation' as const, label: 'Accommodation', icon: Home, color: '#818cf8' },
  { key: 'food' as const, label: 'Food & Dining', icon: Utensils, color: '#fb923c' },
  { key: 'transportation' as const, label: 'Transportation', icon: Car, color: '#34d399' },
  { key: 'activities' as const, label: 'Activities', icon: Star, color: '#f472b6' },
  { key: 'miscellaneous' as const, label: 'Miscellaneous', icon: Package, color: '#a78bfa' },
];

const BudgetCard: React.FC<BudgetCardProps> = ({ budget }) => {
  return (
    <div className="card p-6">
      <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-5">
        💰 Budget Breakdown
      </h3>

      <div className="space-y-3 mb-6">
        {budgetItems.map((item) => {
          const amount = budget[item.key];
          const percent = budget.total > 0 ? (amount / budget.total) * 100 : 0;
          return (
            <div key={item.key}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <item.icon size={14} style={{ color: item.color }} />
                  <span className="text-sm text-slate-300">{item.label}</span>
                </div>
                <span className="text-sm font-semibold text-white">
                  {formatCurrency(amount, budget.currency)}
                </span>
              </div>
              <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000"
                  style={{
                    width: `${percent}%`,
                    backgroundColor: item.color,
                  }}
                />
              </div>
              <div className="text-xs text-slate-600 mt-0.5 text-right">
                {percent.toFixed(0)}%
              </div>
            </div>
          );
        })}
      </div>

      {/* Total */}
      <div className="border-t border-slate-700 pt-4 flex items-center justify-between">
        <div>
          <div className="text-sm text-slate-400">Estimated Total</div>
          <div className="text-2xl font-bold text-white mt-0.5">
            {formatCurrency(budget.total, budget.currency)}
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-slate-500">Per category shown</div>
          <div className="text-xs text-slate-500">above based on AI estimate</div>
        </div>
      </div>
    </div>
  );
};

export default BudgetCard;
