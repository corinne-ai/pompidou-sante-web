
import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

const Footer: React.FC = () => {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const services = [
    { name: 'Cardiologie', phone: '01 56 09 20 30', extension: '2030' },
    { name: 'Oncologie', phone: '01 56 09 20 31', extension: '2031' },
    { name: 'Neurologie', phone: '01 56 09 20 32', extension: '2032' },
    { name: 'Orthopédie', phone: '01 56 09 20 33', extension: '2033' },
    { name: 'Pédiatrie', phone: '01 56 09 20 34', extension: '2034' },
    { name: 'Urgences', phone: '01 56 09 20 15', extension: '15' },
    { name: 'Laboratoire', phone: '01 56 09 20 35', extension: '2035' },
    { name: 'Radiologie', phone: '01 56 09 20 36', extension: '2036' },
    { name: 'Maladies Infectieuses', phone: '01 56 09 20 37', extension: '2037' },
    { name: 'Gastro-entérologie', phone: '01 56 09 20 38', extension: '2038' },
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message envoyé",
      description: "Nous vous répondrons dans les plus brefs délais.",
    });
    setContactForm({ name: '', email: '', phone: '', message: '' });
  };

  const handleInputChange = (field: string, value: string) => {
    setContactForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <footer className="bg-gray-50 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Services Directory */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Contacts des Services
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {services.map((service) => (
              <Card key={service.name} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-sm mb-2 text-gray-800">{service.name}</h4>
                  <div className="flex items-center text-xs text-gray-600 mb-1">
                    <Phone className="w-3 h-3 mr-1" />
                    <a href={`tel:${service.phone}`} className="hover:text-primary">
                      {service.phone}
                    </a>
                  </div>
                  <div className="text-xs text-gray-500">
                    Poste: {service.extension}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div className="mb-12">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-center">Nous Contacter</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Input
                      placeholder="Nom complet"
                      value={contactForm.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      placeholder="Email"
                      value={contactForm.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                    />
                  </div>
                </div>
                <Input
                  type="tel"
                  placeholder="Téléphone"
                  value={contactForm.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
                <Textarea
                  placeholder="Votre message..."
                  value={contactForm.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  rows={4}
                  required
                />
                <Button type="submit" className="w-full medical-gradient text-white">
                  <Send className="w-4 h-4 mr-2" />
                  Envoyer le message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Hospital Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="text-center md:text-left">
            <h4 className="font-semibold text-gray-900 mb-4">Informations</h4>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-center justify-center md:justify-start">
                <MapPin className="w-4 h-4 mr-2 text-primary" />
                <span>20 Rue Leblanc, 75015 Paris</span>
              </div>
              <div className="flex items-center justify-center md:justify-start">
                <Phone className="w-4 h-4 mr-2 text-primary" />
                <span>01 56 09 20 00</span>
              </div>
              <div className="flex items-center justify-center md:justify-start">
                <Mail className="w-4 h-4 mr-2 text-primary" />
                <span>contact@pompidou.fr</span>
              </div>
            </div>
          </div>

          <div className="text-center md:text-left">
            <h4 className="font-semibold text-gray-900 mb-4">Horaires</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center justify-center md:justify-start">
                <Clock className="w-4 h-4 mr-2 text-primary" />
                <div>
                  <p>Urgences: 24h/24</p>
                  <p>Consultations: 8h-18h</p>
                  <p>Standard: 8h-20h</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center md:text-left">
            <h4 className="font-semibold text-gray-900 mb-4">Urgences</h4>
            <div className="space-y-2 text-sm">
              <div className="bg-red-50 p-3 rounded-lg">
                <p className="font-semibold text-red-800">Urgences Vitales</p>
                <p className="text-red-700">15 (SAMU)</p>
                <p className="text-red-700">18 (Pompiers)</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="font-semibold text-blue-800">Urgences Hôpital</p>
                <p className="text-blue-700">01 56 09 20 15</p>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 pt-6 text-center text-sm text-gray-500">
          <p>&copy; 2024 Hôpital Georges Pompidou. Tous droits réservés.</p>
          <p className="mt-1">Centre Hospitalier de Référence - AP-HP</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
