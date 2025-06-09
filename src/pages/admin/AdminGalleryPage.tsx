import React, { useState } from 'react';
import { Plus, Search, Trash2, Download, Eye, Upload, Image, Calendar, FileImage } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';

interface AdminGalleryItem {
  id: number;
  title: string;
  description?: string;
  imageUrl: string;
  fileName: string;
  fileSize: number;
  dimensions: {
    width: number;
    height: number;
  };
  uploadedBy: {
    id: number;
    firstName: string;
    lastName: string;
  };
  createdAt: string;
  views: number;
  downloads: number;
}

const AdminGalleryPage: React.FC = () => {
  const [galleryItems, setGalleryItems] = useState<AdminGalleryItem[]>([
    {
      id: 1,
      title: 'Modern Office Space',
      description: 'A beautiful modern office with natural lighting',
      imageUrl: '/api/placeholder/400/300',
      fileName: 'modern-office-space.jpg',
      fileSize: 2548000, // bytes
      dimensions: { width: 1920, height: 1080 },
      uploadedBy: { id: 1, firstName: 'John', lastName: 'Doe' },
      createdAt: '2024-01-15T10:00:00Z',
      views: 450,
      downloads: 23
    },
    {
      id: 2,
      title: 'Team Meeting',
      description: 'Weekly team meeting in the conference room',
      imageUrl: '/api/placeholder/400/300',
      fileName: 'team-meeting.jpg',
      fileSize: 1890000,
      dimensions: { width: 1280, height: 720 },
      uploadedBy: { id: 2, firstName: 'Jane', lastName: 'Smith' },
      createdAt: '2024-01-12T14:30:00Z',
      views: 320,
      downloads: 15
    },
    {
      id: 3,
      title: 'Product Launch Event',
      description: 'Photos from our latest product launch event',
      imageUrl: '/api/placeholder/400/300',
      fileName: 'product-launch.jpg',
      fileSize: 3200000,
      dimensions: { width: 2560, height: 1440 },
      uploadedBy: { id: 1, firstName: 'John', lastName: 'Doe' },
      createdAt: '2024-01-10T09:15:00Z',
      views: 680,
      downloads: 42
    },
    {
      id: 4,
      title: 'Company Logo Variations',
      description: 'Different variations of our company logo',
      imageUrl: '/api/placeholder/400/300',
      fileName: 'logo-variations.png',
      fileSize: 890000,
      dimensions: { width: 1024, height: 1024 },
      uploadedBy: { id: 2, firstName: 'Jane', lastName: 'Smith' },
      createdAt: '2024-01-08T16:45:00Z',
      views: 890,
      downloads: 67
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<AdminGalleryItem | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredItems = galleryItems.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.fileName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteItem = (id: number) => {
    if (window.confirm('Are you sure you want to delete this image? This action cannot be undone.')) {
      setGalleryItems(galleryItems.filter(item => item.id !== id));
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const stats = {
    total: galleryItems.length,
    totalViews: galleryItems.reduce((sum, item) => sum + item.views, 0),
    totalDownloads: galleryItems.reduce((sum, item) => sum + item.downloads, 0),
    totalSize: galleryItems.reduce((sum, item) => sum + item.fileSize, 0)
  };

  return (
    <AdminLayout currentSection="gallery">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Gallery Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage media files and images
            </p>
          </div>
          <button
            onClick={() => setShowUploadModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Upload className="w-5 h-5" />
            Upload Images
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Images
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.total}
                </p>
              </div>
              <Image className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Views
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {stats.totalViews.toLocaleString()}
                </p>
              </div>
              <Eye className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Downloads
                </p>
                <p className="text-2xl font-bold text-purple-600">
                  {stats.totalDownloads}
                </p>
              </div>
              <Download className="w-8 h-8 text-purple-600" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Storage Used
                </p>
                <p className="text-2xl font-bold text-orange-600">
                  {formatFileSize(stats.totalSize)}
                </p>
              </div>
              <FileImage className="w-8 h-8 text-orange-600" />
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search images..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                       bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                       focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-2 rounded-lg transition-colors ${
                viewMode === 'grid'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-2 rounded-lg transition-colors ${
                viewMode === 'list'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              List
            </button>
          </div>
        </div>

        {/* Gallery Content */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div key={item.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden group">
                <div className="relative aspect-square">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover cursor-pointer transition-transform group-hover:scale-105"
                    onClick={() => setSelectedImage(item)}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => setSelectedImage(item)}
                        className="bg-white text-gray-900 p-2 rounded-full mr-2 hover:bg-gray-100 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white truncate">{item.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 truncate">{item.description}</p>
                  <div className="flex justify-between items-center mt-3 text-xs text-gray-500 dark:text-gray-400">
                    <span>{item.dimensions.width}×{item.dimensions.height}</span>
                    <span>{formatFileSize(item.fileSize)}</span>
                  </div>
                  <div className="flex justify-between items-center mt-2 text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                      <Eye className="w-3 h-3 mr-1" />
                      {item.views}
                    </div>
                    <div className="flex items-center">
                      <Download className="w-3 h-3 mr-1" />
                      {item.downloads}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Image
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Uploaded By
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Stats
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredItems.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-16 h-16 object-cover rounded-lg cursor-pointer"
                          onClick={() => setSelectedImage(item)}
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {item.title}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {item.fileName}
                          </div>
                          <div className="text-xs text-gray-400">
                            {item.dimensions.width}×{item.dimensions.height} • {formatFileSize(item.fileSize)}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                        {item.uploadedBy.firstName} {item.uploadedBy.lastName}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                        <div className="space-y-1">
                          <div className="flex items-center">
                            <Eye className="w-3 h-3 mr-1 text-gray-400" />
                            {item.views.toLocaleString()}
                          </div>
                          <div className="flex items-center">
                            <Download className="w-3 h-3 mr-1 text-gray-400" />
                            {item.downloads}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                          {new Date(item.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => setSelectedImage(item)}
                            className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-lg transition-colors"
                            title="View"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteItem(item.id)}
                            className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Upload Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Upload Images
              </h2>
              
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  Drag and drop images here, or click to select
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  Supports: JPG, PNG, GIF up to 10MB
                </p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg cursor-pointer transition-colors"
                >
                  Select Files
                </label>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 
                           hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                  Upload
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Image Preview Modal */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {selectedImage.title}
                </h2>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  ✕
                </button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <img
                    src={selectedImage.imageUrl}
                    alt={selectedImage.title}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">File Name:</span>
                        <span className="text-gray-900 dark:text-white">{selectedImage.fileName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Dimensions:</span>
                        <span className="text-gray-900 dark:text-white">
                          {selectedImage.dimensions.width}×{selectedImage.dimensions.height}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">File Size:</span>
                        <span className="text-gray-900 dark:text-white">{formatFileSize(selectedImage.fileSize)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Uploaded By:</span>
                        <span className="text-gray-900 dark:text-white">
                          {selectedImage.uploadedBy.firstName} {selectedImage.uploadedBy.lastName}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Upload Date:</span>
                        <span className="text-gray-900 dark:text-white">
                          {new Date(selectedImage.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Views:</span>
                        <span className="text-gray-900 dark:text-white">{selectedImage.views.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Downloads:</span>
                        <span className="text-gray-900 dark:text-white">{selectedImage.downloads}</span>
                      </div>
                    </div>
                  </div>
                  
                  {selectedImage.description && (
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Description</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{selectedImage.description}</p>
                    </div>
                  )}
                  
                  <div className="flex space-x-3 pt-4">
                    <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </button>
                    <button
                      onClick={() => handleDeleteItem(selectedImage.id)}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <Image className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">No images found matching your search.</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminGalleryPage;
