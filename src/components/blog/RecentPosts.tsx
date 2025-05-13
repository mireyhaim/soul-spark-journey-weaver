
import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Calendar } from 'lucide-react';

const RecentPosts: React.FC = () => {
  const recentPosts = [
    {
      id: 3,
      title: "What's the Difference Between Spiritual Consciousness and Positive Thinking?",
      excerpt: "Explore the key differences between spiritual awareness and mere positive thinking, and how to cultivate each for personal growth.",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=300",
      author: "Sarah Williams",
      date: "April 28, 2025",
      category: "Spirituality"
    },
    {
      id: 4,
      title: "Abundance Mindset – Is It Just a Catchphrase?",
      excerpt: "Dive deep into what abundance consciousness really means beyond the surface-level interpretations popular in self-help circles.",
      image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=300",
      author: "Michael Rivera",
      date: "April 22, 2025",
      category: "Mindset"
    },
    {
      id: 5,
      title: "How to Use Vision Boards Intelligently, Not Superficially",
      excerpt: "Learn practical techniques to create vision boards that connect with your deeper intentions rather than just surface-level desires.",
      image: "https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&w=300",
      author: "Emma Thompson",
      date: "April 15, 2025",
      category: "Manifestation"
    },
    {
      id: 6,
      title: "How to Market Yourself Without Apologizing – An Energetic Approach to Business",
      excerpt: "Discover how to promote your business authentically by aligning with your inner values and natural energy.",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=300",
      author: "James Wilson",
      date: "April 8, 2025",
      category: "Business"
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
