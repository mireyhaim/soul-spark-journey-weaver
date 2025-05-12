
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const TrackingPage = () => {
  const [stageDistribution, setStageDistribution] = useState<any[]>([]);
  const [completionRate, setCompletionRate] = useState(0);
  const [engagementRate, setEngagementRate] = useState(0);
  const [journeyStats, setJourneyStats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28FD0'];

  useEffect(() => {
    const fetchTrackingStats = async () => {
      setLoading(true);
      try {
        // Get journey progress stage distribution
        const { data: userProgress } = await supabase
          .from('user_journey_progress')
          .select('current_day, completed_at');
        
        if (userProgress) {
          // Calculate stage distribution using more efficient filtering
          const distribution = {
            day1To7: 0,
            day8To14: 0,
            day15To21: 0,
            day22Plus: 0,
            completed: 0
          };
          
          userProgress.forEach(p => {
            if (p.completed_at) distribution.completed++;
            
            const day = p.current_day;
            if (day >= 1 && day <= 7) distribution.day1To7++;
            else if (day >= 8 && day <= 14) distribution.day8To14++;
            else if (day >= 15 && day <= 21) distribution.day15To21++;
            else if (day > 21) distribution.day22Plus++;
          });
          
          setStageDistribution([
            { name: 'Day 1-7', value: distribution.day1To7 },
            { name: 'Day 8-14', value: distribution.day8To14 },
            { name: 'Day 15-21', value: distribution.day15To21 },
            { name: 'Day 22+', value: distribution.day22Plus },
            { name: 'Completed', value: distribution.completed }
          ]);
          
          // Calculate completion rate
          const totalUsers = userProgress.length;
          const completionRate = totalUsers > 0 ? (distribution.completed / totalUsers * 100) : 0;
          setCompletionRate(completionRate);
        }
        
        // Get AI interactions data for engagement rate - with batching
        const interactionsPromise = supabase
          .from('ai_interactions')
          .select('user_id');
          
        const activeUsersPromise = supabase
          .from('user_journey_progress')
          .select('user_id');
        
        // Execute both queries in parallel
        const [interactionsResult, activeUsersResult] = await Promise.all([
          interactionsPromise, 
          activeUsersPromise
        ]);
        
        const aiInteractions = interactionsResult.data;
        const activeUsers = activeUsersResult.data;
        
        if (aiInteractions && activeUsers) {
          // Use Maps for faster unique user counting
          const uniqueInteractingUsersMap = new Map();
          aiInteractions.forEach(i => uniqueInteractingUsersMap.set(i.user_id, true));
          
          const totalActiveUsersMap = new Map();
          activeUsers.forEach(u => totalActiveUsersMap.set(u.user_id, true));
          
          const uniqueInteractingUsers = uniqueInteractingUsersMap.size;
          const totalActiveUsers = totalActiveUsersMap.size;
          
          const engagementRate = totalActiveUsers > 0 ? (uniqueInteractingUsers / totalActiveUsers * 100) : 0;
          setEngagementRate(engagementRate);
        }
        
        // Get detailed journey stats - optimize query
        const { data: journeys } = await supabase
          .from('journeys')
          .select(`
            id,
            title,
            duration,
            user_journey_progress (
              id,
              current_day,
              completed_at
            )
          `)
          .order('title');
        
        if (journeys) {
          const journeyStatsData = journeys.map(journey => {
            const progress = journey.user_journey_progress || [];
            
            // Use counters rather than multiple array filters
            let totalUsers = progress.length;
            let completedUsers = 0;
            let day1 = 0;
            let day7 = 0;
            let day14 = 0;
            let day21 = 0;
            
            progress.forEach((p: any) => {
              if (p.completed_at) completedUsers++;
              if (p.current_day === 1) day1++;
              if (p.current_day === 7) day7++;
              if (p.current_day === 14) day14++;
              if (p.current_day === 21) day21++;
            });
            
            const completionRate = totalUsers > 0 ? (completedUsers / totalUsers * 100) : 0;
            
            return {
              id: journey.id,
              title: journey.title,
              totalUsers,
              day1,
              day7,
              day14,
              day21,
              completed: completedUsers,
              completionRate
            };
          });
          
          setJourneyStats(journeyStatsData);
        }
      } catch (error) {
        console.error("Error fetching tracking stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrackingStats();
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>User Journey Stage Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              {loading ? (
                <div className="flex justify-center items-center h-full">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                </div>
              ) : (
                <ChartContainer config={{ totalUsers: { theme: { light: '#888888', dark: '#cccccc' } } }}>
                  <PieChart>
                    <Pie
                      data={stageDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {stageDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend />
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ChartContainer>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Average Completion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-center pt-4">
              {loading ? "..." : `${completionRate.toFixed(1)}%`}
            </div>
            <div className="text-sm text-muted-foreground text-center mt-4">
              Percentage of users who complete their journey
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Journey Progress Tracking</CardTitle>
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
                    <TableHead>Journey</TableHead>
                    <TableHead className="text-center">Total Users</TableHead>
                    <TableHead className="text-center">Day 1</TableHead>
                    <TableHead className="text-center">Day 7</TableHead>
                    <TableHead className="text-center">Day 14</TableHead>
                    <TableHead className="text-center">Day 21</TableHead>
                    <TableHead className="text-center">Completed</TableHead>
                    <TableHead className="text-right">Completion Rate</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {journeyStats.length > 0 ? (
                    journeyStats.map((journey) => (
                      <TableRow key={journey.id}>
                        <TableCell>{journey.title}</TableCell>
                        <TableCell className="text-center">{journey.totalUsers}</TableCell>
                        <TableCell className="text-center">{journey.day1}</TableCell>
                        <TableCell className="text-center">{journey.day7}</TableCell>
                        <TableCell className="text-center">{journey.day14}</TableCell>
                        <TableCell className="text-center">{journey.day21}</TableCell>
                        <TableCell className="text-center">{journey.completed}</TableCell>
                        <TableCell className="text-right font-medium">
                          {journey.completionRate.toFixed(1)}%
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center">No data available</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">AI Engagement Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-center pt-4">
              {loading ? "..." : `${engagementRate.toFixed(1)}%`}
            </div>
            <div className="text-sm text-muted-foreground text-center mt-4">
              Percentage of users who interact with the AI assistant
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TrackingPage;
