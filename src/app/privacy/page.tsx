import { Shield } from "lucide-react";
import { FooterWrapper } from "@/shared/ui/footer/FooterWrapper";
import { Header } from "@/components/Header";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header showAuthButtons={true} />

      {/* Hero Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="flex justify-center mb-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Shield className="h-8 w-8" />
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Privacy Policy
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl prose prose-gray dark:prose-invert max-w-none">

            <div className="bg-card p-8 rounded-lg border border-border mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">1. Information We Collect</h2>

              <h3 className="text-lg font-semibold text-foreground mb-2">Personal Information</h3>
              <p className="text-muted-foreground mb-4">
                We collect information you provide directly to us, such as when you create an account,
                use our services, or contact us for support. This may include:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
                <li>Name and email address</li>
                <li>Company information</li>
                <li>Website URLs you analyze</li>
                <li>Communication preferences</li>
                <li>Payment information (processed securely by our payment providers)</li>
              </ul>

              <h3 className="text-lg font-semibold text-foreground mb-2">Usage Information</h3>
              <p className="text-muted-foreground mb-4">
                We automatically collect certain information about your use of our services:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
                <li>IP address and device information</li>
                <li>Browser type and version</li>
                <li>Pages visited and features used</li>
                <li>Time spent on our platform</li>
                <li>Error logs and performance data</li>
              </ul>

              <h3 className="text-lg font-semibold text-foreground mb-2">Website Analysis Data</h3>
              <p className="text-muted-foreground">
                When you analyze websites through our tools, we collect publicly available information
                about those websites, including meta tags, content structure, and performance metrics.
                This data is used solely to provide you with SEO analysis and recommendations.
              </p>
            </div>

            <div className="bg-card p-8 rounded-lg border border-border mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">2. How We Use Your Information</h2>

              <p className="text-muted-foreground mb-4">We use the information we collect to:</p>
              <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
                <li>Provide and improve our SEO analysis services</li>
                <li>Process your payments and manage your account</li>
                <li>Send you important updates about our services</li>
                <li>Respond to your questions and provide customer support</li>
                <li>Analyze usage patterns to improve our platform</li>
                <li>Detect and prevent fraud or abuse</li>
                <li>Comply with legal obligations</li>
              </ul>

              <p className="text-muted-foreground">
                We do not sell, rent, or trade your personal information to third parties for marketing purposes.
              </p>
            </div>

            <div className="bg-card p-8 rounded-lg border border-border mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">3. Information Sharing</h2>

              <p className="text-muted-foreground mb-4">
                We may share your information in the following circumstances:
              </p>

              <h3 className="text-lg font-semibold text-foreground mb-2">Service Providers</h3>
              <p className="text-muted-foreground mb-4">
                We work with trusted third-party service providers who help us operate our platform,
                such as hosting providers, payment processors, and analytics services. These providers
                are contractually obligated to protect your information.
              </p>

              <h3 className="text-lg font-semibold text-foreground mb-2">Legal Requirements</h3>
              <p className="text-muted-foreground mb-4">
                We may disclose your information if required by law or to protect our rights,
                property, or safety, or that of our users or the public.
              </p>

              <h3 className="text-lg font-semibold text-foreground mb-2">Business Transfers</h3>
              <p className="text-muted-foreground">
                In the event of a merger, acquisition, or sale of assets, your information may be
                transferred as part of that transaction, subject to the same privacy protections.
              </p>
            </div>

            <div className="bg-card p-8 rounded-lg border border-border mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">4. Data Security</h2>

              <p className="text-muted-foreground mb-4">
                We implement industry-standard security measures to protect your information:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security audits and vulnerability assessments</li>
                <li>Access controls and authentication measures</li>
                <li>Secure data centers with physical security</li>
                <li>Employee training on data protection</li>
              </ul>

              <p className="text-muted-foreground">
                However, no method of transmission over the internet is 100% secure.
                We cannot guarantee absolute security but we&apos;re committed to protecting your information.
              </p>
            </div>

            <div className="bg-card p-8 rounded-lg border border-border mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">5. Your Rights and Choices</h2>

              <p className="text-muted-foreground mb-4">You have the following rights regarding your information:</p>

              <h3 className="text-lg font-semibold text-foreground mb-2">Access and Update</h3>
              <p className="text-muted-foreground mb-4">
                You can access and update your account information through your dashboard settings.
              </p>

              <h3 className="text-lg font-semibold text-foreground mb-2">Data Portability</h3>
              <p className="text-muted-foreground mb-4">
                You can request a copy of your data in a machine-readable format.
              </p>

              <h3 className="text-lg font-semibold text-foreground mb-2">Deletion</h3>
              <p className="text-muted-foreground mb-4">
                You can request deletion of your account and associated data, subject to legal requirements.
              </p>

              <h3 className="text-lg font-semibold text-foreground mb-2">Marketing Communications</h3>
              <p className="text-muted-foreground">
                You can opt out of marketing communications while still receiving important service updates.
              </p>
            </div>

            <div className="bg-card p-8 rounded-lg border border-border mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">6. Cookies and Tracking</h2>

              <p className="text-muted-foreground mb-4">
                We use cookies and similar technologies to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
                <li>Remember your preferences and settings</li>
                <li>Analyze how our platform is used</li>
                <li>Provide personalized content and features</li>
                <li>Improve our services and user experience</li>
              </ul>

              <p className="text-muted-foreground">
                You can control cookie settings through your browser preferences.
                Note that disabling certain cookies may affect platform functionality.
              </p>
            </div>

            <div className="bg-card p-8 rounded-lg border border-border mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">7. International Data Transfers</h2>

              <p className="text-muted-foreground">
                Your information may be transferred to and processed in countries other than your own.
                We ensure appropriate safeguards are in place to protect your information in accordance
                with this privacy policy and applicable data protection laws.
              </p>
            </div>

            <div className="bg-card p-8 rounded-lg border border-border mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">8. Children&apos;s Privacy</h2>

              <p className="text-muted-foreground">
                Our services are not intended for children under 13 years of age.
                We do not knowingly collect personal information from children under 13.
                If you believe we have collected information from a child under 13, please contact us.
              </p>
            </div>

            <div className="bg-card p-8 rounded-lg border border-border mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">9. Changes to This Policy</h2>

              <p className="text-muted-foreground">
                We may update this privacy policy from time to time. We will notify you of any material
                changes by posting the new policy on our website and updating the &quot;Last updated&quot; date.
                Your continued use of our services after changes become effective constitutes acceptance of the new policy.
              </p>
            </div>

            <div className="bg-card p-8 rounded-lg border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-4">10. Contact Us</h2>

              <p className="text-muted-foreground mb-4">
                If you have any questions about this privacy policy or our data practices, please contact us:
              </p>
              <ul className="list-none text-muted-foreground space-y-2">
                <li>Email: privacy@auditcraft.io</li>
                <li>Address: [Your Business Address]</li>
                <li>Phone: [Your Phone Number]</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <FooterWrapper />
    </div>
  );
} 