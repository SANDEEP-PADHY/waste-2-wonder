import React from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { MOCK_CATEGORIES } from '../../data/mockData';
import { 
  Cpu, 
  Server, 
  BatteryCharging, 
  Laptop, 
  Smartphone, 
  Layers, 
  Activity,
  LayoutGrid
} from 'lucide-react';

export const CategoryBar: React.FC = () => {
  const { filterState, setFilterState } = useMarketplace();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu': return <Cpu className="w-4 h-4" />;
      case 'Server': return <Server className="w-4 h-4" />;
      case 'BatteryCharging': return <BatteryCharging className="w-4 h-4" />;
      case 'Laptop': return <Laptop className="w-4 h-4" />;
      case 'Smartphone': return <Smartphone className="w-4 h-4" />;
      case 'Layers': return <Layers className="w-4 h-4" />;
      case 'Activity': return <Activity className="w-4 h-4" />;
      default: return <Cpu className="w-4 h-4" />;
    }
  };

  const handleSelectCategory = (categoryName: string) => {
    setFilterState(prev => ({
      ...prev,
      category: prev.category === categoryName ? 'All' : categoryName,
      subcategory: '' // Reset subcategory when switching top category
    }));
  };

  return (
    <div className="bg-surface-pure border-b-2 border-ink-near py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
          {/* All category pill */}
          <button
            onClick={() => handleSelectCategory('All')}
            className={`flex items-center gap-2 px-4 py-2 rounded-brutal border-2 border-ink-near font-mono font-bold text-xs uppercase tracking-wider whitespace-nowrap transition-all shrink-0 ${
              filterState.category === 'All'
                ? 'bg-stormy-teal text-white shadow-brutal-sm'
                : 'bg-surface-canvas hover:bg-gray-100 text-ink-near'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            <span>All Lots</span>
          </button>

          {MOCK_CATEGORIES.map(cat => {
            const isSelected = filterState.category === cat.name;
            return (
              <button
                key={cat.id}
                onClick={() => handleSelectCategory(cat.name)}
                className={`flex items-center gap-2 px-4 py-2 rounded-brutal border-2 border-ink-near font-mono font-bold text-xs whitespace-nowrap transition-all shrink-0 ${
                  isSelected
                    ? 'bg-stormy-teal text-white shadow-brutal-sm'
                    : 'bg-surface-canvas hover:bg-gray-100 text-ink-near'
                }`}
              >
                <span className={isSelected ? 'text-papaya' : 'text-stormy-teal'}>
                  {getIcon(cat.icon)}
                </span>
                <span>{cat.name}</span>
                <span className={`px-1.5 py-0.2 rounded-brutal text-[10px] ${isSelected ? 'bg-stormy-dark text-white' : 'bg-gray-200 text-gunmetal'}`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
