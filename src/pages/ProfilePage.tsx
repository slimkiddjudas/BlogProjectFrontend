import React, { useState, useEffect } from 'react';
import { User, Mail, Shield, Calendar, Edit, Save, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Card } from '../components/ui/card';
import { useAuth } from '../contexts/auth-context';
import { useSocket } from '@/hooks/useSocket';
import { AuthService } from '../services/authService';

interface UserProfile {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const { activeUsersCount } = useSocket();
  const [profile, setProfile] = useState<UserProfile | null>(user);
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [editForm, setEditForm] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });
  // Sayfa yüklendiğinde en üste scroll yap ve editForm'u doldur
  useEffect(() => {
    window.scrollTo(0, 0);
    if (user) {
      setEditForm({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      });
    }
  }, [user]);

  // useEffect(() => {
  //   fetchProfile();
  // }, []);const fetchProfile = async () => {
  //   try {
  //     setIsLoading(true);
  //     setError(null);
  //     const response = await AuthService.getCurrentUser();
      
  //     if (!response) {
  //       setError('Profil bilgileri bulunamadı');
  //       return;
  //     }
      
  //     setProfile(response);
  //     setEditForm({
  //       firstName: response.firstName,
  //       lastName: response.lastName,
  //       email: response.email
  //     });
  //   } catch (error) {
  //     console.error('Profile fetch error:', error);
  //     setError('Profil bilgileri yüklenirken bir hata oluştu');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  const handleEdit = () => {
    if (profile) {
      setEditForm({
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email
      });
    }
    setIsEditing(true);
  };
  const handleCancel = () => {
    setIsEditing(false);
    if (profile) {
      setEditForm({
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email
      });
    }
  };

  const handlePasswordChange = () => {
    setShowPasswordModal(true);
    setPasswordForm({
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const handlePasswordSave = async () => {
    if (!passwordForm.oldPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      alert('Tüm şifre alanları zorunludur.');
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('Yeni şifreler eşleşmiyor.');
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      alert('Yeni şifre en az 6 karakter olmalıdır.');
      return;
    }

    try {
      setPasswordLoading(true);
      await AuthService.changePassword({
        oldPassword: passwordForm.oldPassword,
        newPassword: passwordForm.newPassword
      });
      
      setShowPasswordModal(false);
      setPasswordForm({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      alert('Şifre başarıyla değiştirildi.');
    } catch (error) {
      console.error('Password change error:', error);
      alert('Şifre değiştirirken bir hata oluştu. Lütfen eski şifrenizi kontrol edin.');
    } finally {
      setPasswordLoading(false);
    }
  };

  const closePasswordModal = () => {
    setShowPasswordModal(false);
    setPasswordForm({
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };
  const handleSave = async () => {
    if (!editForm.firstName.trim() || !editForm.lastName.trim() || !editForm.email.trim()) {
      alert('Tüm alanlar zorunludur.');
      return;
    }

    try {
      setIsUpdating(true);
      const response = await AuthService.updateProfile({
        firstName: editForm.firstName,
        lastName: editForm.lastName,
        email: editForm.email
      });
      
      setProfile(response.user);
      setIsEditing(false);
      alert('Profil başarıyla güncellendi.');
    } catch (error) {
      console.error('Profile update error:', error);
      alert('Profil güncellenirken bir hata oluştu.');
    } finally {
      setIsUpdating(false);
    }
  };

  const getRoleDisplay = (role: string) => {
    switch (role.toLowerCase()) {
      case 'admin':
        return { text: 'Yönetici', color: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300' };
      case 'moderator':
        return { text: 'Moderatör', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300' };
      case 'writer':
        return { text: 'Yazar', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300' };
      default:
        return { text: 'Kullanıcı', color: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300' };
    }
  };

  // if (isLoading) {
  //   return (
  //     <div className="min-h-screen bg-background flex items-center justify-center">
  //       <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  //     </div>
  //   );
  // }

  // if (error) {
  //   return (
  //     <div className="min-h-screen bg-background flex items-center justify-center">
  //       <Card className="p-6 max-w-md mx-auto">
  //         <div className="text-center">
  //           <div className="text-destructive mb-4">⚠️</div>
  //           <h3 className="text-lg font-semibold text-foreground mb-2">Hata</h3>
  //           <p className="text-muted-foreground">{error}</p>
  //           <Button onClick={fetchProfile} className="mt-4">
  //             Tekrar Dene
  //           </Button>
  //         </div>
  //       </Card>
  //     </div>
  //   );
  // }

  if (!profile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-6 max-w-md mx-auto">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-foreground mb-2">Profil Bulunamadı</h3>
            <p className="text-muted-foreground">Profil bilgileri yüklenemedi.</p>
          </div>
        </Card>
      </div>
    );
  }

  const roleInfo = getRoleDisplay(profile.role);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/10">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent">
              Profil Ayarları
            </h1>
            <p className="text-muted-foreground mt-2">
              Hesap bilgilerinizi görüntüleyin ve düzenleyin
            </p>
            <div className="text-sm text-muted-foreground mt-1">
              Aktif Kullanıcı Sayısı: <span className="font-semibold">{activeUsersCount}</span>
            </div>

          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 shadow-lg">
                <div className="text-center">
                  <div className="relative inline-block mb-4">
                    <Avatar className="h-24 w-24 ring-4 ring-primary/20 shadow-lg">
                      <AvatarFallback className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white text-2xl font-bold">
                        {profile.firstName.charAt(0)}{profile.lastName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 h-6 w-6 bg-green-500 rounded-full border-2 border-background shadow-sm"></div>
                  </div>
                  
                  <h2 className="text-xl font-semibold text-foreground mb-1">
                    {profile.firstName} {profile.lastName}
                  </h2>
                  
                  <div className="flex items-center justify-center mb-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${roleInfo.color}`}>
                      <Shield className="h-3 w-3 mr-1" />
                      {roleInfo.text}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-center text-sm text-muted-foreground mb-6">
                    <Calendar className="h-4 w-4 mr-2" />
                    Üye olma tarihi: Ocak 2024
                  </div>                  <Button
                    onClick={handleEdit}
                    disabled={isEditing || isUpdating}
                    variant="default"
                    className="w-full mb-3"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    {isUpdating ? 'Güncelleniyor...' : 'Profili Düzenle'}
                  </Button>
                  
                  <Button
                    onClick={handlePasswordChange}
                    variant="outline"
                    className="w-full"
                  >
                    Şifre Değiştir
                  </Button>
                </div>
              </Card>
            </div>

            {/* Profile Details */}
            <div className="lg:col-span-2">
              <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-foreground">Kişisel Bilgiler</h3>
                  {isEditing && (
                    <div className="flex space-x-2">                      <Button onClick={handleSave} size="sm" className="bg-green-600 hover:bg-green-700" disabled={isUpdating}>
                        <Save className="h-4 w-4 mr-1" />
                        {isUpdating ? 'Kaydediliyor...' : 'Kaydet'}
                      </Button><Button onClick={handleCancel} size="sm" variant="default">
                        <X className="h-4 w-4 mr-1" />
                        İptal
                      </Button>
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  {/* First Name */}
                  <div className="group">
                    <label className="block text-sm font-medium text-foreground mb-2">
                      <User className="h-4 w-4 inline mr-2" />
                      Ad
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editForm.firstName}
                        onChange={(e) => setEditForm({ ...editForm, firstName: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                        placeholder="Adınızı girin"
                      />
                    ) : (
                      <div className="w-full px-4 py-3 rounded-lg bg-accent/30 border border-border/50 text-foreground">
                        {profile.firstName}
                      </div>
                    )}
                  </div>

                  {/* Last Name */}
                  <div className="group">
                    <label className="block text-sm font-medium text-foreground mb-2">
                      <User className="h-4 w-4 inline mr-2" />
                      Soyad
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editForm.lastName}
                        onChange={(e) => setEditForm({ ...editForm, lastName: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                        placeholder="Soyadınızı girin"
                      />
                    ) : (
                      <div className="w-full px-4 py-3 rounded-lg bg-accent/30 border border-border/50 text-foreground">
                        {profile.lastName}
                      </div>
                    )}
                  </div>

                  {/* Email */}
                  <div className="group">
                    <label className="block text-sm font-medium text-foreground mb-2">
                      <Mail className="h-4 w-4 inline mr-2" />
                      E-posta
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={editForm.email}
                        onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                        placeholder="E-posta adresinizi girin"
                      />
                    ) : (
                      <div className="w-full px-4 py-3 rounded-lg bg-accent/30 border border-border/50 text-foreground">
                        {profile.email}
                      </div>
                    )}
                  </div>                  {/* Role (Read-only) */}
                  <div className="group">
                    <label className="block text-sm font-medium text-foreground mb-2">
                      <Shield className="h-4 w-4 inline mr-2" />
                      Rol
                    </label>
                    <div className="w-full px-4 py-3 rounded-lg bg-accent/20 border border-border/30 text-muted-foreground">
                      {roleInfo.text}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Rol bilgisi sistem yöneticisi tarafından değiştirilir
                    </p>
                  </div>
                </div>              </Card>            </div>
          </div>
        </div>

        {/* Password Change Modal */}
        {showPasswordModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="p-6 w-full max-w-md bg-card/95 backdrop-blur-sm border-border/50 shadow-xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-foreground">Şifre Değiştir</h3>
                <button
                  onClick={closePasswordModal}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Mevcut Şifre *
                  </label>
                  <input
                    type="password"
                    value={passwordForm.oldPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, oldPassword: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Mevcut şifrenizi girin"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Yeni Şifre *
                  </label>
                  <input
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Yeni şifrenizi girin"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Yeni Şifre Tekrar *
                  </label>
                  <input
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Yeni şifrenizi tekrar girin"
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <Button
                  onClick={closePasswordModal}
                  variant="outline"
                  disabled={passwordLoading}
                >
                  İptal
                </Button>
                <Button
                  onClick={handlePasswordSave}
                  disabled={passwordLoading || !passwordForm.oldPassword || !passwordForm.newPassword || !passwordForm.confirmPassword}
                  className="bg-primary text-primary-foreground"
                >
                  {passwordLoading ? 'Değiştiriliyor...' : 'Şifre Değiştir'}
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
