
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProcessCard, { ProcessCardProps } from '@/components/ProcessCard';
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
import { Search, Filter } from 'lucide-react';

// Journey data with different categories
const journeys: ProcessCardProps[] = [
  // Personal Development
  {
    id: '1',
    title: 'Journey to Self-Discovery',
    description: 'Discover your true potential and purpose through guided reflection and powerful exercises.',
    teacher: 'Dr. Maya Williams',
    duration: 14,
    category: 'Personal Development',
    image: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '2',
    title: 'Emotional Intelligence Mastery',
    description: 'Learn to understand and manage your emotions while developing deeper empathy for others.',
    teacher: 'Alex Thompson',
    duration: 21,
    category: 'Personal Development',
    image: 'https://images.unsplash.com/photo-1517021897933-0e0319cfbc28?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '3',
    title: 'Productivity Transformation',
    description: 'Overcome procrastination and develop effective habits for achieving your goals.',
    teacher: 'Sam Parker',
    duration: 10,
    category: 'Personal Development',
    image: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  
  // Spirituality
  {
    id: '4',
    title: 'Connecting with Higher Self',
    description: 'Deepen your spiritual connection and access guidance from your higher consciousness.',
    teacher: 'Sarah Jenkins',
    duration: 14,
    category: 'Spirituality',
    image: 'https://images.unsplash.com/photo-1519834089823-98c3acc30f4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '5',
    title: 'Chakra Balancing Journey',
    description: 'Harmonize your energy centers to achieve spiritual, emotional and physical wellbeing.',
    teacher: 'Priya Sharma',
    duration: 7,
    category: 'Spirituality',
    image: 'https://images.unsplash.com/photo-1531171074112-c2df70c58d88?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '6',
    title: 'Sacred Meditation Practices',
    description: 'Explore ancient meditation techniques to deepen your connection with the divine.',
    teacher: 'Michael Chen',
    duration: 21,
    category: 'Spirituality',
    image: 'https://images.unsplash.com/photo-1536623975707-c4b3b2af565d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  
  // Consciousness
  {
    id: '7',
    title: 'Expanding Consciousness',
    description: 'Move beyond limiting beliefs and expand your awareness of reality and possibility.',
    teacher: 'Dr. Robert James',
    duration: 14,
    category: 'Consciousness',
    image: 'https://images.unsplash.com/photo-1510797215324-95aa89f43c33?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '8',
    title: 'Lucid Dreaming Practice',
    description: 'Learn to become conscious within your dreams and unlock the wisdom of your subconscious.',
    teacher: 'Emma Rodriguez',
    duration: 21,
    category: 'Consciousness',
    image: 'https://images.unsplash.com/photo-1536612678580-2c470ec775e5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '9',
    title: 'Mindful Awareness Training',
    description: 'Cultivate present-moment awareness to transcend thought patterns and access deeper states.',
    teacher: 'David Kim',
    duration: 14,
    category: 'Consciousness',
    image: 'https://images.unsplash.com/photo-1497561813398-8fcc7a37b567?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  
  // Reality Manifestation
  {
    id: '10',
    title: 'Manifest Your Dream Life',
    description: 'Learn powerful reality creation techniques to shape your experiences and outcomes.',
    teacher: 'Jennifer Wilson',
    duration: 21,
    category: 'Reality Manifestation',
    image: 'https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '11',
    title: 'Vision Board Manifestation',
    description: 'Create a powerful visual representation of your desires and activate the law of attraction.',
    teacher: 'Marcus Johnson',
    duration: 7,
    category: 'Reality Manifestation',
    image: 'https://images.unsplash.com/photo-1516796181074-bf453fbfa3e6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '12',
    title: 'Quantum Manifestation Method',
    description: 'Use cutting-edge understanding of quantum physics to influence your reality consciously.',
    teacher: 'Dr. Serena Lee',
    duration: 14,
    category: 'Reality Manifestation',
    image: 'https://images.unsplash.com/photo-1547149175-bb4dfa2f3177?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  
  // Abundance Manifestation
  {
    id: '13',
    title: 'Abundance Meditation',
    description: 'Open yourself to receive abundance in all areas of your life through mindfulness and gratitude.',
    teacher: 'Sarah Jenkins',
    duration: 14,
    category: 'Abundance Manifestation',
    image: 'https://images.unsplash.com/photo-1502139214982-d0ad755818d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '14',
    title: 'Financial Freedom Journey',
    description: 'Transform your relationship with money and create a foundation for lasting prosperity.',
    teacher: 'Jonathan Taylor',
    duration: 21,
    category: 'Abundance Manifestation',
    image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '15',
    title: 'Abundance Mindset Activation',
    description: 'Release scarcity thinking and embrace the natural flow of abundance in your life.',
    teacher: 'Olivia Martinez',
    duration: 14,
    category: 'Abundance Manifestation',
    image: 'https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  }
];

const categories = [
  'All',
  'Personal Development',
  'Spirituality', 
  'Consciousness',
  'Reality Manifestation',
  'Abundance Manifestation'
];

const Journeys: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Filter journeys based on active tab and search query
  const filteredJourneys = journeys.filter(journey => {
    const matchesCategory = activeTab === 'All' || journey.category === activeTab;
    const matchesSearch = journey.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          journey.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          journey.teacher.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-earth-50/30 py-10 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-serif font-semibold mb-3">
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
          
          {/* Category Tabs */}
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
                  {filteredJourneys.map((journey) => (
                    <ProcessCard key={journey.id} {...journey} />
                  ))}
                </div>
                
                {filteredJourneys.length === 0 && (
                  <div className="text-center py-16">
                    <h3 className="text-xl font-medium mb-2">No journeys found</h3>
                    <p className="text-earth-600">Try adjusting your search or filters</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </ScrollArea>
          
          {/* Pagination */}
          <Pagination className="mt-10">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Journeys;
