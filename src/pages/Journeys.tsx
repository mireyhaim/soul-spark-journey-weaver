
import React, { useState, useEffect } from 'react';
import { journeys } from '@/data/journeys';
import JourneysHero from '@/components/journeys/JourneysHero';
import CategoryFilter from '@/components/journeys/CategoryFilter';
import FilterControls from '@/components/journeys/FilterControls';
import JourneyGrid from '@/components/journeys/JourneyGrid';
import JourneyPagination from '@/components/journeys/JourneyPagination';

// Categories list
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

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchQuery]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-earth-50/30 to-spirit-50/30 py-12 px-4 md:px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Hero Section */}
        <JourneysHero searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        
        {/* Category Filters */}
        <CategoryFilter 
          categories={categories} 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
        />
        
        {/* Filter Controls */}
        <FilterControls activeTab={activeTab} filteredJourneys={filteredJourneys} />
        
        {/* Journey Cards */}
        <JourneyGrid 
          currentJourneys={currentJourneys}
          filteredJourneys={filteredJourneys}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setActiveTab={setActiveTab}
        />
        
        {/* Pagination */}
        {filteredJourneys.length > 0 && (
          <JourneyPagination 
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        )}
      </div>
    </main>
  );
};

export default Journeys;
