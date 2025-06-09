import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import BlogCard from '@/components/BlogCard';
import { postService } from '@/services/postService';
import type { Post } from '@/types';

const HomePage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await postService.getAllPosts();
        setPosts(response.posts);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Makaleler yüklenirken bir hata oluştu');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Get featured posts (first 2 posts with highest view count)
  const featuredPosts = posts
    .sort((a, b) => b.viewCount - a.viewCount)
    .slice(0, 2);

  // Get recent posts (sorted by creation date, excluding featured)
  const recentPosts = posts
    .filter(post => !featuredPosts.includes(post))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 8);
  
  const stats = [
    {
      title: 'Toplam Makale',
      value: `${posts.length}+`,
      icon: BookOpen,
      description: 'Teknoloji ve geliştirme konularında'
    },
    {
      title: 'Toplam Görüntülenme',
      value: `${posts.reduce((sum, post) => sum + post.viewCount, 0)}+`,
      icon: TrendingUp,
      description: 'Toplam makale görüntülenme sayısı'
    },
    {
      title: 'Aktif Yazarlar',
      value: `${new Set(posts.map(post => post.userId)).size}+`,
      icon: Users,
      description: 'Platform yazarları'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              Teknoloji ve Geliştirme Dünyasında
              <span className="block">Yeni Perspektifler</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Web geliştirme, programlama dilleri, framework'ler ve teknoloji trendleri hakkında 
              derinlemesine makaleler ve pratik rehberler keşfedin.
            </p>            <div className="flex flex-col sm:flex-row gap-4 justify-center">              <Button 
                variant="default"
                size="lg" 
                className="text-lg px-8 font-semibold"
              >
                Makaleleri Keşfet
              </Button>
              <Button 
                variant="outline"
                size="lg" 
                className="text-lg px-8 font-semibold"
              >
                RSS Feed
              </Button>
            </div>
          </div>
        </div>
        
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center border-0 shadow-sm bg-background/50 backdrop-blur transition-all duration-300 hover:shadow-lg">
                <CardHeader className="pb-2">
                  <div className="mx-auto h-12 w-12 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center mb-4 transition-transform duration-200 hover:scale-110">
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-3xl font-bold text-foreground">{stat.value}</CardTitle>
                  <p className="text-lg font-semibold text-foreground">{stat.title}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{stat.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>      {/* Featured Posts */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Öne Çıkan Makaleler</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              En popüler ve güncel teknoloji makalelerimizi keşfedin
            </p>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">{error}</p>
            </div>
          ) : featuredPosts.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {featuredPosts.map((post) => (
                <BlogCard key={post.id} post={post} variant="featured" />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Henüz makale bulunmamaktadır.</p>
            </div>
          )}
        </div>
      </section>

      {/* Recent Posts */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Son Makaleler</h2>
              <p className="text-lg text-muted-foreground">
                En yeni yazılarımızı takip edin
              </p>
            </div>            <Button
              variant="default"
              className="mt-4 sm:mt-0 border-2 border-primary font-semibold"
            >
              Tümünü Gör
            </Button>
          </div>
          
          {!loading && !error && recentPosts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {recentPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 border-0 text-white overflow-hidden relative">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/20 rounded-full -translate-y-48 translate-x-48"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full translate-y-48 -translate-x-48"></div>
            </div>
            
            <CardContent className="p-8 md:p-12 relative z-10">
              <div className="text-center max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold mb-4 text-white">
                  Güncel Kalın
                </h2>
                <p className="text-lg mb-8 text-blue-100">
                  Yeni makaleler, teknoloji trendleri ve özel içerikler için 
                  haftalık bültenimize abone olun.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="E-posta adresiniz"
                    className="flex-1 px-4 py-3 rounded-lg text-gray-900 bg-white border-2 border-white/20 focus:ring-2 focus:ring-white focus:border-white outline-none transition-all duration-200 placeholder:text-gray-500 font-medium"
                  />                  <Button 
                    variant="default"
                    size="lg" 
                    className="px-8 bg-white text-gray-900 hover:bg-gray-100 font-semibold transition-all duration-200 hover:scale-105 shadow-lg"
                  >
                    Abone Ol
                  </Button>
                </div>
                <p className="text-sm text-blue-100 mt-4 opacity-90">
                  Spam göndermiyoruz. İstediğiniz zaman abonelikten çıkabilirsiniz.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
