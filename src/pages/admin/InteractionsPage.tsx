
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Flag, Check, AlertCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

const InteractionsPage = () => {
  const [dailyInteractions, setDailyInteractions] = useState<any[]>([]);
  const [recentInteractions, setRecentInteractions] = useState<any[]>([]);
  const [flaggedInteractions, setFlaggedInteractions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInteraction, setSelectedInteraction] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchInteractionStats();
  }, []);

  const fetchInteractionStats = async () => {
    setLoading(true);
    try {
      // Get daily interactions for the past 7 days
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      
      const { data: interactionsData } = await supabase
        .from('ai_interactions')
        .select('created_at')
        .gte('created_at', sevenDaysAgo.toISOString());
      
      if (interactionsData) {
        // Group interactions by day
        const dailyData = interactionsData.reduce((acc: any, interaction) => {
          const date = new Date(interaction.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
          if (!acc[date]) {
            acc[date] = 0;
          }
          acc[date]++;
          return acc;
        }, {});
        
        // Convert to array format for chart
        const chartData = Object.entries(dailyData).map(([date, count]) => ({
          date,
          count
        }));
        
        setDailyInteractions(chartData);
      }
      
      // Get recent interactions
      const { data: recentData } = await supabase
        .from('ai_interactions')
        .select(`
          id,
          message_content,
          ai_response,
          created_at,
          users (
            name,
            email
          )
        `)
        .order('created_at', { ascending: false })
        .limit(10);
      
      setRecentInteractions(recentData || []);
      
      // Get potentially problematic interactions
      const { data: flaggedData } = await supabase
        .from('ai_interactions')
        .select(`
          id,
          message_content,
          ai_response,
          created_at,
          context,
          users (
            name,
            email
          )
        `)
        .contains('context', { flagged: true })
        .order('created_at', { ascending: false })
        .limit(20);
      
      setFlaggedInteractions(flaggedData || []);
    } catch (error) {
      console.error("Error fetching interaction stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const viewInteractionDetails = (interaction: any) => {
    setSelectedInteraction(interaction);
    setDialogOpen(true);
  };

  const markAsSafe = async (interactionId: string) => {
    try {
      await supabase
        .from('ai_interactions')
        .update({
          context: { flagged: false, reviewed: true }
        })
        .eq('id', interactionId);
        
      toast({
        title: "Marked as Safe",
        description: "The interaction has been marked as reviewed and safe.",
      });
      
      fetchInteractionStats();
      setDialogOpen(false);
    } catch (error) {
      console.error("Error updating interaction:", error);
      toast({
        title: "Error",
        description: "Failed to update the interaction. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Daily AI Interactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            {loading ? (
              <div className="flex justify-center items-center h-full">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
              </div>
            ) : (
              <ChartContainer config={{}}>
                <BarChart data={dailyInteractions}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="count" name="Interactions" fill="#8884d8" />
                </BarChart>
              </ChartContainer>
            )}
          </div>
        </CardContent>
      </Card>
      
      {flaggedInteractions.length > 0 && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Flagged Interactions</CardTitle>
            <Badge variant="destructive" className="flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {flaggedInteractions.length} Flagged
            </Badge>
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
                    <TableHead>User</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {flaggedInteractions.map((interaction) => (
                    <TableRow key={interaction.id}>
                      <TableCell>{interaction.users?.name || interaction.users?.email || "Unknown User"}</TableCell>
                      <TableCell className="max-w-xs truncate">{interaction.message_content}</TableCell>
                      <TableCell>{new Date(interaction.created_at).toLocaleString()}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => viewInteractionDetails(interaction)}
                          >
                            View Details
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex gap-1 items-center"
                            onClick={() => markAsSafe(interaction.id)}
                          >
                            <Check className="w-4 h-4" /> Mark Safe
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
          <CardTitle>Recent Interactions</CardTitle>
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
                  <TableHead>User</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>Response</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentInteractions.length > 0 ? (
                  recentInteractions.map((interaction) => (
                    <TableRow key={interaction.id}>
                      <TableCell>{interaction.users?.name || interaction.users?.email || "Unknown User"}</TableCell>
                      <TableCell className="max-w-xs truncate">{interaction.message_content}</TableCell>
                      <TableCell className="max-w-xs truncate">{interaction.ai_response}</TableCell>
                      <TableCell>{new Date(interaction.created_at).toLocaleString()}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => viewInteractionDetails(interaction)}
                        >
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">No interactions found</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
      
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Interaction Details</DialogTitle>
            {selectedInteraction && (
              <DialogDescription>
                User: {selectedInteraction.users?.name || selectedInteraction.users?.email || "Unknown User"}
                <br />
                Date: {new Date(selectedInteraction.created_at).toLocaleString()}
              </DialogDescription>
            )}
          </DialogHeader>
          {selectedInteraction && (
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">User Message:</h3>
                <div className="p-3 bg-muted rounded-md text-sm whitespace-pre-wrap">
                  {selectedInteraction.message_content}
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium">AI Response:</h3>
                <div className="p-3 bg-muted rounded-md text-sm whitespace-pre-wrap">
                  {selectedInteraction.ai_response}
                </div>
              </div>
              {selectedInteraction.context?.flagged && (
                <div className="flex justify-end gap-2 mt-4">
                  <Button 
                    variant="outline"
                    className="flex gap-1 items-center"
                    onClick={() => markAsSafe(selectedInteraction.id)}
                  >
                    <Check className="w-4 h-4" /> Mark as Safe
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InteractionsPage;
