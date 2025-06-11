import React, { useState, useEffect } from 'react';
import { MapIcon, ExternalLink, Calendar, Star, Link as LinkIcon } from 'lucide-react';

interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: string;
}

const SitemapPage: React.FC = () => {
  const [sitemapData, setSitemapData] = useState<SitemapUrl[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchSitemap = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:3000/api/sitemap');
        
        if (!response.ok) {
          throw new Error('Sitemap yüklenemedi');
        }

        const xmlText = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
        
        const urls = xmlDoc.querySelectorAll('url');
        const parsedUrls: SitemapUrl[] = [];

        urls.forEach(url => {
          const loc = url.querySelector('loc')?.textContent || '';
          const lastmod = url.querySelector('lastmod')?.textContent || '';
          const changefreq = url.querySelector('changefreq')?.textContent || '';
          const priority = url.querySelector('priority')?.textContent || '';

          if (loc) {
            parsedUrls.push({ loc, lastmod, changefreq, priority });
          }
        });

        setSitemapData(parsedUrls);
      } catch (err: any) {
        setError(err.message || 'Sitemap yüklenirken bir hata oluştu');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSitemap();
  }, []);

  const getPriorityColor = (priority: string) => {
    const p = parseFloat(priority);
    if (p >= 0.9) return 'text-green-600 dark:text-green-400';
    if (p >= 0.7) return 'text-blue-600 dark:text-blue-400';
    if (p >= 0.5) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-gray-600 dark:text-gray-400';
  };

  const getFrequencyColor = (freq: string) => {
    switch (freq) {
      case 'daily': return 'text-green-600 dark:text-green-400';
      case 'weekly': return 'text-blue-600 dark:text-blue-400';
      case 'monthly': return 'text-yellow-600 dark:text-yellow-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Bilinmiyor';
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const openXmlSitemap = () => {
    window.open('http://localhost:3000/api/sitemap', '_blank');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            {/* Header Skeleton */}
            <div className="text-center mb-12">
              <div className="w-16 h-16 bg-muted rounded-full mx-auto mb-4 animate-pulse" />
              <div className="w-64 h-8 bg-muted rounded-lg mx-auto mb-4 animate-pulse" />
              <div className="w-96 h-5 bg-muted rounded mx-auto animate-pulse" />
            </div>
            
            {/* Content Skeleton */}
            <div className="space-y-4">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="bg-card border border-border rounded-lg p-4">
                  <div className="w-3/4 h-5 bg-muted rounded mb-2 animate-pulse" />
                  <div className="w-1/2 h-4 bg-muted rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <MapIcon className="h-16 w-16 text-destructive mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Site Haritası Yüklenemedi</h1>
          <p className="text-muted-foreground mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Yeniden Dene
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <MapIcon className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Site Haritası
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
              CerkBlog'daki tüm sayfaların ve içeriklerin organize edilmiş listesi
            </p>
            
            {/* XML Sitemap Link */}
            <button
              onClick={openXmlSitemap}
              className="inline-flex items-center space-x-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-300 bg-blue-50 dark:bg-blue-950/30 px-4 py-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-950/50"
            >
              <ExternalLink className="h-4 w-4" />
              <span>XML Sitemap'i Görüntüle</span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-card border border-border rounded-xl p-6 text-center">
              <LinkIcon className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{sitemapData.length}</div>
              <div className="text-sm text-muted-foreground">Toplam Sayfa</div>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 text-center">
              <Star className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">
                {sitemapData.filter(url => parseFloat(url.priority) >= 0.8).length}
              </div>
              <div className="text-sm text-muted-foreground">Yüksek Öncelik</div>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 text-center">
              <Calendar className="h-8 w-8 text-indigo-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">
                {sitemapData.filter(url => url.changefreq === 'daily').length}
              </div>
              <div className="text-sm text-muted-foreground">Günlük Güncellenen</div>
            </div>
          </div>

          {/* Sitemap URLs */}
          <div className="space-y-3">
            {sitemapData.map((url, index) => (
              <div key={index} className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-3 lg:space-y-0">
                  <div className="flex-1 min-w-0">
                    <a
                      href={url.loc}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200 break-all"
                    >
                      {url.loc}
                    </a>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <span className="text-muted-foreground">Son güncelleme:</span>
                      <span className="text-foreground">{formatDate(url.lastmod)}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-muted-foreground">Sıklık:</span>
                      <span className={`font-medium ${getFrequencyColor(url.changefreq)}`}>
                        {url.changefreq}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-muted-foreground">Öncelik:</span>
                      <span className={`font-medium ${getPriorityColor(url.priority)}`}>
                        {url.priority}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Info Section */}
          <div className="mt-12 bg-muted/30 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Site Haritası Hakkında</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">Güncelleme Sıklığı</h4>
                <ul className="space-y-1">
                  <li><span className="text-green-600 dark:text-green-400">Daily:</span> Her gün güncellenen içerikler</li>
                  <li><span className="text-blue-600 dark:text-blue-400">Weekly:</span> Haftalık güncellenen sayfalar</li>
                  <li><span className="text-yellow-600 dark:text-yellow-400">Monthly:</span> Aylık güncellenen statik sayfalar</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Öncelik Seviyeleri</h4>
                <ul className="space-y-1">
                  <li><span className="text-green-600 dark:text-green-400">0.8-1.0:</span> Çok yüksek öncelik</li>
                  <li><span className="text-blue-600 dark:text-blue-400">0.6-0.7:</span> Yüksek öncelik</li>
                  <li><span className="text-yellow-600 dark:text-yellow-400">0.4-0.5:</span> Orta öncelik</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SitemapPage;
