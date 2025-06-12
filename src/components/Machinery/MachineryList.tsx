import React, { useState } from 'react';
import { Search, Filter, Plus, Eye, Edit, Wrench } from 'lucide-react';
import { Machinery } from '../../types';
import { useData } from '../../hooks/useData';
import { MachineryForm } from '../Forms/MachineryForm';

const statusColors = {
  disponible: 'bg-green-100 text-green-800',
  alquilado: 'bg-blue-100 text-blue-800',
  mantenimiento: 'bg-yellow-100 text-yellow-800',
  fuera_servicio: 'bg-red-100 text-red-800'
};

const statusLabels = {
  disponible: 'Disponible',
  alquilado: 'Alquilado',
  mantenimiento: 'Mantenimiento',
  fuera_servicio: 'Fuera de Servicio'
};

const conditionColors = {
  excelente: 'bg-green-100 text-green-800',
  bueno: 'bg-blue-100 text-blue-800',
  regular: 'bg-yellow-100 text-yellow-800',
  malo: 'bg-red-100 text-red-800'
};

const conditionLabels = {
  excelente: 'Excelente',
  bueno: 'Bueno',
  regular: 'Regular',
  malo: 'Malo'
};

export const MachineryList: React.FC = () => {
  const { machinery, warehouses } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showForm, setShowForm] = useState(false);
  const [selectedMachinery, setSelectedMachinery] = useState<Machinery | undefined>();

  const filteredMachinery = machinery.filter(machine => {
    const matchesSearch = machine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         machine.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         machine.model.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || machine.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getWarehouseName = (warehouseId: string) => {
    const warehouse = warehouses.find(w => w.id === warehouseId);
    return warehouse?.name || 'N/A';
  };

  const handleSave = (machineryData: Partial<Machinery>) => {
    console.log('Saving machinery:', machineryData);
    // In real app, save to backend
    setShowForm(false);
    setSelectedMachinery(undefined);
  };

  const handleEdit = (machinery: Machinery) => {
    setSelectedMachinery(machinery);
    setShowForm(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Maquinaria</h1>
          <p className="text-gray-600 mt-1">Gestión de maquinaria pesada</p>
        </div>
        <button 
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Nueva Maquinaria</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Buscar por nombre, marca o modelo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Todos los estados</option>
              <option value="disponible">Disponible</option>
              <option value="alquilado">Alquilado</option>
              <option value="mantenimiento">Mantenimiento</option>
              <option value="fuera_servicio">Fuera de Servicio</option>
            </select>
            <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              <span>Filtros</span>
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Maquinaria
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Marca/Modelo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Horómetro
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Condición
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Almacén
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Próximo Mantenimiento
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredMachinery.map((machine) => (
                <tr key={machine.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                        {machine.images[0] ? (
                          <img
                            src={machine.images[0]}
                            alt={machine.name}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <div className="w-6 h-6 bg-gray-400 rounded"></div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{machine.name}</div>
                        <div className="text-sm text-gray-500">{machine.category}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{machine.brand}</div>
                    <div className="text-sm text-gray-500">{machine.model}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {machine.hourmeter.toLocaleString()} hrs
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${conditionColors[machine.condition]}`}>
                      {conditionLabels[machine.condition]}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColors[machine.status]}`}>
                      {statusLabels[machine.status]}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {getWarehouseName(machine.warehouseId)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {machine.nextMaintenance ? machine.nextMaintenance.toLocaleDateString() : 'No programado'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center space-x-2 justify-end">
                      <button className="text-blue-600 hover:text-blue-900 p-1 rounded">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleEdit(machine)}
                        className="text-gray-600 hover:text-gray-900 p-1 rounded"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900 p-1 rounded">
                        <Wrench className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredMachinery.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500">No se encontraron resultados</div>
          </div>
        )}
      </div>

      {showForm && (
        <MachineryForm
          machinery={selectedMachinery}
          warehouses={warehouses}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setSelectedMachinery(undefined);
          }}
        />
      )}
    </div>
  );
};