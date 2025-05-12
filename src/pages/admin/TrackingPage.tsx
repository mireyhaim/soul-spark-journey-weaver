
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
          // Calculate stage distribution
          const day1To7 = userProgress.filter(p => p.current_day >= 1 && p.current_day <= 7).length;
          const day8To14 = userProgress.filter(p => p.current_day >= 8 && p.current_day <= 14).length;
          const day15To21 = userProgress.filter(p => p.current_day >= 15 && p.current_day <= 21).length;
          const day22Plus = userProgress.filter(p => p.current_day > 21).length;
          const completed = userProgress.filter(p => p.completed_at).length;
          
          setStageDistribution([
            { name: 'Day 1-7', value: day1To7 },
            { name: 'Day 8-14', value: day8To14 },
            { name: 'Day 15-21', value: day15To21 },
            { name: 'Day 22+', value: day22Plus },
            { name: 'Completed', value: completed }
          ]);
          
          // Calculate completion rate
          const totalUsers = userProgress.length;
          const completionRate = totalUsers > 0 ? (completed / totalUsers * 100) : 0;
          setCompletionRate(completionRate);
        }
        
        // Get AI interactions data for engagement rate
        const { data: aiInteractions } = await supabase
          .from('ai_interactions')
          .select('user_id')
          .order('created_at', { ascending: false });
          
        const { data: activeUsers } = await supabase
          .from('user_journey_progress')
          .select('user_id');
        
        if (aiInteractions && activeUsers) {
          const uniqueInteractingUsers = new Set(aiInteractions.map(i => i.user_id)).size;
          const totalActiveUsers = new Set(activeUsers.map(u => u.user_id)).size;
          
          const engagementRate = totalActiveUsers > 0 ? (uniqueInteractingUsers / totalActiveUsers * 100) : 0;
          setEngagementRate(engagementRate);
        }
        
        // Get detailed journey stats
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
            const totalUsers = journey.user_journey_progress?.length || 0;
            const completedUsers = journey.user_journey_progress?.filter((p: any) => p.completed_at).length || 0;
            const day1 = journey.user_journey_progress?.filter((p: any) => p.current_day === 1).length || 0;
            const day7 = journey.user_journey_progress?.filter((p: any) => p.current_day === 7).length || 0;
            const day14 = journey.user_journey_progress?.filter((p: any) => p.current_day === 14).length || 0;
            const day21 = journey.user_journey_progress?.filter((p: any) => p.current_day === 21).length || 0;
            
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
