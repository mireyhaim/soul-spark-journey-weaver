
import React from 'react';
import { Button } from "@/components/ui/button";

interface ProfileHeaderProps {
  name: string;
  email: string;
  joinedDate: string;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ name, email, joinedDate }) => {
  return (
    <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
      <div className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 bg-spirit-100 rounded-full flex items-center justify-center text-2xl md:text-3xl font-bold text-spirit-600">
        {name.charAt(0)}
      </div>
      <div className="flex-grow">
        <h1 className="text-2xl md:text-3xl font-bold mb-1 font-sans">{name}</h1>
        <p className="text-earth-600">{email}</p>
        <p className="text-earth-500 text-sm mt-1">Member since {joinedDate}</p>
      </div>
      <div>
        <Button variant="outline">Edit Profile</Button>
      </div>
    </div>
  );
};
