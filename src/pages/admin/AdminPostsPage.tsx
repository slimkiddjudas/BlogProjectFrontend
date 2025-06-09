import React, { useState } from 'react';
import { Search, Edit2, Trash2, Eye, Calendar, User, Tag, Filter } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';

interface AdminPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  status: 'published' | 'draft' | 'archived';
  author: {
    id: number;
    firstName: string;
    lastName: string;
  };
  category: {
    id: number;
    name: string;
  };
  viewCount: number;
  commentCount: number;
  createdAt: string;
  updatedAt: string;
  featured: boolean;
}

const AdminPostsPage: React.FC = () => {
  const [posts, setPosts] = useState<AdminPost[]>([
    {
      id: 1,
      title: 'Getting Started with React and TypeScript',
      slug: 'getting-started-react-typescript',
      content: 'A comprehensive guide to building modern web applications...',
      excerpt: 'Learn how to set up and build applications with React and TypeScript.',
      status: 'published',
      author: { id: 1, firstName: 'John', lastName: 'Doe' },
      category: { id: 1, name: 'Technology' },
      viewCount: 2450,
      commentCount: 18,
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-15T10:00:00Z',
      featured: true
    },
    {
      id: 2,
      title: 'Building Modern APIs with Node.js',
      slug: 'building-modern-apis-nodejs',
      content: 'Best practices for creating scalable and maintainable APIs...',
      excerpt: 'Explore best practices for building robust APIs with Node.js.',
      status: 'published',
      author: { id: 2, firstName: 'Jane', lastName: 'Smith' },
      category: { id: 2, name: 'Backend' },
      viewCount: 1890,
      commentCount: 12,
      createdAt: '2024-01-12T14:30:00Z',
      updatedAt: '2024-01-12T14:30:00Z',
      featured: false
    },
    {
      id: 3,
      title: 'Design Patterns in JavaScript',
      slug: 'design-patterns-javascript',
      content: 'Common design patterns and their implementation in JavaScript...',
      excerpt: 'Understanding and implementing design patterns in JavaScript.',
      status: 'draft',
      author: { id: 1, firstName: 'John', lastName: 'Doe' },
      category: { id: 3, name: 'Programming' },
      viewCount: 0,
      commentCount: 0,
      createdAt: '2024-01-10T09:15:00Z',
      updatedAt: '2024-01-14T16:45:00Z',
      featured: false
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft' | 'archived'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [authorFilter, setAuthorFilter] = useState<string>('all');

  const categories = Array.from(new Set(posts.map(p => p.category.name)));
  const authors = Array.from(new Set(posts.map(p => `${p.author.firstName} ${p.author.lastName}`)));

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         `${post.author.firstName} ${post.author.lastName}`.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || post.category.name === categoryFilter;
    const matchesAuthor = authorFilter === 'all' || `${post.author.firstName} ${post.author.lastName}` === authorFilter;
    
    return matchesSearch && matchesStatus && matchesCategory && matchesAuthor;
  });

  const handleDeletePost = (id: number) => {
    if (window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      setPosts(posts.filter(p => p.id !== id));
    }
  };

  const handleToggleStatus = (id: number) => {
    setPosts(posts.map(p => 
      p.id === id 
        ? { 
            ...p, 
            status: p.status === 'published' ? 'draft' : 'published',
            updatedAt: new Date().toISOString()
          } 
        : p
    ));
  };

  const handleToggleFeatured = (id: number) => {
    setPosts(posts.map(p => 
      p.id === id 
        ? { ...p, featured: !p.featured, updatedAt: new Date().toISOString() } 
        : p
    ));
  };

  const stats = {
    total: posts.length,
    published: posts.filter(p => p.status === 'published').length,
    draft: posts.filter(p => p.status === 'draft').length,
    archived: posts.filter(p => p.status === 'archived').length,
    totalViews: posts.reduce((sum, p) => sum + p.viewCount, 0),
    totalComments: posts.reduce((sum, p) => sum + p.commentCount, 0),
    featured: posts.filter(p => p.featured).length
  };

  return (
    <AdminLayout currentSection="posts">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Post Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage blog posts and content
            </p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
            <Edit2 className="w-5 h-5" />
            Create New Post
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Total</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Published</p>
                <p className="text-xl font-bold text-green-600">{stats.published}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Drafts</p>
                <p className="text-xl font-bold text-orange-600">{stats.draft}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Featured</p>
                <p className="text-xl font-bold text-purple-600">{stats.featured}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Views</p>
                <p className="text-xl font-bold text-blue-600">{stats.totalViews.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Comments</p>
                <p className="text-xl font-bold text-indigo-600">{stats.totalComments}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Archived</p>
                <p className="text-xl font-bold text-gray-600">{stats.archived}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search posts, authors, content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                       bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                       focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                       bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                       focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                       bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                       focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            <select
              value={authorFilter}
              onChange={(e) => setAuthorFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                       bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                       focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Authors</option>
              {authors.map(author => (
                <option key={author} value={author}>{author}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Posts List */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Post
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Author
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Stats
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4">
                      <div>
                        <div className="flex items-center">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {post.title}
                            {post.featured && (
                              <span className="ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                                Featured
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">
                          {post.excerpt}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-2 text-gray-400" />
                        <span className="text-sm text-gray-900 dark:text-white">
                          {post.author.firstName} {post.author.lastName}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <Tag className="w-4 h-4 mr-2 text-gray-400" />
                        <span className="text-sm text-gray-900 dark:text-white">
                          {post.category.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        post.status === 'published'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : post.status === 'draft'
                          ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                      }`}>
                        {post.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                      <div className="space-y-1">
                        <div className="flex items-center">
                          <Eye className="w-3 h-3 mr-1 text-gray-400" />
                          {post.viewCount.toLocaleString()}
                        </div>
                        <div>💬 {post.commentCount}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                        {new Date(post.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleToggleStatus(post.id)}
                          className={`p-2 rounded-lg transition-colors ${
                            post.status === 'published'
                              ? 'text-orange-600 hover:bg-orange-100 dark:hover:bg-orange-900'
                              : 'text-green-600 hover:bg-green-100 dark:hover:bg-green-900'
                          }`}
                          title={post.status === 'published' ? 'Unpublish' : 'Publish'}
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleToggleFeatured(post.id)}
                          className={`p-2 rounded-lg transition-colors ${
                            post.featured
                              ? 'text-yellow-600 hover:bg-yellow-100 dark:hover:bg-yellow-900'
                              : 'text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-900'
                          }`}
                          title={post.featured ? 'Remove from featured' : 'Add to featured'}
                        >
                          ⭐
                        </button>
                        <button
                          className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeletePost(post.id)}
                          className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <Filter className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">No posts found matching your criteria.</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminPostsPage;
