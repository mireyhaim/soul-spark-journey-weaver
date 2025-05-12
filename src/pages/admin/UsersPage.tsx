
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";

const UsersPage = () => {
  const [usersCount, setUsersCount] = useState(0);
  const [newUsersThisMonth, setNewUsersThisMonth] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [recentUsers, setRecentUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserStats = async () => {
      setLoading(true);
      try {
        // Get total users count
        const { count: totalCount } = await supabase
          .from('users')
          .select('*', { count: 'exact', head: true });

        // Get new users this month
        const firstDayOfMonth = new Date();
        firstDayOfMonth.setDate(1);
        firstDayOfMonth.setHours(0, 0, 0, 0);
        
        const { count: newCount } = await supabase
          .from('users')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', firstDayOfMonth.toISOString());

        // Get active users (users with journey progress in the last 24 hours)
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        
        const { count: activeCount } = await supabase
          .from('user_journey_progress')
          .select('user_id', { count: 'exact', head: true })
          .gte('updated_at', yesterday.toISOString());

        // Get recent users with their details
        const { data: recentUsersData } = await supabase
          .from('users')
          .select(`
            id, 
            name, 
            email, 
            last_login,
            user_journey_progress (
              journey_id,
              current_day,
              journeys (
                title
              )
            )
          `)
          .order('created_at', { ascending: false })
          .limit(10);

        setUsersCount(totalCount || 0);
        setNewUsersThisMonth(newCount || 0);
        setActiveUsers(activeCount || 0);
        setRecentUsers(recentUsersData || []);
      } catch (error) {
        console.error("Error fetching user stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserStats();
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? "Loading..." : usersCount}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">New Users This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? "Loading..." : newUsersThisMonth}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Currently Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? "Loading..." : activeUsers}</div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Users</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-4">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead>Current Journey</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentUsers.length > 0 ? (
                  recentUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.name || "No name"}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.last_login ? new Date(user.last_login).toLocaleString() : "Never"}</TableCell>
                      <TableCell>
                        {user.user_journey_progress && user.user_journey_progress[0] ? (
                          <>
                            {user.user_journey_progress[0].journeys?.title || "Unknown"} 
                            (Day {user.user_journey_progress[0].current_day})
                          </>
                        ) : (
                          "No active journey"
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">No users found</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UsersPage;
