
import React from 'react';
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Create a schema for form validation
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  experience: z.string().min(10, { message: "Please tell us a bit more about your experience." }),
});

type MentorFormValues = z.infer<typeof formSchema>;

interface MentorApplicationFormProps {
  onSubmit: (values: MentorFormValues) => void;
  onCancel: () => void;
}

const MentorApplicationForm: React.FC<MentorApplicationFormProps> = ({ onSubmit, onCancel }) => {
  // Initialize the form with validation
  const form = useForm<MentorFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      experience: ""
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="name">Full Name</FormLabel>
              <FormControl>
                <Input 
                  id="name"
                  placeholder="Your full name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="email">Email Address</FormLabel>
              <FormControl>
                <Input 
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="phone">Phone Number</FormLabel>
              <FormControl>
                <Input 
                  id="phone"
                  placeholder="Your phone number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="experience"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="experience">Your Experience</FormLabel>
              <FormControl>
                <Textarea 
                  id="experience"
                  placeholder="Tell us about your experience and areas of expertise..."
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="pt-4 flex justify-end space-x-2 rtl:space-x-reverse">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" className="bg-spirit-600 hover:bg-spirit-700">
            Submit Application
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default MentorApplicationForm;
