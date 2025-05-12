
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { JourneyStat } from "@/hooks/useTrackingStats";

type JourneyProgressTableProps = {
  journeyStats: JourneyStat[];
  loading: boolean;
};

export const JourneyProgressTable = ({ journeyStats, loading }: JourneyProgressTableProps) => {
  return (
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
  );
};
