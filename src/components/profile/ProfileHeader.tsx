
import React from 'react';
import { Button } from "@/components/ui/button";

interface ProfileHeaderProps {
  name: string;
  email: string;
  joinedDate: string;
  level?: number;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ name, email, joinedDate, level }) => {
  return (
    <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
      <div className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 bg-spirit-100 rounded-full flex items-center justify-center text-2xl md:text-3xl font-bold text-spirit-600 relative">
        {name.charAt(0)}
        {level !== undefined && (
          <div className="absolute -bottom-1 -right-1 bg-spirit-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm border-2 border-white">
            {level}
          </div>
        )}
      </div>
      <div className="flex-grow">
        <h1 className="text-2xl md:text-3xl font-bold mb-1 font-sans">{name}</h1>
        <p className="text-earth-600">{email}</p>
        <p className="text-earth-500 text-sm mt-1">חבר/ה מאז {joinedDate}</p>
      </div>
      <div>
        <Button variant="outline">ערוך פרופיל</Button>
      </div>
    </div>
  );
};
