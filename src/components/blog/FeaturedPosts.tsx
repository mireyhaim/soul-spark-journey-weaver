
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';

const FeaturedPosts: React.FC = () => {
  const featuredPosts = [
    {
      id: 1,
      title: "איך לבנות שגרה שמקדמת שינוי אמיתי",
      excerpt: "יצירת שינוי אמיתי בחיינו תלויה במידה רבה בשגרה שאנחנו מאמצים. המפתח לשינוי עמוק ומשמעותי טמון ביצירת שגרה שהיא גם אפקטיבית וגם בת-קיימא.",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=600",
      author: "מיכל לוי",
      date: "15 במאי, 2025",
      category: "פיתוח אישי"
    },
    {
      id: 2,
      title: "למה תהליכים קצרים של 7–21 יום עובדים טוב יותר מקורסים ארוכים",
      excerpt: "בעולם הלמידה והצמיחה האישית, אנחנו רואים מעבר הולך וגובר מקורסים מסורתיים ארוכים לתהליכים קצרים וממוקדים. הבנו מדוע זה עובד טוב יותר.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600",
      author: "דניאל כהן",
      date: "10 במאי, 2025",
      category: "למידה"
    }
  ];

  return (
    <section className="mb-16">
      <h2 className="text-3xl font-serif font-medium mb-8 text-right">מאמרים מומלצים</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {featuredPosts.map((post) => (
          <Card key={post.id} className="overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow">
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-48 object-cover"
            />
            <CardContent className="flex-grow flex flex-col p-6">
              <div className="flex items-center text-sm text-spirit-600 mb-2 justify-end">
                <span className="bg-purple-100 text-spirit-700 px-3 py-1 rounded-full">{post.category}</span>
              </div>
              <h3 className="text-xl font-serif font-medium mb-2 text-right">
                <Link to={`/blog/${post.id}`} className="hover:text-spirit-600 transition-colors">
                  {post.title}
                </Link>
              </h3>
              <p className="text-earth-600 mb-4 text-right">{post.excerpt}</p>
              <div className="mt-auto flex items-center justify-between text-sm text-earth-500">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 ml-1" />
                  <span>{post.date}</span>
                </div>
                <span>{post.author}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default FeaturedPosts;
