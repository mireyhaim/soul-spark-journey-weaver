
import React from 'react';

const JourneyLoading: React.FC = () => {
  return (
    <div className="container mx-auto py-10 px-4 md:px-6 flex justify-center items-center min-h-[50vh]">
      <div className="animate-pulse flex flex-col gap-4 w-full max-w-3xl">
        <div className="h-8 bg-slate-200 rounded w-1/3"></div>
        <div className="h-16 bg-slate-200 rounded w-full"></div>
        <div className="h-32 bg-slate-200 rounded w-full"></div>
        <div className="h-24 bg-slate-200 rounded w-2/3"></div>
        <div className="h-20 bg-slate-200 rounded w-full"></div>
      </div>
    </div>
  );
};

export default JourneyLoading;
