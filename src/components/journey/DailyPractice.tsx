
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface DailyPracticeProps {
  currentDay: number;
  completed: boolean;
  onComplete: () => void;
}

const DailyPractice: React.FC<DailyPracticeProps> = ({ currentDay, completed, onComplete }) => {
  const [userReflections, setUserReflections] = useState<{[key: string]: string}>({
    gratitude: "",
    challenges: "",
    abundance: ""
  });
  
  const handleReflectionChange = (key: string, value: string) => {
    setUserReflections(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  const isFormComplete = () => {
    return Object.values(userReflections).every(value => value.trim().length > 0);
  };
  
  // Daily practices based on journey day
  const getDailyContent = () => {
    switch(currentDay) {
      case 1:
        return {
          title: "Setting Intentions",
          description: "Today we begin our abundance journey by setting clear intentions.",
          content: (
            <>
              <p>Welcome to your abundance journey! Today we'll be setting the foundation by clarifying your intentions. Being specific about what you want to attract helps the universe understand your desires.</p>
              <div className="bg-earth-50 p-4 rounded-lg border border-earth-100 mt-4">
                <h4 className="font-medium mb-2">Reflection Questions</h4>
                <div className="space-y-4">
                  <div>
                    <p className="mb-2 text-earth-700">What specific form of abundance are you seeking to manifest?</p>
                    <Textarea 
                      placeholder="I am seeking to manifest..."
                      value={userReflections.gratitude}
                      onChange={(e) => handleReflectionChange("gratitude", e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>
                  <div>
                    <p className="mb-2 text-earth-700">Why is this important to you on a soul level?</p>
                    <Textarea 
                      placeholder="This matters to me because..."
                      value={userReflections.challenges}
                      onChange={(e) => handleReflectionChange("challenges", e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>
                  <div>
                    <p className="mb-2 text-earth-700">How will you feel when this abundance manifests in your life?</p>
                    <Textarea 
                      placeholder="When this manifests, I will feel..."
                      value={userReflections.abundance}
                      onChange={(e) => handleReflectionChange("abundance", e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>
                </div>
              </div>
            </>
          )
        };
      
      case 2:
        return {
          title: "Identifying Blocks",
          description: "Recognizing what's holding us back from receiving abundance.",
          content: (
            <>
              <p>Today we'll identify limiting beliefs that may be blocking your abundance. When we bring awareness to our blocks, we can begin to dissolve them.</p>
              <div className="bg-earth-50 p-4 rounded-lg border border-earth-100 mt-4">
                <h4 className="font-medium mb-2">Reflection Questions</h4>
                <div className="space-y-4">
                  <div>
                    <p className="mb-2 text-earth-700">What beliefs about money or abundance did you learn growing up?</p>
                    <Textarea 
                      placeholder="Growing up, I learned that..."
                      value={userReflections.gratitude}
                      onChange={(e) => handleReflectionChange("gratitude", e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>
                  <div>
                    <p className="mb-2 text-earth-700">What fears come up when you think about having more abundance?</p>
                    <Textarea 
                      placeholder="I fear that if I had more abundance..."
                      value={userReflections.challenges}
                      onChange={(e) => handleReflectionChange("challenges", e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>
                  <div>
                    <p className="mb-2 text-earth-700">What new belief would better serve your abundance journey?</p>
                    <Textarea 
                      placeholder="A more empowering belief would be..."
                      value={userReflections.abundance}
                      onChange={(e) => handleReflectionChange("abundance", e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>
                </div>
              </div>
            </>
          )
        };
      
      case 3:
        return {
          title: "Releasing Limiting Beliefs",
          description: "Letting go of thoughts that block abundance.",
          content: (
            <>
              <p>Today we'll practice releasing the limiting beliefs we identified yesterday. Through forgiveness and conscious release, we create space for new abundance.</p>
              <div className="bg-earth-50 p-4 rounded-lg border border-earth-100 mt-4">
                <h4 className="font-medium mb-2">Release Practice</h4>
                <div className="space-y-4">
                  <div>
                    <p className="mb-2 text-earth-700">Write a letter to release a limiting belief about abundance:</p>
                    <Textarea 
                      placeholder="Dear [limiting belief], I am ready to release you because..."
                      value={userReflections.gratitude}
                      onChange={(e) => handleReflectionChange("gratitude", e.target.value)}
                      className="min-h-[150px]"
                    />
                  </div>
                  <div>
                    <p className="mb-2 text-earth-700">What emotions arise as you release this belief?</p>
                    <Textarea 
                      placeholder="As I release this belief, I feel..."
                      value={userReflections.challenges}
                      onChange={(e) => handleReflectionChange("challenges", e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>
                  <div>
                    <p className="mb-2 text-earth-700">Create an affirmation to replace this limiting belief:</p>
                    <Textarea 
                      placeholder="My new affirmation is..."
                      value={userReflections.abundance}
                      onChange={(e) => handleReflectionChange("abundance", e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>
                </div>
              </div>
            </>
          )
        };
      
      case 4:
        return {
          title: "Abundance Meditation",
          description: "Connecting with the feeling of having abundance now.",
          content: (
            <>
              <p>Today we'll practice an abundance meditation to help you connect with the feeling of already having what you desire. This helps align your vibration with abundance.</p>
              <div className="bg-earth-50 p-4 rounded-lg border border-earth-100 mt-4 mb-4">
                <h4 className="font-medium mb-2">Meditation Instructions</h4>
                <ol className="list-decimal list-inside space-y-2 text-earth-700">
                  <li>Find a quiet space where you won't be disturbed for 10 minutes</li>
                  <li>Sit comfortably with your back straight and eyes closed</li>
                  <li>Take 3 deep breaths, letting go of any tension</li>
                  <li>Imagine yourself already living with the abundance you desire</li>
                  <li>Feel the emotions of gratitude, joy, and fulfillment</li>
                  <li>Hold this vision for 5-10 minutes</li>
                </ol>
              </div>
              <div className="bg-earth-50 p-4 rounded-lg border border-earth-100">
                <h4 className="font-medium mb-2">After Your Meditation</h4>
                <div className="space-y-4">
                  <div>
                    <p className="mb-2 text-earth-700">Describe what you saw during your abundance meditation:</p>
                    <Textarea 
                      placeholder="During my meditation, I visualized..."
                      value={userReflections.gratitude}
                      onChange={(e) => handleReflectionChange("gratitude", e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>
                  <div>
                    <p className="mb-2 text-earth-700">What emotions did you experience?</p>
                    <Textarea 
                      placeholder="I felt..."
                      value={userReflections.challenges}
                      onChange={(e) => handleReflectionChange("challenges", e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>
                  <div>
                    <p className="mb-2 text-earth-700">How can you bring this feeling into your daily life?</p>
                    <Textarea 
                      placeholder="I can cultivate this feeling by..."
                      value={userReflections.abundance}
                      onChange={(e) => handleReflectionChange("abundance", e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>
                </div>
              </div>
            </>
          )
        };
      
      case 5:
      default:
        return {
          title: "Gratitude Reflection",
          description: "Cultivating gratitude as a pathway to abundance.",
          content: (
            <>
              <p>Today we'll be focusing on cultivating gratitude as a pathway to abundance. When we appreciate what we have, we open ourselves to receiving more.</p>
              <div className="bg-earth-50 p-4 rounded-lg border border-earth-100 mt-4">
                <h4 className="font-medium mb-2">Reflection Questions</h4>
                <div className="space-y-4">
                  <div>
                    <p className="mb-2 text-earth-700">What three things are you most grateful for today?</p>
                    <Textarea 
                      placeholder="I am grateful for..."
                      value={userReflections.gratitude}
                      onChange={(e) => handleReflectionChange("gratitude", e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>
                  <div>
                    <p className="mb-2 text-earth-700">How has gratitude helped you overcome challenges?</p>
                    <Textarea 
                      placeholder="Gratitude has helped me..."
                      value={userReflections.challenges}
                      onChange={(e) => handleReflectionChange("challenges", e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>
                  <div>
                    <p className="mb-2 text-earth-700">Where do you see abundance already present in your life?</p>
                    <Textarea 
                      placeholder="I see abundance in..."
                      value={userReflections.abundance}
                      onChange={(e) => handleReflectionChange("abundance", e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>
                </div>
              </div>
            </>
          )
        };
    }
  };
  
  const dailyContent = getDailyContent();
  
  return (
    <Card className="mb-8">
      <CardHeader className="pb-3">
        <CardTitle>{dailyContent.title}</CardTitle>
        <CardDescription>Day {currentDay} • May 11, 2025</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {dailyContent.content}
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={onComplete}
          disabled={completed || !isFormComplete()}
        >
          {completed ? "Completed ✓" : "Complete Today's Practice"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DailyPractice;
