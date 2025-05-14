
import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Calendar } from 'lucide-react';

const RecentPosts: React.FC = () => {
  // Updated to ensure no duplicates with featured posts (ids 1 and 2)
  const recentPosts = [
    {
      id: '3',
      slug: 'spiritual-consciousness-vs-positive-thinking',
      title: "What's the Difference Between Spiritual Consciousness and Positive Thinking?",
      excerpt: "Explore the key differences between spiritual awareness and mere positive thinking, and how to cultivate each for personal growth.",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=300",
      author: "Sarah Williams",
      date: "April 28, 2025",
      category: "Spirituality"
    },
    {
      id: '4',
      slug: 'abundance-mindset-more-than-catchphrase',
      title: "Abundance Mindset – Is It Just a Catchphrase?",
      excerpt: "Dive deep into what abundance consciousness really means beyond the surface-level interpretations popular in self-help circles.",
      image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=300",
      author: "Michael Rivera",
      date: "April 22, 2025",
      category: "Mindset"
    },
    {
      id: '7',
      slug: 'morning-rituals-for-spiritual-growth',
      title: "5 Morning Rituals That Accelerate Spiritual Growth",
      excerpt: "Discover simple but powerful morning practices that can transform your spiritual journey and set a positive tone for your day.",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=300",
      author: "Rebecca Lee",
      date: "April 5, 2025",
      category: "Spirituality"
    },
    {
      id: '8',
      slug: 'conscious-leadership-essentials',
      title: "The Essentials of Conscious Leadership in Uncertain Times",
      excerpt: "Learn how to lead with awareness, purpose, and authenticity in today's rapidly changing and challenging business environment.",
      image: "https://images.unsplash.com/photo-1454923634634-bd1614215bf7?auto=format&fit=crop&w=300",
      author: "Thomas Grant",
      date: "March 29, 2025",
      category: "Leadership"
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
              <Link to={`/blog/${post.slug}`} className="hover:text-spirit-600 transition-colors">
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
