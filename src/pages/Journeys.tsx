
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Filter, Grid3x3, Menu } from 'lucide-react';
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
  const [displayMode, setDisplayMode] = useState<'tabs' | 'grid' | 'dropdown'>('tabs');
  
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

  // Handle category selection from dropdown
  const handleCategorySelect = (value: string) => {
    setActiveTab(value);
    setCurrentPage(1);
  };

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchQuery]);

  return (
    <main className="flex-grow bg-earth-50/30 py-10 px-4 md:px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-sans font-semibold mb-3">
            Explore Journeys
          </h1>
          <p className="text-earth-700 md:text-lg max-w-3xl">
            Discover transformative spiritual and personal development journeys created by experienced teachers and guides.
          </p>
        </div>
        
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-earth-500" size={18} />
            <Input
              placeholder="Search journeys, teachers..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex border rounded-md overflow-hidden">
              <Button 
                variant="ghost" 
                size="sm" 
                className={`gap-2 ${displayMode === 'tabs' ? 'bg-spirit-100' : ''}`}
                onClick={() => setDisplayMode('tabs')}
              >
                <Menu size={16} />
                <span className="hidden sm:inline">List</span>
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className={`gap-2 ${displayMode === 'grid' ? 'bg-spirit-100' : ''}`}
                onClick={() => setDisplayMode('grid')}
              >
                <Grid3x3 size={16} />
                <span className="hidden sm:inline">Grid</span>
              </Button>
            </div>
            
            <Button variant="outline" size="sm" className="gap-2">
              <Filter size={16} />
              <span className="hidden sm:inline">Filter</span>
            </Button>
            <Button variant="outline" size="sm">
              Popular
            </Button>
            <Button variant="outline" size="sm">
              Newest
            </Button>
          </div>
        </div>
        
        {/* Category Selection UI based on display mode */}
        {displayMode === 'tabs' && (
          <ScrollArea className="w-full mb-8">
            <Tabs defaultValue="All" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-6 w-full justify-start bg-transparent p-0 h-auto overflow-auto">
                {categories.map((category) => (
                  <TabsTrigger 
                    key={category} 
                    value={category}
                    className="py-2 px-4 data-[state=active]:bg-spirit-100 data-[state=active]:text-spirit-800 rounded-full border"
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {/* Journeys Grid */}
              <TabsContent value={activeTab} className="mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentJourneys.map((journey) => (
                    <div key={journey.id} className="flex flex-col h-full">
                      <ProcessCard key={journey.id} {...journey} />
                    </div>
                  ))}
                </div>
                
                {filteredJourneys.length === 0 && (
                  <div className="text-center py-16">
                    <h3 className="text-xl font-sans font-medium mb-2">No journeys found</h3>
                    <p className="text-earth-600">Try adjusting your search or filters</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </ScrollArea>
        )}

        {displayMode === 'dropdown' && (
          <div className="mb-8">
            <div className="max-w-xs mb-6">
              <Select value={activeTab} onValueChange={handleCategorySelect}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentJourneys.map((journey) => (
                <div key={journey.id} className="flex flex-col h-full">
                  <ProcessCard key={journey.id} {...journey} />
                </div>
              ))}
            </div>
            
            {filteredJourneys.length === 0 && (
              <div className="text-center py-16">
                <h3 className="text-xl font-sans font-medium mb-2">No journeys found</h3>
                <p className="text-earth-600">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        )}

        {displayMode === 'grid' && (
          <div className="mb-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4 mb-8">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={activeTab === category ? "default" : "outline"}
                  className={`h-auto py-3 px-4 text-center justify-center ${activeTab === category ? 'bg-spirit-600 hover:bg-spirit-700' : ''}`}
                  onClick={() => setActiveTab(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentJourneys.map((journey) => (
                <div key={journey.id} className="flex flex-col h-full">
                  <ProcessCard key={journey.id} {...journey} />
                </div>
              ))}
            </div>
            
            {filteredJourneys.length === 0 && (
              <div className="text-center py-16">
                <h3 className="text-xl font-sans font-medium mb-2">No journeys found</h3>
                <p className="text-earth-600">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        )}
        
        {/* Pagination */}
        {filteredJourneys.length > 0 && totalPages > 1 && (
          <Pagination className="mt-10">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
              
              {[...Array(totalPages)].map((_, i) => (
                <PaginationItem key={i + 1}>
                  <PaginationLink
                    onClick={() => handlePageChange(i + 1)}
                    isActive={currentPage === i + 1}
                    className="cursor-pointer"
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
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
