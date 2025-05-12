
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const CreatorsPage = () => {
  const [activeCreators, setActiveCreators] = useState(0);
  const [newCreators, setNewCreators] = useState(0);
  const [pendingCreators, setPendingCreators] = useState<any[]>([]);
  const [topCreators, setTopCreators] = useState<any[]>([]);
  const [pendingJourneys, setPendingJourneys] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchCreatorStats();
  }, []);

  const fetchCreatorStats = async () => {
    setLoading(true);
    try {
      // Get active creators count
      const { count: activeCount } = await supabase
        .from('creators')
        .select('*', { count: 'exact', head: true })
        .eq('verification_status', 'approved');
      
      // Get new creators this month
      const lastMonth = new Date();
      lastMonth.setMonth(lastMonth.getMonth() - 1);
      
      const { count: newCount } = await supabase
        .from('creators')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', lastMonth.toISOString());
      
      // Get pending creators
      const { data: pendingCreatorsData } = await supabase
        .from('creators')
        .select(`
          id, 
          bio,
          expertise_areas,
          verification_status,
          created_at,
          users (
            name, 
            email,
            profile_image_url
          )
        `)
        .eq('verification_status', 'pending');
      
      // Get top creators by sales
      const { data: topCreatorsData } = await supabase
        .from('creators')
        .select(`
          id,
          users (
            name,
            email
          ),
          journeys (
            id,
            title,
            payments (
              count
            )
          )
        `)
        .eq('verification_status', 'approved')
        .order('journeys.payments', { ascending: false })
        .limit(5);
      
      // Get pending journeys
      const { data: pendingJourneysData } = await supabase
        .from('journeys')
        .select(`
          id,
          title,
          description,
          category,
          created_at,
          status,
          creators (
            id,
            users (
              name,
              email
            )
          )
        `)
        .eq('status', 'pending');
      
      setActiveCreators(activeCount || 0);
      setNewCreators(newCount || 0);
      setPendingCreators(pendingCreatorsData || []);
      setTopCreators(topCreatorsData || []);
      setPendingJourneys(pendingJourneysData || []);
    } catch (error) {
      console.error("Error fetching creator stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const approveCreator = async (creatorId: string) => {
    try {
      await supabase
        .from('creators')
        .update({ verification_status: 'approved' })
        .eq('id', creatorId);
        
      toast({
        title: "Creator Approved",
        description: "The creator has been successfully approved.",
      });
      
      fetchCreatorStats();
    } catch (error) {
      console.error("Error approving creator:", error);
      toast({
        title: "Error",
        description: "Failed to approve the creator. Please try again.",
        variant: "destructive",
      });
    }
  };

  const rejectCreator = async (creatorId: string) => {
    try {
      await supabase
        .from('creators')
        .update({ verification_status: 'rejected' })
        .eq('id', creatorId);
        
      toast({
        title: "Creator Rejected",
        description: "The creator has been rejected.",
      });
      
      fetchCreatorStats();
    } catch (error) {
      console.error("Error rejecting creator:", error);
      toast({
        title: "Error",
        description: "Failed to reject the creator. Please try again.",
        variant: "destructive",
      });
    }
  };

  const approveJourney = async (journeyId: string) => {
    try {
      await supabase
        .from('journeys')
        .update({ status: 'published' })
        .eq('id', journeyId);
        
      toast({
        title: "Journey Approved",
        description: "The journey has been published successfully.",
      });
      
      fetchCreatorStats();
    } catch (error) {
      console.error("Error approving journey:", error);
      toast({
        title: "Error",
        description: "Failed to approve the journey. Please try again.",
        variant: "destructive",
      });
    }
  };

  const rejectJourney = async (journeyId: string) => {
    try {
      await supabase
        .from('journeys')
        .update({ status: 'rejected' })
        .eq('id', journeyId);
        
      toast({
        title: "Journey Rejected",
        description: "The journey has been rejected.",
      });
      
      fetchCreatorStats();
    } catch (error) {
      console.error("Error rejecting journey:", error);
      toast({
        title: "Error",
        description: "Failed to reject the journey. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Active Creators</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? "Loading..." : activeCreators}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">New Creators This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? "Loading..." : newCreators}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Pending Approval</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? "Loading..." : pendingCreators.length}</div>
          </CardContent>
        </Card>
      </div>
      
      {pendingCreators.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Creators Awaiting Approval</CardTitle>
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
                    <TableHead>Creator</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Expertise</TableHead>
                    <TableHead>Registered</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingCreators.map((creator) => (
                    <TableRow key={creator.id}>
                      <TableCell>{creator.users?.name || "Unknown"}</TableCell>
                      <TableCell>{creator.users?.email || "No email"}</TableCell>
                      <TableCell>{creator.expertise_areas?.join(", ") || "None specified"}</TableCell>
                      <TableCell>{new Date(creator.created_at).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex gap-1 items-center"
                            onClick={() => approveCreator(creator.id)}
                          >
                            <Check className="w-4 h-4" /> Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex gap-1 items-center text-destructive"
                            onClick={() => rejectCreator(creator.id)}
                          >
                            <X className="w-4 h-4" /> Reject
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      )}
      
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Creators</CardTitle>
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
                  <TableHead>Creator</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Journeys</TableHead>
                  <TableHead className="text-right">Total Sales</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topCreators.length > 0 ? (
                  topCreators.map((creator) => {
                    const totalSales = creator.journeys?.reduce((sum: number, j: any) => 
                      sum + (j.payments?.length || 0), 0) || 0;
                      
                    return (
                      <TableRow key={creator.id}>
                        <TableCell>{creator.users?.name || "Unknown"}</TableCell>
                        <TableCell>{creator.users?.email || "No email"}</TableCell>
                        <TableCell>{creator.journeys?.length || 0}</TableCell>
                        <TableCell className="text-right font-medium">{totalSales}</TableCell>
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
      
      {pendingJourneys.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Journeys Awaiting Approval</CardTitle>
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
                    <TableHead>Category</TableHead>
                    <TableHead>Creator</TableHead>
                    <TableHead>Date Submitted</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingJourneys.map((journey) => (
                    <TableRow key={journey.id}>
                      <TableCell className="font-medium">{journey.title}</TableCell>
                      <TableCell>{journey.category || "Uncategorized"}</TableCell>
                      <TableCell>{journey.creators?.users?.name || "Unknown"}</TableCell>
                      <TableCell>{new Date(journey.created_at).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex gap-1 items-center"
                            onClick={() => approveJourney(journey.id)}
                          >
                            <Check className="w-4 h-4" /> Publish
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex gap-1 items-center text-destructive"
                            onClick={() => rejectJourney(journey.id)}
                          >
                            <X className="w-4 h-4" /> Reject
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CreatorsPage;
