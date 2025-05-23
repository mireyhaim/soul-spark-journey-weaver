
import React from 'react';
import { Button } from "@/components/ui/button";
import { Sparkles } from 'lucide-react';

interface CategoryFilterProps {
  categories: string[];
  activeTab: string;
  setActiveTab: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories, activeTab, setActiveTab }) => {
  return (
    <div className="mb-12 bg-white rounded-xl p-6 shadow-md border border-spirit-100 animate-fade-in">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-serif font-semibold flex items-center gap-2 text-spirit-700">
          <Sparkles className="h-6 w-6 text-spirit-500" /> 
          <span>Browse by Category</span>
        </h2>
      </div>
      
      <div className="flex flex-wrap gap-3 mb-4">
        {categories.map((category) => (
          <Button
            key={category}
            variant={activeTab === category ? "default" : "outline"}
            className={`h-auto py-2.5 px-5 rounded-full transition-all duration-300 text-sm font-medium ${
              activeTab === category 
                ? 'bg-spirit-600 hover:bg-spirit-700 shadow-md scale-105' 
                : 'hover:bg-spirit-50 hover:text-spirit-700 border-spirit-200'
            }`}
            onClick={() => setActiveTab(category)}
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
