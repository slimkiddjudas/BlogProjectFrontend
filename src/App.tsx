import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './components/providers/ThemeProvider';
import { AuthProvider } from './contexts/auth-context';
import { SocketProvider } from './contexts/socket-context';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PostDetailPage from './pages/PostDetailPage';
import ProfilePage from './pages/ProfilePage';
import GalleryPage from './pages/GalleryPage';
import AnnouncementsPage from './pages/AnnouncementsPage';
import AnnouncementDetailPage from './pages/AnnouncementDetailPage';
import SitemapPage from './pages/SitemapPage';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import AdminDashboard from './pages/AdminDashboard';
import AdminUsersPage from './pages/admin/AdminUsersPage';
import AdminCategoriesPage from './pages/admin/AdminCategoriesPage';
import AdminAnnouncementsPage from './pages/admin/AdminAnnouncementsPage';
import AdminPostsPage from './pages/admin/AdminPostsPage';
import AdminGalleryPage from './pages/admin/AdminGalleryPage';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <SocketProvider>
          <Router>
            <div className="min-h-screen flex flex-col">
              <Routes>
                {/* Auth pages without header/footer */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                  {/* Protected pages with header/footer */}
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <HomePage />
                      </Layout>
                    </ProtectedRoute>
                  }
                />              <Route
                  path="/post/:slug"
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <PostDetailPage />
                      </Layout>
                    </ProtectedRoute>
                  }
                />                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <ProfilePage />
                      </Layout>
                    </ProtectedRoute>
                  }
                />                <Route
                  path="/gallery"
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <GalleryPage />
                      </Layout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/announcements"
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <AnnouncementsPage />
                      </Layout>
                    </ProtectedRoute>
                  }
                />                <Route
                  path="/announcements/:slug"
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <AnnouncementDetailPage />
                      </Layout>
                    </ProtectedRoute>
                  }
                />                <Route
                  path="/sitemap"
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <SitemapPage />
                      </Layout>
                    </ProtectedRoute>
                  }
                />

                {/* Admin Routes - Only accessible by admin users */}
                <Route
                  path="/admin"
                  element={
                    <AdminRoute>
                      <AdminDashboard />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/users"
                  element={
                    <AdminRoute>
                      <AdminUsersPage />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/categories"
                  element={
                    <AdminRoute>
                      <AdminCategoriesPage />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/announcements"
                  element={
                    <AdminRoute>
                      <AdminAnnouncementsPage />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/posts"
                  element={
                    <AdminRoute>
                      <AdminPostsPage />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/gallery"
                  element={
                    <AdminRoute>
                      <AdminGalleryPage />
                    </AdminRoute>
                  }                />

                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
          </Router>
        </SocketProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
