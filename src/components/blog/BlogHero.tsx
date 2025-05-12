
import React from 'react';

const BlogHero: React.FC = () => {
  return (
    <section className="bg-spirit-100 py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-semibold mb-6">
            הבלוג שלנו
          </h1>
          <p className="text-xl text-earth-700 max-w-3xl mx-auto">
            מאמרים, תובנות וכלים שיעזרו לך להעמיק בתהליכים הפנימיים שלך
            ולהתפתח בדרך שלך לחיים מודעים ומלאי משמעות
          </p>
        </div>
      </div>
    </section>
  );
};

export default BlogHero;
