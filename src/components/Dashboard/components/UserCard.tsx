
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  lastLogin: string;
  password: string;
}

interface UserCardProps {
  user: User;
  onViewDetails: (userId: string) => void;
  getRoleBadgeVariant: (role: string) => "default" | "secondary" | "outline" | "destructive";
  getRoleLabel: (role: string) => string;
}

const UserCard: React.FC<UserCardProps> = ({
  user,
  onViewDetails,
  getRoleBadgeVariant,
  getRoleLabel
}) => {
  return (
    <Card className="cursor-pointer hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-medium text-lg">{user.name}</h3>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>
          <Badge variant={getRoleBadgeVariant(user.role)}>
            {getRoleLabel(user.role)}
          </Badge>
        </div>
        
        <div className="flex justify-between text-sm text-gray-500 mb-3">
          <span>Statut: {user.status}</span>
          <span>Dernière connexion: {user.lastLogin}</span>
        </div>

        <Button 
          size="sm" 
          variant="outline" 
          className="w-full"
          onClick={() => onViewDetails(user.id)}
        >
          <Eye className="w-4 h-4 mr-1" />
          Voir les détails
        </Button>
      </CardContent>
    </Card>
  );
};

export default UserCard;
