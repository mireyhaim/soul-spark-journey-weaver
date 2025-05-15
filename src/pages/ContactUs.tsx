import React from 'react';
import { Contact } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';

type ContactFormValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const ContactUs: React.FC = () => {
  const form = useForm<ContactFormValues>({
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    }
  });

  const onSubmit = (data: ContactFormValues) => {
    console.log('Form submitted:', data);
    // Update toast call to use the correct format
    toast("Thank you for contacting us. We'll get back to you soon!");
    form.reset();
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
            >
              Send Message
            </Button>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-earth-50 p-6 rounded-lg text-center">
            <h3 className="font-medium text-lg mb-2">Email Us</h3>
            <a href="mailto:support@flow83.com" className="text-spirit-600 hover:underline">
              support@flow83.com
            </a>
          </div>
          
          <div className="bg-earth-50 p-6 rounded-lg text-center">
            <h3 className="font-medium text-lg mb-2">Call Us</h3>
            <a href="tel:+1234567890" className="text-spirit-600 hover:underline">
              +1 (234) 567-890
            </a>
          </div>
          
          <div className="bg-earth-50 p-6 rounded-lg text-center">
            <h3 className="font-medium text-lg mb-2">Location</h3>
            <p className="text-earth-600">
              123 Meditation St, Mindful City, MC 12345
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
