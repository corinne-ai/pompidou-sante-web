
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Users, 
  CreditCard, 
  FileText, 
  Search,
  Clock,
  User,
  Euro,
  Phone
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const SecretaryDashboard: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  const appointments = [
    {
      id: '1',
      time: '09:00',
      patient: 'Ulrich',
      doctor: 'Dr. Martin',
      service: 'Cardiologie',
      status: 'Confirmé',
      phone: '01 45 67 89 10'
    },
    {
      id: '2',
      time: '10:30',
      patient: 'Corinne',
      doctor: 'Dr. Léonie',
      service: 'Neurologie',
      status: 'En attente',
      phone: '01 45 67 89 11'
    },
    {
      id: '3',
      time: '14:00',
      patient: 'Marie Dubois',
      doctor: 'Dr. Martin',
      service: 'Cardiologie',
      status: 'Confirmé',
      phone: '01 45 67 89 12'
    },
    {
      id: '4',
      time: '15:30',
      patient: 'Jean Durand',
      doctor: 'Dr. Léonie',
      service: 'Neurologie',
      status: 'Annulé',
      phone: '01 45 67 89 13'
    }
  ];

  const doctorAvailability = [
    {
      doctor: 'Dr. Martin',
      service: 'Cardiologie',
      date: '2024-11-15',
      slots: ['09:00', '10:30', '14:00', '15:30'],
      bookedSlots: ['10:30', '14:00']
    },
    {
      doctor: 'Dr. Léonie',
      service: 'Neurologie',
      date: '2024-11-15',
      slots: ['08:30', '10:00', '13:30', '15:00'],
      bookedSlots: ['10:00']
    }
  ];

  const billing = [
    {
      id: '1',
      patient: 'Ulrich',
      date: '2024-11-05',
      service: 'Consultation Cardiologie',
      amount: 25.00,
      status: 'Payé',
      method: 'Carte Vitale'
    },
    {
      id: '2',
      patient: 'Corinne',
      date: '2024-10-28',
      service: 'IRM + Consultation',
      amount: 280.00,
      status: 'En attente',
      method: 'Tiers payant'
    },
    {
      id: '3',
      patient: 'Marie Dubois',
      date: '2024-11-03',
      service: 'Consultation + ECG',
      amount: 45.00,
      status: 'Payé',
      method: 'Espèces'
    }
  ];

  const patientFiles = [
    {
      id: '1',
      name: 'Ulrich',
      birthDate: '1985-12-03',
      address: '15 Rue de la Paix, 75001 Paris',
      phone: '01 45 67 89 10',
      socialSecurity: '1851203***456',
      doctor: 'Dr. Martin',
      lastUpdate: '2024-11-05'
    },
    {
      id: '2',
      name: 'Corinne',
      birthDate: '1992-05-18',
      address: '8 Avenue des Champs, 75008 Paris',
      phone: '01 45 67 89 11',
      socialSecurity: '2920518***789',
      doctor: 'Dr. Léonie',
      lastUpdate: '2024-10-28'
    }
  ];

  const filteredPatients = patientFiles.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Espace Secrétariat</h1>
          <p className="text-gray-600">Bienvenue, {user?.name}</p>
        </div>
        <div className="flex items-center space-x-2">
          <User className="w-8 h-8 text-primary" />
          <div>
            <p className="font-medium">{user?.name}</p>
            <p className="text-sm text-gray-500">Secrétaire Médicale</p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="appointments" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="appointments">Planning RDV</TabsTrigger>
          <TabsTrigger value="availability">Disponibilités</TabsTrigger>
          <TabsTrigger value="billing">Facturation</TabsTrigger>
          <TabsTrigger value="patients">Dossiers Patients</TabsTrigger>
        </TabsList>

        <TabsContent value="appointments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Planning des Rendez-vous
              </CardTitle>
              <CardDescription>
                Gérez les rendez-vous patients du jour
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {appointments.map((apt) => (
                  <Card key={apt.id} className="border-l-4 border-l-primary">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <Clock className="w-5 h-5 text-primary mr-2" />
                            <span className="font-medium text-lg">{apt.time}</span>
                          </div>
                          <h3 className="font-medium">{apt.patient}</h3>
                          <p className="text-gray-600">{apt.doctor} - {apt.service}</p>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <Phone className="w-4 h-4 mr-1" />
                            {apt.phone}
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge 
                            variant={
                              apt.status === 'Confirmé' ? 'default' : 
                              apt.status === 'En attente' ? 'secondary' : 'destructive'
                            }
                          >
                            {apt.status}
                          </Badge>
                          <div className="mt-2 space-x-2">
                            {apt.status === 'En attente' && (
                              <Button size="sm" variant="outline">
                                Confirmer
                              </Button>
                            )}
                            <Button size="sm" variant="outline">
                              Modifier
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="availability">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Disponibilités Médecins
              </CardTitle>
              <CardDescription>
                Consultez et gérez les créneaux disponibles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {doctorAvailability.map((doc, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg">{doc.doctor}</CardTitle>
                      <CardDescription>{doc.service} - {doc.date}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {doc.slots.map((slot) => (
                          <Button
                            key={slot}
                            variant={doc.bookedSlots.includes(slot) ? "destructive" : "outline"}
                            className="justify-center"
                            disabled={doc.bookedSlots.includes(slot)}
                          >
                            {slot}
                            {doc.bookedSlots.includes(slot) ? ' (Occupé)' : ' (Libre)'}
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="w-5 h-5 mr-2" />
                Service Facturation
              </CardTitle>
              <CardDescription>
                Suivi des paiements et facturation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {billing.map((bill) => (
                  <Card key={bill.id} className="border-l-4 border-l-green-500">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-lg">{bill.patient}</h3>
                          <p className="text-gray-600">{bill.service}</p>
                          <p className="text-sm text-gray-500">{bill.date}</p>
                          <p className="text-sm text-gray-500">Mode: {bill.method}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center mb-2">
                            <Euro className="w-5 h-5 text-green-600 mr-1" />
                            <span className="text-xl font-bold text-green-600">
                              {bill.amount.toFixed(2)}
                            </span>
                          </div>
                          <Badge variant={bill.status === 'Payé' ? 'default' : 'secondary'}>
                            {bill.status}
                          </Badge>
                          {bill.status === 'En attente' && (
                            <div className="mt-2">
                              <Button size="sm" variant="outline">
                                Relancer
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="patients">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Dossiers Administratifs Patients
              </CardTitle>
              <CardDescription>
                Accès aux informations administratives des patients
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Rechercher un patient..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-4">
                {filteredPatients.map((patient) => (
                  <Card key={patient.id}>
                    <CardContent className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h3 className="font-medium text-lg mb-3">{patient.name}</h3>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Date de naissance:</span>
                              <span>{patient.birthDate}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Téléphone:</span>
                              <span>{patient.phone}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Sécurité sociale:</span>
                              <span>{patient.socialSecurity}</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="space-y-2 text-sm">
                            <div>
                              <span className="text-gray-600">Adresse:</span>
                              <p className="mt-1">{patient.address}</p>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Médecin traitant:</span>
                              <span>{patient.doctor}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Dernière MAJ:</span>
                              <span>{patient.lastUpdate}</span>
                            </div>
                          </div>
                          <div className="mt-3">
                            <Button size="sm" variant="outline">
                              Modifier le dossier
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SecretaryDashboard;
