import { auth } from '@clerk/nextjs/server';
import {
  Users,
  Calendar,
  ClipboardList,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react';

// Mock data - will be replaced with real data from API
const stats = [
  {
    name: 'Episodios Activos',
    value: '12',
    change: '+2 esta semana',
    icon: ClipboardList,
    color: 'bg-blue-500',
  },
  {
    name: 'Pacientes en Programa',
    value: '28',
    change: '+5 este mes',
    icon: Users,
    color: 'bg-green-500',
  },
  {
    name: 'Citas Hoy',
    value: '8',
    change: '3 telemedicina',
    icon: Calendar,
    color: 'bg-purple-500',
  },
  {
    name: 'Tasa de Éxito',
    value: '94%',
    change: '+2% vs mes anterior',
    icon: TrendingUp,
    color: 'bg-ahead-secondary',
  },
];

const proximasCitas = [
  {
    id: 1,
    paciente: 'María García',
    tipo: 'Evaluación Anestesia',
    hora: '09:00',
    modalidad: 'Presencial',
  },
  {
    id: 2,
    paciente: 'Juan Rodríguez',
    tipo: 'Control Nutrición',
    hora: '10:30',
    modalidad: 'Telemedicina',
  },
  {
    id: 3,
    paciente: 'Ana Martínez',
    tipo: 'Kinesiología',
    hora: '11:00',
    modalidad: 'Presencial',
  },
  {
    id: 4,
    paciente: 'Carlos López',
    tipo: 'Psicología',
    hora: '14:00',
    modalidad: 'Telemedicina',
  },
];

const alertas = [
  {
    id: 1,
    tipo: 'warning',
    mensaje: 'María García - SpO2 bajo 92% (última medición)',
    tiempo: 'Hace 2 horas',
  },
  {
    id: 2,
    tipo: 'info',
    mensaje: 'Juan Rodríguez completó formulario de seguimiento',
    tiempo: 'Hace 4 horas',
  },
  {
    id: 3,
    tipo: 'success',
    mensaje: 'Ana Martínez alcanzó meta de 8000 pasos',
    tiempo: 'Ayer',
  },
];

export default async function DashboardPage() {
  const { userId } = await auth();

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Resumen de actividad clínica</p>
      </div>

      {/* Stats grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="rounded-xl bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className={`rounded-lg ${stat.color} p-3`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.change}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Two column layout */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Próximas citas */}
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Próximas Citas</h2>
            <a href="/agenda" className="text-sm text-ahead-primary hover:underline">
              Ver todas
            </a>
          </div>
          <div className="space-y-4">
            {proximasCitas.map((cita) => (
              <div
                key={cita.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div>
                  <p className="font-medium text-gray-900">{cita.paciente}</p>
                  <p className="text-sm text-gray-600">{cita.tipo}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">{cita.hora}</p>
                  <span
                    className={`inline-block rounded-full px-2 py-0.5 text-xs ${
                      cita.modalidad === 'Telemedicina'
                        ? 'bg-purple-100 text-purple-700'
                        : 'bg-green-100 text-green-700'
                    }`}
                  >
                    {cita.modalidad}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alertas y notificaciones */}
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Alertas Recientes</h2>
            <a href="/monitoreo" className="text-sm text-ahead-primary hover:underline">
              Ver todas
            </a>
          </div>
          <div className="space-y-4">
            {alertas.map((alerta) => (
              <div key={alerta.id} className="flex items-start gap-3 rounded-lg border p-4">
                {alerta.tipo === 'warning' && (
                  <AlertTriangle className="h-5 w-5 shrink-0 text-yellow-500" />
                )}
                {alerta.tipo === 'success' && (
                  <CheckCircle className="h-5 w-5 shrink-0 text-green-500" />
                )}
                {alerta.tipo === 'info' && (
                  <ClipboardList className="h-5 w-5 shrink-0 text-blue-500" />
                )}
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{alerta.mensaje}</p>
                  <p className="text-xs text-gray-500">{alerta.tiempo}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Semáforo de pacientes */}
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          Estado de Preparación Quirúrgica
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg bg-green-50 p-4">
            <div className="flex items-center gap-3">
              <div className="h-4 w-4 rounded-full bg-semaforo-verde" />
              <span className="font-medium text-green-800">Verde - Preparados</span>
            </div>
            <p className="mt-2 text-3xl font-bold text-green-900">18</p>
            <p className="text-sm text-green-700">Listos para cirugía</p>
          </div>
          <div className="rounded-lg bg-yellow-50 p-4">
            <div className="flex items-center gap-3">
              <div className="h-4 w-4 rounded-full bg-semaforo-ambar" />
              <span className="font-medium text-yellow-800">Ámbar - Precaución</span>
            </div>
            <p className="mt-2 text-3xl font-bold text-yellow-900">7</p>
            <p className="text-sm text-yellow-700">Requieren optimización</p>
          </div>
          <div className="rounded-lg bg-red-50 p-4">
            <div className="flex items-center gap-3">
              <div className="h-4 w-4 rounded-full bg-semaforo-rojo" />
              <span className="font-medium text-red-800">Rojo - No aptos</span>
            </div>
            <p className="mt-2 text-3xl font-bold text-red-900">3</p>
            <p className="text-sm text-red-700">Cirugía diferida</p>
          </div>
        </div>
      </div>
    </div>
  );
}
