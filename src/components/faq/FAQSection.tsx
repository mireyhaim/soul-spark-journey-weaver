
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQSection: React.FC = () => {
  const faqs = [
    {
      question: "What is InFlow?",
      answer: "InFlow is a platform that connects mentors with individuals seeking personal development and spiritual growth. Our AI-enhanced system transforms mentor expertise into personalized development journeys for users, creating meaningful growth experiences."
    },
    {
      question: "How does the platform work?",
      answer: "Our platform uses AI to transform mentor wisdom into customized development journeys. Users can explore various journeys, connect with mentors, and follow guided paths for personal growth, spiritual development, consciousness expansion, and manifestation."
    },
    {
      question: "Can I become a mentor on InFlow?",
      answer: "Yes! If you have expertise in personal growth, spiritual development, or related fields, you can apply to become a mentor. You'll be able to share your wisdom, monetize your content, and help others on their journey while we handle the technology and platform aspects."
    },
    {
      question: "How do I get started as a user?",
      answer: "Simply create an account, explore the available journeys, and choose one that resonates with your goals. You can also take our questionnaire to receive personalized journey recommendations based on your specific needs and interests."
    },
    {
      question: "What types of journeys are available?",
      answer: "We offer a wide range of journeys focused on personal development, spiritual growth, consciousness expansion, manifestation techniques, mindfulness practices, and more. Each journey is created by experienced mentors and enhanced by our AI to provide a personalized experience."
    },
    {
      question: "Is my information secure on the platform?",
      answer: "Yes, we take data security and privacy very seriously. All user information is encrypted and stored securely. We never share your personal details with third parties without your explicit consent."
    },
    {
      question: "Can I cancel my membership?",
      answer: "Yes, you can cancel your membership at any time. Your account will remain active until the end of the current billing period."
    },
    {
      question: "How do I contact support?",
      answer: "For any questions or issues, you can reach our support team through the Contact Us page or by emailing support@inflow.com. We typically respond within 24 hours."
    }
  ];

  return (
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((faq, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger className="text-left text-lg font-medium py-4">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="text-earth-700 text-base pb-6">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default FAQSection;
