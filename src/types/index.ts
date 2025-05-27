export interface Author {
  id: string;
  name: string;
  avatar: string;
  bio?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl?: string;
  author: Author;
  publishedAt: Date;
  readTime: number;
  tags: string[];
  category: string;
  featured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  count: number;
}
