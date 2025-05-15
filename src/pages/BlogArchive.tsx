
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Type definition for a blog post summary
type BlogPostSummary = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
};

const BlogArchive: React.FC = () => {
  // All blog posts data with unique content and appropriate images
  const allPosts: BlogPostSummary[] = [
    {
      id: '1',
      slug: 'how-to-build-a-routine-for-real-change',
      title: "How to Build a Routine That Promotes Real Change",
      excerpt: "Creating real change in our lives depends largely on the routine we adopt. The key to deep and meaningful change lies in creating a routine that is both effective and sustainable.",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=600",
      author: "Michelle Levy",
      date: "May 15, 2025",
      category: "Personal Development",
      readTime: "7 min read"
    },
    {
      id: '2',
      slug: 'why-short-processes-work-better',
      title: "Why Short 7-21 Day Processes Work Better Than Long Courses",
      excerpt: "In the world of learning and personal growth, we're seeing an increasing shift from traditional long courses to short, focused processes. We've understood why this works better.",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600",
      author: "Daniel Cohen",
      date: "May 10, 2025",
      category: "Learning",
      readTime: "8 min read"
    },
    {
      id: '3',
      slug: 'spiritual-consciousness-vs-positive-thinking',
      title: "What's the Difference Between Spiritual Consciousness and Positive Thinking?",
      excerpt: "Explore the key differences between spiritual awareness and mere positive thinking, and how to cultivate each for personal growth.",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=600",
      author: "Sarah Williams",
      date: "April 28, 2025",
      category: "Spirituality",
      readTime: "6 min read"
    },
    {
      id: '4',
      slug: 'abundance-mindset-more-than-catchphrase',
      title: "Abundance Mindset – Is It Just a Catchphrase?",
      excerpt: "Dive deep into what abundance consciousness really means beyond the surface-level interpretations popular in self-help circles.",
      image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=600",
      author: "Michael Rivera",
      date: "April 22, 2025",
      category: "Mindset",
      readTime: "8 min read"
    },
    {
      id: '5',
      slug: 'vision-boards-intelligent-use',
      title: "How to Use Vision Boards Intelligently, Not Superficially",
      excerpt: "Learn practical techniques to create vision boards that connect with your deeper intentions rather than just surface-level desires.",
      image: "https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&w=600",
      author: "Emma Thompson",
      date: "April 15, 2025",
      category: "Manifestation",
      readTime: "7 min read"
    },
    {
      id: '6',
      slug: 'energetic-approach-to-business',
      title: "How to Market Yourself Without Apologizing – An Energetic Approach to Business",
      excerpt: "Discover how to promote your business authentically by aligning with your inner values and natural energy.",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600",
      author: "James Wilson",
      date: "April 8, 2025",
      category: "Business",
      readTime: "6 min read"
    },
    {
      id: '7',
      slug: 'morning-rituals-for-spiritual-growth',
      title: "5 Morning Rituals That Accelerate Spiritual Growth",
      excerpt: "Discover simple but powerful morning practices that can transform your spiritual journey and set a positive tone for your day.",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600",
      author: "Rebecca Lee",
      date: "April 5, 2025",
      category: "Spirituality",
      readTime: "5 min read"
    },
    {
      id: '8',
      slug: 'conscious-leadership-essentials',
      title: "The Essentials of Conscious Leadership in Uncertain Times",
      excerpt: "Learn how to lead with awareness, purpose, and authenticity in today's rapidly changing and challenging business environment.",
      image: "https://images.unsplash.com/photo-1454923634634-bd1614215bf7?auto=format&fit=crop&w=600",
      author: "Thomas Grant",
      date: "March 29, 2025",
      category: "Leadership",
      readTime: "9 min read"
    },
    {
      id: '9',
      slug: 'intuition-development-practices',
      title: "7 Practices to Strengthen Your Intuition",
      excerpt: "Practical exercises to develop your intuitive abilities and learn to trust your inner guidance system in daily life.",
      image: "https://images.unsplash.com/photo-1516575150278-77136aed6920?auto=format&fit=crop&w=600",
      author: "Michelle Levy",
      date: "March 22, 2025",
      category: "Personal Development",
      readTime: "7 min read"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero section */}
      <div className="bg-gradient-to-r from-spirit-50 to-spirit-100 py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <Button 
            variant="ghost" 
            className="mb-6 hover:bg-white/20" 
            asChild
          >
            <Link to="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
          <h1 className="text-4xl md:text-5xl font-serif font-medium mb-4">Blog Archive</h1>
          <p className="text-xl text-earth-600 max-w-3xl">
            Explore our complete collection of articles on personal growth, spirituality, and conscious living.
          </p>
        </div>
      </div>

      {/* Archive content */}
      <div className="container mx-auto px-4 py-16 max-w-5xl">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allPosts.map((post) => (
            <div key={post.id} className="flex flex-col h-full group">
              <Link to={`/blog/${post.slug}`} className="block aspect-video mb-4 overflow-hidden rounded-lg">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </Link>
              <div className="flex items-center text-xs text-spirit-600 mb-2">
                <span className="bg-purple-100 text-spirit-700 px-2 py-1 rounded-full">{post.category}</span>
                <span className="ml-auto text-earth-500">{post.readTime}</span>
              </div>
              <h3 className="text-lg font-medium mb-2">
                <Link to={`/blog/${post.slug}`} className="hover:text-spirit-600 transition-colors">
                  {post.title}
                </Link>
              </h3>
              <p className="text-earth-600 text-sm mb-3 line-clamp-3">{post.excerpt}</p>
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
      </div>
    </div>
  );
};

export default BlogArchive;
