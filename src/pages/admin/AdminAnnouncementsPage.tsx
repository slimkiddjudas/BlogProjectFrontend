import React, { useState, useEffect } from "react";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Calendar,
  AlertCircle,
} from "lucide-react";
import AdminLayout from "../../components/AdminLayout";
import {
  AdminAnnouncementService,
  type CreateAnnouncementRequest,
} from "../../services/adminAnnouncementService";
import type { Announcement } from "../../types";
const AdminAnnouncementsPage: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] =
    useState<Announcement | null>(null);
  const [newAnnouncement, setNewAnnouncement] =
    useState<CreateAnnouncementRequest>({ title: "", content: "" });
  useEffect(() => {
    fetchAnnouncements();
  }, []);
  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await AdminAnnouncementService.getAllAnnouncements();
      setAnnouncements(response.announcements);
    } catch (err) {
      setError("Duyurular yüklenirken hata oluştu");
      console.error("Error fetching announcements:", err);
    } finally {
      setLoading(false);
    }
  };
  const handleAddAnnouncement = async () => {
    if (!newAnnouncement.title.trim() || !newAnnouncement.content.trim()) {
      return;
    }
    try {
      const createdAnnouncement =
        await AdminAnnouncementService.createAnnouncement(newAnnouncement);
      setAnnouncements([createdAnnouncement, ...announcements]);
      setNewAnnouncement({ title: "", content: "" });
      setShowAddModal(false);
    } catch (err) {
      setError("Duyuru oluşturulurken hata oluştu");
      console.error("Error creating announcement:", err);
    }
  };
  const handleUpdateAnnouncement = async () => {
    if (!editingAnnouncement) return;
    try {
      const updatedAnnouncement =
        await AdminAnnouncementService.updateAnnouncement(
          editingAnnouncement.id,
          {
            title: editingAnnouncement.title,
            content: editingAnnouncement.content,
          }
        );
      setAnnouncements(
        announcements.map((a) =>
          a.id === editingAnnouncement.id ? updatedAnnouncement : a
        )
      );
      setEditingAnnouncement(null);
    } catch (err) {
      setError("Duyuru güncellenirken hata oluştu");
      console.error("Error updating announcement:", err);
    }
  };
  const handleDeleteAnnouncement = async (id: number) => {
    if (!window.confirm("Bu duyuruyu silmek istediğinizden emin misiniz?")) {
      return;
    }
    try {
      await AdminAnnouncementService.deleteAnnouncement(id);
      setAnnouncements(announcements.filter((a) => a.id !== id));
    } catch (err) {
      setError("Duyuru silinirken hata oluştu");
      console.error("Error deleting announcement:", err);
    }
  };
  const filteredAnnouncements = announcements.filter(
    (announcement) =>
      announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      announcement.content.toLowerCase().includes(searchTerm.toLowerCase())
  );  const stats = {
    total: announcements.length,
  };
  return (
    <AdminLayout currentSection="announcements">
      {" "}
      <div className="max-w-7xl mx-auto p-6">
        {" "}
        {/* Header */}{" "}
        <div className="flex justify-between items-center mb-6">
          {" "}
          <div>
            {" "}
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {" "}
              Duyuru Yönetimi{" "}
            </h1>{" "}
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {" "}
              Site duyurularını ve bildirimlerini yönet{" "}
            </p>{" "}
          </div>{" "}
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            {" "}
            <Plus className="w-5 h-5" /> Duyuru Ekle{" "}
          </button>{" "}
        </div>{" "}
        {/* Loading State */}{" "}
        {loading && (
          <div className="flex justify-center items-center py-12">
            {" "}
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>{" "}
          </div>
        )}{" "}
        {/* Error State */}{" "}
        {error && (
          <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
            {" "}
            <p className="text-red-800 dark:text-red-200">{error}</p>{" "}
          </div>
        )}{" "}
        {/* Main Content */}{" "}
        {!loading && (
          <>
            {" "}            {/* Stats Cards */}{" "}
            <div className="grid grid-cols-1 gap-4 mb-6">
              {" "}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                {" "}
                <div className="flex items-center justify-between">
                  {" "}
                  <div>
                    {" "}
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {" "}
                      Toplam Duyuru{" "}
                    </p>{" "}
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {" "}
                      {stats.total}{" "}
                    </p>{" "}
                  </div>{" "}
                  <AlertCircle className="w-8 h-8 text-blue-600" />{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
            {/* Search */}{" "}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              {" "}
              <div className="relative flex-1">
                {" "}
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />{" "}
                <input
                  type="text"
                  placeholder="Duyuru ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg                            bg-white dark:bg-gray-800 text-gray-900 dark:text-white                           focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />{" "}
              </div>{" "}
            </div>{" "}
            {/* Announcements List */}{" "}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
              {" "}
              <div className="overflow-x-auto">
                {" "}
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  {" "}                  <thead className="bg-gray-50 dark:bg-gray-700">
                    {" "}
                    <tr>
                      {" "}
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        {" "}
                        Duyuru{" "}
                      </th>{" "}
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        {" "}
                        Tarih{" "}
                      </th>{" "}
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        {" "}
                        İşlemler{" "}
                      </th>{" "}
                    </tr>{" "}
                  </thead>{" "}
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {" "}
                    {filteredAnnouncements.map((announcement) => (
                      <tr
                        key={announcement.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        {" "}
                        <td className="px-6 py-4">
                          {" "}
                          <div>
                            {" "}
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {" "}
                              {announcement.title}{" "}
                            </div>{" "}                            <div className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">
                              {" "}
                              {announcement.content.substring(0, 100)}...{" "}
                            </div>{" "}
                          </div>{" "}
                        </td>{" "}
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                          {" "}
                          <div className="flex items-center">
                            {" "}
                            <Calendar className="w-4 h-4 mr-2 text-gray-400" />{" "}
                            {new Date(
                              announcement.createdAt
                            ).toLocaleDateString("tr-TR")}{" "}
                          </div>{" "}
                        </td>{" "}
                        <td className="px-6 py-4">
                          {" "}
                          <div className="flex items-center space-x-3">
                            {" "}
                            <button
                              onClick={() =>
                                setEditingAnnouncement(announcement)
                              }
                              className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-lg transition-colors"
                              title="Düzenle"
                            >
                              {" "}
                              <Edit2 className="w-4 h-4" />{" "}
                            </button>{" "}
                            <button
                              onClick={() =>
                                handleDeleteAnnouncement(announcement.id)
                              }
                              className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg transition-colors"
                              title="Sil"
                            >
                              {" "}
                              <Trash2 className="w-4 h-4" />{" "}
                            </button>{" "}
                          </div>{" "}
                        </td>{" "}
                      </tr>
                    ))}{" "}
                  </tbody>{" "}
                </table>{" "}
              </div>{" "}
            </div>{" "}
          </>
        )}{" "}
        {/* Add Announcement Modal */}{" "}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            {" "}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl">
              {" "}
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                {" "}
                Yeni Duyuru Ekle{" "}
              </h2>{" "}
              <div className="space-y-4">
                {" "}
                <div>
                  {" "}
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {" "}
                    Başlık{" "}
                  </label>{" "}
                  <input
                    type="text"
                    value={newAnnouncement.title}
                    onChange={(e) =>
                      setNewAnnouncement({
                        ...newAnnouncement,
                        title: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg                              bg-white dark:bg-gray-700 text-gray-900 dark:text-white                             focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Duyuru başlığını girin..."
                  />{" "}
                </div>{" "}
                <div>
                  {" "}
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {" "}
                    İçerik{" "}
                  </label>{" "}
                  <textarea
                    value={newAnnouncement.content}
                    onChange={(e) =>
                      setNewAnnouncement({
                        ...newAnnouncement,
                        content: e.target.value,
                      })
                    }
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg                              bg-white dark:bg-gray-700 text-gray-900 dark:text-white                             focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Duyuru içeriğini girin..."
                  />{" "}
                </div>{" "}
              </div>{" "}
              <div className="flex justify-end space-x-3 mt-6">
                {" "}
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700                            hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                >
                  {" "}
                  İptal{" "}
                </button>{" "}
                <button
                  onClick={handleAddAnnouncement}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  {" "}
                  Duyuru Ekle{" "}
                </button>{" "}
              </div>{" "}
            </div>{" "}
          </div>
        )}
        {/* Edit Announcement Modal */}
        {editingAnnouncement && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Duyuru Düzenle
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Başlık
                  </label>
                  <input
                    type="text"
                    value={editingAnnouncement.title}
                    onChange={(e) =>
                      setEditingAnnouncement({
                        ...editingAnnouncement,
                        title: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                             bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                             focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Duyuru başlığını girin..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    İçerik
                  </label>
                  <textarea
                    value={editingAnnouncement.content}
                    onChange={(e) =>
                      setEditingAnnouncement({
                        ...editingAnnouncement,
                        content: e.target.value,
                      })
                    }
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                             bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                             focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Duyuru içeriğini girin..."
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setEditingAnnouncement(null)}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 
                           hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                >
                  İptal
                </button>
                <button
                  onClick={handleUpdateAnnouncement}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Güncelle
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminAnnouncementsPage;
