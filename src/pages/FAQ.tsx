
import React from 'react';
import FAQSection from "@/components/faq/FAQSection";

const FAQ: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow py-12 px-4 md:px-6 bg-gradient-to-b from-spirit-50 to-white">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-serif font-semibold mb-8 text-center">Frequently Asked Questions</h1>
          <p className="text-xl text-earth-700 mb-12 text-center">
            Find answers to the most common questions about our platform, membership, and services.
          </p>
          
          <FAQSection />
        </div>
      </main>
    </div>
  );
};

export default FAQ;
