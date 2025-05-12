
import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogHero from "@/components/blog/BlogHero";
import FeaturedPosts from "@/components/blog/FeaturedPosts";
import RecentPosts from "@/components/blog/RecentPosts";

const Blog: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <BlogHero />
        <div className="container mx-auto px-4 py-12">
          <FeaturedPosts />
          <RecentPosts />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
