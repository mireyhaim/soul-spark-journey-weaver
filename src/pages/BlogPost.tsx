
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "@/hooks/use-toast";

// Mock blog data
const blogPosts = [
  {
    id: '1',
    title: 'Understanding Spiritual Awakening',
    slug: 'understanding-spiritual-awakening',
    author: 'Emma Thompson',
    authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&auto=format&fit=crop',
    date: 'May 3, 2024',
    readTime: '7 min',
    category: 'Spirituality',
    image: 'https://images.unsplash.com/photo-1518173946419-9dadda4c9dd4?q=80&w=1600&auto=format&fit=crop',
    summary: 'Explore the fundamental concepts of spiritual awakening and how it transforms your perspective on life and reality.',
    content: `
      <p>Spiritual awakening is often described as a shift in consciousness—a moment or process where our awareness expands beyond our individual identity to include a greater connection with all of existence. This profound transformation typically happens gradually, though some experience sudden insights or revelations.</p>
      
      <h2>Signs of Spiritual Awakening</h2>
      
      <p>The journey of awakening often brings several noticeable changes to your experience:</p>
      
      <ul>
        <li>Enhanced awareness of your thoughts and emotional patterns</li>
        <li>A deepening sense of presence in daily activities</li>
        <li>Increased sensitivity to energy in yourself and others</li>
        <li>Growing compassion for all beings</li>
        <li>Decreased attachment to material possessions</li>
        <li>Recognition of the interconnectedness of all life</li>
      </ul>
      
      <p>These shifts don't necessarily occur all at once, and the journey is unique for each person. What's important is noticing the gradual expansion of your consciousness and allowing the process to unfold naturally.</p>
      
      <h2>Practices That Support Awakening</h2>
      
      <p>While spiritual awakening cannot be forced, certain practices can create space for it to emerge:</p>
      
      <ul>
        <li>Meditation and mindfulness practices</li>
        <li>Time in nature and connecting with the elements</li>
        <li>Self-inquiry and contemplative practices</li>
        <li>Working with a spiritual teacher or community</li>
        <li>Integrating insights through journaling or creative expression</li>
      </ul>
      
      <p>Remember that awakening is not about escaping your humanity but rather embracing it fully while recognizing the deeper dimensions of your being. The path involves both transcendence and integration—learning to embody your insights in everyday life.</p>
      
      <h2>Navigating Challenges</h2>
      
      <p>The awakening process often brings challenges as old structures of identity and belief systems dissolve. You might experience:</p>
      
      <ul>
        <li>Periods of confusion or disorientation</li>
        <li>Releasing of past trauma and emotional wounds</li>
        <li>Changes in relationships and social dynamics</li>
        <li>A "dark night of the soul" where previous meaning structures collapse</li>
      </ul>
      
      <p>These difficulties are not signs of failure but represent necessary transformations as your consciousness evolves. Patience, self-compassion, and community support are essential during these times.</p>
      
      <h2>The Ongoing Journey</h2>
      
      <p>Spiritual awakening is not a destination but an ongoing journey of expansion and integration. There will always be new layers of awareness to explore and deeper truths to embody. The beauty lies in the unfolding—being present with each step of the path with curiosity and openness.</p>
    `
  },
  // ... other blog posts would be here
];

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API fetch delay
    const timer = setTimeout(() => {
      const foundPost = blogPosts.find(post => post.id === id || post.slug === id);
      
      if (foundPost) {
        setPost(foundPost);
        setLoading(false);
      } else {
        // If post is not found, show error toast and navigate back
        toast("The blog post you're looking for doesn't exist.", {
          className: "bg-destructive text-destructive-foreground"
        });
        navigate('/blog');
        setLoading(false);
      }
    }, 800);
    
    return () => clearTimeout(timer);
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow py-10 px-4 md:px-6">
          <div className="container mx-auto">
            <div className="animate-pulse">
              <div className="h-10 bg-slate-200 rounded w-3/4 mb-6"></div>
              <div className="h-6 bg-slate-200 rounded w-1/4 mb-12"></div>
              <div className="h-96 bg-slate-200 rounded mb-6"></div>
              <div className="space-y-4">
                <div className="h-4 bg-slate-200 rounded w-full"></div>
                <div className="h-4 bg-slate-200 rounded w-full"></div>
                <div className="h-4 bg-slate-200 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (!post) return null;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-10 px-4 md:px-6">
        <div className="container mx-auto max-w-4xl">
          {/* Blog Hero */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Button 
                  variant="ghost" 
                  className="flex items-center gap-1 text-earth-600 hover:text-earth-800"
                  onClick={() => navigate('/blog')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                    <path d="m15 18-6-6 6-6"/>
                  </svg>
                  Back to Blog
                </Button>
              </div>
              <span className="text-sm text-earth-600">{post.date} · {post.readTime} read</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-serif mb-4">{post.title}</h1>
            
            <div className="flex items-center mb-6">
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage src={post.authorAvatar} alt={post.author} />
                <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="text-sm font-medium">{post.author}</div>
                <div className="text-xs text-earth-600">Author</div>
              </div>
            </div>
            
            <div className="rounded-xl overflow-hidden mb-8">
              <AspectRatio ratio={16/9}>
                <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
              </AspectRatio>
            </div>
            
            <Separator className="my-6" />
          </div>
          
          {/* Blog Content */}
          <article className="prose prose-earth max-w-none">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </article>
          
          <Separator className="my-10" />
          
          {/* Blog Footer */}
          <div className="flex justify-between items-center">
            <div>
              <span className="inline-block bg-spirit-100 text-spirit-800 rounded-full px-3 py-1 text-sm font-medium">
                #{post.category}
              </span>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <path d="M20 12V5c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h3"/>
                  <path d="m9 22 4-4-4-4"/>
                  <path d="M14 18h7"/>
                </svg>
                Share
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPost;
