"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/entities/user";
import { useRouter } from "next/navigation";
import {
  Settings,
  Bell,
  Palette,
  Save,
  AlertTriangle,
  CheckCircle,
  Shield,
  Activity,
  FileText
} from "lucide-react";
import { Header } from "@/components/Header";
import { ThemeToggle } from "@/shared/ui/theme";
import { userService, type UserPreferences, type UserStats } from "@/lib/userService";

export default function UserSettingsPage() {
  const { user: authUser } = useAuth();
  const router = useRouter();

  const [preferences, setPreferences] = useState<UserPreferences>({
    email_notifications: true,
    marketing_emails: false,
    digest_emails: true,
    seo_alerts: true,
    competitor_updates: true,
    keyword_tracking_alerts: true,
    theme: 'system',
    language: 'en',
    timezone: 'UTC'
  });

  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (!authUser) {
      router.push('/auth/login');
      return;
    }

    fetchUserData();
  }, [authUser, router]);

  const fetchUserData = async () => {
    try {
      setLoading(true);

      // Fetch preferences and stats in parallel
      const [preferencesData, statsData] = await Promise.all([
        userService.getPreferences(),
        userService.getStats()
      ]);

      // Ensure preferences has all required fields with fallbacks
      const safePreferences = {
        email_notifications: preferencesData?.email_notifications ?? true,
        marketing_emails: preferencesData?.marketing_emails ?? false,
        digest_emails: preferencesData?.digest_emails ?? true,
        seo_alerts: preferencesData?.seo_alerts ?? true,
        competitor_updates: preferencesData?.competitor_updates ?? true,
        keyword_tracking_alerts: preferencesData?.keyword_tracking_alerts ?? true,
        theme: preferencesData?.theme ?? 'system',
        language: preferencesData?.language ?? 'en',
        timezone: preferencesData?.timezone ?? 'UTC'
      };

      setPreferences(safePreferences);
      setStats(statsData || null);
    } catch (err) {
      setError('Failed to load user settings');
      console.error('Error fetching user data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePreferencesUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      await userService.updatePreferences(preferences);
      setSuccess('Settings updated successfully!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update settings');
      console.error('Error updating settings:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleToggle = (key: keyof UserPreferences) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTheme = (theme: string | undefined) => {
    if (!theme) return 'System';
    return theme.charAt(0).toUpperCase() + theme.slice(1);
  };

  const calculatePercentage = (current: number | undefined, total: number | undefined) => {
    if (!current || !total || total === 0) return 0;
    return Math.min((current / total) * 100, 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header showAuthButtons={false} />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Account Settings</h1>
          <p className="text-muted-foreground mt-2">Manage your preferences and account settings</p>
        </div>

        {/* Error/Success Messages */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center space-x-2 text-red-700 dark:text-red-400">
            <AlertTriangle className="h-5 w-5" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center space-x-2 text-green-700 dark:text-green-400">
            <CheckCircle className="h-5 w-5" />
            <span>{success}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Settings Forms */}
          <div className="lg:col-span-2 space-y-8">
            {/* Notification Preferences */}
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-foreground">Notification Preferences</h2>
                <Bell className="h-5 w-5 text-muted-foreground" />
              </div>

              <form onSubmit={handlePreferencesUpdate} className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-foreground">Email Notifications</h3>
                      <p className="text-sm text-muted-foreground">Receive important updates via email</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleToggle('email_notifications')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${preferences.email_notifications ?? true ? 'bg-primary' : 'bg-muted'
                        }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${preferences.email_notifications ?? true ? 'translate-x-6' : 'translate-x-1'
                          }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-foreground">Marketing Emails</h3>
                      <p className="text-sm text-muted-foreground">Receive promotional content and updates</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleToggle('marketing_emails')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${preferences.marketing_emails ? 'bg-primary' : 'bg-muted'
                        }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${preferences.marketing_emails ? 'translate-x-6' : 'translate-x-1'
                          }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-foreground">Weekly Digest</h3>
                      <p className="text-sm text-muted-foreground">Get a summary of your SEO performance</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleToggle('digest_emails')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${preferences.digest_emails ? 'bg-primary' : 'bg-muted'
                        }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${preferences.digest_emails ? 'translate-x-6' : 'translate-x-1'
                          }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-foreground">SEO Alerts</h3>
                      <p className="text-sm text-muted-foreground">Get notified about SEO issues and opportunities</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleToggle('seo_alerts')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${preferences.seo_alerts ? 'bg-primary' : 'bg-muted'
                        }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${preferences.seo_alerts ? 'translate-x-6' : 'translate-x-1'
                          }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-foreground">Competitor Updates</h3>
                      <p className="text-sm text-muted-foreground">Get notified when competitors make changes</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleToggle('competitor_updates')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${preferences.competitor_updates ? 'bg-primary' : 'bg-muted'
                        }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${preferences.competitor_updates ? 'translate-x-6' : 'translate-x-1'
                          }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-foreground">Keyword Tracking Alerts</h3>
                      <p className="text-sm text-muted-foreground">Get notified about keyword ranking changes</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleToggle('keyword_tracking_alerts')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${preferences.keyword_tracking_alerts ? 'bg-primary' : 'bg-muted'
                        }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${preferences.keyword_tracking_alerts ? 'translate-x-6' : 'translate-x-1'
                          }`}
                      />
                    </button>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex items-center space-x-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {saving ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        <span>Save Preferences</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Display Preferences */}
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-foreground">Display Preferences</h2>
                <Palette className="h-5 w-5 text-muted-foreground" />
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Theme
                  </label>
                  <div className="flex items-center space-x-4">
                    <ThemeToggle />
                    <span className="text-sm text-muted-foreground">
                      Current: {formatTheme(preferences.theme)}
                    </span>
                  </div>
                </div>

                <div>
                  <label htmlFor="language" className="block text-sm font-medium text-foreground mb-2">
                    Language
                  </label>
                  <select
                    id="language"
                    value={preferences.language || 'en'}
                    onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="en">English</option>
                    <option value="es">Español</option>
                    <option value="fr">Français</option>
                    <option value="de">Deutsch</option>
                    <option value="it">Italiano</option>
                    <option value="pt">Português</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="timezone" className="block text-sm font-medium text-foreground mb-2">
                    Timezone
                  </label>
                  <select
                    id="timezone"
                    value={preferences.timezone || 'UTC'}
                    onChange={(e) => setPreferences({ ...preferences, timezone: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="UTC">UTC</option>
                    <option value="America/New_York">Eastern Time (ET)</option>
                    <option value="America/Chicago">Central Time (CT)</option>
                    <option value="America/Denver">Mountain Time (MT)</option>
                    <option value="America/Los_Angeles">Pacific Time (PT)</option>
                    <option value="Europe/London">London (GMT)</option>
                    <option value="Europe/Paris">Paris (CET)</option>
                    <option value="Asia/Tokyo">Tokyo (JST)</option>
                    <option value="Asia/Shanghai">Shanghai (CST)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Stats & Quick Actions */}
          <div className="space-y-8">
            {/* Account Overview */}
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-foreground">Account Overview</h2>
                <Shield className="h-5 w-5 text-muted-foreground" />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Email</span>
                  <span className="text-sm font-medium text-foreground">{authUser?.email}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Member Since</span>
                  <span className="text-sm font-medium text-foreground">
                    {stats?.member_since ? formatDate(stats.member_since) : 'N/A'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Last Login</span>
                  <span className="text-sm font-medium text-foreground">
                    {stats?.last_login ? formatDate(stats.last_login) : 'N/A'}
                  </span>
                </div>
              </div>
            </div>

            {/* Usage Statistics */}
            {stats && stats.subscription_usage && (
              <div className="bg-card rounded-lg border border-border p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-foreground">Usage This Month</h2>
                  <Activity className="h-5 w-5 text-muted-foreground" />
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Analyses</span>
                      <span className="text-sm font-medium text-foreground">
                        {stats.subscription_usage.analyses_this_month || 0} / {stats.subscription_usage.analyses_limit || 0}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{
                          width: `${calculatePercentage(stats.subscription_usage.analyses_this_month, stats.subscription_usage.analyses_limit)}%`
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Keywords Tracked</span>
                      <span className="text-sm font-medium text-foreground">
                        {stats.subscription_usage.keywords_tracked || 0} / {stats.subscription_usage.keywords_limit || 0}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{
                          width: `${calculatePercentage(stats.subscription_usage.keywords_tracked, stats.subscription_usage.keywords_limit)}%`
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-foreground">Quick Actions</h2>
                <Settings className="h-5 w-5 text-muted-foreground" />
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => router.push('/dashboard/profile')}
                  className="w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg hover:bg-muted transition-colors"
                >
                  <Shield className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">Edit Profile</span>
                </button>

                <button
                  onClick={() => router.push('/dashboard')}
                  className="w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg hover:bg-muted transition-colors"
                >
                  <Activity className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">View Dashboard</span>
                </button>

                <button
                  onClick={() => router.push('/help')}
                  className="w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg hover:bg-muted transition-colors"
                >
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">Help Center</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 