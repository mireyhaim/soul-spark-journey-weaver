
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProcessCard from '@/components/ProcessCard';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Filter, Sparkles, LayoutGrid } from 'lucide-react';
import { journeys } from '@/data/journeys';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const categories = [
  'All',
  'Personal Development',
  'Spirituality', 
  'Consciousness',
  'Reality Manifestation',
  'Abundance Manifestation',
  'Relationships',
  'Career Development',
  'Emotional Healing',
  'Feminine Power',
  'Energy & Healing',
  'Productivity',
  'Business Development'
];

const JOURNEYS_PER_PAGE = 9;

const Journeys: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [expandedCategories, setExpandedCategories] = useState<boolean>(false);
  
  // Filter journeys based on active tab and search query
  const filteredJourneys = journeys.filter(journey => {
    const matchesCategory = activeTab === 'All' || journey.category === activeTab;
    const matchesSearch = journey.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          journey.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          journey.teacher.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  // Calculate total pages
  const totalPages = Math.ceil(filteredJourneys.length / JOURNEYS_PER_PAGE);
  
  // Get current page journeys
  const currentJourneys = filteredJourneys.slice(
    (currentPage - 1) * JOURNEYS_PER_PAGE,
    currentPage * JOURNEYS_PER_PAGE
  );

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when changing page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toggle expanded categories view
  const toggleCategoriesView = () => {
    setExpandedCategories(!expandedCategories);
  };

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchQuery]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-earth-50/30 to-spirit-50/30 py-12 px-4 md:px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Hero Section */}
        <div className="relative mb-14 rounded-2xl overflow-hidden bg-gradient-to-r from-spirit-100 to-calm-50 p-8 md:p-12 shadow-lg">
          <div className="absolute top-0 right-0 w-64 h-64 bg-spirit-200/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-calm-200/20 rounded-full translate-y-1/2 -translate-x-1/4 blur-2xl"></div>
          
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-serif font-semibold mb-3 text-earth-900">
              Discover Your <span className="text-spirit-600">Perfect Journey</span>
            </h1>
            
            <p className="text-lg text-earth-700 max-w-2xl mb-6">
              Explore our collection of transformative spiritual and personal development journeys, 
              thoughtfully created by experienced teachers and guides to help you thrive.
            </p>
            
            <div className="relative w-full md:max-w-lg">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-earth-500" size={18} />
              <Input
                placeholder="Search journeys, teachers, or topics..."
                className="pl-10 pr-4 py-6 shadow-md focus-within:ring-2 focus-within:ring-spirit-300 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
        
        {/* Category Filters - Enhanced Visibility */}
        <div className="mb-12 bg-white rounded-xl p-6 shadow-md border border-spirit-100 animate-fade-in">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-2xl font-serif font-semibold flex items-center gap-2 text-spirit-700">
              <Sparkles className="h-6 w-6 text-spirit-500" /> 
              <span>Browse by Category</span>
            </h2>
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2 border-spirit-200 hover:bg-spirit-50 flex items-center"
              onClick={toggleCategoriesView}
            >
              <LayoutGrid size={16} className="text-spirit-600" />
              {expandedCategories ? "Show Less" : "Show All"}
            </Button>
          </div>
          
          {/* Always visible categories - top row */}
          <div className="flex flex-wrap gap-3 mb-4">
            {categories.slice(0, 6).map((category) => (
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
          
          {/* Expandable categories - additional rows */}
          {expandedCategories && (
            <div className="flex flex-wrap gap-3 pt-4 border-t border-spirit-100 animate-fade-in">
              {categories.slice(6).map((category) => (
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
          )}
          
          {/* Category counts */}
          <div className="mt-4 pt-4 border-t border-spirit-100 flex flex-wrap gap-2 text-xs text-earth-600">
            {categories.slice(0, expandedCategories ? categories.length : 5).map(category => {
              const count = category === 'All' 
                ? journeys.length 
                : journeys.filter(j => j.category === category).length;
              
              return (
                <div 
                  key={category} 
                  className={`px-3 py-1.5 rounded-full ${activeTab === category ? 'bg-spirit-100 text-spirit-700 font-medium' : 'bg-earth-50'}`}
                >
                  {category}: {count}
                </div>
              );
            })}
            {!expandedCategories && (
              <div className="px-3 py-1.5 rounded-full bg-earth-50 cursor-pointer hover:bg-spirit-50" onClick={toggleCategoriesView}>
                +{categories.length - 5} more
              </div>
            )}
          </div>
        </div>
        
        {/* Filter Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center text-xl font-serif font-medium text-earth-800">
            {activeTab === 'All' ? 'All Journeys' : activeTab} 
            <span className="ml-2 text-sm text-earth-600 font-sans font-normal">
              ({filteredJourneys.length} journeys)
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2 border-spirit-200 hover:bg-spirit-50">
              <Filter size={16} className="text-spirit-600" />
              <span className="hidden sm:inline">Filter</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="border-spirit-200 hover:bg-spirit-50 hover:text-spirit-700"
            >
              Popular
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="border-spirit-200 hover:bg-spirit-50 hover:text-spirit-700"
            >
              Newest
            </Button>
          </div>
        </div>
        
        {/* Journey Cards */}
        <div className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            {currentJourneys.map((journey, index) => (
              <div key={journey.id} 
                className="group transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
                style={{ animationDelay: `${0.1 * index}s` }}>
                <ProcessCard key={journey.id} {...journey} />
              </div>
            ))}
          </div>
          
          {filteredJourneys.length === 0 && (
            <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-earth-100 animate-fade-in">
              <div className="mx-auto w-16 h-16 mb-4 rounded-full bg-earth-100 flex items-center justify-center">
                <Search size={24} className="text-earth-500" />
              </div>
              <h3 className="text-xl font-sans font-medium mb-2">No journeys found</h3>
              <p className="text-earth-600 mb-4">Try adjusting your search or filters</p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery('');
                  setActiveTab('All');
                }}
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>
        
        {/* Pagination */}
        {filteredJourneys.length > 0 && totalPages > 1 && (
          <Pagination className="mt-10">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  className={`${currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer hover:bg-spirit-50"}`}
                />
              </PaginationItem>
              
              {[...Array(totalPages)].map((_, i) => (
                <PaginationItem key={i + 1}>
                  <PaginationLink
                    onClick={() => handlePageChange(i + 1)}
                    isActive={currentPage === i + 1}
                    className={`cursor-pointer transition-colors ${
                      currentPage === i + 1 
                        ? 'bg-spirit-100 text-spirit-700 border border-spirit-200 font-medium'
                        : 'hover:bg-spirit-50 hover:text-spirit-700'
                    }`}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  className={`${currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer hover:bg-spirit-50"}`}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </main>
  );
};

export default Journeys;
