import type { BlogPost, Author } from '../types';

// Mock authors
export const authors: Author[] = [
  {
    id: '1',
    name: 'Ahmet Kaya',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    bio: 'Full-stack developer ve teknoloji tutkunu'
  },
  {
    id: '2',
    name: 'Zeynep Özkan',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b8b8?w=100&h=100&fit=crop&crop=face',
    bio: 'Frontend uzmanı ve UI/UX tasarımcı'
  },
  {
    id: '3',
    name: 'Mehmet Demir',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    bio: 'DevOps engineer ve cloud architecture uzmanı'
  },
  {
    id: '4',
    name: 'Elif Yılmaz',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    bio: 'Backend developer ve API tasarım uzmanı'
  }
];

// Mock featured posts
export const featuredPosts: BlogPost[] = [
  {
    id: '1',
    title: 'React 19 ile Gelen Yeni Özellikler ve Performans İyileştirmeleri',
    excerpt: 'React 19\'un getirdiği compiler optimizasyonları, Server Components ve yeni hook\'lar hakkında detaylı bir inceleme.',
    content: '',
    imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
    author: authors[0],
    publishedAt: new Date('2024-11-15'),
    readTime: 8,
    tags: ['React', 'JavaScript', 'Frontend', 'Performance'],
    category: 'Frontend',
    featured: true
  },
  {
    id: '2',
    title: 'Next.js 15 App Router: Modern Web Uygulamaları Geliştirme Rehberi',
    excerpt: 'App Router mimarisi ile daha hızlı ve SEO dostu web uygulamaları nasıl geliştirilir? Pratik örneklerle öğrenin.',
    content: '',
    imageUrl: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=400&fit=crop',
    author: authors[1],
    publishedAt: new Date('2024-11-12'),
    readTime: 12,
    tags: ['Next.js', 'React', 'SSR', 'Web Development'],
    category: 'Framework',
    featured: true
  }
];

// Mock recent posts
export const recentPosts: BlogPost[] = [
  {
    id: '3',
    title: 'TypeScript 5.3 ile Gelen Yenilikler',
    excerpt: 'TypeScript\'in son sürümünde yer alan import attributes, resolution-mode ve diğer önemli güncellemeler.',
    content: '',
    imageUrl: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=600&h=300&fit=crop',
    author: authors[0],
    publishedAt: new Date('2024-11-10'),
    readTime: 6,
    tags: ['TypeScript', 'JavaScript', 'Programming'],
    category: 'Programming'
  },
  {
    id: '4',
    title: 'Tailwind CSS ile Component Library Oluşturma',
    excerpt: 'Tailwind CSS kullanarak yeniden kullanılabilir component library nasıl oluşturulur? Adım adım rehber.',
    content: '',
    imageUrl: 'https://images.unsplash.com/photo-1545670723-196ed0954986?w=600&h=300&fit=crop',
    author: authors[1],
    publishedAt: new Date('2024-11-08'),
    readTime: 10,
    tags: ['Tailwind CSS', 'CSS', 'Component Library'],
    category: 'CSS'
  },
  {
    id: '5',
    title: 'Docker ile Node.js Uygulamaları Container\'a Alma',
    excerpt: 'Node.js uygulamalarınızı Docker ile nasıl container haline getirip production\'a deploy edebilirsiniz?',
    content: '',
    imageUrl: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=600&h=300&fit=crop',
    author: authors[2],
    publishedAt: new Date('2024-11-05'),
    readTime: 15,
    tags: ['Docker', 'Node.js', 'DevOps', 'Deployment'],
    category: 'DevOps'
  },
  {
    id: '6',
    title: 'GraphQL vs REST API: Hangisini Seçmeli?',
    excerpt: 'Modern web uygulamaları için GraphQL ve REST API arasındaki farklar, avantajlar ve dezavantajlar.',
    content: '',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=300&fit=crop',
    author: authors[3],
    publishedAt: new Date('2024-11-02'),
    readTime: 9,
    tags: ['GraphQL', 'REST', 'API', 'Backend'],
    category: 'Backend'
  },
  {
    id: '7',
    title: 'Vue.js 3 Composition API ile State Management',
    excerpt: 'Vue.js 3\'te Composition API kullanarak etkili state management nasıl yapılır? Pinia ile entegrasyon.',
    content: '',
    imageUrl: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?w=600&h=300&fit=crop',
    author: authors[1],
    publishedAt: new Date('2024-10-30'),
    readTime: 7,
    tags: ['Vue.js', 'JavaScript', 'State Management', 'Pinia'],
    category: 'Frontend'
  },
  {
    id: '8',
    title: 'AWS Lambda ile Serverless Backend Geliştirme',
    excerpt: 'AWS Lambda kullanarak maliyet etkin ve ölçeklenebilir serverless backend mimarisi oluşturma rehberi.',
    content: '',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=300&fit=crop',
    author: authors[2],
    publishedAt: new Date('2024-10-28'),
    readTime: 11,
    tags: ['AWS', 'Lambda', 'Serverless', 'Cloud'],
    category: 'Cloud'
  },
  {
    id: '9',
    title: 'CSS Grid vs Flexbox: Doğru Seçim Nasıl Yapılır?',
    excerpt: 'Modern CSS layout teknikleri: CSS Grid ve Flexbox\'ın avantajları, kullanım alanları ve pratik örnekler.',
    content: '',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=300&fit=crop',
    author: authors[1],
    publishedAt: new Date('2024-10-25'),
    readTime: 8,
    tags: ['CSS', 'Grid', 'Flexbox', 'Layout'],
    category: 'CSS'
  },
  {
    id: '10',
    title: 'Python Django ile RESTful API Geliştirme',
    excerpt: 'Django REST Framework kullanarak profesyonel API\'ler nasıl geliştirilir? Authentication ve serialization.',
    content: '',
    imageUrl: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=600&h=300&fit=crop',
    author: authors[3],
    publishedAt: new Date('2024-10-22'),
    readTime: 13,
    tags: ['Python', 'Django', 'REST API', 'Backend'],
    category: 'Backend'
  }
];
