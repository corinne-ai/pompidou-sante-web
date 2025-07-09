
import React from 'react';
import AdminStats from './AdminStats';

interface SystemStats {
  totalUsers: number;
  activeUsers: number;
  doctors: number;
  patients: number;
  secretaries: number;
  admins: number;
}

interface StatsTabProps {
  systemStats: SystemStats;
}

const StatsTab: React.FC<StatsTabProps> = ({ systemStats }) => {
  return <AdminStats systemStats={systemStats} />;
};

export default StatsTab;
