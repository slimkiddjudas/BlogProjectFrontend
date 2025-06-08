import React, { useState } from 'react';
import { User, Mail, Shield, Calendar, Edit, Save, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Card } from '../components/ui/card';
import { useAuth } from '../contexts/auth-context';
import { useSocket } from '@/hooks/useSocket';
// import { AuthService } from '../services/authService';

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
  // const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });
  // const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   fetchProfile();
  // }, []);  const fetchProfile = async () => {
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

  const handleSave = async () => {
    try {
      // Burada profil güncelleme API'si çağrılacak
      // Şimdilik sadece local state'i güncelleyelim
      if (profile) {
        setProfile({
          ...profile,
          firstName: editForm.firstName,
          lastName: editForm.lastName,
          email: editForm.email
        });
      }
      setIsEditing(false);
    } catch (error) {
      console.error('Profile update error:', error);
      // setError('Profil güncellenirken bir hata oluştu');
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
                  </div>

                  <Button
                    onClick={handleEdit}
                    disabled={isEditing}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transition-all duration-300"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Profili Düzenle
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
                    <div className="flex space-x-2">
                      <Button onClick={handleSave} size="sm" className="bg-green-600 hover:bg-green-700">
                        <Save className="h-4 w-4 mr-1" />
                        Kaydet
                      </Button>
                      <Button onClick={handleCancel} size="sm" variant="outline">
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
                  </div>

                  {/* Role (Read-only) */}
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

                  {/* User ID (Read-only) */}
                  <div className="group">
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Kullanıcı ID
                    </label>
                    <div className="w-full px-4 py-3 rounded-lg bg-accent/20 border border-border/30 text-muted-foreground font-mono">
                      #{profile.id}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Additional Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {/* Account Security */}
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 shadow-lg">
              <h3 className="text-lg font-semibold text-foreground mb-4">Hesap Güvenliği</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Şifre</span>
                  <Button variant="outline" size="sm">
                    Değiştir
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">İki faktörlü doğrulama</span>
                  <Button variant="outline" size="sm">
                    Aktifleştir
                  </Button>
                </div>
              </div>
            </Card>

            {/* Activity */}
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 shadow-lg">
              <h3 className="text-lg font-semibold text-foreground mb-4">Aktivite</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Son giriş</span>
                  <span className="text-sm text-foreground">Bugün, 14:30</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Toplam yazı</span>
                  <span className="text-sm text-foreground">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Toplam görüntülenme</span>
                  <span className="text-sm text-foreground">1,234</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
