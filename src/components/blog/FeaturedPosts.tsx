
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';

const FeaturedPosts: React.FC = () => {
  const featuredPosts = [
    {
      id: '1',
      slug: 'how-to-build-a-routine-for-real-change',
      title: "How to Build a Routine That Promotes Real Change",
      excerpt: "Creating real change in our lives depends largely on the routine we adopt. The key to deep and meaningful change lies in creating a routine that is both effective and sustainable.",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=600",
      author: "Michelle Levy",
      date: "May 15, 2025",
      category: "Personal Development"
    },
    {
      id: '2',
      slug: 'why-short-processes-work-better',
      title: "Why Short 7-21 Day Processes Work Better Than Long Courses",
      excerpt: "In the world of learning and personal growth, we're seeing an increasing shift from traditional long courses to short, focused processes. We've understood why this works better.",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600",
      author: "Daniel Cohen",
      date: "May 10, 2025",
      category: "Learning"
    }
  ];

  return (
    <section className="mb-16">
      <h2 className="text-3xl font-serif font-medium mb-8">Featured Articles</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {featuredPosts.map((post) => (
          <Card key={post.id} className="overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow">
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-48 object-cover"
            />
            <CardContent className="flex-grow flex flex-col p-6">
              <div className="flex items-center text-sm text-spirit-600 mb-2">
                <span className="bg-purple-100 text-spirit-700 px-3 py-1 rounded-full">{post.category}</span>
              </div>
              <h3 className="text-xl font-serif font-medium mb-2">
                <Link to={`/blog/${post.slug}`} className="hover:text-spirit-600 transition-colors">
                  {post.title}
                </Link>
              </h3>
              <p className="text-earth-600 mb-4">{post.excerpt}</p>
              <div className="mt-auto flex items-center justify-between text-sm text-earth-500">
                <span>{post.author}</span>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{post.date}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default FeaturedPosts;
