
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lock } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  lastLogin: string;
  password: string;
}

interface UserDetailsPanelProps {
  selectedUser: User | null;
  getRoleBadgeVariant: (role: string) => "default" | "secondary" | "outline" | "destructive";
  getRoleLabel: (role: string) => string;
}

const UserDetailsPanel: React.FC<UserDetailsPanelProps> = ({
  selectedUser,
  getRoleBadgeVariant,
  getRoleLabel
}) => {
  if (!selectedUser) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Lock className="w-5 h-5 mr-2" />
          Détails Utilisateur
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-gray-700">Informations</h4>
              <div className="mt-2 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">ID:</span>
                  <span>{selectedUser.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Nom:</span>
                  <span>{selectedUser.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="text-xs">{selectedUser.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Rôle:</span>
                  <Badge variant={getRoleBadgeVariant(selectedUser.role)} className="text-xs">
                    {getRoleLabel(selectedUser.role)}
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
                    {selectedUser.password}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Statut:</span>
                  <Badge variant="outline">{selectedUser.status}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Dernière connexion:</span>
                  <span className="text-xs">{selectedUser.lastLogin}</span>
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
      </CardContent>
    </Card>
  );
};

export default UserDetailsPanel;
