import Link from "next/link";
import { BarChart3, FileText } from "lucide-react";
import { FooterWrapper } from "@/shared/ui/footer/FooterWrapper";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <BarChart3 className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold text-foreground">AuditCraft</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Home
              </Link>
              <Link
                href="/dashboard"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="flex justify-center mb-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <FileText className="h-8 w-8" />
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Terms of Service
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              Please read these terms carefully before using our SEO analysis and optimization services.
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
              <h2 className="text-2xl font-bold text-foreground mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground mb-4">
                By accessing and using AuditCraft&apos;s SEO analysis and optimization services (&quot;Service&quot;),
                you accept and agree to be bound by the terms and provision of this agreement.
                If you do not agree to abide by the above, please do not use this service.
              </p>
              <p className="text-muted-foreground">
                These Terms of Service (&quot;Terms&quot;) govern your use of our website and services
                operated by AuditCraft (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;).
              </p>
            </div>

            <div className="bg-card p-8 rounded-lg border border-border mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">2. Description of Service</h2>
              <p className="text-muted-foreground mb-4">
                AuditCraft provides SEO analysis and optimization tools including:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
                <li>Website SEO analysis and scoring</li>
                <li>Keyword tracking and analysis</li>
                <li>Competitor analysis and benchmarking</li>
                <li>Content optimization recommendations</li>
                <li>Meta tag optimization tools</li>
                <li>Page speed analysis</li>
                <li>Sitemap generation and management</li>
                <li>SEO reporting and analytics</li>
              </ul>
              <p className="text-muted-foreground">
                Our services are designed to help businesses improve their search engine rankings
                and online visibility through data-driven SEO insights and recommendations.
              </p>
            </div>

            <div className="bg-card p-8 rounded-lg border border-border mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">3. User Accounts and Registration</h2>

              <h3 className="text-lg font-semibold text-foreground mb-2">Account Creation</h3>
              <p className="text-muted-foreground mb-4">
                To access certain features of our Service, you must create an account. You agree to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and update your account information</li>
                <li>Keep your password secure and confidential</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Notify us immediately of any unauthorized use</li>
              </ul>

              <h3 className="text-lg font-semibold text-foreground mb-2">Account Responsibilities</h3>
              <p className="text-muted-foreground">
                You are responsible for maintaining the confidentiality of your account and password.
                You agree to accept responsibility for all activities that occur under your account or password.
              </p>
            </div>

            <div className="bg-card p-8 rounded-lg border border-border mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">4. Acceptable Use Policy</h2>

              <h3 className="text-lg font-semibold text-foreground mb-2">Permitted Uses</h3>
              <p className="text-muted-foreground mb-4">
                You may use our Service for legitimate SEO analysis and optimization purposes, including:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
                <li>Analyzing your own websites and content</li>
                <li>Analyzing competitor websites for research purposes</li>
                <li>Generating SEO reports for clients (with proper attribution)</li>
                <li>Optimizing website content and meta tags</li>
                <li>Tracking keyword performance and rankings</li>
              </ul>

              <h3 className="text-lg font-semibold text-foreground mb-2">Prohibited Uses</h3>
              <p className="text-muted-foreground mb-4">
                You agree not to use our Service to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe on intellectual property rights</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Use automated tools to scrape or extract data</li>
                <li>Resell or redistribute our analysis results without permission</li>
                <li>Interfere with or disrupt the Service</li>
                <li>Use the Service for spam or malicious purposes</li>
                <li>Attempt to reverse engineer our algorithms or technology</li>
              </ul>

              <h3 className="text-lg font-semibold text-foreground mb-2">Rate Limiting</h3>
              <p className="text-muted-foreground">
                We reserve the right to limit the number of analyses, API calls, or other service usage
                to ensure fair usage and system stability. Excessive usage may result in temporary or permanent restrictions.
              </p>
            </div>

            <div className="bg-card p-8 rounded-lg border border-border mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">5. Subscription and Payment Terms</h2>

              <h3 className="text-lg font-semibold text-foreground mb-2">Subscription Plans</h3>
              <p className="text-muted-foreground mb-4">
                We offer various subscription plans with different features and usage limits.
                Subscription fees are billed in advance on a monthly or annual basis.
              </p>

              <h3 className="text-lg font-semibold text-foreground mb-2">Payment Terms</h3>
              <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
                <li>All fees are non-refundable except as required by law</li>
                <li>Prices may change with 30 days notice</li>
                <li>Failed payments may result in service suspension</li>
                <li>Taxes are not included and will be added where applicable</li>
              </ul>

              <h3 className="text-lg font-semibold text-foreground mb-2">Cancellation</h3>
              <p className="text-muted-foreground">
                You may cancel your subscription at any time through your account settings.
                Cancellation will take effect at the end of your current billing period.
                No refunds will be provided for partial months.
              </p>
            </div>

            <div className="bg-card p-8 rounded-lg border border-border mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">6. Data and Privacy</h2>

              <h3 className="text-lg font-semibold text-foreground mb-2">Data Collection</h3>
              <p className="text-muted-foreground mb-4">
                We collect and process data as described in our Privacy Policy, including:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
                <li>Account information and usage data</li>
                <li>Website URLs and analysis results</li>
                <li>Performance metrics and analytics</li>
                <li>Communication and support interactions</li>
              </ul>

              <h3 className="text-lg font-semibold text-foreground mb-2">Data Usage</h3>
              <p className="text-muted-foreground mb-4">
                We use your data to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
                <li>Provide and improve our SEO services</li>
                <li>Generate analysis reports and recommendations</li>
                <li>Process payments and manage accounts</li>
                <li>Send important service updates</li>
                <li>Provide customer support</li>
              </ul>

              <h3 className="text-lg font-semibold text-foreground mb-2">Data Security</h3>
              <p className="text-muted-foreground">
                We implement appropriate security measures to protect your data.
                However, no method of transmission over the internet is 100% secure,
                and we cannot guarantee absolute security.
              </p>
            </div>

            <div className="bg-card p-8 rounded-lg border border-border mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">7. Intellectual Property</h2>

              <h3 className="text-lg font-semibold text-foreground mb-2">Our Rights</h3>
              <p className="text-muted-foreground mb-4">
                The Service and its original content, features, and functionality are owned by
                AuditCraft and are protected by international copyright, trademark, patent,
                trade secret, and other intellectual property laws.
              </p>

              <h3 className="text-lg font-semibold text-foreground mb-2">Your Rights</h3>
              <p className="text-muted-foreground mb-4">
                You retain ownership of your website content and data. Analysis results and
                recommendations generated by our Service are provided for your use but remain
                subject to these Terms.
              </p>

              <h3 className="text-lg font-semibold text-foreground mb-2">License</h3>
              <p className="text-muted-foreground">
                We grant you a limited, non-exclusive, non-transferable license to use our Service
                for its intended purpose, subject to these Terms and any applicable subscription limits.
              </p>
            </div>

            <div className="bg-card p-8 rounded-lg border border-border mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">8. Disclaimers and Limitations</h2>

              <h3 className="text-lg font-semibold text-foreground mb-2">Service Availability</h3>
              <p className="text-muted-foreground mb-4">
                We strive to maintain high service availability but cannot guarantee uninterrupted access.
                The Service is provided &quot;as is&quot; without warranties of any kind.
              </p>

              <h3 className="text-lg font-semibold text-foreground mb-2">SEO Results</h3>
              <p className="text-muted-foreground mb-4">
                While our tools provide valuable insights, we cannot guarantee specific SEO results,
                rankings improvements, or traffic increases. Search engine algorithms change frequently,
                and many factors influence rankings beyond our control.
              </p>

              <h3 className="text-lg font-semibold text-foreground mb-2">Limitation of Liability</h3>
              <p className="text-muted-foreground mb-4">
                In no event shall AuditCraft be liable for any indirect, incidental, special,
                consequential, or punitive damages, including without limitation, loss of profits,
                data, use, goodwill, or other intangible losses.
              </p>

              <h3 className="text-lg font-semibold text-foreground mb-2">Maximum Liability</h3>
              <p className="text-muted-foreground">
                Our total liability to you for any claims arising from these Terms or your use of
                the Service shall not exceed the amount you paid us in the 12 months preceding the claim.
              </p>
            </div>

            <div className="bg-card p-8 rounded-lg border border-border mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">9. Termination</h2>

              <h3 className="text-lg font-semibold text-foreground mb-2">Termination by You</h3>
              <p className="text-muted-foreground mb-4">
                You may terminate your account at any time by canceling your subscription
                and contacting us to delete your account.
              </p>

              <h3 className="text-lg font-semibold text-foreground mb-2">Termination by Us</h3>
              <p className="text-muted-foreground mb-4">
                We may terminate or suspend your account immediately, without prior notice,
                for conduct that we believe violates these Terms or is harmful to other users,
                us, or third parties.
              </p>

              <h3 className="text-lg font-semibold text-foreground mb-2">Effect of Termination</h3>
              <p className="text-muted-foreground">
                Upon termination, your right to use the Service will cease immediately.
                We may delete your account and data, though we may retain certain information
                as required by law or for legitimate business purposes.
              </p>
            </div>

            <div className="bg-card p-8 rounded-lg border border-border mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">10. Changes to Terms</h2>
              <p className="text-muted-foreground mb-4">
                We reserve the right to modify these Terms at any time. We will notify users
                of any material changes via email or through the Service.
              </p>
              <p className="text-muted-foreground">
                Your continued use of the Service after changes become effective constitutes
                acceptance of the new Terms. If you do not agree to the changes, you should
                stop using the Service and cancel your account.
              </p>
            </div>

            <div className="bg-card p-8 rounded-lg border border-border mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">11. Governing Law</h2>
              <p className="text-muted-foreground mb-4">
                These Terms shall be governed by and construed in accordance with the laws
                of the jurisdiction in which AuditCraft operates, without regard to its
                conflict of law provisions.
              </p>
              <p className="text-muted-foreground">
                Any disputes arising from these Terms or your use of the Service shall be
                resolved through binding arbitration in accordance with the rules of the
                American Arbitration Association.
              </p>
            </div>

            <div className="bg-card p-8 rounded-lg border border-border mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">12. Contact Information</h2>
              <p className="text-muted-foreground mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="space-y-2 text-muted-foreground">
                <p>Email: legal@auditcraft.io</p>
                <p>Address: 123 SEO Street, New York, NY 10001</p>
                <p>Phone: +1 (555) 123-4567</p>
              </div>
            </div>

            <div className="bg-card p-8 rounded-lg border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-4">13. Severability</h2>
              <p className="text-muted-foreground">
                If any provision of these Terms is held to be invalid or unenforceable,
                such provision shall be struck and the remaining provisions shall be enforced.
                Our failure to enforce any right or provision will not be considered a waiver
                of those rights.
              </p>
            </div>

          </div>
        </div>
      </section>

      <FooterWrapper />
    </div>
  );
} 