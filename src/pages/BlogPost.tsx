import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, User, Tag, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

// Type definition for a blog post
type BlogPost = {
  id: number;
  title: string;
  content: string;
  image: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
};

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This would be replaced with an API call in a real application
    const fetchPost = () => {
      setLoading(true);
      
      // Example blog posts data with unique content and appropriate images
      const allPosts: BlogPost[] = [
        {
          id: 1,
          title: "How to Build a Routine That Promotes Real Change",
          content: "Creating real change in our lives depends largely on the routine we adopt. The key to deep and meaningful change lies in creating a routine that is both effective and sustainable.\n\nResearch shows that meaningful routines share several key characteristics. First, they're built around specific goals rather than vague aspirations. Instead of 'get healthier,' a good routine specifies exactly what actions will be taken, when, and how often. This clarity removes decision fatigue and makes the routine easier to follow.\n\nSecond, effective routines incorporate accountability mechanisms. Whether through a journal, app, coach, or community, having to report your progress significantly increases follow-through. The simple act of knowing someone or something is tracking your consistency creates a powerful motivation to maintain your practice.\n\nThird, transformative routines build in progressive challenges. Your routine should grow with you, introducing new difficulties as you master current levels. This progression prevents plateaus and keeps engagement high.\n\nFinally, sustainable routines honor your personal rhythms and preferences. The best routine isn't necessarily the one that worked for someone else—it's the one you'll actually stick with. Pay attention to when you naturally have the most focus, energy, and willpower, and design your routine to leverage these optimal periods.\n\nImplementing a new routine requires patience. Research indicates that habit formation typically takes between 18-254 days, with 66 days being the average. During this establishment phase, consistency matters more than perfection. Missing a day isn't failure—it's just part of the process. What matters is returning to your routine the next day.\n\nBy carefully designing routines that are specific, accountable, progressive, and personally aligned, you create the foundation for lasting transformation rather than temporary change.",
          image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=1200",
          author: "Michelle Levy",
          date: "May 15, 2025",
          category: "Personal Development",
          readTime: "7 min read"
        },
        {
          id: 2,
          title: "Why Short 7-21 Day Processes Work Better Than Long Courses",
          content: "In the world of learning and personal growth, we're seeing an increasing shift from traditional long courses to short, focused processes. This trend isn't just about catering to shorter attention spans—there are compelling psychological and neurological reasons why these condensed learning journeys often yield better results.\n\nFirst, short processes create a sense of urgency and commitment. When learners know they're embarking on a defined 7-21 day journey rather than an open-ended course, they're more likely to fully commit their attention and energy. This concentrated focus often leads to deeper engagement with the material.\n\nSecond, these shorter timeframes align perfectly with how our brains form new neural pathways. Research in neuroplasticity shows that consistent practice over a period of about three weeks can establish the foundation for new habits and skills. Longer courses often suffer from the spacing effect, where too much time between practice sessions weakens neural connections.\n\nThird, shorter processes provide faster feedback loops. Learners quickly see the results of their efforts, which triggers dopamine release and reinforces motivation. This positive reinforcement cycle is crucial for sustained learning and implementation.\n\nFourth, compact processes reduce the likelihood of overwhelm and abandonment. Many lengthy courses suffer from high dropout rates as initial enthusiasm wanes and life's demands compete for attention. Shorter processes feel achievable, leading to higher completion rates and the confidence boost that comes from following through.\n\nFinally, well-designed short processes focus on practical application rather than theoretical knowledge accumulation. They prioritize the essential 20% of content that yields 80% of results, eliminating the cognitive load of excessive information.\n\nFor optimal results, the most effective short processes include daily practice elements, community support or accountability, and clear metrics to track progress. They're designed not as abbreviated versions of longer courses, but as carefully crafted experiences that leverage our understanding of how humans actually learn and change.",
          image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200",
          author: "Daniel Cohen",
          date: "May 10, 2025",
          category: "Learning",
          readTime: "8 min read"
        },
        {
          id: 3,
          title: "What's the Difference Between Spiritual Consciousness and Positive Thinking?",
          content: "While often confused or used interchangeably, spiritual consciousness and positive thinking represent distinct approaches to personal growth and wellbeing—with significantly different depths and outcomes.\n\nPositive thinking operates primarily at the thought level. It focuses on replacing negative thoughts with affirmative ones to improve mood, outlook, and potentially manifest better circumstances. This cognitive approach can be valuable for managing stress and cultivating optimism, but it typically remains at the surface level of experience.\n\nSpiritual consciousness, by contrast, involves a fundamental shift in identity and awareness. Rather than simply changing the content of thoughts from negative to positive, it represents an awakening to a deeper dimension of being beyond thought itself. This includes recognizing yourself as the aware presence witnessing thoughts rather than being fully identified with them.\n\nThe distinctions become clearer when examining how each approach handles challenges:\n\nPositive thinking attempts to counter negative circumstances with affirmative thoughts—essentially fighting mental negativity with mental positivity. While this can improve emotional states temporarily, it often creates an underlying tension from resisting what is actually happening in the present moment.\n\nSpiritual consciousness acknowledges present reality fully while simultaneously recognizing a deeper truth beyond appearances. Instead of resisting difficult situations, it embraces them as opportunities for awakening and growth. This paradoxical capacity to accept what is while holding a larger perspective creates genuine inner freedom rather than psychological coping.\n\nPositive thinking asks: \"How can I think better thoughts to feel better and improve my circumstances?\"\n\nSpiritual consciousness asks: \"Who am I beyond all thoughts, and how can I live from that deeper truth?\"\n\nRather than seeing these approaches as competing, we might view positive thinking as a potentially helpful tool within the larger journey of spiritual consciousness. The former can provide temporary relief and direction, while the latter offers lasting transformation and freedom from identification with the thinking mind altogether.\n\nUltimately, positive thinking may help you navigate the dream of life more pleasantly, but spiritual consciousness invites you to gradually awaken from the dream to recognize your true nature.",
          image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=1200",
          author: "Sarah Williams",
          date: "April 28, 2025",
          category: "Spirituality",
          readTime: "6 min read"
        },
        {
          id: 4,
          title: "Abundance Mindset – Is It Just a Catchphrase?",
          content: "The term \"abundance mindset\" has become ubiquitous in personal development circles, often reduced to inspirational quotes on social media or simplified techniques for attracting wealth. This popularization raises valid questions: Has this concept become an empty catchphrase? Does it offer substantial value beyond positive thinking platitudes?\n\nAt its core, authentic abundance consciousness represents a fundamental shift in how we perceive reality—far deeper than merely expecting good things or visualizing success. It involves recognizing the intrinsic plenitude of existence itself, beyond the mind's habitual patterns of perceived scarcity and limitation.\n\nTruly understanding abundance requires examining its opposite: the scarcity mentality that dominates much of human experience. This default perspective evolved for survival—our ancestors needed to be hypervigilant about limited resources. However, this ancient programming now often operates inappropriately, creating artificial stress and limitation even amid plenty.\n\nGenuine abundance consciousness isn't about denying material realities or practical constraints. Instead, it's about perceiving the fullness that exists alongside these limitations—the boundless opportunities for growth, connection, creativity, and meaning available in any circumstance.\n\nNeurologically, an abundance orientation activates different brain networks than scarcity thinking. While scarcity activates stress responses and narrows cognitive focus, abundance consciousness engages brain regions associated with creativity, possibility-thinking, and holistic awareness. This neurological distinction explains why people operating from abundance consistently discover opportunities and solutions invisible to those gripped by scarcity.\n\nDeveloping authentic abundance consciousness requires more than affirmations or manifestation exercises. It involves practices that transform your relationship with reality itself:\n\n1. Cultivating present-moment awareness to recognize the inherent fullness of now\n2. Identifying and questioning scarcity assumptions embedded in your worldview\n3. Practicing genuine gratitude as a direct experience rather than a technique\n4. Recognizing abundance in non-material dimensions (time, attention, connection, meaning)\n5. Developing comfort with uncertainty and trust in life's unfolding process\n\nWhile the popularized version of abundance mindset might sometimes be reduced to a catchphrase, the deeper reality it points toward offers a profound shift in consciousness with far-reaching implications for how we experience life and contribute to our world.",
          image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=1200",
          author: "Michael Rivera",
          date: "April 22, 2025",
          category: "Mindset",
          readTime: "8 min read"
        },
        {
          id: 5,
          title: "How to Use Vision Boards Intelligently, Not Superficially",
          content: "Vision boards have gained immense popularity as manifestation tools, but their effectiveness varies dramatically based on how they're created and used. Many people create these visual collages superficially—selecting luxury items or idealized images without deeper consideration—then wonder why transformative results remain elusive.\n\nIntelligent vision boarding operates on multiple levels of consciousness, engaging both your conscious and subconscious mind toward meaningful growth and manifestation.\n\nThe first distinction in intelligent vision boarding is clarifying your authentic desires versus conditioned wants. Before selecting images, spend time in reflection: Which aspirations arise from your essential self rather than social conditioning or comparison? What would you desire even if no one else knew you had achieved it? This discernment prevents creating a board that represents someone else's definition of success.\n\nThe second key difference involves engaging with your board energetically, not just visually. Superficial vision boarding treats the board as a wishlist; intelligent vision boarding uses it as a tool for embodiment practice. When viewing your board, deliberately generate the feelings, sensations, and state of being that achieving these visions would create. This emotional resonance activates the subconscious mind and nervous system, which don't distinguish between vividly imagined experiences and physical reality.\n\nThird, effective vision boards include process imagery, not just outcome imagery. Alongside pictures representing your desired achievements, include images that symbolize the person you'll need to become and the journey required. This balances focus between results and the necessary growth that precedes them.\n\nFourth, intelligent vision boards incorporate symbols of release—representations of what you'll need to let go of to create space for your vision. This might include limiting beliefs, unproductive habits, or relationships that no longer serve your evolution.\n\nFinally, the most powerful vision boards are living documents rather than static creations. Schedule regular times to not just view your board, but to dialogue with it. Ask questions like: \"What's the next aligned step toward this vision?\" and \"What internal shift would support this manifestation?\" This transformative practice uses your board as a communication tool with your deeper wisdom rather than a simple visualization aid.\n\nWhen vision boards are approached with this depth and intelligence, they become powerful catalysts for both inner transformation and outer manifestation, rather than superficial collages of wishes that create more frustration than fulfillment.",
          image: "https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&w=1200",
          author: "Emma Thompson",
          date: "April 15, 2025",
          category: "Manifestation",
          readTime: "7 min read"
        },
        {
          id: 6,
          title: "How to Market Yourself Without Apologizing – An Energetic Approach to Business",
          content: "Many purpose-driven entrepreneurs and professionals face a common dilemma: they believe deeply in their work but struggle with marketing themselves authentically. This creates an energetic disconnect where their marketing feels awkward, apologetic, or inauthentic—ultimately undermining both their impact and income.\n\nThe solution isn't found in conventional marketing tactics but in resolving the underlying energetic conflict between service and visibility. When approached from this perspective, marketing becomes a natural extension of your purpose rather than a necessary evil.\n\nThe first step is recognizing any inner conflicts around being seen. Many helping professionals unconsciously hold limiting beliefs like \"drawing attention to myself is selfish\" or \"good work should speak for itself.\" These beliefs create energetic resistance that potential clients can sense, even if your external marketing appears confident.\n\nRather than trying to overcome this resistance through willpower or technique, transformative marketing begins with reframing visibility itself. The question shifts from \"How do I promote myself?\" to \"How can I ensure that those who need what I offer can find me?\" This subtle but powerful reorientation aligns your marketing energy with your service mission.\n\nFrom this foundation, authentic marketing emerges through three core principles:\n\n1. **Full-spectrum presence**: Rather than compartmentalizing your \"marketing self\" from your \"authentic self,\" bring your complete humanity to your visibility efforts. This integration creates magnetic authenticity that resonates with your ideal clients.\n\n2. **Sovereign value recognition**: Clearly acknowledge the value of what you offer without diminishment or exaggeration. This requires the inner work of fully owning your gifts and contributions without seeking external validation.\n\n3. **Service through visibility**: Approach each marketing activity as an opportunity to provide value, not just to promote yourself. Even brief social media posts or introductions can embody the essence of your work and serve as micro-transformations for those who encounter them.\n\nPractically, this energetic approach manifests in marketing that educates rather than persuades, shares insights that create immediate value regardless of purchase decisions, tells stories that illuminate possibilities rather than creating FOMO, and invites rather than chases.\n\nBy resolving the false dichotomy between authentic service and effective marketing, you create a coherent energy field that naturally attracts those who resonate with your unique expression—allowing you to increase your impact while honoring the integrity of your purpose.",
          image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200",
          author: "James Wilson",
          date: "April 8, 2025",
          category: "Business",
          readTime: "6 min read"
        }
      ];

      // Find the post with the matching id
      const foundPost = allPosts.find(post => post.id === Number(id));

      if (foundPost) {
        setPost(foundPost);
        // Wait a short delay to simulate loading
        setTimeout(() => {
          setLoading(false);
        }, 300);
      } else {
        // If post is not found, show error toast and navigate back
        toast({
          variant: "destructive",
          description: "The blog post you're looking for doesn't exist.",
        });
        navigate('/blog');
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center py-16">
          <div className="animate-pulse flex flex-col items-center space-y-8 w-full max-w-4xl">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-80 bg-gray-200 rounded w-full"></div>
            <div className="space-y-6 w-full">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
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
      <main className="flex-grow">
        {/* Hero section with image */}
        <div className="relative h-96 md:h-[500px] w-full">
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
            <div className="container mx-auto px-4 py-12">
              <Button 
                variant="ghost" 
                className="text-white mb-4 hover:bg-white/20" 
                onClick={() => navigate('/blog')}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Button>
              <span className="bg-purple-100 text-spirit-700 px-3 py-1 rounded-full text-sm">
                {post.category}
              </span>
              <h1 className="text-3xl md:text-5xl font-serif font-semibold mt-4 text-white">
                {post.title}
              </h1>
              <div className="flex items-center mt-6 text-white gap-6">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center">
                  <Tag className="h-4 w-4 mr-2" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Article content */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <article className="prose lg:prose-xl">
              {post.content.split('\n\n').map((paragraph, i) => (
                <p key={i} className="mb-6 text-earth-800 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </article>

            {/* Share and tags section */}
            <div className="mt-12 pt-6 border-t border-gray-200">
              <div className="flex flex-wrap items-center justify-between">
                <div className="mb-4 md:mb-0">
                  <span className="font-medium text-earth-700 mr-3">Share:</span>
                  <div className="inline-flex space-x-2">
                    {/* These buttons would have actual share functionality in a real app */}
                    <Button variant="outline" size="sm" className="rounded-full w-8 h-8 p-0">
                      <span className="sr-only">Share on Twitter</span>
                      X
                    </Button>
                    <Button variant="outline" size="sm" className="rounded-full w-8 h-8 p-0">
                      <span className="sr-only">Share on Facebook</span>
                      f
                    </Button>
                    <Button variant="outline" size="sm" className="rounded-full w-8 h-8 p-0">
                      <span className="sr-only">Share on LinkedIn</span>
                      in
                    </Button>
                  </div>
                </div>
                <div>
                  <span className="font-medium text-earth-700 mr-3">Tags:</span>
                  <span className="bg-purple-100 text-spirit-700 px-3 py-1 rounded-full text-sm">
                    {post.category}
                  </span>
                </div>
              </div>
            </div>

            {/* Related posts section - would typically show similar posts */}
            <div className="mt-16">
              <h2 className="text-2xl font-serif font-medium mb-6">You might also like</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {/* This would typically show related posts based on category/tags */}
                {/* For now just showing some sample posts */}
                <Button 
                  variant="outline" 
                  className="text-left flex items-center justify-between p-4 h-auto"
                  onClick={() => navigate('/blog/1')}
                >
                  <div>
                    <h3 className="font-medium">How to Build a Routine That Promotes Real Change</h3>
                    <p className="text-earth-600 text-sm mt-1">Personal Development</p>
                  </div>
                  <ArrowLeft className="h-4 w-4 rotate-180" />
                </Button>
                <Button 
                  variant="outline" 
                  className="text-left flex items-center justify-between p-4 h-auto"
                  onClick={() => navigate('/blog/2')}
                >
                  <div>
                    <h3 className="font-medium">Why Short 7-21 Day Processes Work Better Than Long Courses</h3>
                    <p className="text-earth-600 text-sm mt-1">Learning</p>
                  </div>
                  <ArrowLeft className="h-4 w-4 rotate-180" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
