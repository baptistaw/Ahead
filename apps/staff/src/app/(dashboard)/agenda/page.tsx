'use client';

import { useState } from 'react';
import {
  Plus,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Video,
  User,
} from 'lucide-react';

// Mock data - será reemplazado con datos reales de la API
const citasHoy = [
  {
    id: '1',
    hora: '09:00',
    horaFin: '09:45',
    paciente: 'María García',
    tipo: 'Evaluación Anestesia',
    modalidad: 'PRESENCIAL',
    ubicacion: 'Consultorio 1',
    estado: 'CONFIRMADA',
    episodio: 'EP-2024-001',
  },
  {
    id: '2',
    hora: '10:00',
    horaFin: '10:30',
    paciente: 'Juan Rodríguez',
    tipo: 'Control Nutrición',
    modalidad: 'TELEMEDICINA',
    ubicacion: null,
    estado: 'PROGRAMADA',
    episodio: 'EP-2024-002',
  },
  {
    id: '3',
    hora: '11:00',
    horaFin: '11:45',
    paciente: 'Ana Martínez',
    tipo: 'Kinesiología',
    modalidad: 'PRESENCIAL',
    ubicacion: 'Sala de Ejercicios',
    estado: 'CONFIRMADA',
    episodio: 'EP-2024-003',
  },
  {
    id: '4',
    hora: '14:00',
    horaFin: '14:30',
    paciente: 'Carlos López',
    tipo: 'Psicología',
    modalidad: 'TELEMEDICINA',
    ubicacion: null,
    estado: 'PROGRAMADA',
    episodio: 'EP-2024-004',
  },
  {
    id: '5',
    hora: '15:30',
    horaFin: '16:15',
    paciente: 'Laura Sánchez',
    tipo: 'Evaluación Inicial',
    modalidad: 'PRESENCIAL',
    ubicacion: 'Consultorio 2',
    estado: 'PROGRAMADA',
    episodio: 'EP-2024-005',
  },
];

const diasSemana = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

function EstadoBadge({ estado }: { estado: string }) {
  const colors: Record<string, string> = {
    PROGRAMADA: 'bg-blue-100 text-blue-700',
    CONFIRMADA: 'bg-green-100 text-green-700',
    EN_CURSO: 'bg-yellow-100 text-yellow-700',
    COMPLETADA: 'bg-gray-100 text-gray-700',
    CANCELADA: 'bg-red-100 text-red-700',
  };

  const labels: Record<string, string> = {
    PROGRAMADA: 'Programada',
    CONFIRMADA: 'Confirmada',
    EN_CURSO: 'En curso',
    COMPLETADA: 'Completada',
    CANCELADA: 'Cancelada',
  };

  return (
    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${colors[estado]}`}>
      {labels[estado]}
    </span>
  );
}

export default function AgendaPage() {
  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());

  const formatFecha = (fecha: Date) => {
    return fecha.toLocaleDateString('es-UY', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const getDiasSemana = () => {
    const dias = [];
    const inicio = new Date(fechaSeleccionada);
    inicio.setDate(inicio.getDate() - inicio.getDay());

    for (let i = 0; i < 7; i++) {
      const dia = new Date(inicio);
      dia.setDate(inicio.getDate() + i);
      dias.push(dia);
    }
    return dias;
  };

  const esHoy = (fecha: Date) => {
    const hoy = new Date();
    return fecha.toDateString() === hoy.toDateString();
  };

  const esFechaSeleccionada = (fecha: Date) => {
    return fecha.toDateString() === fechaSeleccionada.toDateString();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-ahead-primary">Agenda</h1>
          <p className="text-ahead-text capitalize">{formatFecha(fechaSeleccionada)}</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-ahead-primary px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-ahead-primary/90">
          <Plus className="h-4 w-4" />
          Nueva Cita
        </button>
      </div>

      {/* Navegación de semana */}
      <div className="rounded-xl border border-ahead-muted bg-white p-4 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <button
            onClick={() => {
              const nueva = new Date(fechaSeleccionada);
              nueva.setDate(nueva.getDate() - 7);
              setFechaSeleccionada(nueva);
            }}
            className="rounded-lg p-2 hover:bg-gray-100"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </button>
          <button
            onClick={() => setFechaSeleccionada(new Date())}
            className="rounded-lg px-4 py-2 text-sm font-medium text-ahead-primary hover:bg-ahead-light"
          >
            Hoy
          </button>
          <button
            onClick={() => {
              const nueva = new Date(fechaSeleccionada);
              nueva.setDate(nueva.getDate() + 7);
              setFechaSeleccionada(nueva);
            }}
            className="rounded-lg p-2 hover:bg-gray-100"
          >
            <ChevronRight className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {getDiasSemana().map((dia, index) => (
            <button
              key={index}
              onClick={() => setFechaSeleccionada(dia)}
              className={`flex flex-col items-center rounded-lg p-3 transition-colors ${
                esFechaSeleccionada(dia)
                  ? 'bg-ahead-primary text-white'
                  : esHoy(dia)
                    ? 'bg-ahead-secondary/20 text-ahead-secondary'
                    : 'hover:bg-gray-100'
              }`}
            >
              <span className="text-xs font-medium">{diasSemana[dia.getDay()]}</span>
              <span className="mt-1 text-lg font-semibold">{dia.getDate()}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Lista de citas del día */}
      <div className="rounded-xl border border-ahead-muted bg-white shadow-sm">
        <div className="border-b border-gray-100 px-6 py-4">
          <h2 className="font-semibold text-gray-900">
            Citas del día ({citasHoy.length})
          </h2>
        </div>

        <div className="divide-y divide-gray-100">
          {citasHoy.map((cita) => (
            <div
              key={cita.id}
              className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50"
            >
              {/* Hora */}
              <div className="w-20 shrink-0">
                <p className="font-semibold text-gray-900">{cita.hora}</p>
                <p className="text-sm text-gray-500">{cita.horaFin}</p>
              </div>

              {/* Indicador de modalidad */}
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                  cita.modalidad === 'TELEMEDICINA'
                    ? 'bg-purple-100 text-purple-600'
                    : 'bg-ahead-secondary/20 text-ahead-secondary'
                }`}
              >
                {cita.modalidad === 'TELEMEDICINA' ? (
                  <Video className="h-5 w-5" />
                ) : (
                  <MapPin className="h-5 w-5" />
                )}
              </div>

              {/* Info de la cita */}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-gray-900">{cita.paciente}</h3>
                  <EstadoBadge estado={cita.estado} />
                </div>
                <p className="text-sm text-gray-600">{cita.tipo}</p>
                <div className="mt-1 flex items-center gap-4 text-xs text-gray-500">
                  {cita.ubicacion && (
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {cita.ubicacion}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    45 min
                  </span>
                </div>
              </div>

              {/* Episodio */}
              <div className="text-right">
                <p className="text-sm font-medium text-ahead-primary">{cita.episodio}</p>
              </div>

              {/* Acciones */}
              <div className="flex gap-2">
                {cita.modalidad === 'TELEMEDICINA' && (
                  <button className="rounded-lg bg-purple-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-purple-700">
                    Iniciar
                  </button>
                )}
                <button className="rounded-lg border border-ahead-muted px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-50">
                  Ver
                </button>
              </div>
            </div>
          ))}
        </div>

        {citasHoy.length === 0 && (
          <div className="px-6 py-12 text-center">
            <User className="mx-auto h-12 w-12 text-gray-300" />
            <p className="mt-4 text-gray-500">No hay citas programadas para este día</p>
          </div>
        )}
      </div>
    </div>
  );
}
