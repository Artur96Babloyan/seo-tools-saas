"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/entities/user";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  User,
  Camera,
  Save,
  X,
  AlertTriangle,
  CheckCircle,
  Eye,
  EyeOff,
  Shield,
  Activity,
  FileText,
  TrendingUp,
  Users
} from "lucide-react";
import { Header } from "@/components/Header";
import { userService, type UserProfile, type UserStats, type UserActivity } from "@/lib/userService";

export default function UserProfilePage() {
  const { user: authUser, logout } = useAuth();
  const router = useRouter();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [activities, setActivities] = useState<UserActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    company: '',
    website: '',
    location: '',
    phone: '',
    timezone: ''
  });

  // Password change states
  const [passwordData, setPasswordData] = useState({
    current_password: '',
    new_password: '',
    confirm_password: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  // Avatar upload states
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  // Account deletion states
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');
  const [deleting, setDeleting] = useState(false);

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

      // Fetch profile, stats, and activities in parallel
      const [profileData, statsData, activitiesData] = await Promise.all([
        userService.getProfile(),
        userService.getStats(),
        userService.getActivity(5, 1)
      ]);

      console.log('Profile data from backend:', profileData); // Debug log
      setProfile(profileData);
      setFormData({
        name: profileData.name || '',
        bio: profileData.bio || '',
        company: profileData.company || '',
        website: profileData.website || '',
        location: profileData.location || '',
        phone: profileData.phone || '',
        timezone: profileData.timezone || ''
      });

      setStats(statsData);
      setActivities(activitiesData.activities || []);
    } catch (err) {
      setError('Failed to load user data');
      console.error('Error fetching user data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      await userService.updateProfile(formData);
      setSuccess('Profile updated successfully!');
      await fetchUserData(); // Refresh data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
      console.error('Error updating profile:', err);
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    if (passwordData.new_password !== passwordData.confirm_password) {
      setError('New passwords do not match');
      setSaving(false);
      return;
    }

    try {
      await userService.changePassword({
        currentPassword: passwordData.current_password,
        newPassword: passwordData.new_password,
        confirmPassword: passwordData.confirm_password
      });
      setSuccess('Password changed successfully!');
      setPasswordData({
        current_password: '',
        new_password: '',
        confirm_password: ''
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to change password');
      console.error('Error changing password:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleAvatarUpload = async () => {
    if (!avatarFile) return;

    setUploadingAvatar(true);
    setError(null);
    setSuccess(null);

    try {
      const result = await userService.uploadAvatar(avatarFile);
      console.log('Avatar upload result:', result); // Debug log
      setSuccess('Avatar updated successfully!');
      setAvatarFile(null);
      setAvatarPreview(null);

      // Update the profile with the new avatar URL
      if (result.avatar_url && profile) {
        console.log('Updating profile with avatar URL:', result.avatar_url); // Debug log
        setProfile({
          ...profile,
          avatar: result.avatar_url
        });
      } else {
        console.log('No avatar_url in result or no profile'); // Debug log
      }

      // Also refresh the full profile data
      await fetchUserData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload avatar');
      console.error('Error uploading avatar:', err);
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAccountDeletion = async (e: React.FormEvent) => {
    e.preventDefault();
    setDeleting(true);
    setError(null);

    try {
      console.log('Deleting account with password:', deletePassword ? '***' : 'empty'); // Debug log
      await userService.deleteAccount(deletePassword);
      logout();
      router.push('/');
    } catch (err) {
      console.error('Account deletion error details:', err); // Debug log
      setError(err instanceof Error ? err.message : 'Failed to delete account');
      console.error('Error deleting account:', err);
    } finally {
      setDeleting(false);
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'analysis': return <FileText className="h-4 w-4" />;
      case 'keyword_tracking': return <TrendingUp className="h-4 w-4" />;
      case 'competitor_analysis': return <Users className="h-4 w-4" />;
      case 'report_generated': return <FileText className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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
    <div className="min-h-screen bg-background">
      <Header showAuthButtons={false} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Profile Settings</h1>
            <p className="text-muted-foreground mt-2">Manage your account information and preferences</p>
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
            {/* Left Column - Profile & Stats */}
            <div className="lg:col-span-2 space-y-8">
              {/* Profile Information */}
              <div className="bg-card rounded-lg border border-border p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-foreground">Profile Information</h2>
                  <User className="h-5 w-5 text-muted-foreground" />
                </div>

                <form onSubmit={handleProfileUpdate} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={profile?.email || ''}
                        disabled
                        className="w-full px-3 py-2 border border-border rounded-lg bg-muted text-muted-foreground cursor-not-allowed"
                      />
                      <p className="text-xs text-muted-foreground mt-1">Email cannot be changed</p>
                    </div>

                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        id="company"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label htmlFor="website" className="block text-sm font-medium text-foreground mb-2">
                        Website
                      </label>
                      <input
                        type="url"
                        id="website"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label htmlFor="location" className="block text-sm font-medium text-foreground mb-2">
                        Location
                      </label>
                      <input
                        type="text"
                        id="location"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-foreground mb-2">
                      Bio
                    </label>
                    <textarea
                      id="bio"
                      rows={4}
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                      placeholder="Tell us a bit about yourself..."
                    />
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
                          <span>Save Changes</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>

              {/* Password Change */}
              <div className="bg-card rounded-lg border border-border p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-foreground">Change Password</h2>
                  <Shield className="h-5 w-5 text-muted-foreground" />
                </div>

                <form onSubmit={handlePasswordChange} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="current_password" className="block text-sm font-medium text-foreground mb-2">
                        Current Password *
                      </label>
                      <div className="relative">
                        <input
                          type={showPasswords.current ? 'text' : 'password'}
                          id="current_password"
                          value={passwordData.current_password}
                          onChange={(e) => setPasswordData({ ...passwordData, current_password: e.target.value })}
                          required
                          className="w-full px-3 py-2 pr-10 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showPasswords.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="new_password" className="block text-sm font-medium text-foreground mb-2">
                        New Password *
                      </label>
                      <div className="relative">
                        <input
                          type={showPasswords.new ? 'text' : 'password'}
                          id="new_password"
                          value={passwordData.new_password}
                          onChange={(e) => setPasswordData({ ...passwordData, new_password: e.target.value })}
                          required
                          className="w-full px-3 py-2 pr-10 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showPasswords.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="confirm_password" className="block text-sm font-medium text-foreground mb-2">
                        Confirm New Password *
                      </label>
                      <div className="relative">
                        <input
                          type={showPasswords.confirm ? 'text' : 'password'}
                          id="confirm_password"
                          value={passwordData.confirm_password}
                          onChange={(e) => setPasswordData({ ...passwordData, confirm_password: e.target.value })}
                          required
                          className="w-full px-3 py-2 pr-10 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showPasswords.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
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
                          <span>Updating...</span>
                        </>
                      ) : (
                        <>
                          <Shield className="h-4 w-4" />
                          <span>Update Password</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Right Column - Avatar, Stats, Activity */}
            <div className="space-y-8">
              {/* Avatar Upload */}
              <div className="bg-card rounded-lg border border-border p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-foreground">Profile Picture</h2>
                  <Camera className="h-5 w-5 text-muted-foreground" />
                </div>

                <div className="text-center">
                  <div className="relative inline-block">
                    <div className="w-24 h-24 rounded-full overflow-hidden bg-muted flex items-center justify-center">
                      {avatarPreview ? (
                        <Image
                          src={avatarPreview}
                          alt="Avatar preview"
                          width={96}
                          height={96}
                          className="w-full h-full object-cover"
                        />
                      ) : profile?.avatar ? (
                        <Image
                          src={profile.avatar.startsWith('http') ? profile.avatar :
                            profile.avatar.startsWith('/uploads/avatars/') ?
                              `/api/user/avatar/${profile.avatar.split('/').pop()}` :
                              profile.avatar}
                          alt="Profile avatar"
                          width={96}
                          height={96}
                          className="w-full h-full object-cover"
                          onError={() => {
                            console.error('Failed to load avatar:', profile.avatar);
                          }}
                        />
                      ) : (
                        <User className="h-12 w-12 text-muted-foreground" />
                      )}
                    </div>

                    <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full cursor-pointer hover:bg-primary/90 transition-colors">
                      <Camera className="h-4 w-4" />
                    </label>
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                    />
                  </div>

                  {avatarFile && (
                    <div className="mt-4 space-y-2">
                      <p className="text-sm text-muted-foreground">{avatarFile.name}</p>
                      <div className="flex space-x-2">
                        <button
                          onClick={handleAvatarUpload}
                          disabled={uploadingAvatar}
                          className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          {uploadingAvatar ? 'Uploading...' : 'Upload'}
                        </button>
                        <button
                          onClick={() => {
                            setAvatarFile(null);
                            setAvatarPreview(null);
                          }}
                          className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* User Statistics */}
              {stats && (
                <div className="bg-card rounded-lg border border-border p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-foreground">Your Statistics</h2>
                    <Activity className="h-5 w-5 text-muted-foreground" />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Total Analyses</span>
                      <span className="font-semibold text-foreground">{stats.total_analyses}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Keywords Tracked</span>
                      <span className="font-semibold text-foreground">{stats.total_keywords_tracked}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Competitors Analyzed</span>
                      <span className="font-semibold text-foreground">{stats.total_competitors_analyzed}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Reports Generated</span>
                      <span className="font-semibold text-foreground">{stats.total_reports_generated}</span>
                    </div>
                    <div className="pt-4 border-t border-border">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Member Since</span>
                        <span className="text-sm font-medium text-foreground">
                          {formatDate(stats.member_since)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Recent Activity */}
              {activities.length > 0 && (
                <div className="bg-card rounded-lg border border-border p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-foreground">Recent Activity</h2>
                    <Activity className="h-5 w-5 text-muted-foreground" />
                  </div>

                  <div className="space-y-4">
                    {activities.map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-1">
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground">{activity.title}</p>
                          <p className="text-xs text-muted-foreground">{activity.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {formatDate(activity.created_at)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Account Deletion */}
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-red-700 dark:text-red-400">Danger Zone</h2>
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                </div>

                <p className="text-sm text-red-600 dark:text-red-400 mb-4">
                  Once you delete your account, there is no going back. Please be certain.
                </p>

                {!showDeleteConfirm ? (
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
                  >
                    Delete Account
                  </button>
                ) : (
                  <form onSubmit={handleAccountDeletion} className="space-y-4">
                    <div>
                      <label htmlFor="delete-password" className="block text-sm font-medium text-red-700 dark:text-red-400 mb-2">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        id="delete-password"
                        value={deletePassword}
                        onChange={(e) => setDeletePassword(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-red-300 dark:border-red-700 rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="Enter your password to confirm"
                      />
                    </div>
                    <div className="flex space-x-2">
                      <button
                        type="submit"
                        disabled={deleting}
                        className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
                      >
                        {deleting ? 'Deleting...' : 'Confirm Delete'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowDeleteConfirm(false);
                          setDeletePassword('');
                        }}
                        className="px-4 py-2 border border-red-300 dark:border-red-700 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 