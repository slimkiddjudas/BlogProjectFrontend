import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, UserCheck, Mail, MapPin, Phone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import BlogCard from '@/components/BlogCard';
import AnnouncementSlider from '@/components/AnnouncementSlider';
import { postService } from '@/services/postService';
import { useSocket } from '@/hooks/useSocket';
import type { Post } from '@/types';

const HomePage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { activeUsersCount } = useSocket();
  
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
    .slice(0, 8);    const stats = [
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
    },
    {
      title: 'Anlık Ziyaretçiler',
      value: `${activeUsersCount}`,
      icon: UserCheck,
      description: 'Şu anda online olan kullanıcılar'
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
            </h1>            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Web geliştirme, programlama dilleri, framework'ler ve teknoloji trendleri hakkında 
              derinlemesine makaleler ve pratik rehberler keşfedin.
            </p>
          </div>
        </div>
        
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />        </div>
      </section>

      {/* Announcements Section */}
      <AnnouncementSlider />

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
      </section>      {/* Recent Posts */}
      <section id="recent-posts" className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Son Makaleler</h2>
              <p className="text-lg text-muted-foreground">
                En yeni yazılarımızı takip edin
              </p>
            </div>
          </div>
          
          {!loading && !error && recentPosts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {recentPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>          )}
        </div>
      </section>      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 bg-gradient-to-br from-background via-accent/10 to-background">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent">
              İletişim
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Sorularınız, önerileriniz veya işbirliği teklifleriniz için bizimle iletişime geçebilirsiniz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Email */}
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 transition-transform duration-300 hover:scale-110 shadow-lg">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">E-posta</h3>
              <p className="text-muted-foreground">info@cerkblog.com</p>
            </div>

            {/* Phone */}
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 transition-transform duration-300 hover:scale-110 shadow-lg">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Telefon</h3>
              <p className="text-muted-foreground">+90 (555) 123 45 67</p>
            </div>

            {/* Location */}
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 transition-transform duration-300 hover:scale-110 shadow-lg">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Adres</h3>
              <p className="text-muted-foreground">Teknoloji Merkezi<br />İstanbul, Türkiye</p>
            </div>
          </div>

          {/* Social Media */}
          <div className="text-center mt-12">
            <h3 className="text-xl font-semibold text-foreground mb-6">Takip Edin</h3>
            <div className="flex justify-center space-x-4">
              <a href="#" className="w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-xl flex items-center justify-center text-white transition-all duration-300 hover:scale-110 shadow-lg">
                <span className="text-lg font-bold">f</span>
              </a>
              <a href="#" className="w-12 h-12 bg-blue-400 hover:bg-blue-500 rounded-xl flex items-center justify-center text-white transition-all duration-300 hover:scale-110 shadow-lg">
                <span className="text-lg font-bold">t</span>
              </a>
              <a href="#" className="w-12 h-12 bg-pink-600 hover:bg-pink-700 rounded-xl flex items-center justify-center text-white transition-all duration-300 hover:scale-110 shadow-lg">
                <span className="text-sm font-bold">ig</span>
              </a>
              <a href="#" className="w-12 h-12 bg-blue-700 hover:bg-blue-800 rounded-xl flex items-center justify-center text-white transition-all duration-300 hover:scale-110 shadow-lg">
                <span className="text-sm font-bold">in</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
