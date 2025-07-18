"use client";

import { CheckCircle, XCircle, AlertTriangle, Clock, BarChart3, TrendingUp, Users, Sparkles, FileText, Search } from "lucide-react";
import { FooterWrapper } from "@/shared/ui/footer/FooterWrapper";
import { Header } from "@/components/Header";

// Mock data - in a real implementation, this would come from your monitoring system
const services = [
  {
    id: 'api',
    name: 'API Services',
    description: 'Core API endpoints for SEO analysis',
    status: 'operational',
    uptime: '99.98%',
    responseTime: '120ms',
    icon: BarChart3
  },
  {
    id: 'keyword-tracking',
    name: 'Keyword Tracker',
    description: 'Keyword ranking and tracking service',
    status: 'operational',
    uptime: '99.95%',
    responseTime: '85ms',
    icon: TrendingUp
  },
  {
    id: 'competitor-analysis',
    name: 'Competitor Analysis',
    description: 'Competitor research and benchmarking',
    status: 'operational',
    uptime: '99.92%',
    responseTime: '200ms',
    icon: Users
  },
  {
    id: 'content-optimizer',
    name: 'Content Optimizer',
    description: 'SEO content analysis and recommendations',
    status: 'operational',
    uptime: '99.89%',
    responseTime: '150ms',
    icon: Sparkles
  },
  {
    id: 'page-speed',
    name: 'Page Speed Analyzer',
    description: 'Website performance and speed testing',
    status: 'operational',
    uptime: '99.85%',
    responseTime: '300ms',
    icon: FileText
  },
  {
    id: 'database',
    name: 'Database',
    description: 'Data storage and retrieval systems',
    status: 'operational',
    uptime: '99.99%',
    responseTime: '45ms',
    icon: Search
  }
];

const incidents = [
  {
    id: 1,
    title: 'Scheduled Maintenance - Database Optimization',
    status: 'resolved',
    severity: 'maintenance',
    startTime: '2024-01-15T02:00:00Z',
    endTime: '2024-01-15T04:00:00Z',
    description: 'Routine database maintenance to improve performance and add new indexes for faster keyword tracking queries.',
    affectedServices: ['keyword-tracking', 'competitor-analysis']
  },
  {
    id: 2,
    title: 'API Rate Limiting Issues',
    status: 'resolved',
    severity: 'minor',
    startTime: '2024-01-10T14:30:00Z',
    endTime: '2024-01-10T16:45:00Z',
    description: 'Temporary issues with Google Search Console API rate limits causing delays in competitor analysis reports.',
    affectedServices: ['competitor-analysis']
  },
  {
    id: 3,
    title: 'Content Optimizer Performance Degradation',
    status: 'resolved',
    severity: 'minor',
    startTime: '2024-01-05T09:15:00Z',
    endTime: '2024-01-05T11:30:00Z',
    description: 'Increased response times for content optimization requests due to high traffic load.',
    affectedServices: ['content-optimizer']
  }
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'operational':
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    case 'degraded':
      return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
    case 'outage':
      return <XCircle className="h-5 w-5 text-red-500" />;
    case 'maintenance':
      return <Clock className="h-5 w-5 text-blue-500" />;
    default:
      return <CheckCircle className="h-5 w-5 text-green-500" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'operational':
      return 'text-green-600 bg-green-100';
    case 'degraded':
      return 'text-yellow-600 bg-yellow-100';
    case 'outage':
      return 'text-red-600 bg-red-100';
    case 'maintenance':
      return 'text-blue-600 bg-blue-100';
    default:
      return 'text-green-600 bg-green-100';
  }
};

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'critical':
      return 'text-red-600 bg-red-100';
    case 'major':
      return 'text-orange-600 bg-orange-100';
    case 'minor':
      return 'text-yellow-600 bg-yellow-100';
    case 'maintenance':
      return 'text-blue-600 bg-blue-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
};

export default function SystemStatusPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header showAuthButtons={false} />

      {/* Hero Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              System Status
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              Monitor the health and performance of all AuditCraft services in real-time.
            </p>
          </div>
        </div>
      </section>

      {/* Services Status */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-foreground mb-8">Service Status</h2>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => {
                const IconComponent = service.icon;
                return (
                  <div key={service.id} className="bg-card p-6 rounded-lg border border-border hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <IconComponent className="h-6 w-6 text-primary" />
                        <h3 className="text-lg font-semibold text-foreground">{service.name}</h3>
                      </div>
                      {getStatusIcon(service.status)}
                    </div>

                    <p className="text-muted-foreground mb-4">{service.description}</p>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Uptime:</span>
                        <span className="font-medium text-foreground">{service.uptime}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Response Time:</span>
                        <span className="font-medium text-foreground">{service.responseTime}</span>
                      </div>
                    </div>

                    <div className="mt-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(service.status)}`}>
                        {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Uptime Statistics */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-foreground mb-8">Uptime Statistics</h2>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="bg-card p-6 rounded-lg border border-border text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">99.95%</div>
                <div className="text-muted-foreground">30 Day Uptime</div>
              </div>
              <div className="bg-card p-6 rounded-lg border border-border text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">99.98%</div>
                <div className="text-muted-foreground">90 Day Uptime</div>
              </div>
              <div className="bg-card p-6 rounded-lg border border-border text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">99.99%</div>
                <div className="text-muted-foreground">365 Day Uptime</div>
              </div>
              <div className="bg-card p-6 rounded-lg border border-border text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">45ms</div>
                <div className="text-muted-foreground">Avg Response Time</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Incidents */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-foreground mb-8">Recent Incidents</h2>

            <div className="space-y-6">
              {incidents.map((incident) => (
                <div key={incident.id} className="bg-card p-6 rounded-lg border border-border">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">{incident.title}</h3>
                      <div className="flex items-center space-x-3 mb-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(incident.severity)}`}>
                          {incident.severity.charAt(0).toUpperCase() + incident.severity.slice(1)}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {new Date(incident.startTime).toLocaleDateString()} - {new Date(incident.endTime).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <span className="text-green-600 text-sm font-medium">Resolved</span>
                  </div>

                  <p className="text-muted-foreground mb-4">{incident.description}</p>

                  <div className="text-sm text-muted-foreground">
                    <strong>Affected Services:</strong> {incident.affectedServices.join(', ')}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="text-muted-foreground">
                For real-time updates, follow us on{' '}
                <a href="#" className="text-primary hover:underline">
                  Twitter
                </a>{' '}
                or subscribe to our{' '}
                <a href="#" className="text-primary hover:underline">
                  status page notifications
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">Need Help?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              If you&apos;re experiencing issues not reflected on this page, our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Contact Support
              </a>
              <a
                href="/help"
                className="border border-border text-foreground px-6 py-3 rounded-lg font-semibold hover:bg-muted transition-colors"
              >
                Help Center
              </a>
            </div>
          </div>
        </div>
      </section>

      <FooterWrapper />
    </div>
  );
} 