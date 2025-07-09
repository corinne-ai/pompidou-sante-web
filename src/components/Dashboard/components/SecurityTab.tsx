
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  lastLogin: string;
  password: string;
}

interface SecurityTabProps {
  allUsers: User[];
  getRoleLabel: (role: string) => string;
}

const SecurityTab: React.FC<SecurityTabProps> = ({ allUsers, getRoleLabel }) => {
  return (
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
                <li>• Tous les utilisateurs: mot de passe uniforme "aphp" (4 caractères)</li>
                <li>• Médecins: nom@pompidou.fr - mot de passe: aphp</li>
                <li>• Secrétaires: nom@hopitalpom.fr - mot de passe: aphp</li>
                <li>• Patients: nom@gmail.com - mot de passe: aphp</li>
                <li>• Administrateurs: nom@techpom.fr - mot de passe: aphp</li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-4">Connexions Récentes</h3>
            <div className="space-y-2">
              {allUsers.slice(0, 5).map((user) => (
                <div key={user.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <span className="font-medium">{user.name}</span>
                    <span className="text-sm text-gray-600 ml-2">({getRoleLabel(user.role)})</span>
                  </div>
                  <span className="text-sm text-gray-500">{user.lastLogin}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SecurityTab;
