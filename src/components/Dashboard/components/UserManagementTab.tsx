
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Users, Search } from 'lucide-react';
import UserCard from './UserCard';
import UserDetailsPanel from './UserDetailsPanel';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  lastLogin: string;
  password: string;
}

interface UserManagementTabProps {
  allUsers: User[];
  searchTerm: string;
  selectedUser: string | null;
  onSearchChange: (term: string) => void;
  onSelectUser: (userId: string) => void;
  getRoleBadgeVariant: (role: string) => "default" | "secondary" | "outline" | "destructive";
  getRoleLabel: (role: string) => string;
}

const UserManagementTab: React.FC<UserManagementTabProps> = ({
  allUsers,
  searchTerm,
  selectedUser,
  onSearchChange,
  onSelectUser,
  getRoleBadgeVariant,
  getRoleLabel
}) => {
  const filteredUsers = allUsers.filter(u =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedUserData = selectedUser ? allUsers.find(u => u.id === selectedUser) : null;

  return (
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
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                onViewDetails={onSelectUser}
                getRoleBadgeVariant={getRoleBadgeVariant}
                getRoleLabel={getRoleLabel}
              />
            ))}
          </div>

          {selectedUser && (
            <UserDetailsPanel
              selectedUser={selectedUserData}
              getRoleBadgeVariant={getRoleBadgeVariant}
              getRoleLabel={getRoleLabel}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserManagementTab;
