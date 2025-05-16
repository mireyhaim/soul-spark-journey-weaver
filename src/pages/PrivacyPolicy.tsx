import React from 'react';
import { 
  Shield, 
  Database, 
  Share2, 
  Lock, 
  UserCheck, 
  Cookie, 
  Clock, 
  UserX, 
  FileEdit, 
  Mail 
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-serif font-bold mb-8 text-earth-900 text-center">
          Privacy <span className="text-spirit-600">Policy</span>
        </h1>
        
        <Card className="mb-8 border-spirit-200 bg-earth-50/50">
          <CardContent className="pt-6">
            <p className="text-earth-800 text-lg">
              At Flow 83, we respect and protect your privacy. This Privacy Policy outlines how we collect, use, store, and protect your personal information when you use our platform and services. By using Flow 83, you agree to the practices described below.
            </p>
          </CardContent>
        </Card>

        <div className="prose max-w-none text-earth-800 space-y-8">
          {/* Information We Collect Section */}
          <section className="group">
            <div className={cn("flex items-start gap-4 p-5 rounded-lg transition-all", 
                              "hover:bg-spirit-50/50 hover:border-spirit-200")}>
              <div className="bg-spirit-100 text-spirit-700 p-3 rounded-full h-12 w-12 flex items-center justify-center shrink-0">
                <Database size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-3 text-earth-800 group-hover:text-spirit-800 transition-colors">Information We Collect</h2>
                <p>
                  We may collect the following types of data:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-2">
                  <li>
                    <strong>Personal Information:</strong> such as your name, email address, and account details when you register or interact with the platform.
                  </li>
                  <li>
                    <strong>Usage Data:</strong> such as your activity on the site, time spent on certain features, and technical information like IP address and device type.
                  </li>
                  <li>
                    <strong>AI Interaction Data:</strong> all text you enter during your journeys (your responses, reflections, and communications with the AI guide) may be stored to personalize your experience and improve the service.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* How We Use Your Information Section */}
          <section className="group">
            <div className={cn("flex items-start gap-4 p-5 rounded-lg transition-all", 
                              "hover:bg-spirit-50/50 hover:border-spirit-200")}>
              <div className="bg-spirit-100 text-spirit-700 p-3 rounded-full h-12 w-12 flex items-center justify-center shrink-0">
                <Shield size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-3 text-earth-800 group-hover:text-spirit-800 transition-colors">How We Use Your Information</h2>
                <p>
                  We use the information we collect to:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Deliver and personalize your journey experience</li>
                  <li>Improve the performance and content of our platform</li>
                  <li>Communicate with you about your account or updates</li>
                  <li>Ensure technical functionality and user support</li>
                  <li>Analyze trends and improve future offerings</li>
                  <li>Monitor compliance with our Terms & Conditions</li>
                </ul>
                <p className="mt-4">
                  We do not use your data to train AI models outside Flow 83, and we do not sell or rent your personal information to third parties.
                </p>
              </div>
            </div>
          </section>

          {/* Data Sharing Section */}
          <section className="group">
            <div className={cn("flex items-start gap-4 p-5 rounded-lg transition-all", 
                              "hover:bg-spirit-50/50 hover:border-spirit-200")}>
              <div className="bg-spirit-100 text-spirit-700 p-3 rounded-full h-12 w-12 flex items-center justify-center shrink-0">
                <Share2 size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-3 text-earth-800 group-hover:text-spirit-800 transition-colors">Data Sharing</h2>
                <p>
                  We do not share your personal data with third parties except in the following cases:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>With your consent</li>
                  <li>To comply with legal obligations</li>
                  <li>To trusted service providers who help us operate the platform (e.g. cloud storage, analytics), under strict confidentiality agreements</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Data Storage & Security Section */}
          <section className="group">
            <div className={cn("flex items-start gap-4 p-5 rounded-lg transition-all", 
                              "hover:bg-spirit-50/50 hover:border-spirit-200")}>
              <div className="bg-spirit-100 text-spirit-700 p-3 rounded-full h-12 w-12 flex items-center justify-center shrink-0">
                <Lock size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-3 text-earth-800 group-hover:text-spirit-800 transition-colors">Data Storage & Security</h2>
                <p>
                  Your data is stored securely on trusted servers and is protected by industry-standard encryption and access controls. We take reasonable measures to prevent unauthorized access, disclosure, or misuse of your information.
                </p>
              </div>
            </div>
          </section>

          {/* Your Rights Section */}
          <section className="group">
            <div className={cn("flex items-start gap-4 p-5 rounded-lg transition-all", 
                              "hover:bg-spirit-50/50 hover:border-spirit-200")}>
              <div className="bg-spirit-100 text-spirit-700 p-3 rounded-full h-12 w-12 flex items-center justify-center shrink-0">
                <UserCheck size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-3 text-earth-800 group-hover:text-spirit-800 transition-colors">Your Rights</h2>
                <p>
                  You have the right to:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Access the personal data we hold about you</li>
                  <li>Request corrections or deletions of your data</li>
                  <li>Withdraw your consent at any time</li>
                  <li>Request a copy of your stored data</li>
                </ul>
                <p className="mt-4">
                  To exercise any of these rights, contact us at:
                  <a href="/contact" className="text-spirit-600 hover:text-spirit-800 ml-1 transition-colors">our Contact page</a>.
                </p>
              </div>
            </div>
          </section>

          {/* Cookies & Tracking Section */}
          <section className="group">
            <div className={cn("flex items-start gap-4 p-5 rounded-lg transition-all", 
                              "hover:bg-spirit-50/50 hover:border-spirit-200")}>
              <div className="bg-spirit-100 text-spirit-700 p-3 rounded-full h-12 w-12 flex items-center justify-center shrink-0">
                <Cookie size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-3 text-earth-800 group-hover:text-spirit-800 transition-colors">Cookies & Tracking</h2>
                <p>
                  Flow 83 may use cookies or similar technologies to enhance user experience, remember preferences, and collect anonymous usage data. You can manage your cookie preferences through your browser settings.
                </p>
              </div>
            </div>
          </section>

          {/* Retention of Data Section */}
          <section className="group">
            <div className={cn("flex items-start gap-4 p-5 rounded-lg transition-all", 
                              "hover:bg-spirit-50/50 hover:border-spirit-200")}>
              <div className="bg-spirit-100 text-spirit-700 p-3 rounded-full h-12 w-12 flex items-center justify-center shrink-0">
                <Clock size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-3 text-earth-800 group-hover:text-spirit-800 transition-colors">Retention of Data</h2>
                <p>
                  We retain user data for as long as your account is active, or as needed to fulfill the purpose for which it was collected. You may request to delete your account and associated data at any time.
                </p>
              </div>
            </div>
          </section>

          {/* Children's Privacy Section */}
          <section className="group">
            <div className={cn("flex items-start gap-4 p-5 rounded-lg transition-all", 
                              "hover:bg-spirit-50/50 hover:border-spirit-200")}>
              <div className="bg-spirit-100 text-spirit-700 p-3 rounded-full h-12 w-12 flex items-center justify-center shrink-0">
                <UserX size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-3 text-earth-800 group-hover:text-spirit-800 transition-colors">Children's Privacy</h2>
                <p>
                  Flow 83 is not intended for use by individuals under the age of 18. We do not knowingly collect personal data from minors.
                </p>
              </div>
            </div>
          </section>

          {/* Changes to This Policy Section */}
          <section className="group">
            <div className={cn("flex items-start gap-4 p-5 rounded-lg transition-all", 
                              "hover:bg-spirit-50/50 hover:border-spirit-200")}>
              <div className="bg-spirit-100 text-spirit-700 p-3 rounded-full h-12 w-12 flex items-center justify-center shrink-0">
                <FileEdit size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-3 text-earth-800 group-hover:text-spirit-800 transition-colors">Changes to This Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. Any changes will be posted on this page with a revised "Last updated" date. We encourage you to review this page regularly.
                </p>
              </div>
            </div>
          </section>

          {/* Contact Us Section */}
          <section className="group">
            <div className={cn("flex items-start gap-4 p-5 rounded-lg transition-all", 
                              "hover:bg-spirit-50/50 hover:border-spirit-200")}>
              <div className="bg-spirit-100 text-spirit-700 p-3 rounded-full h-12 w-12 flex items-center justify-center shrink-0">
                <Mail size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-3 text-earth-800 group-hover:text-spirit-800 transition-colors">Contact Us</h2>
                <p>
                  If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:
                  <a href="/contact" className="text-spirit-600 hover:text-spirit-800 ml-1 transition-colors">our Contact page</a>.
                </p>
              </div>
            </div>
          </section>
          
          {/* Final Agreement Section */}
          <section className="mt-12 border-t border-earth-200 pt-8">
            <div className="p-5">
              <p className="font-semibold text-center text-earth-800">
                By using Flow 83, you acknowledge that you have read, understood, and agreed to this Privacy Policy.
              </p>
              <p className="mt-4 text-center text-earth-600 text-sm">
                Last updated: May 16, 2025
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
