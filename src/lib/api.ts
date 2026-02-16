// src/lib/api.ts
export interface BlogPost {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const fetchBlogs = async (): Promise<BlogPost[]> => {
  const res = await fetch(`${API_URL}/blogs`);
  if (!res.ok) throw new Error('Failed to fetch blogs');
  return res.json();
};

export const createBlog = async (data: { title: string; content: string; password: string }) => {
  const res = await fetch(`${API_URL}/blogs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Failed to create blog');
  }
  return res.json();
};

export const updateBlog = async (id: string, data: { title: string; content: string; password: string }) => {
  const res = await fetch(`${API_URL}/blogs/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Failed to update blog');
  }
  return res.json();
};

export const deleteBlog = async (id: string, password: string) => {
  const res = await fetch(`${API_URL}/blogs/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  });
  
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Failed to delete blog');
  }
  return res.json();
};