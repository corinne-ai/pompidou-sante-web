
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Activity, Settings } from 'lucide-react';

interface SystemStats {
  totalUsers: number;
  activeUsers: number;
  doctors: number;
  patients: number;
  secretaries: number;
  admins: number;
}

interface AdminStatsProps {
  systemStats: SystemStats;
}

const AdminStats: React.FC<AdminStatsProps> = ({ systemStats }) => {
  return (
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
  );
};

export default AdminStats;
