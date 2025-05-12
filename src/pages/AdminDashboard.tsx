
import { useEffect, useState } from "react";
import { Navigate, Link, Outlet, useLocation } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";

const ADMIN_EMAIL = "mireymol@gmail.com";

const AdminDashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      setLoading(false);
    };
    
    checkUser();
    
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });
    
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }
  
  // Redirect if not logged in or not an admin
  if (!user || user.email !== ADMIN_EMAIL) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  
  const currentPath = location.pathname.split('/').pop() || 'users';
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-4">{user.email}</span>
              <button 
                onClick={() => supabase.auth.signOut()} 
                className="text-sm text-red-600 hover:text-red-800"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Tabs value={currentPath} className="mb-6">
          <TabsList className="w-full justify-start bg-white p-0 border-b">
            <Link to="/admin/users">
              <TabsTrigger value="users" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none pb-3">
                🧍 Users
              </TabsTrigger>
            </Link>
            <Link to="/admin/revenue">
              <TabsTrigger value="revenue" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none pb-3">
                💳 Revenue
              </TabsTrigger>
            </Link>
            <Link to="/admin/journeys">
              <TabsTrigger value="journeys" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none pb-3">
                📦 Journeys
              </TabsTrigger>
            </Link>
            <Link to="/admin/creators">
              <TabsTrigger value="creators" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none pb-3">
                🧑‍🏫 Creators
              </TabsTrigger>
            </Link>
            <Link to="/admin/tracking">
              <TabsTrigger value="tracking" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none pb-3">
                📊 Tracking
              </TabsTrigger>
            </Link>
            <Link to="/admin/interactions">
              <TabsTrigger value="interactions" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none pb-3">
                🧠 Interactions
              </TabsTrigger>
            </Link>
          </TabsList>
        </Tabs>
        
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
