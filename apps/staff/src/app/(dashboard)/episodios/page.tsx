import Link from 'next/link';
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  ChevronRight,
} from 'lucide-react';

// Mock data - será reemplazado con datos reales de la API
const episodios = [
  {
    id: '1',
    codigo: 'EP-2024-001',
    paciente: { nombre: 'María García', documento: '4.521.789-3' },
    producto: 'Programa Estándar',
    fase: 'F2',
    estado: 'EN_INTERVENCION',
    semaforo: null,
    fechaCirugia: '2024-02-15',
    cirujano: 'Dr. Pérez',
    diasRestantes: 45,
  },
  {
    id: '2',
    codigo: 'EP-2024-002',
    paciente: { nombre: 'Juan Rodríguez', documento: '3.456.123-7' },
    producto: 'Programa FAST',
    fase: 'F3',
    estado: 'EN_REEVALUACION',
    semaforo: 'VERDE',
    fechaCirugia: '2024-01-28',
    cirujano: 'Dra. López',
    diasRestantes: 12,
  },
  {
    id: '3',
    codigo: 'EP-2024-003',
    paciente: { nombre: 'Ana Martínez', documento: '2.789.456-1' },
    producto: 'Programa Estándar',
    fase: 'F1',
    estado: 'EN_EVALUACION',
    semaforo: null,
    fechaCirugia: '2024-03-10',
    cirujano: 'Dr. González',
    diasRestantes: 68,
  },
  {
    id: '4',
    codigo: 'EP-2024-004',
    paciente: { nombre: 'Carlos López', documento: '5.123.789-2' },
    producto: 'Solo Evaluación',
    fase: 'F3',
    estado: 'SEMAFORO_EMITIDO',
    semaforo: 'AMBAR',
    fechaCirugia: '2024-02-05',
    cirujano: 'Dr. Fernández',
    diasRestantes: 20,
  },
  {
    id: '5',
    codigo: 'EP-2024-005',
    paciente: { nombre: 'Laura Sánchez', documento: '4.987.321-5' },
    producto: 'Programa Estándar',
    fase: 'F0',
    estado: 'DERIVADO',
    semaforo: null,
    fechaCirugia: null,
    cirujano: 'Dra. Martínez',
    diasRestantes: null,
  },
];

const faseLabels: Record<string, string> = {
  F0: 'Derivación',
  F1: 'Evaluación',
  F2: 'Intervención',
  F3: 'Reevaluación',
  F4: 'Postoperatorio',
};

const estadoLabels: Record<string, string> = {
  DERIVADO: 'Derivado',
  CONTACTADO: 'Contactado',
  ACEPTADO: 'Aceptado',
  EN_EVALUACION: 'En Evaluación',
  EN_INTERVENCION: 'En Intervención',
  EN_REEVALUACION: 'En Reevaluación',
  SEMAFORO_EMITIDO: 'Semáforo Emitido',
  EN_POSTOP: 'En Postop',
  COMPLETADO: 'Completado',
};

function SemaforoBadge({ semaforo }: { semaforo: string | null }) {
  if (!semaforo) return <span className="text-gray-400">-</span>;

  const colors = {
    VERDE: 'bg-semaforo-verde',
    AMBAR: 'bg-semaforo-ambar',
    ROJO: 'bg-semaforo-rojo',
  };

  return (
    <span
      className={`inline-block h-4 w-4 rounded-full ${colors[semaforo as keyof typeof colors]}`}
      title={semaforo}
    />
  );
}

function FaseBadge({ fase }: { fase: string }) {
  const colors: Record<string, string> = {
    F0: 'bg-gray-100 text-gray-700',
    F1: 'bg-blue-100 text-blue-700',
    F2: 'bg-ahead-secondary/20 text-ahead-secondary',
    F3: 'bg-purple-100 text-purple-700',
    F4: 'bg-ahead-accent/20 text-ahead-accent',
  };

  return (
    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${colors[fase]}`}>
      {faseLabels[fase]}
    </span>
  );
}

export default function EpisodiosPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-ahead-primary">
            Episodios Clínicos
          </h1>
          <p className="text-ahead-text">Gestión de episodios de prehabilitación</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-ahead-primary px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-ahead-primary/90">
          <Plus className="h-4 w-4" />
          Nuevo Episodio
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por paciente, código, cirujano..."
            className="h-10 w-full rounded-lg border border-ahead-muted bg-white pl-10 pr-4 text-sm focus:border-ahead-secondary focus:outline-none focus:ring-1 focus:ring-ahead-secondary"
          />
        </div>
        <select className="h-10 rounded-lg border border-ahead-muted bg-white px-4 text-sm focus:border-ahead-secondary focus:outline-none">
          <option value="">Todas las fases</option>
          <option value="F0">F0 - Derivación</option>
          <option value="F1">F1 - Evaluación</option>
          <option value="F2">F2 - Intervención</option>
          <option value="F3">F3 - Reevaluación</option>
          <option value="F4">F4 - Postoperatorio</option>
        </select>
        <select className="h-10 rounded-lg border border-ahead-muted bg-white px-4 text-sm focus:border-ahead-secondary focus:outline-none">
          <option value="">Todos los estados</option>
          <option value="DERIVADO">Derivado</option>
          <option value="EN_EVALUACION">En Evaluación</option>
          <option value="EN_INTERVENCION">En Intervención</option>
          <option value="SEMAFORO_EMITIDO">Semáforo Emitido</option>
        </select>
        <button className="flex h-10 items-center gap-2 rounded-lg border border-ahead-muted bg-white px-4 text-sm text-ahead-text hover:bg-gray-50">
          <Filter className="h-4 w-4" />
          Más filtros
        </button>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-ahead-muted bg-white shadow-sm">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-ahead-text">
                Código
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-ahead-text">
                Paciente
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-ahead-text">
                Producto
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-ahead-text">
                Fase
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-ahead-text">
                Estado
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-ahead-text">
                Semáforo
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-ahead-text">
                Cirugía
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-ahead-text">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {episodios.map((episodio) => (
              <tr key={episodio.id} className="hover:bg-gray-50">
                <td className="px-4 py-4">
                  <Link
                    href={`/episodios/${episodio.id}`}
                    className="font-medium text-ahead-primary hover:underline"
                  >
                    {episodio.codigo}
                  </Link>
                </td>
                <td className="px-4 py-4">
                  <div>
                    <p className="font-medium text-gray-900">{episodio.paciente.nombre}</p>
                    <p className="text-sm text-gray-500">{episodio.paciente.documento}</p>
                  </div>
                </td>
                <td className="px-4 py-4 text-sm text-gray-600">{episodio.producto}</td>
                <td className="px-4 py-4">
                  <FaseBadge fase={episodio.fase} />
                </td>
                <td className="px-4 py-4 text-sm text-gray-600">
                  {estadoLabels[episodio.estado] || episodio.estado}
                </td>
                <td className="px-4 py-4 text-center">
                  <SemaforoBadge semaforo={episodio.semaforo} />
                </td>
                <td className="px-4 py-4">
                  {episodio.fechaCirugia ? (
                    <div>
                      <p className="text-sm text-gray-900">{episodio.fechaCirugia}</p>
                      <p className="text-xs text-gray-500">
                        {episodio.diasRestantes && episodio.diasRestantes > 0
                          ? `${episodio.diasRestantes} días`
                          : 'Fecha pasada'}
                      </p>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-400">Sin fecha</span>
                  )}
                </td>
                <td className="px-4 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/episodios/${episodio.id}`}
                      className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-ahead-primary"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </Link>
                    <button className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Mostrando <span className="font-medium">1</span> a{' '}
          <span className="font-medium">{episodios.length}</span> de{' '}
          <span className="font-medium">{episodios.length}</span> episodios
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
