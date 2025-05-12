
import React from 'react';

const BlogHero: React.FC = () => {
  return (
    <section className="bg-spirit-100 py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-semibold mb-6">
            Our Blog
          </h1>
          <p className="text-xl text-earth-700 max-w-3xl mx-auto">
            Articles, insights, and tools to help you deepen your inner processes
            and grow on your path to conscious and meaningful living
          </p>
        </div>
      </div>
    </section>
  );
};

export default BlogHero;
