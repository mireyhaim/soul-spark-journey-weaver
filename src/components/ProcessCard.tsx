
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

const ProcessCard: React.FC<ProcessCardProps> = ({
  id,
  title,
  description,
  teacher,
  duration,
  category,
  image
}) => {
  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-md">
      <div className="relative aspect-video overflow-hidden">
        {image ? (
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-spirit-400 to-calm-400 flex items-center justify-center">
            <span className="font-serif text-white text-2xl">{title.charAt(0)}</span>
          </div>
        )}
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
