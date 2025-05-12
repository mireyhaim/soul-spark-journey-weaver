
import React from 'react';

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex justify-start mb-4">
      <div className="bg-earth-100 text-earth-800 rounded-lg px-4 py-2 max-w-[80%]">
        <div className="flex space-x-1">
          <span className="w-2 h-2 rounded-full bg-earth-400 animate-pulse"></span>
          <span className="w-2 h-2 rounded-full bg-earth-400 animate-pulse delay-75"></span>
          <span className="w-2 h-2 rounded-full bg-earth-400 animate-pulse delay-150"></span>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
