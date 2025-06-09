import React, { useState } from 'react';
import { BarChart3, TrendingUp, Users, Eye, Calendar, Download, FileText, MessageSquare } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';

interface AnalyticsData {
  period: string;
  views: number;
  users: number;
  posts: number;
  comments: number;
}

const AdminAnalyticsPage: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d' | '1y'>('30d');

  const analyticsData: AnalyticsData[] = [
    { period: '2024-01-01', views: 1200, users: 45, posts: 3, comments: 28 },
    { period: '2024-01-02', views: 980, users: 38, posts: 1, comments: 15 },
    { period: '2024-01-03', views: 1450, users: 52, posts: 2, comments: 34 },
    { period: '2024-01-04', views: 1100, users: 41, posts: 0, comments: 22 },
    { period: '2024-01-05', views: 1680, users: 67, posts: 4, comments: 45 },
    { period: '2024-01-06', views: 890, users: 33, posts: 1, comments: 18 },
    { period: '2024-01-07', views: 1340, users: 48, posts: 2, comments: 31 }
  ];

  const topPosts = [
    { id: 1, title: 'Getting Started with React and TypeScript', views: 2450, comments: 18 },
    { id: 2, title: 'Building Modern APIs with Node.js', views: 1890, comments: 12 },
    { id: 3, title: 'Advanced JavaScript Patterns', views: 1650, comments: 25 },
    { id: 4, title: 'CSS Grid vs Flexbox: When to Use What', views: 1420, comments: 8 },
    { id: 5, title: 'Database Design Best Practices', views: 1280, comments: 15 }
  ];

  const topCategories = [
    { name: 'Technology', posts: 45, views: 12500 },
    { name: 'Programming', posts: 38, views: 9800 },
    { name: 'Web Development', posts: 32, views: 8900 },
    { name: 'Backend', posts: 25, views: 6700 },
    { name: 'Database', posts: 18, views: 4200 }
  ];

  const recentActivity = [
    { type: 'post', action: 'New post published', title: 'Advanced React Patterns', time: '2 hours ago' },
    { type: 'comment', action: 'New comment received', title: 'On "JavaScript Best Practices"', time: '4 hours ago' },
    { type: 'user', action: 'New user registered', title: 'john.doe@example.com', time: '6 hours ago' },
    { type: 'post', action: 'Post updated', title: 'Getting Started with TypeScript', time: '1 day ago' },
    { type: 'comment', action: 'Comment moderated', title: 'On "React Hooks Guide"', time: '2 days ago' }
  ];

  const totalViews = analyticsData.reduce((sum, data) => sum + data.views, 0);
  const totalUsers = analyticsData.reduce((sum, data) => sum + data.users, 0);
  const totalPosts = analyticsData.reduce((sum, data) => sum + data.posts, 0);
  const totalComments = analyticsData.reduce((sum, data) => sum + data.comments, 0);

  const avgViews = Math.round(totalViews / analyticsData.length);
  const avgUsers = Math.round(totalUsers / analyticsData.length);

  const maxViews = Math.max(...analyticsData.map(d => d.views));

  return (
    <AdminLayout currentSection="analytics">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Analytics & Reports
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Track performance and user engagement
            </p>
          </div>
          <div className="flex gap-2">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                       bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                       focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
              <Download className="w-5 h-5" />
              Export
            </button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Views
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {totalViews.toLocaleString()}
                </p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +12.5% from last period
                </p>
              </div>
              <Eye className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Users
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {totalUsers.toLocaleString()}
                </p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +8.3% from last period
                </p>
              </div>
              <Users className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Posts Published
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {totalPosts}
                </p>
                <p className="text-sm text-blue-600 flex items-center mt-1">
                  <Calendar className="w-4 h-4 mr-1" />
                  {Math.round(totalPosts / 7)} per day avg
                </p>
              </div>
              <FileText className="w-8 h-8 text-purple-600" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Comments
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {totalComments}
                </p>
                <p className="text-sm text-orange-600 flex items-center mt-1">
                  <MessageSquare className="w-4 h-4 mr-1" />
                  {Math.round(totalComments / totalPosts)} per post avg
                </p>
              </div>
              <MessageSquare className="w-8 h-8 text-orange-600" />
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Views Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Daily Views</h2>
              <BarChart3 className="w-5 h-5 text-gray-500" />
            </div>
            <div className="space-y-3">
              {analyticsData.map((data, index) => (
                <div key={index} className="flex items-center">
                  <span className="text-xs text-gray-500 dark:text-gray-400 w-16">
                    {new Date(data.period).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                  <div className="flex-1 mx-3">
                    <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(data.views / maxViews) * 100}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white w-12 text-right">
                    {data.views}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Users Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Daily Active Users</h2>
              <Users className="w-5 h-5 text-gray-500" />
            </div>
            <div className="space-y-3">
              {analyticsData.map((data, index) => {
                const maxUsers = Math.max(...analyticsData.map(d => d.users));
                return (
                  <div key={index} className="flex items-center">
                    <span className="text-xs text-gray-500 dark:text-gray-400 w-16">
                      {new Date(data.period).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                    <div className="flex-1 mx-3">
                      <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(data.users / maxUsers) * 100}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white w-12 text-right">
                      {data.users}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Content Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Top Posts */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Top Posts</h2>
            <div className="space-y-3">
              {topPosts.map((post, index) => (
                <div key={post.id} className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-6">
                        #{index + 1}
                      </span>
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate ml-2">
                        {post.title}
                      </p>
                    </div>
                    <div className="flex items-center mt-1 text-xs text-gray-500 dark:text-gray-400">
                      <Eye className="w-3 h-3 mr-1" />
                      {post.views.toLocaleString()}
                      <MessageSquare className="w-3 h-3 ml-3 mr-1" />
                      {post.comments}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Categories */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Top Categories</h2>
            <div className="space-y-3">
              {topCategories.map((category, index) => (
                <div key={category.name} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {category.name}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {category.posts} posts
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mr-3">
                        <div
                          className="bg-purple-600 h-1.5 rounded-full"
                          style={{ width: `${(category.views / Math.max(...topCategories.map(c => c.views))) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {category.views.toLocaleString()} views
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h2>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
                    {activity.type === 'post' && <FileText className="w-4 h-4 text-blue-600" />}
                    {activity.type === 'comment' && <MessageSquare className="w-4 h-4 text-green-600" />}
                    {activity.type === 'user' && <Users className="w-4 h-4 text-purple-600" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 dark:text-white">{activity.action}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{activity.title}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Avg. Daily Views</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{avgViews.toLocaleString()}</p>
              </div>
              <div className="text-green-600 text-sm">↗ 5.2%</div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Avg. Daily Users</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{avgUsers}</p>
              </div>
              <div className="text-green-600 text-sm">↗ 3.1%</div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Engagement Rate</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {((totalComments / totalViews) * 100).toFixed(1)}%
                </p>
              </div>
              <div className="text-orange-600 text-sm">↘ 1.8%</div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Posts per Week</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{totalPosts}</p>
              </div>
              <div className="text-blue-600 text-sm">→ 0.0%</div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminAnalyticsPage;
