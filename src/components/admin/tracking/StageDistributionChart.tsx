
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { StageDistribution } from "@/hooks/useTrackingStats";

type StageDistributionChartProps = {
  data: StageDistribution[];
  loading: boolean;
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28FD0'];

export const StageDistributionChart = ({ data, loading }: StageDistributionChartProps) => {
  return (
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
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {data.map((entry, index) => (
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
  );
};
