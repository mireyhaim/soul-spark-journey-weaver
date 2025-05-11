
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export interface ProcessCardProps {
  id: string;
  title: string;
  description: string;
  teacher: string;
  duration: number;
  category: string;
  image?: string;
}

// Category-specific placeholder images
const categoryImages: Record<string, string> = {
  "Personal Development": "https://images.unsplash.com/photo-1518495973542-4542c06a5843",
  "Spirituality": "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb",
  "Consciousness": "https://images.unsplash.com/photo-1500673922987-e212871fec22",
  "Reality Manifestation": "https://images.unsplash.com/photo-1501854140801-50d01698950b",
  "Abundance Manifestation": "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
  "Forgiveness": "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843",
  "Abundance": "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
  "Healing": "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb",
  "Relationships": "https://images.unsplash.com/photo-1518495973542-4542c06a5843",
};

// Get appropriate image for the card based on category
const getProcessImage = (category: string, providedImage?: string): string => {
  if (providedImage) return providedImage;
  
  // Return category-specific image or a default one
  return categoryImages[category] || "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb";
};

// Calculate price based on journey duration
const getJourneyPrice = (duration: number): number => {
  if (duration <= 7) return 11;
  if (duration <= 14) return 15;
  return 27;
};

const ProcessCard: React.FC<ProcessCardProps> = ({
  id,
  title,
  description,
  teacher,
  duration,
  category,
  image
}) => {
  const cardImage = getProcessImage(category, image);
  const price = getJourneyPrice(duration);
  
  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-md">
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={cardImage} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
        <Badge className="absolute top-2 right-2 bg-white/80 text-earth-800 hover:bg-white">
          {duration} days
        </Badge>
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{title}</CardTitle>
          <Badge variant="outline" className="text-xs font-normal">
            {category}
          </Badge>
        </div>
        <CardDescription className="text-sm">By {teacher}</CardDescription>
      </CardHeader>
      
      <CardContent>
        <p className="text-sm text-earth-600 line-clamp-2">
          {description}
        </p>
        <p className="text-sm text-spirit-700 font-semibold mt-2">
          ${price}
        </p>
      </CardContent>
      
      <CardFooter>
        <Button className="w-full" asChild>
          <Link to={`/journey/${id}`}>Start Journey</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProcessCard;
