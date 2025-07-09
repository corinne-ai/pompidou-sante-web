
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Stethoscope, 
  Users, 
  FileText, 
  Calendar, 
  Search,
  User,
  Clock,
  Activity,
  Eye
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const DoctorDashboard: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);

  const patients = [
    {
      id: '1',
      name: 'Ulrich',
      age: 39,
      lastVisit: '2024-11-05',
      condition: 'Suivi cardiologique',
      status: 'Stable',
      nextAppointment: '2024-11-15'
    },
    {
      id: '2',
      name: 'Corinne',
      age: 32,
      lastVisit: '2024-10-28',
      condition: 'Céphalées chroniques',
      status: 'En cours',
      nextAppointment: '2024-11-28'
    },
    {
      id: '3',
      name: 'Marie Dubois',
      age: 65,
      lastVisit: '2024-11-03',
      condition: 'Hypertension',
      status: 'Stable',
      nextAppointment: '2024-12-03'
    }
  ];

  const examResults = [
    {
      id: '1',
      patientName: 'Ulrich',
      examType: 'Prise de sang',
      date: '2024-11-05',
      status: 'Analysé',
      urgent: false
    },
    {
      id: '2',
      patientName: 'Corinne', 
      examType: 'IRM Cérébrale',
      date: '2024-10-28',
      status: 'Disponible',
      urgent: false
    },
    {
      id: '3',
      patientName: 'Marie Dubois',
      examType: 'ECG',
      date: '2024-11-03',
      status: 'En attente',
      urgent: true
    }
  ];

  const appointments = [
    {
      id: '1',
      time: '09:00',
      patient: 'Ulrich',
      type: 'Consultation de suivi',
      duration: '30 min'
    },
    {
      id: '2',
      time: '10:30',
      patient: 'Marie Dubois',
      type: 'Contrôle tension',
      duration: '20 min'
    },
    {
      id: '3',
      time: '14:00',
      patient: 'Jean Martin',
      type: 'Première consultation',
      duration: '45 min'
    }
  ];

  const patientHistory = {
    '1': {
      name: 'Ulrich',
      history: [
        {
          date: '2024-11-05',
          type: 'Consultation',
          notes: 'Contrôle post-opératoire. État général satisfaisant. Cicatrisation normale.',
          prescription: 'Continuer traitement actuel'
        },
        {
          date: '2024-10-15',
          type: 'Chirurgie',
          notes: 'Intervention cardiaque réussie. Pose de stent.',
          prescription: 'Repos 2 semaines, anticoagulants'
        },
        {
          date: '2024-09-30',
          type: 'Consultation',
          notes: 'Douleurs thoraciques. ECG montrant anomalies.',
          prescription: 'Coronarographie programmée'
        }
      ]
    }
  };

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Espace Médecin</h1>
          <p className="text-gray-600">Bienvenue, {user?.name}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Stethoscope className="w-8 h-8 text-primary" />
          <div>
            <p className="font-medium">{user?.name}</p>
            <p className="text-sm text-gray-500">
              {user?.name?.includes('Martin') ? 'Cardiologue' : 'Neurologue'}
            </p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="patients" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="patients">Dossiers Patients</TabsTrigger>
          <TabsTrigger value="results">Résultats</TabsTrigger>
          <TabsTrigger value="appointments">Planning</TabsTrigger>
          <TabsTrigger value="profile">Mon Profil</TabsTrigger>
        </TabsList>

        <TabsContent value="patients" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Dossiers Patients
              </CardTitle>
              <CardDescription>
                Gérez vos patients et consultez leurs historiques
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

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  {filteredPatients.map((patient) => (
                    <Card key={patient.id} className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium text-lg">{patient.name}</h3>
                          <Badge variant={patient.status === 'Stable' ? 'default' : 'secondary'}>
                            {patient.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{patient.age} ans</p>
                        <p className="text-sm text-gray-600 mb-3">{patient.condition}</p>
                        <div className="flex justify-between text-sm text-gray-500 mb-3">
                          <span>Dernière visite: {patient.lastVisit}</span>
                          <span>Prochain RDV: {patient.nextAppointment}</span>
                        </div>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="w-full"
                          onClick={() => setSelectedPatient(patient.id)}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Voir le dossier
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {selectedPatient && patientHistory[selectedPatient as keyof typeof patientHistory] && (
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        Historique - {patientHistory[selectedPatient as keyof typeof patientHistory].name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {patientHistory[selectedPatient as keyof typeof patientHistory].history.map((entry, index) => (
                          <div key={index} className="border-l-4 border-l-primary pl-4">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-medium">{entry.type}</h4>
                              <span className="text-sm text-gray-500">{entry.date}</span>
                            </div>
                            <p className="text-sm text-gray-700 mb-2">{entry.notes}</p>
                            <p className="text-sm text-blue-600 font-medium">{entry.prescription}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Résultats d'Examens
              </CardTitle>
              <CardDescription>
                Consultez les résultats d'examens de vos patients
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {examResults.map((result) => (
                  <Card key={result.id} className={`border-l-4 ${result.urgent ? 'border-l-red-500' : 'border-l-green-500'}`}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{result.examType}</h3>
                          <p className="text-gray-600">Patient: {result.patientName}</p>
                          <div className="flex items-center text-sm text-gray-500 mt-2">
                            <Calendar className="w-4 h-4 mr-1" />
                            {result.date}
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant={result.status === 'Disponible' ? 'default' : 'secondary'}>
                            {result.status}
                          </Badge>
                          {result.urgent && (
                            <Badge variant="destructive" className="ml-2">
                              Urgent
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="mt-3">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-1" />
                          Consulter
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appointments">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Planning du Jour
              </CardTitle>
              <CardDescription>
                Vos rendez-vous d'aujourd'hui
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {appointments.map((apt) => (
                  <Card key={apt.id} className="border-l-4 border-l-blue-500">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center mb-2">
                            <Clock className="w-5 h-5 text-blue-600 mr-2" />
                            <span className="font-medium text-lg">{apt.time}</span>
                            <span className="text-sm text-gray-500 ml-2">({apt.duration})</span>
                          </div>
                          <h3 className="font-medium">{apt.patient}</h3>
                          <p className="text-gray-600">{apt.type}</p>
                        </div>
                        <Badge variant="outline">Programmé</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                Mon Profil Médecin
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-4">Informations Professionnelles</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Nom:</span>
                      <span className="font-medium">{user?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email:</span>
                      <span className="font-medium">{user?.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Spécialité:</span>
                      <span className="font-medium">
                        {user?.name?.includes('Martin') ? 'Cardiologie' : 'Neurologie'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Service:</span>
                      <span className="font-medium">
                        {user?.name?.includes('Martin') ? 'Cardiologie' : 'Neurologie'}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-4">Statistiques</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-blue-600 mr-2" />
                        <span>Patients suivis</span>
                      </div>
                      <span className="text-lg font-bold text-blue-600">156</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center">
                        <Activity className="w-5 h-5 text-green-600 mr-2" />
                        <span>Consultations/mois</span>
                      </div>
                      <span className="text-lg font-bold text-green-600">87</span>
                    </div>
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

export default DoctorDashboard;
