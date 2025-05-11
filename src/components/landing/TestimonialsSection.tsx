
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface TestimonialProps {
  quote: string;
  name: string;
  journey: string;
  bgClass: string;
  borderClass: string;
  iconClass: string;
}

const Testimonial: React.FC<TestimonialProps> = ({ 
  quote, name, journey, bgClass, borderClass, iconClass 
}) => {
  return (
    <Card className={`${bgClass} ${borderClass}`}>
      <CardContent className="pt-8 pb-8 px-6">
        <div className="flex flex-col h-full">
          <div className="mb-4">
            <svg className={`h-8 w-8 ${iconClass}`} fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </div>
          <p className="text-earth-700 flex-grow">
            {quote}
          </p>
          <div className="mt-6 pt-6 border-t border-spirit-200">
            <p className="font-medium">{name}</p>
            <p className="text-sm text-earth-500">{journey}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      quote: "The Forgiveness Journey helped me release decades of resentment I was carrying. The AI companion seemed to understand exactly what I needed each day.",
      name: "Jamie Lewis",
      journey: "14-day Forgiveness Journey",
      bgClass: "bg-spirit-50",
      borderClass: "border-spirit-100",
      iconClass: "text-spirit-400"
    },
    {
      quote: "Since completing the Abundance Meditation journey, I've noticed a complete shift in my mindset about money and opportunities. They seem to flow more easily now.",
      name: "Alex Chen",
      journey: "21-day Abundance Journey",
      bgClass: "bg-calm-50",
      borderClass: "border-calm-100",
      iconClass: "text-calm-400"
    },
    {
      quote: "As a therapist myself, I was skeptical about AI guidance, but the Inner Child journey was profound. The exercises were thoughtful and the guidance felt genuinely supportive.",
      name: "Dr. Sophia Patel",
      journey: "7-day Inner Child Journey",
      bgClass: "bg-earth-50",
      borderClass: "border-earth-100",
      iconClass: "text-earth-400"
    }
  ];

  return (
    <section className="py-16 px-4 md:px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4">
            Transformative Experiences
          </h2>
          <p className="text-lg text-earth-600 max-w-3xl mx-auto">
            Hear from people whose lives have been changed by SoulPath journeys.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Testimonial key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
