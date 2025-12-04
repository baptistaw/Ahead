import Link from 'next/link';
import {
  Plus,
  Search,
  MoreHorizontal,
  ChevronRight,
  Phone,
  Mail,
  Calendar,
} from 'lucide-react';

// Mock data - será reemplazado con datos reales de la API
const pacientes = [
  {
    id: '1',
    nombres: 'María',
    apellidos: 'García Rodríguez',
    documentoTipo: 'CI',
    documentoNumero: '4.521.789-3',
    fechaNacimiento: '1958-05-12',
    edad: 65,
    sexo: 'F',
    telefonoPrincipal: '099 123 456',
    email: 'maria.garcia@email.com',
    episodiosActivos: 1,
    ultimoEpisodio: 'EP-2024-001',
  },
  {
    id: '2',
    nombres: 'Juan',
    apellidos: 'Rodríguez López',
    documentoTipo: 'CI',
    documentoNumero: '3.456.123-7',
    fechaNacimiento: '1962-08-23',
    edad: 61,
    sexo: 'M',
    telefonoPrincipal: '098 765 432',
    email: 'juan.rodriguez@email.com',
    episodiosActivos: 1,
    ultimoEpisodio: 'EP-2024-002',
  },
  {
    id: '3',
    nombres: 'Ana',
    apellidos: 'Martínez Fernández',
    documentoTipo: 'CI',
    documentoNumero: '2.789.456-1',
    fechaNacimiento: '1970-11-30',
    edad: 53,
    sexo: 'F',
    telefonoPrincipal: '091 234 567',
    email: 'ana.martinez@email.com',
    episodiosActivos: 1,
    ultimoEpisodio: 'EP-2024-003',
  },
  {
    id: '4',
    nombres: 'Carlos',
    apellidos: 'López Sánchez',
    documentoTipo: 'CI',
    documentoNumero: '5.123.789-2',
    fechaNacimiento: '1955-02-18',
    edad: 68,
    sexo: 'M',
    telefonoPrincipal: '094 567 890',
    email: null,
    episodiosActivos: 1,
    ultimoEpisodio: 'EP-2024-004',
  },
  {
    id: '5',
    nombres: 'Laura',
    apellidos: 'Sánchez Pérez',
    documentoTipo: 'CI',
    documentoNumero: '4.987.321-5',
    fechaNacimiento: '1968-07-05',
    edad: 55,
    sexo: 'F',
    telefonoPrincipal: '092 345 678',
    email: 'laura.sanchez@email.com',
    episodiosActivos: 1,
    ultimoEpisodio: 'EP-2024-005',
  },
];

function getInitials(nombres: string, apellidos: string) {
  return `${nombres.charAt(0)}${apellidos.charAt(0)}`.toUpperCase();
}

export default function PacientesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-ahead-primary">Pacientes</h1>
          <p className="text-ahead-text">Registro de pacientes del programa</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-ahead-primary px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-ahead-primary/90">
          <Plus className="h-4 w-4" />
          Nuevo Paciente
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por nombre, documento, teléfono..."
            className="h-10 w-full rounded-lg border border-ahead-muted bg-white pl-10 pr-4 text-sm focus:border-ahead-secondary focus:outline-none focus:ring-1 focus:ring-ahead-secondary"
          />
        </div>
      </div>

      {/* Grid de pacientes */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {pacientes.map((paciente) => (
          <div
            key={paciente.id}
            className="rounded-xl border border-ahead-muted bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-ahead-primary text-lg font-semibold text-white">
                  {getInitials(paciente.nombres, paciente.apellidos)}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {paciente.nombres} {paciente.apellidos}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {paciente.documentoTipo} {paciente.documentoNumero}
                  </p>
                </div>
              </div>
              <button className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                <MoreHorizontal className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span>{paciente.edad} años</span>
                <span className="text-gray-300">|</span>
                <span>{paciente.sexo === 'M' ? 'Masculino' : 'Femenino'}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="h-4 w-4 text-gray-400" />
                <span>{paciente.telefonoPrincipal}</span>
              </div>
              {paciente.email && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span className="truncate">{paciente.email}</span>
                </div>
              )}
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
              <div>
                <p className="text-xs text-gray-500">Episodio activo</p>
                <Link
                  href={`/episodios/${paciente.ultimoEpisodio}`}
                  className="text-sm font-medium text-ahead-primary hover:underline"
                >
                  {paciente.ultimoEpisodio}
                </Link>
              </div>
              <Link
                href={`/pacientes/${paciente.id}`}
                className="flex items-center gap-1 text-sm font-medium text-ahead-secondary hover:text-ahead-secondary/80"
              >
                Ver perfil
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Mostrando <span className="font-medium">1</span> a{' '}
          <span className="font-medium">{pacientes.length}</span> de{' '}
          <span className="font-medium">{pacientes.length}</span> pacientes
        </p>
        <div className="flex gap-2">
          <button
            className="rounded-lg border border-ahead-muted px-4 py-2 text-sm text-gray-500"
            disabled
          >
            Anterior
          </button>
          <button
            className="rounded-lg border border-ahead-muted px-4 py-2 text-sm text-gray-500"
            disabled
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}
