
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  Users, 
  Settings, 
  Eye, 
  Search,
  User,
  Lock,
  Activity
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const allUsers = [
    { 
      id: '1', 
      name: 'Dr. Martin', 
      email: 'martin@pompidou.fr', 
      role: 'doctor', 
      status: 'Actif',
      lastLogin: '2024-11-09 14:30',
      password: '51031975'
    },
    { 
      id: '2', 
      name: 'Dr. Léonie', 
      email: 'leonie@pompidou.fr', 
      role: 'doctor', 
      status: 'Actif',
      lastLogin: '2024-11-08 16:45',
      password: '22070801'
    },
    { 
      id: '3', 
      name: 'Justin', 
      email: 'justin@hopitalpom.fr', 
      role: 'secretary', 
      status: 'Actif',
      lastLogin: '2024-11-09 08:15',
      password: '80110990'
    },
    { 
      id: '4', 
      name: 'Ulrich', 
      email: 'ulrich@gmail.com', 
      role: 'patient', 
      status: 'Actif',
      lastLogin: '2024-11-07 10:20',
      password: '30211985'
    },
    { 
      id: '5', 
      name: 'Corinne', 
      email: 'corinne@gmail.com', 
      role: 'patient', 
      status: 'Actif',
      lastLogin: '2024-11-06 19:30',
      password: '81051992'
    },
    { 
      id: '6', 
      name: 'Joseph', 
      email: 'joseph@techpom.fr', 
      role: 'admin', 
      status: 'Actif',
      lastLogin: '2024-11-09 09:00',
      password: '52909'
    },
    { 
      id: '7', 
      name: 'Bruno', 
      email: 'bruno@techpom.fr', 
      role: 'admin', 
      status: 'Actif',
      lastLogin: '2024-11-08 11:15',
      password: '41017'
    }
  ];

  const systemStats = {
    totalUsers: allUsers.length,
    activeUsers: allUsers.filter(u => u.status === 'Actif').length,
    doctors: allUsers.filter(u => u.role === 'doctor').length,
    patients: allUsers.filter(u => u.role === 'patient').length,
    secretaries: allUsers.filter(u => u.role === 'secretary').length,
    admins: allUsers.filter(u => u.role === 'admin').length
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'doctor': return 'default';
      case 'patient': return 'secondary';
      case 'secretary': return 'outline';
      case 'admin': return 'destructive';
      default: return 'secondary';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'doctor': return 'Médecin';
      case 'patient': return 'Patient';
      case 'secretary': return 'Secrétaire';
      case 'admin': return 'Administrateur';
      default: return role;
    }
  };

  const filteredUsers = allUsers.filter(u =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Administration Système</h1>
          <p className="text-gray-600">Bienvenue, {user?.name}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Shield className="w-8 h-8 text-primary" />
          <div>
            <p className="font-medium">{user?.name}</p>
            <p className="text-sm text-gray-500">Administrateur</p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="users" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="users">Gestion Utilisateurs</TabsTrigger>
          <TabsTrigger value="stats">Statistiques</TabsTrigger>
          <TabsTrigger value="security">Sécurité</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Gestion des Comptes Utilisateurs
              </CardTitle>
              <CardDescription>
                Consultez et gérez tous les comptes utilisateurs du système
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Rechercher un utilisateur..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  {filteredUsers.map((u) => (
                    <Card key={u.id} className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-medium text-lg">{u.name}</h3>
                            <p className="text-sm text-gray-600">{u.email}</p>
                          </div>
                          <Badge variant={getRoleBadgeVariant(u.role)}>
                            {getRoleLabel(u.role)}
                          </Badge>
                        </div>
                        
                        <div className="flex justify-between text-sm text-gray-500 mb-3">
                          <span>Statut: {u.status}</span>
                          <span>Dernière connexion: {u.lastLogin}</span>
                        </div>

                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="w-full"
                          onClick={() => setSelectedUser(u.id)}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Voir les détails
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {selectedUser && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Lock className="w-5 h-5 mr-2" />
                        Détails Utilisateur
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {(() => {
                        const selectedUserData = allUsers.find(u => u.id === selectedUser);
                        if (!selectedUserData) return null;
                        
                        return (
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h4 className="font-medium text-gray-700">Informations</h4>
                                <div className="mt-2 space-y-2 text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">ID:</span>
                                    <span>{selectedUserData.id}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Nom:</span>
                                    <span>{selectedUserData.name}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Email:</span>
                                    <span className="text-xs">{selectedUserData.email}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Rôle:</span>
                                    <Badge variant={getRoleBadgeVariant(selectedUserData.role)} className="text-xs">
                                      {getRoleLabel(selectedUserData.role)}
                                    </Badge>
                                  </div>
                                </div>
                              </div>

                              <div>
                                <h4 className="font-medium text-gray-700">Sécurité</h4>
                                <div className="mt-2 space-y-2 text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Mot de passe:</span>
                                    <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                                      {selectedUserData.password}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Statut:</span>
                                    <Badge variant="outline">{selectedUserData.status}</Badge>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Dernière connexion:</span>
                                    <span className="text-xs">{selectedUserData.lastLogin}</span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="pt-4 border-t space-y-2">
                              <Button size="sm" variant="outline" className="w-full">
                                Réinitialiser mot de passe
                              </Button>
                              <Button size="sm" variant="outline" className="w-full">
                                Suspendre compte
                              </Button>
                            </div>
                          </div>
                        );
                      })()}
                    </CardContent>
                  </Card>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Utilisateurs Total
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">{systemStats.totalUsers}</div>
                <p className="text-sm text-gray-600 mt-1">
                  {systemStats.activeUsers} actifs
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="w-5 h-5 mr-2" />
                  Répartition par Rôle
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Médecins:</span>
                    <span className="font-bold">{systemStats.doctors}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Patients:</span>
                    <span className="font-bold">{systemStats.patients}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Secrétaires:</span>
                    <span className="font-bold">{systemStats.secretaries}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Admins:</span>
                    <span className="font-bold">{systemStats.admins}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="w-5 h-5 mr-2" />
                  Système
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Version:</span>
                    <span className="font-bold">2.1.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Statut:</span>
                    <Badge variant="default">Opérationnel</Badge>
                  </div>
                  <div className="text-sm text-gray-600 mt-2">
                    Dernière mise à jour: 01/11/2024
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Sécurité Système
              </CardTitle>
              <CardDescription>
                Paramètres de sécurité et surveillance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-4">Règles de Mot de Passe</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <ul className="text-sm space-y-1">
                      <li>• Médecins: nom@pompidou.fr - 8 caractères (date naissance inversée)</li>
                      <li>• Secrétaires: nom@hopitalpom.fr - 8 caractères (date naissance inversée)</li>
                      <li>• Patients: nom@gmail.com - 8 caractères (date naissance inversée)</li>
                      <li>• Administrateurs: nom@techpom.fr - 5 caractères</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-4">Connexions Récentes</h3>
                  <div className="space-y-2">
                    {allUsers.slice(0, 5).map((u) => (
                      <div key={u.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <span className="font-medium">{u.name}</span>
                          <span className="text-sm text-gray-600 ml-2">({getRoleLabel(u.role)})</span>
                        </div>
                        <span className="text-sm text-gray-500">{u.lastLogin}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
