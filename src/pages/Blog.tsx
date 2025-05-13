
import React from 'react';
import BlogHero from "@/components/blog/BlogHero";
import FeaturedPosts from "@/components/blog/FeaturedPosts";
import RecentPosts from "@/components/blog/RecentPosts";

const Blog: React.FC = () => {
  return (
    <div className="min-h-screen">
      <BlogHero />
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <FeaturedPosts />
        <RecentPosts />
      </div>
    </div>
  );
};

export default Blog;
