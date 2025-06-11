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

// Backend API types
export interface Writer {
  id: number;
  firstName: string;
  lastName: string;
}

export interface PostCategory {
  id: number;
  name: string;
}

export interface Post {
  id: number;
  title: string;
  image?: string;
  content: string;
  viewCount: number;
  slug: string;
  userId: number;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
  writer: Writer;
  category: PostCategory;
  isAuthor?: boolean;
}

export interface PostsResponse {
  totalPosts: number;
  posts: Post[];
}

export interface PostDetailResponse {
  post: Post;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export interface AuthResponse {
  message: string;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

// Comment types
export interface CommentWriter {
  id: number;
  firstName: string;
  lastName: string;
}

export interface Comment {
  id: number;
  content: string;
  userId: number;
  postId: number;
  createdAt: string;
  updatedAt: string;
  writer: CommentWriter;
}

export interface CreateCommentRequest {
  content: string;
  postId: number;
}

export interface CsrfTokenResponse {
  csrfToken: string;
}

// Gallery types
export interface GalleryItem {
  id: number;
  title: string;
  description?: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface GalleryResponse {
  items: GalleryItem[];
}

// Announcement types
export interface Announcement {
  id: number;
  title: string;
  content: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface AnnouncementsResponse {
  totalAnnouncements: number;
  announcements: Announcement[];
}
