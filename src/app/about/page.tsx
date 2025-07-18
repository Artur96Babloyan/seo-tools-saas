import Link from "next/link";
import { BarChart3, Users, Globe, Zap, Shield, Award } from "lucide-react";
import { FooterWrapper } from "@/shared/ui/footer/FooterWrapper";
import { Header } from "@/components/Header";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header showAuthButtons={true} />

      {/* Hero Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              About <span className="text-primary">AuditCraft</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              Empowering businesses with professional SEO tools and insights to dominate search rankings and drive sustainable growth.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Our Mission
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                To democratize professional SEO tools and make advanced website optimization accessible to businesses of all sizes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-card p-8 rounded-lg border border-border">
                <h3 className="text-xl font-semibold text-foreground mb-4">What We Do</h3>
                <p className="text-muted-foreground">
                  We provide comprehensive SEO analysis tools that help businesses understand their website performance,
                  optimize content for search engines, and track their progress over time. Our AI-powered platform
                  delivers actionable insights that drive real results.
                </p>
              </div>

              <div className="bg-card p-8 rounded-lg border border-border">
                <h3 className="text-xl font-semibold text-foreground mb-4">Why We Do It</h3>
                <p className="text-muted-foreground">
                  In today&apos;s digital landscape, visibility in search results is crucial for business success.
                  We believe every business deserves access to professional-grade SEO tools that were once
                  only available to large corporations with big budgets.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Our Values
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Award className="h-8 w-8" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Excellence</h3>
                <p className="text-muted-foreground">
                  We strive for excellence in everything we do, from our tools&apos; accuracy to our customer support.
                </p>
              </div>

              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Shield className="h-8 w-8" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Trust & Security</h3>
                <p className="text-muted-foreground">
                  Your data security is our priority. We implement industry-leading security measures to protect your information.
                </p>
              </div>

              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Users className="h-8 w-8" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Customer Focus</h3>
                <p className="text-muted-foreground">
                  We&apos;re committed to understanding and meeting our customers&apos; needs with personalized solutions.
                </p>
              </div>

              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Zap className="h-8 w-8" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Innovation</h3>
                <p className="text-muted-foreground">
                  We continuously innovate our tools and features to stay ahead of SEO trends and algorithm changes.
                </p>
              </div>

              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Globe className="h-8 w-8" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Accessibility</h3>
                <p className="text-muted-foreground">
                  We make professional SEO tools accessible to businesses of all sizes, not just large corporations.
                </p>
              </div>

              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <BarChart3 className="h-8 w-8" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Data-Driven</h3>
                <p className="text-muted-foreground">
                  Our decisions and recommendations are based on real data and proven SEO methodologies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-8">
              Our Expertise
            </h2>
            <p className="text-lg text-muted-foreground mb-12">
              AuditCraft is built by a team of SEO experts, developers, and digital marketing professionals
              with years of experience in helping businesses succeed online. We combine technical expertise
              with practical marketing knowledge to deliver tools that actually work.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-card p-6 rounded-lg border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-2">SEO Specialists</h3>
                <p className="text-muted-foreground text-sm">
                  Certified SEO professionals with expertise in technical SEO, content optimization, and search engine algorithms.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-2">Developers</h3>
                <p className="text-muted-foreground text-sm">
                  Experienced developers who build robust, scalable tools that handle complex SEO analysis efficiently.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-2">Data Analysts</h3>
                <p className="text-muted-foreground text-sm">
                  Data experts who ensure our tools provide accurate, actionable insights based on real search data.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of businesses that trust AuditCraft for their SEO needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Start Your Free Analysis
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg border border-border bg-card px-6 py-3 text-base font-semibold text-foreground shadow-sm hover:bg-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <FooterWrapper />
    </div>
  );
} 