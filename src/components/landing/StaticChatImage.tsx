
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
                Welcome to your spiritual journey. I'm your personal guide, here to support you every step of the way. How are you feeling today?
              </p>
              <span className="text-xs text-gray-500 block mt-1">10:03 AM</span>
            </div>
          </div>
          
          {/* User Message */}
          <div className="flex items-start mb-4 justify-end">
            <div className="bg-blue-50 rounded-lg py-2 px-3 max-w-[80%]">
              <p className="text-sm text-gray-800">
                I'm feeling stressed lately. My boss has been putting a lot of pressure on me and I don't know how to handle it. Every day feels like a struggle.
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
                I understand how challenging workplace stress can be. Remember that your worth isn't defined by someone else's expectations. Have you tried setting aside a few minutes each day for mindful breathing? It might help create a small buffer between the stress and your response to it. Also, is there a trusted colleague you could talk with about how you're feeling?
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
          <button className="ml-2 bg-spirit-600 hover:bg-spirit-700 text-white rounded-full p-2.5">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 2L11 13"></path>
              <path d="M22 2L15 22L11 13L2 9L22 2Z"></path>
            </svg>
          </button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default StaticChatImage;
