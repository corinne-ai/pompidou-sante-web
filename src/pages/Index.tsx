
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  Users, 
  Award, 
  Clock, 
  Shield, 
  Stethoscope, 
  CalendarDays,
  Newspaper,
  ArrowRight,
  Phone
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';

const Index = () => {
  const specialties = [
    { name: 'Cardiologie', icon: Heart, description: 'Soins du cœur et des vaisseaux', patients: '15,000+' },
    { name: 'Oncologie', icon: Shield, description: 'Traitement des cancers', patients: '8,500+' },
    { name: 'Neurologie', icon: Stethoscope, description: 'Maladies du système nerveux', patients: '12,000+' },
    { name: 'Urgences', icon: Clock, description: 'Prise en charge 24h/24', patients: '45,000+' },
  ];

  const events = [
    {
      title: 'Campagne de Dépistage du Cancer du Sein',
      date: '15-30 Novembre 2024',
      description: 'Dépistage gratuit pour les femmes de 50-74 ans',
      type: 'Dépistage'
    },
    {
      title: 'Journée Mondiale du Diabète',
      date: '14 Novembre 2024', 
      description: 'Sensibilisation et conseils nutritionnels',
      type: 'Prévention'
    },
    {
      title: 'Formation Premiers Secours',
      date: '20 Novembre 2024',
      description: 'Session ouverte au personnel et familles',
      type: 'Formation'
    }
  ];

  const news = [
    {
      title: 'Nouveau Service de Télémédecine',
      date: '8 Novembre 2024',
      description: 'Consultations à distance pour un meilleur suivi patient',
      category: 'Innovation'
    },
    {
      title: 'Extension du Service de Cardiologie',
      date: '5 Novembre 2024', 
      description: 'Ouverture de 20 nouveaux lits en cardiologie interventionnelle',
      category: 'Services'
    },
    {
      title: 'Prix d\'Excellence en Recherche Médicale',
      date: '1er Novembre 2024',
      description: 'L\'équipe d\'oncologie récompensée pour ses travaux innovants',
      category: 'Recherche'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="hero-pattern bg-gradient-to-br from-blue-50 to-blue-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              <span className="text-primary">Excellence</span> en Soins de Santé
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
              L'Hôpital Georges Pompidou, centre de référence AP-HP, vous accompagne 
              avec des soins de qualité et une technologie de pointe.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/urgences">
                <Button size="lg" className="medical-gradient text-white px-8 py-3">
                  <Phone className="w-5 h-5 mr-2" />
                  Urgences 24h/24
                </Button>
              </Link>
              <Link to="/patients">
                <Button variant="outline" size="lg" className="px-8 py-3">
                  Espace Patient
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">850</div>
              <div className="text-gray-600">Lits d'hospitalisation</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">3,200</div>
              <div className="text-gray-600">Professionnels</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">280,000</div>
              <div className="text-gray-600">Patients/an</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">40</div>
              <div className="text-gray-600">Spécialités</div>
            </div>
          </div>
        </div>
      </section>

      {/* Specialties */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Nos Spécialités d'Excellence
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Des équipes expertes au service de votre santé dans plus de 40 spécialités médicales
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {specialties.map((specialty) => {
              const IconComponent = specialty.icon;
              return (
                <Card key={specialty.name} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 medical-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-lg">{specialty.name}</CardTitle>
                    <CardDescription>{specialty.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="text-2xl font-bold text-primary">{specialty.patients}</div>
                    <div className="text-sm text-gray-500">Patients suivis/an</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Events & News */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Events */}
            <div>
              <div className="flex items-center mb-8">
                <CalendarDays className="w-8 h-8 text-primary mr-3" />
                <h2 className="text-3xl font-bold text-gray-900">
                  Agenda & Événements
                </h2>
              </div>
              
              <div className="space-y-6">
                {events.map((event, index) => (
                  <Card key={index} className="border-l-4 border-l-primary">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{event.title}</CardTitle>
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                          {event.type}
                        </span>
                      </div>
                      <CardDescription className="font-medium text-primary">
                        {event.date}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{event.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* News */}
            <div>
              <div className="flex items-center mb-8">
                <Newspaper className="w-8 h-8 text-primary mr-3" />
                <h2 className="text-3xl font-bold text-gray-900">
                  Actualités
                </h2>
              </div>
              
              <div className="space-y-6">
                {news.map((article, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{article.title}</CardTitle>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {article.category}
                        </span>
                      </div>
                      <CardDescription className="text-gray-500">
                        {article.date}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{article.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
