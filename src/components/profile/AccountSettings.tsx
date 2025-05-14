
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import { supabase } from "@/integrations/supabase/client";

export const AccountSettings: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast("You have been logged out.");
      navigate('/');
    } catch (error) {
      toast("Failed to log out. Please try again.");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
        <CardDescription>Update your account settings</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h3 className="font-medium">Notification Preferences</h3>
          <p className="text-sm text-earth-500">
            Coming soon - Options to manage email and website notifications
          </p>
        </div>
        
        <div className="space-y-2">
          <h3 className="font-medium">Account Details</h3>
          <p className="text-sm text-earth-500">
            Coming soon - Options to update account details
          </p>
        </div>
        
        <div>
          <Button variant="destructive" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
