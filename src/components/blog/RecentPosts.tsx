
import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Calendar } from 'lucide-react';

const RecentPosts: React.FC = () => {
  const recentPosts = [
    {
      id: 3,
      title: "5 Meditation Practices for Beginners",
      excerpt: "Start your meditation journey with these simple yet powerful practices suitable for beginners.",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=300",
      author: "Sarah Williams",
      date: "April 28, 2025",
      category: "Meditation"
    },
    {
      id: 4,
      title: "Understanding Your Energy Centers",
      excerpt: "Learn about the seven main chakras and how they influence your physical and mental wellbeing.",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=300",
      author: "Michael Rivera",
      date: "April 22, 2025",
      category: "Energy Work"
    },
    {
      id: 5,
      title: "Journaling Prompts for Self-Discovery",
      excerpt: "Unlock deeper insights about yourself with these thought-provoking journaling prompts.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=300",
      author: "Emma Thompson",
      date: "April 15, 2025",
      category: "Self-Discovery"
    },
    {
      id: 6,
      title: "The Power of Gratitude Practice",
      excerpt: "Discover how cultivating gratitude can transform your perspective and enhance your manifestation abilities.",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=300",
      author: "James Wilson",
      date: "April 8, 2025",
      category: "Gratitude"
    }
  ];

  return (
    <section>
      <h2 className="text-3xl font-serif font-medium mb-8">Recent Articles</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {recentPosts.map((post) => (
          <div key={post.id} className="flex flex-col h-full group">
            <div className="aspect-video mb-4 overflow-hidden rounded-lg">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="flex items-center text-xs text-spirit-600 mb-2">
              <span className="bg-purple-100 text-spirit-700 px-2 py-1 rounded-full">{post.category}</span>
            </div>
            <h3 className="text-lg font-medium mb-2">
              <Link to={`/blog/${post.id}`} className="hover:text-spirit-600 transition-colors">
                {post.title}
              </Link>
            </h3>
            <p className="text-earth-600 text-sm mb-3 line-clamp-2">{post.excerpt}</p>
            <div className="mt-auto flex items-center justify-between text-xs text-earth-500">
              <span>{post.author}</span>
              <div className="flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                <span>{post.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-12">
        <Link 
          to="/blog/archive" 
          className="inline-flex items-center border border-spirit-600 text-spirit-600 hover:bg-spirit-600 hover:text-white px-5 py-2 rounded-md transition-colors"
        >
          View All Articles
          <FileText className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </section>
  );
};

export default RecentPosts;
