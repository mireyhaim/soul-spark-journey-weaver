
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Pencil } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProfileHeaderProps {
  name: string;
  email: string;
  joinedDate: string;
  level?: number;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ name, email, joinedDate, level }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const { toast } = useToast();

  const handleSaveChanges = () => {
    // Here you would typically save the changes to a database
    // For now, we'll just show a toast message
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully."
    });
    setIsDialogOpen(false);
    // In a real implementation, you would update the parent component's state
    // or trigger a refetch of the user data
  };

  return (
    <>
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
          <p className="text-earth-500 text-sm mt-1">Member since {joinedDate}</p>
        </div>
        <div>
          <Button 
            variant="outline" 
            onClick={() => setIsDialogOpen(true)}
            className="flex items-center gap-2"
          >
            <Pencil size={16} />
            Edit Profile
          </Button>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                value={email}
                disabled
                className="col-span-3 bg-gray-100"
              />
              <div className="col-span-4 text-xs text-gray-500 text-right">
                Email cannot be changed
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleSaveChanges}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
