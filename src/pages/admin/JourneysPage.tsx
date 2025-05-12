
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";

const JourneysPage = () => {
  const [journeysCount, setJourneysCount] = useState(0);
  const [newJourneysCount, setNewJourneysCount] = useState(0);
  const [topJourneysByPurchases, setTopJourneysByPurchases] = useState<any[]>([]);
  const [topJourneysByCompletion, setTopJourneysByCompletion] = useState<any[]>([]);
  const [abandonedJourneys, setAbandonedJourneys] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJourneyStats = async () => {
      setLoading(true);
      try {
        // Get total journeys count
        const { count: totalCount } = await supabase
          .from('journeys')
          .select('*', { count: 'exact', head: true });
        
        // Get new journeys added this week
        const lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() - 7);
        
        const { count: newCount } = await supabase
          .from('journeys')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', lastWeek.toISOString());
        
        // Get top journeys by purchases
        const { data: topByPurchases } = await supabase
          .from('journeys')
          .select(`
            id,
            title,
            payments (
              count
            )
          `)
          .order('payments(count)', { ascending: false })
          .limit(5);
        
        // Get top journeys by completion
        const { data: topByCompletion } = await supabase
          .from('journeys')
          .select(`
            id,
            title,
            user_journey_progress (
              count
            )
          `)
          .not('user_journey_progress.completed_at', 'is', null)
          .order('user_journey_progress(count)', { ascending: false })
          .limit(5);
        
        // Get journeys with high abandonment rate
        const { data: abandoned } = await supabase
          .from('journeys')
          .select(`
            id,
            title,
            user_journey_progress (
              count
            )
          `)
          .eq('user_journey_progress.current_day', 1)
          .order('user_journey_progress(count)', { ascending: false })
          .limit(5);
        
        setJourneysCount(totalCount || 0);
        setNewJourneysCount(newCount || 0);
        setTopJourneysByPurchases(topByPurchases || []);
        setTopJourneysByCompletion(topByCompletion || []);
        setAbandonedJourneys(abandoned || []);
      } catch (error) {
        console.error("Error fetching journey stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJourneyStats();
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Total Journeys</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? "Loading..." : journeysCount}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">New Journeys This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? "Loading..." : newJourneysCount}</div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Journeys by Purchases</CardTitle>
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
                    <TableHead className="text-right">Purchases</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topJourneysByPurchases.length > 0 ? (
                    topJourneysByPurchases.map((journey) => (
                      <TableRow key={journey.id}>
                        <TableCell>{journey.title}</TableCell>
                        <TableCell className="text-right">{journey.payments?.length || 0}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={2} className="text-center">No data available</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Top Journeys by Completion</CardTitle>
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
                    <TableHead className="text-right">Completions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topJourneysByCompletion.length > 0 ? (
                    topJourneysByCompletion.map((journey) => (
                      <TableRow key={journey.id}>
                        <TableCell>{journey.title}</TableCell>
                        <TableCell className="text-right">{journey.user_journey_progress?.filter((p: any) => p.completed_at).length || 0}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={2} className="text-center">No data available</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Journeys with High Abandonment Rate</CardTitle>
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
                  <TableHead>Users Started</TableHead>
                  <TableHead>Abandoned at Day 1-3</TableHead>
                  <TableHead className="text-right">Abandonment Rate</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {abandonedJourneys.length > 0 ? (
                  abandonedJourneys.map((journey) => {
                    const totalUsers = journey.user_journey_progress?.length || 0;
                    const abandonedUsers = journey.user_journey_progress?.filter((p: any) => p.current_day <= 3 && !p.completed_at).length || 0;
                    const rate = totalUsers > 0 ? (abandonedUsers / totalUsers * 100).toFixed(1) : 0;
                    
                    return (
                      <TableRow key={journey.id}>
                        <TableCell>{journey.title}</TableCell>
                        <TableCell>{totalUsers}</TableCell>
                        <TableCell>{abandonedUsers}</TableCell>
                        <TableCell className="text-right">
                          <Badge variant={Number(rate) > 50 ? "destructive" : "secondary"}>
                            {rate}%
                          </Badge>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">No data available</TableCell>
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

export default JourneysPage;
