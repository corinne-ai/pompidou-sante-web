
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import UserManagementTab from './components/UserManagementTab';
import StatsTab from './components/StatsTab';
import SecurityTab from './components/SecurityTab';

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
      password: '19750315'
    },
    { 
      id: '2', 
      name: 'Dr. Léonie', 
      email: 'leonie@pompidou.fr', 
      role: 'doctor', 
      status: 'Actif',
      lastLogin: '2024-11-08 16:45',
      password: '19800722'
    },
    { 
      id: '3', 
      name: 'Justin', 
      email: 'justin@hopitalpom.fr', 
      role: 'secretary', 
      status: 'Actif',
      lastLogin: '2024-11-09 08:15',
      password: '19901108'
    },
    { 
      id: '4', 
      name: 'Ulrich', 
      email: 'ulrich@gmail.com', 
      role: 'patient', 
      status: 'Actif',
      lastLogin: '2024-11-07 10:20',
      password: '19851203'
    },
    { 
      id: '5', 
      name: 'Corinne', 
      email: 'corinne@gmail.com', 
      role: 'patient', 
      status: 'Actif',
      lastLogin: '2024-11-06 19:30',
      password: '19920518'
    },
    { 
      id: '6', 
      name: 'Joseph', 
      email: 'joseph@techpom.fr', 
      role: 'admin', 
      status: 'Actif',
      lastLogin: '2024-11-09 09:00',
      password: '70925'
    },
    { 
      id: '7', 
      name: 'Bruno', 
      email: 'bruno@techpom.fr', 
      role: 'admin', 
      status: 'Actif',
      lastLogin: '2024-11-08 11:15',
      password: '80114'
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
          <UserManagementTab
            allUsers={allUsers}
            searchTerm={searchTerm}
            selectedUser={selectedUser}
            onSearchChange={setSearchTerm}
            onSelectUser={setSelectedUser}
            getRoleBadgeVariant={getRoleBadgeVariant}
            getRoleLabel={getRoleLabel}
          />
        </TabsContent>

        <TabsContent value="stats">
          <StatsTab systemStats={systemStats} />
        </TabsContent>

        <TabsContent value="security">
          <SecurityTab
            allUsers={allUsers}
            getRoleLabel={getRoleLabel}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
