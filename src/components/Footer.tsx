import React from 'react';
import { Github, Linkedin, Heart } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    blog: [
      { name: 'Ana Sayfa', href: '#' },
      { name: 'Kategoriler', href: '#' },
      { name: 'Arşiv', href: '#' },
      { name: 'Etiketler', href: '#' }
    ],
    company: [
      { name: 'Hakkımızda', href: '#' },
      { name: 'İletişim', href: '#' },
      { name: 'Gizlilik Politikası', href: '#' },
      { name: 'Kullanım Şartları', href: '#' }
    ],
    resources: [
      { name: 'RSS Feed', href: '#' },
      { name: 'Site Haritası', href: '#' },
      { name: 'Yazar Ol', href: '#' },
      { name: 'SSS', href: '#' }
    ]
  };

  const socialLinks = [
    { icon: Github, href: 'https://github.com/slimkiddjudas', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/umutcerk', label: 'LinkedIn' }
  ];

  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CerkBlog
              </h3>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              Web geliştirme, programlama ve teknoloji dünyasındaki en güncel 
              gelişmeleri takip edebileceğiniz blog platformu.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Blog Links */}
          <div>
            <h4 className="font-semibold mb-4">Blog</h4>
            <ul className="space-y-2">
              {footerLinks.blog.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold mb-4">Kurumsal</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="font-semibold mb-4">Kaynaklar</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <span>© {currentYear} CerkBlog. Tüm hakları saklıdır.</span>
          </div>
          
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <span>Türkiye'den</span>
            <Heart className="h-4 w-4 text-red-500" />
            <span>ile yapıldı</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
