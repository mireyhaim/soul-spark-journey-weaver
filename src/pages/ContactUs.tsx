
import React, { useState } from 'react';
import { Contact } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

type ContactFormValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const ContactUs: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<ContactFormValues>({
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    }
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    console.log('Form submitted:', data);
    
    try {
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: data
      });
      
      if (error) {
        throw error;
      }
      
      toast("Thank you for contacting us. We'll get back to you soon!");
      form.reset();
    } catch (error) {
      console.error('Error sending contact form:', error);
      toast("There was an error sending your message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white py-12 md:py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-semibold mb-4">Contact Us</h1>
          <p className="text-lg text-earth-600 max-w-2xl mx-auto">
            We'd love to hear from you! Fill out the form below and we'll get back to you as soon as possible.
          </p>
        </div>

        <div className="bg-earth-50 rounded-xl shadow-sm p-6 md:p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Contact className="w-6 h-6 text-spirit-600" />
            <h2 className="text-2xl font-serif font-medium">Get in Touch</h2>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium">
                  Your Name
                </label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  {...form.register('name', { required: true })}
                  className="w-full"
                />
                {form.formState.errors.name && (
                  <p className="text-red-500 text-sm">Name is required</p>
                )}
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  {...form.register('email', { 
                    required: true,
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Please enter a valid email address",
                    }
                  })}
                  className="w-full"
                />
                {form.formState.errors.email && (
                  <p className="text-red-500 text-sm">
                    {form.formState.errors.email.message || "Email is required"}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="subject" className="block text-sm font-medium">
                Subject
              </label>
              <Input
                id="subject"
                placeholder="How can we help you?"
                {...form.register('subject', { required: true })}
                className="w-full"
              />
              {form.formState.errors.subject && (
                <p className="text-red-500 text-sm">Subject is required</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="block text-sm font-medium">
                Message
              </label>
              <Textarea
                id="message"
                rows={6}
                placeholder="Tell us more about your inquiry..."
                {...form.register('message', { required: true })}
                className="w-full resize-none"
              />
              {form.formState.errors.message && (
                <p className="text-red-500 text-sm">Message is required</p>
              )}
            </div>

            <Button 
              type="submit"
              className="w-full md:w-auto bg-spirit-600 hover:bg-spirit-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
          </form>
        </div>

        <div className="flex justify-center">
          <div className="bg-earth-50 p-6 rounded-lg text-center max-w-sm w-full">
            <h3 className="font-medium text-lg mb-2">Email Us</h3>
            <a href="mailto:support@flow83.com" className="text-spirit-600 hover:underline">
              support@flow83.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
