
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type CompletionRateCardProps = {
  completionRate: number;
  loading: boolean;
};

export const CompletionRateCard = ({ completionRate, loading }: CompletionRateCardProps) => {
  return (
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
  );
};
