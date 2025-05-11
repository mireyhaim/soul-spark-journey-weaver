
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AIInteraction from '../AIInteraction';

const JourneyInsights: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-sans font-semibold mb-4">Your AI Companion</h2>
      <Tabs defaultValue="chat">
        <TabsList className="mb-4">
          <TabsTrigger value="chat">Chat</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>
        <TabsContent value="chat">
          <AIInteraction />
        </TabsContent>
        <TabsContent value="insights">
          <Card>
            <CardHeader>
              <CardTitle>Your Journey Insights</CardTitle>
              <CardDescription>Based on your interactions and progress</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-spirit-50 p-4 rounded-lg border border-spirit-100">
                <h4 className="font-medium mb-1 text-spirit-700">Pattern Noticed</h4>
                <p className="text-sm">You seem to connect deeply with gratitude practices but find visualization exercises challenging.</p>
              </div>
              <div className="bg-calm-50 p-4 rounded-lg border border-calm-100">
                <h4 className="font-medium mb-1 text-calm-700">Recommendation</h4>
                <p className="text-sm">Try combining gratitude and visualization by starting with what you're thankful for, then extending that into future projections.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default JourneyInsights;
