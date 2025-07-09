
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import PatientDashboard from '@/components/Dashboard/PatientDashboard';
import DoctorDashboard from '@/components/Dashboard/DoctorDashboard';
import SecretaryDashboard from '@/components/Dashboard/SecretaryDashboard';
import AdminDashboard from '@/components/Dashboard/AdminDashboard';

const Dashboard: React.FC = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return <Navigate to="/" replace />;
  }

  const renderDashboard = () => {
    switch (user.role) {
      case 'patient':
        return <PatientDashboard />;
      case 'doctor':
        return <DoctorDashboard />;
      case 'secretary':
        return <SecretaryDashboard />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <div>Rôle utilisateur non reconnu</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderDashboard()}
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
