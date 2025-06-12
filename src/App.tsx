import React, { useState } from 'react';
import { AuthProvider, useAuth } from './hooks/useAuth';
import { LoginForm } from './components/Auth/LoginForm';
import { Layout } from './components/Layout/Layout';
import { Dashboard } from './components/Dashboard/Dashboard';
import { MachineryList } from './components/Machinery/MachineryList';
import { VehicleList } from './components/Vehicles/VehicleList';
import { WarehouseList } from './components/Warehouses/WarehouseList';
import { FuelManagement } from './components/Fuel/FuelManagement';
import { ToolList } from './components/Tools/ToolList';
import { SparePartList } from './components/SpareParts/SparePartList';
import { AlertsManagement } from './components/Alerts/AlertsManagement';
import { ReportsManagement } from './components/Reports/ReportsManagement';
import { FinanceManagement } from './components/Finance/FinanceManagement';

function AppContent() {
  const { user, isLoading } = useAuth();
  const [currentPage, setCurrentPage] = useState('dashboard');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'warehouses':
        return <WarehouseList />;
      case 'machinery':
        return <MachineryList />;
      case 'vehicles':
        return <VehicleList />;
      case 'fuel':
        return <FuelManagement />;
      case 'tools':
        return <ToolList />;
      case 'spareparts':
        return <SparePartList />;
      case 'alerts':
        return <AlertsManagement />;
      case 'reports':
        return <ReportsManagement />;
      case 'finance':
        return <FinanceManagement />;
      case 'users':
        return (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-gray-900">Usuarios</h2>
            <p className="text-gray-600 mt-2">Módulo en desarrollo</p>
          </div>
        );
      case 'settings':
        return (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-gray-900">Configuración</h2>
            <p className="text-gray-600 mt-2">Módulo en desarrollo</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout currentPage={currentPage} onPageChange={setCurrentPage}>
      {renderPage()}
    </Layout>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;