
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Calendar, 
  User, 
  Download, 
  Eye,
  Clock,
  Heart,
  Activity
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const PatientDashboard: React.FC = () => {
  const { user } = useAuth();
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);

  const documents = [
    {
      id: '1',
      title: 'Résultats Prise de Sang',
      date: '2024-11-05',
      type: 'Laboratoire',
      status: 'Disponible',
      doctor: 'Dr. Martin'
    },
    {
      id: '2', 
      title: 'IRM Cérébrale',
      date: '2024-10-28',
      type: 'Imagerie',
      status: 'Disponible',
      doctor: 'Dr. Léonie'
    },
    {
      id: '3',
      title: 'Compte-rendu Consultation',
      date: '2024-10-15',
      type: 'Consultation',
      status: 'Disponible', 
      doctor: 'Dr. Martin'
    },
    {
      id: '4',
      title: 'Électrocardiogramme',
      date: '2024-09-30',
      type: 'Cardiologie',
      status: 'En attente',
      doctor: 'Dr. Martin'
    }
  ];

  const appointments = [
    {
      id: '1',
      date: '2024-11-15',
      time: '14:30',
      doctor: 'Dr. Martin',
      specialty: 'Cardiologie',
      type: 'Consultation de suivi'
    },
    {
      id: '2',
      date: '2024-11-28',
      time: '09:00',
      doctor: 'Dr. Léonie',
      specialty: 'Neurologie',
      type: 'Contrôle IRM'
    }
  ];

  const mockDocumentContent = {
    '1': {
      title: 'Résultats Prise de Sang - Bilan Lipidique',
      content: `
LABORATOIRE D'ANALYSES MEDICALES
Hôpital Georges Pompidou

Patient: ${user?.name}
Date: 05/11/2024
Prescripteur: Dr. Martin

BILAN LIPIDIQUE:
- Cholestérol total: 2.10 g/L (N: < 2.00)
- HDL Cholestérol: 0.65 g/L (N: > 0.40)
- LDL Cholestérol: 1.30 g/L (N: < 1.60)
- Triglycérides: 0.85 g/L (N: < 1.50)

COMMENTAIRE:
Légère élévation du cholestérol total. 
Rapport HDL/LDL satisfaisant.
Conseils diététiques recommandés.

Dr. MARTIN - Service de Cardiologie
      `
    },
    '2': {
      title: 'IRM Cérébrale - Compte Rendu',
      content: `
SERVICE D'IMAGERIE MEDICALE
Hôpital Georges Pompidou

Patient: ${user?.name}
Date: 28/10/2024
Indication: Céphalées récurrentes

TECHNIQUE:
IRM encéphalique sans et avec injection de gadolinium

RESULTATS:
- Pas d'anomalie de signal parenchymateuse
- Structures médianes en place
- Système ventriculaire de taille normale
- Pas de prise de contraste pathologique

CONCLUSION:
IRM cérébrale normale.
Pas d'anomalie décelable à l'IRM.

Dr. LEONIE - Service de Neurologie
      `
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Espace Patient</h1>
          <p className="text-gray-600">Bienvenue, {user?.name}</p>
        </div>
        <div className="flex items-center space-x-2">
          <User className="w-8 h-8 text-primary" />
          <div>
            <p className="font-medium">{user?.name}</p>
            <p className="text-sm text-gray-500">Patient</p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="documents" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="documents">Mes Documents</TabsTrigger>
          <TabsTrigger value="appointments">Rendez-vous</TabsTrigger>
          <TabsTrigger value="profile">Mon Profil</TabsTrigger>
        </TabsList>

        <TabsContent value="documents" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Documents Médicaux
              </CardTitle>
              <CardDescription>
                Accédez à vos résultats d'examens et comptes-rendus
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  {documents.map((doc) => (
                    <Card key={doc.id} className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium">{doc.title}</h3>
                          <Badge variant={doc.status === 'Disponible' ? 'default' : 'secondary'}>
                            {doc.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{doc.type} - {doc.doctor}</p>
                        <p className="text-sm text-gray-500 mb-3">{doc.date}</p>
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => setSelectedDoc(doc.id)}
                            disabled={doc.status !== 'Disponible'}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            Consulter
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            disabled={doc.status !== 'Disponible'}
                          >
                            <Download className="w-4 h-4 mr-1" />
                            Télécharger
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {selectedDoc && mockDocumentContent[selectedDoc as keyof typeof mockDocumentContent] && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        {mockDocumentContent[selectedDoc as keyof typeof mockDocumentContent].title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <pre className="whitespace-pre-wrap text-sm font-mono bg-gray-50 p-4 rounded-lg">
                        {mockDocumentContent[selectedDoc as keyof typeof mockDocumentContent].content}
                      </pre>
                    </CardContent>
                  </Card>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appointments">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Mes Rendez-vous
              </CardTitle>
              <CardDescription>
                Consultez vos prochains rendez-vous médicaux
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {appointments.map((apt) => (
                  <Card key={apt.id} className="border-l-4 border-l-primary">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-lg">{apt.type}</h3>
                          <p className="text-gray-600">{apt.doctor} - {apt.specialty}</p>
                          <div className="flex items-center text-sm text-gray-500 mt-2">
                            <Calendar className="w-4 h-4 mr-1" />
                            {apt.date}
                            <Clock className="w-4 h-4 mr-1 ml-4" />
                            {apt.time}
                          </div>
                        </div>
                        <Badge variant="outline">Confirmé</Badge>
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
                Mon Profil Patient
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-4">Informations Personnelles</h3>
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
                      <span className="text-gray-600">Date de naissance:</span>
                      <span className="font-medium">{user?.dateOfBirth}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Numéro patient:</span>
                      <span className="font-medium">PAT-{user?.id?.padStart(6, '0')}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-4">Suivi Médical</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center">
                        <Heart className="w-5 h-5 text-blue-600 mr-2" />
                        <span>Cardiologie</span>
                      </div>
                      <span className="text-sm text-blue-600">Dr. Martin</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center">
                        <Activity className="w-5 h-5 text-green-600 mr-2" />
                        <span>Neurologie</span>
                      </div>
                      <span className="text-sm text-green-600">Dr. Léonie</span>
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

export default PatientDashboard;
