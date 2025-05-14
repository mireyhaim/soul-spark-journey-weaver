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
  {
    id: '2',
    title: 'Why Short 7-21 Day Processes Work Better Than Long Courses',
    slug: 'why-short-processes-work-better',
    author: 'Daniel Cohen',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop',
    date: 'May 10, 2025',
    readTime: '8 min',
    category: 'Learning',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1600',
    summary: "In the world of learning and personal growth, we're seeing an increasing shift from traditional long courses to short, focused processes.",
    content: `
      <p>In the realm of personal development and education, we're witnessing a significant shift away from lengthy, comprehensive courses toward shorter, more focused learning experiences. This change isn't just a reflection of our increasingly busy lives but speaks to fundamental principles of how we learn and transform most effectively.</p>
      
      <h2>The Psychology of Focus and Achievement</h2>
      
      <p>Short learning processes capitalize on several psychological advantages:</p>
      
      <ul>
        <li><strong>Heightened motivation:</strong> A clear endpoint creates urgency and commitment</li>
        <li><strong>Reduced overwhelm:</strong> Breaking changes into manageable chunks prevents cognitive overload</li>
        <li><strong>Immediate application:</strong> Learning is immediately applied rather than stored for future use</li>
        <li><strong>Quick feedback loops:</strong> Faster implementation means quicker adjustments and learning</li>
      </ul>
      
      <p>When we commit to a 7-21 day process, our brain recognizes this as a sprint rather than a marathon. This activates our focus systems differently, allowing for more intensive, transformative experiences.</p>
      
      <h2>The Neurological Impact</h2>
      
      <p>Research in neuroplasticity—the brain's ability to reorganize itself—suggests that concentrated effort over shorter periods often yields better results than dispersed learning over longer timeframes. When we immerse ourselves completely in a new practice or concept for 7-21 days:</p>
      
      <ul>
        <li>New neural pathways form more rapidly</li>
        <li>Habit formation accelerates</li>
        <li>Integration of knowledge becomes more holistic</li>
      </ul>
      
      <p>This intensive approach creates a fertile environment for breakthrough insights that might take months to achieve in more traditional, spread-out learning formats.</p>
      
      <h2>Real-World Applications</h2>
      
      <p>The success of short processes can be seen across numerous fields:</p>
      
      <ul>
        <li><strong>Mindfulness:</strong> 7-day meditation challenges often yield more consistent practice than open-ended commitments</li>
        <li><strong>Skill acquisition:</strong> Intensive language immersion programs show remarkable results compared to years of casual study</li>
        <li><strong>Behavioral change:</strong> Focused interventions for habit formation prove more successful than gradual approaches</li>
        <li><strong>Business transformation:</strong> Short sprints produce more innovation than lengthy planning cycles</li>
      </ul>
      
      <p>These examples highlight how concentrated effort within a defined timeframe creates momentum that carries forward beyond the initial process.</p>
      
      <h2>Designing Effective Short Processes</h2>
      
      <p>Not all short courses are created equal. The most effective ones include:</p>
      
      <ul>
        <li>A clear, achievable outcome</li>
        <li>Daily practices that build sequentially</li>
        <li>Accountability mechanisms</li>
        <li>Community support</li>
        <li>Reflection prompts to integrate learning</li>
      </ul>
      
      <p>When these elements combine, short processes become powerful catalysts for genuine transformation rather than quick-fix solutions.</p>
      
      <h2>Finding Balance</h2>
      
      <p>While short processes offer numerous advantages, they work best as part of a broader growth strategy. The key is understanding when to use intensive short processes versus more extended explorations. Often, the most effective approach is a series of short, focused processes building upon each other, creating sustained growth while maintaining the motivational and neurological benefits of defined timeframes.</p>
    `
  },
  {
    id: '3',
    title: "What's the Difference Between Spiritual Consciousness and Positive Thinking?",
    slug: 'spiritual-consciousness-vs-positive-thinking',
    author: 'Sarah Williams',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop',
    date: 'April 28, 2025',
    readTime: '6 min',
    category: 'Spirituality',
    image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=1600',
    summary: 'Explore the key differences between spiritual awareness and mere positive thinking, and how to cultivate each for personal growth.',
    content: `
      <p>In the ever-expanding world of personal growth and spiritual development, two concepts frequently appear side by side: positive thinking and spiritual consciousness. While they may seem similar on the surface—both involving a shift in perspective—they represent fundamentally different approaches to life and reality. Understanding their differences can help clarify your own path and prevent common misconceptions that might limit deeper growth.</p>
      
      <h2>Positive Thinking: Reframing the Mind</h2>
      
      <p>Positive thinking operates primarily at the level of the mind and involves:</p>
      
      <ul>
        <li>Consciously choosing optimistic thoughts over pessimistic ones</li>
        <li>Focusing on desired outcomes rather than feared ones</li>
        <li>Using affirmations and visualization to reinforce helpful beliefs</li>
        <li>Interpreting events in ways that support emotional wellbeing</li>
      </ul>
      
      <p>This approach can be tremendously valuable for mental health, motivation, and creating a resilient mindset. At its best, positive thinking helps us navigate challenges with greater ease and opens us to possibilities we might otherwise miss when clouded by negativity.</p>
      
      <h2>Spiritual Consciousness: Beyond Thought Patterns</h2>
      
      <p>Spiritual consciousness, in contrast, transcends the realm of thought altogether and involves:</p>
      
      <ul>
        <li>Awareness of reality beyond conceptual thinking</li>
        <li>Recognition of the witnessing presence behind thoughts and emotions</li>
        <li>Direct perception of the interconnected nature of existence</li>
        <li>Opening to dimensions of being that transcend personal identity</li>
      </ul>
      
      <p>This represents a fundamental shift in identity and perception rather than merely adopting more pleasant or productive thought patterns. It often involves recognizing that you are not your thoughts but the awareness in which thoughts appear.</p>
      
      <h2>The Limitations of Positive Thinking Alone</h2>
      
      <p>While valuable, positive thinking has specific limitations when not complemented by deeper awareness:</p>
      
      <ul>
        <li>It can become a subtle form of denial or avoidance of uncomfortable truths</li>
        <li>It may create internal conflict when authentic emotions don't match desired thoughts</li>
        <li>It often maintains the fundamental illusion of separation and isolated selfhood</li>
        <li>It can become another mental structure that creates suffering when reality doesn't match expectations</li>
      </ul>
      
      <p>These limitations explain why some people feel exhausted by constant positive thinking or experience it as inauthentic bypassing of genuine human experience.</p>
      
      <h2>Integrating Both Approaches</h2>
      
      <p>The most balanced approach integrates positive thinking within the broader context of spiritual consciousness:</p>
      
      <ul>
        <li>Use positive thinking as a practical tool while recognizing thoughts as temporary constructs</li>
        <li>Allow challenging emotions while maintaining awareness of your deeper nature beyond them</li>
        <li>Cultivate optimism and possibility-thinking without attachment to specific outcomes</li>
        <li>Practice presence and acceptance alongside intentional focus on desired experiences</li>
      </ul>
      
      <p>This integration allows for the practical benefits of positive thinking while avoiding its potential pitfalls through the wisdom of spiritual awareness.</p>
      
      <h2>Practices for Each Dimension</h2>
      
      <p>Different practices serve these different dimensions of growth:</p>
      
      <p><strong>For positive thinking:</strong></p>
      <ul>
        <li>Affirmations and visualization</li>
        <li>Gratitude journaling</li>
        <li>Cognitive reframing techniques</li>
        <li>Goal-setting and achievement practices</li>
      </ul>
      
      <p><strong>For spiritual consciousness:</strong></p>
      <ul>
        <li>Meditation and mindfulness</li>
        <li>Self-inquiry practices</li>
        <li>Present-moment awareness in daily activities</li>
        <li>Contemplation of fundamental questions about identity and reality</li>
      </ul>
      
      <p>By engaging with both sets of practices, we develop a more balanced approach to personal growth that includes both practical optimism and profound spiritual insight.</p>
    `
  },
  {
    id: '4',
    title: 'Abundance Mindset – Is It Just a Catchphrase?',
    slug: 'abundance-mindset-more-than-catchphrase',
    author: 'Michael Rivera',
    authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop',
    date: 'April 22, 2025',
    readTime: '8 min',
    category: 'Mindset',
    image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=1600',
    summary: 'Dive deep into what abundance consciousness really means beyond the surface-level interpretations popular in self-help circles.',
    content: `
      <p>Few concepts in personal development have gained as much traction—or generated as much skepticism—as the "abundance mindset." For some, it represents a profound shift in consciousness with tangible effects on their lives. For others, it appears to be little more than wishful thinking dressed in spiritual language. So what's the truth behind this popular idea, and how can we engage with it authentically?</p>
      
      <h2>Beyond Positive Thinking</h2>
      
      <p>At its most superficial level, abundance mindset is often reduced to "thinking positively about money" or "visualizing wealth." But genuine abundance consciousness runs much deeper:</p>
      
      <ul>
        <li>It's a fundamental recognition of the sufficiency and generosity inherent in life itself</li>
        <li>It involves perceiving opportunities where others see only limitations</li>
        <li>It's about recognizing multiple forms of wealth beyond the financial</li>
        <li>It represents a shift from fear-based to trust-based decision-making</li>
      </ul>
      
      <p>This deeper understanding moves abundance from mere catchphrase to a genuine perceptual shift with far-reaching implications.</p>
      
      <h2>The Neurological Reality</h2>
      
      <p>Emerging research in neuroscience provides fascinating insights into why abundance thinking creates tangible results:</p>
      
      <ul>
        <li>Scarcity mindsets activate threat responses in the brain, narrowing perception and creativity</li>
        <li>Abundance perspectives activate reward circuits and the brain's exploration networks</li>
        <li>Our reticular activating system literally filters reality based on our dominant beliefs</li>
        <li>Optimistic perspectives have been shown to enhance problem-solving capabilities</li>
      </ul>
      
      <p>These findings suggest that abundance thinking isn't just pleasant self-deception—it actually enhances our cognitive capabilities and expands what we perceive as possible.</p>
      
      <h2>The Shadow Side</h2>
      
      <p>Any valuable concept can be misused or misunderstood, and abundance thinking is no exception. Common pitfalls include:</p>
      
      <ul>
        <li>Using abundance language to bypass genuine economic struggles and systemic inequities</li>
        <li>Promoting unrealistic expectations that lead to disappointment and self-blame</li>
        <li>Creating spiritual hierarchies where financial success is seen as proof of spiritual advancement</li>
        <li>Neglecting practical action in favor of visualization or affirmation alone</li>
      </ul>
      
      <p>Acknowledging these shadows allows us to engage with abundance principles more honestly and effectively.</p>
      
      <h2>Practical Cultivation</h2>
      
      <p>Moving beyond theory, how might we authentically cultivate abundance consciousness?</p>
      
      <ul>
        <li><strong>Gratitude practices:</strong> Regular acknowledgment of what's already present and sufficient</li>
        <li><strong>Generosity experiments:</strong> Testing the principles through giving and noticing what returns</li>
        <li><strong>Attention training:</strong> Deliberately noticing evidence of plenty rather than scarcity</li>
        <li><strong>Language awareness:</strong> Catching and reframing limiting narratives about "not enough"</li>
        <li><strong>Community cultivation:</strong> Surrounding yourself with people who embody healthy abundance perspectives</li>
      </ul>
      
      <p>These practices work on both psychological and energetic levels to shift our relationship with resources and possibilities.</p>
      
      <h2>Abundance as Ecology, Not Just Psychology</h2>
      
      <p>Perhaps the most profound understanding of abundance comes from ecological wisdom:</p>
      
      <ul>
        <li>Natural systems thrive through circulation rather than accumulation</li>
        <li>True abundance involves giving as much as receiving</li>
        <li>Sustainable prosperity requires consideration of the whole rather than isolated gain</li>
        <li>Indigenous perspectives often emphasize sufficiency and right relationship rather than endless growth</li>
      </ul>
      
      <p>This ecological view reminds us that true abundance isn't about amassing resources but participating wisely in the flow of exchange that sustains all life.</p>
      
      <h2>From Concept to Lived Reality</h2>
      
      <p>Ultimately, abundance mindset transcends being a mere concept when it becomes a lived reality—a genuine shift in how we perceive and interact with the world. This happens not through intellectual agreement but through consistent practice and direct experience of its principles in action.</p>
      
      <p>When approached with discernment, humility, and genuine curiosity, abundance consciousness can indeed transform from catchphrase to catalyst, opening us to greater possibility, generosity, and trust in the fundamental sufficiency of life.</p>
    `
  },
  {
    id: '5',
    title: 'How to Use Vision Boards Intelligently, Not Superficially',
    slug: 'vision-boards-intelligent-use',
    author: 'Emma Thompson',
    authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&auto=format&fit=crop',
    date: 'April 15, 2025',
    readTime: '7 min',
    category: 'Manifestation',
    image: 'https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&w=1600',
    summary: 'Learn practical techniques to create vision boards that connect with your deeper intentions rather than just surface-level desires.',
    content: `
      <p>Vision boards have become a staple tool in manifestation practices, yet their effectiveness varies dramatically depending on how they're created and used. For many, the process never moves beyond cutting out pictures of luxury items from magazines—an approach that often yields disappointing results. This article explores how to transform vision boarding from a superficial wishlist into a powerful instrument for genuine transformation and alignment.</p>
      
      <h2>Beyond Material Desires</h2>
      
      <p>The first key to creating an intelligent vision board is expanding beyond purely material objectives:</p>
      
      <ul>
        <li>Include representations of how you want to <em>feel</em>, not just what you want to have</li>
        <li>Incorporate images that represent qualities you wish to embody</li>
        <li>Add symbols of the impact you want to make, not just what you want to achieve</li>
        <li>Include elements that represent relationships and connections, not just personal acquisitions</li>
      </ul>
      
      <p>This broader approach activates deeper aspects of motivation and identity, rather than just stimulating desire for external objects.</p>
      
      <h2>Connecting to Values and Purpose</h2>
      
      <p>An intelligent vision board is rooted in what truly matters to you:</p>
      
      <ul>
        <li>Begin the process with reflection on your core values and authentic purpose</li>
        <li>For each element you add, ask "Why does this matter to me beyond social status or comfort?"</li>
        <li>Include representations of contribution and service, not just acquisition</li>
        <li>Create sections that reflect different dimensions of a fulfilled life, not just material prosperity</li>
      </ul>
      
      <p>This values-based approach ensures your visualizations activate genuine motivation rather than just stimulating superficial wants.</p>
      
      <h2>Engaging Multiple Levels of Consciousness</h2>
      
      <p>Effective vision boards work with both conscious and subconscious aspects of mind:</p>
      
      <ul>
        <li>Use colors and symbols that have personal meaning beyond their literal representation</li>
        <li>Include words or mantras that capture the essence of what you're cultivating</li>
        <li>Create space for emergent elements that might surprise you during the creative process</li>
        <li>Consider adding textural elements that engage multiple senses</li>
      </ul>
      
      <p>These approaches help your vision board communicate with deeper aspects of consciousness that often drive behavior more powerfully than conscious intention alone.</p>
      
      <h2>From Static Display to Dynamic Practice</h2>
      
      <p>Perhaps the most important shift is using your vision board as a tool for ongoing practice rather than passive display:</p>
      
      <ul>
        <li>Schedule regular contemplation time with your board, not just glancing at it occasionally</li>
        <li>Develop a practice of embodying the qualities represented while viewing it</li>
        <li>Periodically review and revise your board as your understanding deepens</li>
        <li>Use your board as a starting point for visualization exercises</li>
        <li>Create practices that move you toward your vision between viewing sessions</li>
      </ul>
      
      <p>This active engagement transforms your vision board from passive wishlist to catalyst for aligned action.</p>
      
      <h2>The Alignment Principle</h2>
      
      <p>Intelligent vision boarding recognizes that manifestation is fundamentally about alignment:</p>
      
      <ul>
        <li>Include elements that represent removing blocks, not just adding experiences</li>
        <li>Create sections that address mindset shifts needed, not just external changes desired</li>
        <li>Add representations of the person you need to become, not just the things you want to have</li>
        <li>Include symbols of letting go, not just acquiring</li>
      </ul>
      
      <p>This balanced approach acknowledges that creating your vision involves both attraction and release, becoming and allowing.</p>
      
      <h2>Digital vs. Physical: Making Conscious Choices</h2>
      
      <p>Both digital and physical vision boards have distinct advantages:</p>
      
      <ul>
        <li><strong>Physical boards</strong> engage multiple senses and create a tangible focal point in your environment</li>
        <li><strong>Digital boards</strong> can be more easily updated and carried with you for frequent viewing</li>
        <li><strong>Physical creation</strong> often engages more intuitive and embodied aspects of creativity</li>
        <li><strong>Digital tools</strong> provide access to a wider range of visual elements and easy organization</li>
      </ul>
      
      <p>The optimal choice depends on your personal preferences and how you'll integrate the board into your regular practice.</p>
      
      <h2>From Visualization to Embodiment</h2>
      
      <p>The ultimate goal is moving from visualizing your intentions to embodying them:</p>
      
      <ul>
        <li>Use your vision board as a trigger for embodiment practices</li>
        <li>Create physical gestures or postures that help you feel the reality you're creating</li>
        <li>Develop "as if" practices that allow you to experience aspects of your vision now</li>
        <li>Take aligned action steps that move you toward your vision daily</li>
      </ul>
      
      <p>This embodiment focus transforms vision boarding from wishful thinking into a powerful catalyst for genuine transformation and manifestation.</p>
    `
  },
  {
    id: '6',
    title: 'How to Market Yourself Without Apologizing – An Energetic Approach to Business',
    slug: 'energetic-approach-to-business',
    author: 'James Wilson',
    authorAvatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=100&auto=format&fit=crop',
    date: 'April 8, 2025',
    readTime: '6 min',
    category: 'Business',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1600',
    summary: 'Discover how to promote your business authentically by aligning with your inner values and natural energy.',
    content: `
      <p>For many conscious entrepreneurs, coaches, and healers, marketing presents a particular challenge. There's often a disconnect between the authentic, heartfelt work they do and the way they feel they need to promote it. This disconnect can lead to inconsistent marketing efforts, apologetic messaging, or avoiding business growth altogether. This article explores an alternative approach—one that views marketing through an energetic lens rather than purely as a strategic or tactical exercise.</p>
      
      <h2>The Energetics of Marketing</h2>
      
      <p>At its core, authentic marketing is about energy transfer:</p>
      
      <ul>
        <li>The energy you put into your marketing reflects and transmits your relationship with your work</li>
        <li>Marketing is an extension of your service, not a separate activity</li>
        <li>Your ideal clients respond more to the energy behind your words than the perfect phrasing</li>
        <li>Alignment creates resonance that attracts people naturally</li>
      </ul>
      
      <p>Understanding this energetic foundation helps shift marketing from manipulation to invitation—from pushing to allowing.</p>
      
      <h2>Moving Beyond Apology</h2>
      
      <p>Many practitioners unconsciously incorporate apologetic energy into their marketing:</p>
      
      <ul>
        <li>Constantly offering discounts before establishing value</li>
        <li>Using minimizing language ("just," "only," "a little")</li>
        <li>Over-explaining and justifying their prices or approach</li>
        <li>Hiding their most powerful work out of fear it seems too "out there"</li>
      </ul>
      
      <p>These patterns stem from unresolved beliefs about worthiness, value, and the appropriateness of receiving abundance for spiritual or helping work.</p>
      
      <h2>Clearing Energetic Blocks</h2>
      
      <p>Before tactical marketing approaches can work effectively, internal alignments are needed:</p>
      
      <ul>
        <li><strong>Worthiness work:</strong> Addressing beliefs about deserving visibility and prosperity</li>
        <li><strong>Value clarity:</strong> Getting radically honest about the transformation your work provides</li>
        <li><strong>Money healing:</strong> Resolving conflicts between spirituality and prosperity</li>
        <li><strong>Visibility threshold:</strong> Working with fears about being seen and judged</li>
      </ul>
      
      <p>These inner shifts create the foundation for marketing that feels congruent rather than forced or inauthentic.</p>
      
      <h2>Marketing as Service</h2>
      
      <p>A paradigm shift occurs when we recognize that effective marketing is itself a form of service:</p>
      
      <ul>
        <li>Clear communication helps people determine if your offering meets their needs</li>
        <li>Confident invitations give permission to those hesitating to get help they desire</li>
        <li>Sharing your work's value honors the transformation it creates</li>
        <li>Authentic marketing helps people make decisions aligned with their highest good</li>
      </ul>
      
      <p>This perspective transforms marketing from a necessary evil to an integral aspect of your contribution.</p>
      
      <h2>Practical Energetic Marketing</h2>
      
      <p>This foundation supports practical approaches that maintain energetic integrity:</p>
      
      <ul>
        <li><strong>Clarity rituals</strong> before creating marketing content to align with your highest purpose</li>
        <li><strong>Energy clearing practices</strong> for marketing channels (website, social platforms, email)</li>
        <li><strong>Intentional language</strong> that transmits confidence without hype</li>
        <li><strong>Permission-based invitations</strong> that respect others' sovereignty</li>
        <li><strong>Abundant generosity</strong> balanced with clear boundaries</li>
      </ul>
      
      <p>These practices ensure your marketing carries the same integrity and consciousness as your core work.</p>
      
      <h2>Beyond Techniques to Transmission</h2>
      
      <p>Ultimately, the most powerful marketing transcends conventional approaches:</p>
      
      <ul>
        <li>Your presence itself becomes magnetic as internal conflicts resolve</li>
        <li>The results of your work create natural word-of-mouth expansion</li>
        <li>Your relationship with your business becomes a model for what you help create for others</li>
        <li>Marketing becomes less about what you say and more about who you're being</li>
      </ul>
      
      <p>This evolution represents the integration of your work and how you share it—a unified expression rather than separate activities.</p>
      
      <h2>Practical Integration Steps</h2>
      
      <p>To begin implementing this approach:</p>
      
      <ul>
        <li>Review your current marketing materials for apologetic language or energy</li>
        <li>Develop a pre-marketing practice that connects you to your purpose and value</li>
        <li>Experiment with more direct invitations while maintaining heart connection</li>
        <li>Notice where resistance arises and use it as information about internal work needed</li>
        <li>Gather feedback not just on marketing effectiveness but how it feels to those receiving it</li>
      </ul>
      
      <p>These steps begin the transformation from marketing as a separate business activity to an integrated expression of your purpose and contribution.</p>
    `
  }
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
