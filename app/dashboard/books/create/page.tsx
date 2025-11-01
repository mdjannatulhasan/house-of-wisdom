'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function CreateBookPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category_id: '',
    publication_date: '',
    price: '',
  });
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data.categories || []));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const data = new FormData();
    data.append('title', formData.title);
    data.append('author', formData.author);
    data.append('category_id', formData.category_id);
    data.append('publication_date', formData.publication_date);
    if (formData.price) data.append('price', formData.price);
    if (coverImage) data.append('cover_image', coverImage);
    if (pdfFile) data.append('pdf_file', pdfFile);

    try {
      const response = await fetch('/api/books', {
        method: 'POST',
        body: data,
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || 'Failed to create book');
        setLoading(false);
        return;
      }

      router.push('/books');
      router.refresh();
    } catch (error) {
      setError('Something went wrong');
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Add New Book</h1>

        <div className="max-w-2xl bg-white rounded-lg shadow p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="author">Author *</Label>
              <Input
                id="author"
                required
                value={formData.author}
                onChange={(e) =>
                  setFormData({ ...formData, author: e.target.value })
                }
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="category_id">Category *</Label>
              <select
                id="category_id"
                required
                value={formData.category_id}
                onChange={(e) =>
                  setFormData({ ...formData, category_id: e.target.value })
                }
                className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="publication_date">Publication Date *</Label>
              <Input
                id="publication_date"
                type="date"
                required
                value={formData.publication_date}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    publication_date: e.target.value,
                  })
                }
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="price">Price (optional)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="cover_image">Cover Image *</Label>
              <Input
                id="cover_image"
                type="file"
                accept="image/*"
                required
                onChange={(e) =>
                  setCoverImage(e.target.files ? e.target.files[0] : null)
                }
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="pdf_file">PDF File (optional)</Label>
              <Input
                id="pdf_file"
                type="file"
                accept=".pdf"
                onChange={(e) =>
                  setPdfFile(e.target.files ? e.target.files[0] : null)
                }
                className="mt-1"
              />
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={loading}>
                {loading ? 'Creating...' : 'Create Book'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
}

