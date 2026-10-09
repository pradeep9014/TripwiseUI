import React, { useState } from 'react';
import type { PackingCategory, PackingItem } from '../types';
import { CheckSquare, Square } from 'lucide-react';

interface PackingListProps {
  packingList: PackingCategory[];
}

const PackingList: React.FC<PackingListProps> = ({ packingList }) => {
  const [items, setItems] = useState<PackingItem[]>(() =>
    packingList.flatMap((cat) =>
      cat.items.map((item) => ({ item, checked: false, category: cat.category }))
    )
  );

  const toggleItem = (index: number) => {
    setItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, checked: !item.checked } : item))
    );
  };

  const checkedCount = items.filter((i) => i.checked).length;
  const totalCount = items.length;
  const progressPercent = totalCount > 0 ? (checkedCount / totalCount) * 100 : 0;

  // Group by category
  const grouped = packingList.map((cat) => ({
    ...cat,
    itemsWithState: items.filter((i) => i.category === cat.category),
  }));

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
          🎒 Packing List
        </h3>
        <span className="text-xs text-slate-500 bg-slate-800 px-3 py-1 rounded-full">
          {checkedCount} / {totalCount} packed
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-slate-800 rounded-full mb-5 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${progressPercent}%`,
            background: progressPercent === 100
              ? '#10b981'
              : 'linear-gradient(90deg, #4f46e5, #7c3aed)',
          }}
        />
      </div>

      <div className="space-y-5">
        {grouped.map((group) => (
          <div key={group.category}>
            <h4 className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-2">
              {group.category}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {group.itemsWithState.map((item, itemIdx) => {
                const globalIdx = items.findIndex(
                  (i) => i.item === item.item && i.category === item.category
                );
                return (
                  <button
                    key={itemIdx}
                    type="button"
                    onClick={() => toggleItem(globalIdx)}
                    className="flex items-center gap-2.5 p-2.5 rounded-lg hover:bg-slate-800 transition-colors text-left w-full group"
                    aria-pressed={item.checked}
                  >
                    {item.checked ? (
                      <CheckSquare size={16} className="text-emerald-400 flex-shrink-0" />
                    ) : (
                      <Square size={16} className="text-slate-600 flex-shrink-0 group-hover:text-slate-400" />
                    )}
                    <span
                      className={`text-sm transition-all ${item.checked
                          ? 'text-slate-500 line-through decoration-slate-600'
                          : 'text-slate-300'
                        }`}
                    >
                      {item.item}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PackingList;
