
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const RevenuePage = () => {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [subscriptionRevenue, setSubscriptionRevenue] = useState(0);
  const [onetimeRevenue, setOnetimeRevenue] = useState(0);
  const [activeSubscribers, setActiveSubscribers] = useState(0);
  const [bestSellingJourneys, setBestSellingJourneys] = useState<any[]>([]);
  const [revenueData, setRevenueData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchRevenueStats = async () => {
      setLoading(true);
      try {
        // Get total revenue this month
        const firstDayOfMonth = new Date();
        firstDayOfMonth.setDate(1);
        firstDayOfMonth.setHours(0, 0, 0, 0);
        
        const { data: monthlyPayments } = await supabase
          .from('payments')
          .select('amount, payment_method, status')
          .gte('created_at', firstDayOfMonth.toISOString())
          .eq('status', 'completed');
        
        if (monthlyPayments) {
          const total = monthlyPayments.reduce((sum, payment) => sum + Number(payment.amount), 0);
          const subscription = monthlyPayments
            .filter(p => p.payment_method === 'subscription')
            .reduce((sum, p) => sum + Number(p.amount), 0);
          const onetime = monthlyPayments
            .filter(p => p.payment_method === 'onetime')
            .reduce((sum, p) => sum + Number(p.amount), 0);
          
          setTotalRevenue(total);
          setSubscriptionRevenue(subscription);
          setOnetimeRevenue(onetime);
        }
        
        // Get active subscribers count
        const { count: subscribersCount } = await supabase
          .from('payments')
          .select('*', { count: 'exact', head: true })
          .eq('payment_method', 'subscription')
          .eq('status', 'active');
        
        setActiveSubscribers(subscribersCount || 0);
        
        // Get best-selling journeys
        const { data: topJourneys } = await supabase
          .from('payments')
          .select(`
            journey_id,
            amount,
            journeys (
              title
            )
          `)
          .eq('status', 'completed')
          .order('amount', { ascending: false })
          .limit(5);
        
        setBestSellingJourneys(topJourneys || []);
        
        // Generate weekly revenue data for the chart (simulated for now)
        const now = new Date();
        const weeklyData = [];
        for (let i = 6; i >= 0; i--) {
          const date = new Date();
          date.setDate(now.getDate() - i);
          
          weeklyData.push({
            name: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            revenue: Math.floor(Math.random() * 1000) + 100 // Simulated data
          });
        }
        
        setRevenueData(weeklyData);
      } catch (error) {
        console.error("Error fetching revenue stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRevenueStats();
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Total Revenue (This Month)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${loading ? "..." : totalRevenue.toFixed(2)}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Subscription Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${loading ? "..." : subscriptionRevenue.toFixed(2)}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">One-time Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${loading ? "..." : onetimeRevenue.toFixed(2)}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Active Subscribers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? "..." : activeSubscribers}</div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Weekly Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            {loading ? (
              <div className="flex justify-center items-center h-full">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
              </div>
            ) : (
              <ChartContainer config={{}}>
                <AreaChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area type="monotone" dataKey="revenue" stroke="#8884d8" fill="#8884d8" name="Revenue ($)" />
                </AreaChart>
              </ChartContainer>
            )}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Best-Selling Journeys</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-4">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
            </div>
          ) : (
            <div className="space-y-4">
              {bestSellingJourneys.length > 0 ? (
                bestSellingJourneys.map((journey, index) => (
                  <div key={journey.journey_id} className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-6 text-muted-foreground">{index + 1}.</div>
                      <div>{journey.journeys?.title || "Unknown Journey"}</div>
                    </div>
                    <div className="font-medium">${Number(journey.amount).toFixed(2)}</div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-muted-foreground">No sales data available</div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RevenuePage;
