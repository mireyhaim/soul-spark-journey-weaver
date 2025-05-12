
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ValueProposition: React.FC = () => {
  return (
    <div className="grid md:grid-cols-2 gap-8 mb-16">
      <Card>
        <CardHeader>
          <CardTitle>Monetize Your Content</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg">Upload your content once and earn continuously from purchases of your developmental processes, creating a sustainable income stream.</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>AI-Enhanced Experience</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg">Our AI transforms your expertise into personalized development and growth journeys for end users, maximizing the impact of your content.</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Build Your GIG</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg">Design your offer exactly as you want it. You control your content, process, and pricing while we handle the platform and technology.</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Effortless Marketing</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg">We promote your processes on our platform, connecting you with users seeking your specific expertise. You focus on content, we handle discovery.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ValueProposition;
