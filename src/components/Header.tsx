
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const Header: React.FC = () => {
  return (
    <header className="py-4 px-4 md:px-6 border-b">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full spirit-gradient flex items-center justify-center">
              <span className="text-white font-serif text-lg">S</span>
            </div>
            <span className="font-serif text-xl md:text-2xl font-semibold">SoulPath</span>
          </Link>
          
          <nav className="hidden md:flex space-x-6 items-center">
            <Link to="/" className="text-sm font-medium hover:text-spirit-600 transition-colors">
              Home
            </Link>
            <Link to="/journeys" className="text-sm font-medium hover:text-spirit-600 transition-colors">
              Journeys
            </Link>
            <Link to="/mentor" className="text-sm font-medium hover:text-spirit-600 transition-colors">
              For Mentors
            </Link>
          </nav>
          
          <div className="flex items-center space-x-3">
            <Button variant="outline" className="hidden md:flex" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button className="bg-spirit-600 hover:bg-spirit-700" asChild>
              <Link to="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
