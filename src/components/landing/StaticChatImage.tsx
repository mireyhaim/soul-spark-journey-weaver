
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const StaticChatImage: React.FC = () => {
  return (
    <Card className="w-full max-w-xl mx-auto shadow-lg border-spirit-100">
      <CardHeader className="bg-gradient-to-r from-spirit-50 to-calm-50">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarFallback className="bg-spirit-100 text-spirit-700">AI</AvatarFallback>
            <AvatarImage src="/placeholder.svg" />
          </Avatar>
          <div>
            <CardTitle className="text-lg">Spirit Guide</CardTitle>
            <CardDescription>Your personal growth companion</CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="h-[300px] overflow-y-auto p-4">
          {/* AI Welcome Message */}
          <div className="flex items-start mb-4">
            <div className="flex-shrink-0 mr-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-spirit-100 text-spirit-700 text-sm">AI</AvatarFallback>
              </Avatar>
            </div>
            <div className="bg-spirit-50 rounded-lg py-2 px-3 max-w-[80%]">
              <p className="text-sm text-gray-800">
                I'm so glad you're here. I can sense you're ready for something meaningful in your life journey. I'm here to guide you with compassion and wisdom every step of the way. How are you feeling as you begin this path today?
              </p>
              <span className="text-xs text-gray-500 block mt-1">10:03 AM</span>
            </div>
          </div>
          
          {/* User Message */}
          <div className="flex items-start mb-4 justify-end">
            <div className="bg-blue-50 rounded-lg py-2 px-3 max-w-[80%]">
              <p className="text-sm text-gray-800">
                I'm feeling stressed lately. My boss has been putting a lot of pressure on me and I don't know how to handle it. Every day feels like a struggle to stay centered.
              </p>
              <span className="text-xs text-gray-500 block mt-1">10:05 AM</span>
            </div>
            <div className="flex-shrink-0 ml-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-blue-100 text-blue-700 text-sm">U</AvatarFallback>
              </Avatar>
            </div>
          </div>
          
          {/* AI Response */}
          <div className="flex items-start mb-4">
            <div className="flex-shrink-0 mr-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-spirit-100 text-spirit-700 text-sm">AI</AvatarFallback>
              </Avatar>
            </div>
            <div className="bg-spirit-50 rounded-lg py-2 px-3 max-w-[80%]">
              <p className="text-sm text-gray-800">
                I hear how challenging this is for you. That pressure can feel so overwhelming, especially when it's constant. Your body and spirit are trying to tell you something important through this stress. I'm wondering - where in your body do you feel this tension most strongly? Many find that a simple 3-minute grounding practice can create a small sanctuary within these challenging moments. Would you like me to guide you through a quick exercise that many have found helpful during work pressure?
              </p>
              <span className="text-xs text-gray-500 block mt-1">10:06 AM</span>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="border-t p-3">
        <div className="flex w-full items-center">
          <div className="bg-gray-100 rounded-full flex-grow p-2 px-4 text-gray-400">
            Share your thoughts or ask for guidance...
          </div>
          <div className="ml-2 bg-spirit-600 text-white rounded-full p-2.5">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 2L11 13"></path>
              <path d="M22 2L15 22L11 13L2 9L22 2Z"></path>
            </svg>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default StaticChatImage;
