
// This is a read-only file, but we need to adapt it to include our admin link if the user is an admin.
// We will create a new HeaderWithAdmin component that wraps the original Header component.
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const HeaderWithAdmin: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  useEffect(() => {
    const checkIfAdmin = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user?.email === 'mireymol@gmail.com') {
        setIsAdmin(true);
      }
    };
    
    checkIfAdmin();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAdmin(session?.user?.email === 'mireymol@gmail.com');
    });
    
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Don't show admin link if already on admin page
  if (isAdminPage) {
    return (
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="text-xl font-semibold">InFlow</Link>
            <Link to="/" className="text-sm text-gray-600 flex items-center gap-1">
              <span>← Back to Site</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <Header />
      {isAdmin && (
        <div className="absolute top-4 right-4 z-50">
          <Link
            to="/admin/users"
            className="flex items-center gap-1 bg-primary text-white px-3 py-1 rounded-full text-xs font-medium hover:bg-primary/90 transition-colors"
          >
            <Shield className="h-3 w-3" />
            <span>Admin</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default HeaderWithAdmin;
