export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export type UserRole = 'admin' | 'warehouse' | 'mechanic' | 'accountant' | 'viewer';

export interface Warehouse {
  id: string;
  name: string;
  address: string;
  city: string;
  createdAt: Date;
  machineryCount?: number;
  vehicleCount?: number;
  toolCount?: number;
  sparePartCount?: number;
}

export interface Machinery {
  id: string;
  name: string;
  category: string;
  brand: string;
  model: string;
  serialNumber: string;
  year: number;
  hourmeter: number;
  condition: 'excelente' | 'bueno' | 'regular' | 'malo';
  status: 'disponible' | 'alquilado' | 'mantenimiento' | 'fuera_servicio';
  warehouseId: string;
  warehouse?: Warehouse;
  images: string[];
  createdAt: Date;
  lastMaintenance?: Date;
  nextMaintenance?: Date;
  maintenanceIntervalHours?: number;
  maintenanceIntervalDays?: number;
}

export interface Vehicle {
  id: string;
  plate: string;
  brand: string;
  model: string;
  year: number;
  mileage: number;
  status: 'disponible' | 'alquilado' | 'mantenimiento' | 'fuera_servicio';
  soatExpiration: Date;
  technicalReviewExpiration: Date;
  warehouseId: string;
  warehouse?: Warehouse;
  documents: VehicleDocument[];
  createdAt: Date;
}

export interface VehicleDocument {
  id: string;
  type: 'soat' | 'revision_tecnica' | 'tarjeta_propiedad' | 'otros';
  name: string;
  url: string;
  expirationDate?: Date;
  uploadedAt: Date;
}

export interface Tool {
  id: string;
  name: string;
  internalCode: string;
  status: 'disponible' | 'no_disponible';
  observations: string;
  warehouseId: string;
  warehouse?: Warehouse;
  createdAt: Date;
}

export interface SparePart {
  id: string;
  code: string;
  name: string;
  brand: string;
  unitPrice: number;
  stockByWarehouse: Record<string, number>;
  minStock: number;
  compatibleMachinery: string[];
  suppliers: string[];
  createdAt: Date;
}

export interface FuelRecord {
  id: string;
  entityType: 'machinery' | 'vehicle';
  entityId: string;
  entityName: string;
  date: Date;
  liters: number;
  unitCost: number;
  totalCost: number;
  location: string;
  odometer?: number; // For vehicles
  hourmeter?: number; // For machinery
  createdAt: Date;
}

export interface MaintenanceRecord {
  id: string;
  entityType: 'machinery' | 'vehicle';
  entityId: string;
  entityName: string;
  type: 'preventivo' | 'correctivo';
  date: Date;
  description: string;
  technicianName: string;
  laborCost: number;
  spareParts: MaintenanceSparePart[];
  totalCost: number;
  nextMaintenanceDate?: Date;
  nextMaintenanceHours?: number;
  createdAt: Date;
}

export interface MaintenanceSparePart {
  sparePartId: string;
  sparePartName: string;
  quantity: number;
  unitCost: number;
  totalCost: number;
}

export interface Rental {
  id: string;
  clientName: string;
  clientContact: string;
  machineryId: string;
  machineryName: string;
  startDate: Date;
  endDate: Date;
  dailyRate: number;
  totalAmount: number;
  status: 'activo' | 'completado' | 'cancelado';
  description: string;
  checkInPhotos: string[];
  checkOutPhotos: string[];
  createdAt: Date;
}

export interface Alert {
  id: string;
  type: 'maintenance' | 'document' | 'stock' | 'fuel';
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  relatedEntity: string;
  relatedEntityId: string;
  createdAt: Date;
  resolved: boolean;
}

export interface DashboardStats {
  totalMachinery: number;
  availableMachinery: number;
  totalVehicles: number;
  availableVehicles: number;
  totalTools: number;
  availableTools: number;
  criticalAlerts: number;
  monthlyRevenue: number;
  monthlyExpenses: number;
}

export interface FinancialRecord {
  id: string;
  type: 'ingreso' | 'egreso';
  category: string;
  subcategory?: string;
  description: string;
  amount: number;
  date: Date;
  relatedEntity?: string;
  relatedEntityId?: string;
  isRecurring?: boolean;
  createdAt: Date;
}

export interface ExpenseCategory {
  id: string;
  name: string;
  type: 'fijo' | 'variable' | 'inesperado';
  subcategories: string[];
}

export interface MonthlyReport {
  month: string;
  year: number;
  totalIncome: number;
  totalExpenses: number;
  netProfit: number;
  incomeByCategory: Record<string, number>;
  expensesByCategory: Record<string, number>;
  machineryProfitability: Array<{
    machineryId: string;
    machineryName: string;
    income: number;
    expenses: number;
    profit: number;
  }>;
}