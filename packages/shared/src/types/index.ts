// ============================================
// ENUMS
// ============================================

export const EstadoEpisodio = {
  DERIVADO: 'DERIVADO',
  CONTACTADO: 'CONTACTADO',
  ACEPTADO: 'ACEPTADO',
  EN_EVALUACION: 'EN_EVALUACION',
  EN_INTERVENCION: 'EN_INTERVENCION',
  EN_REEVALUACION: 'EN_REEVALUACION',
  SEMAFORO_EMITIDO: 'SEMAFORO_EMITIDO',
  EN_POSTOP: 'EN_POSTOP',
  COMPLETADO: 'COMPLETADO',
  ABANDONADO: 'ABANDONADO',
  RECHAZADO: 'RECHAZADO',
} as const;

export type EstadoEpisodio = (typeof EstadoEpisodio)[keyof typeof EstadoEpisodio];

export const FaseClinica = {
  F0: 'F0',
  F1: 'F1',
  F2: 'F2',
  F3: 'F3',
  F4: 'F4',
} as const;

export type FaseClinica = (typeof FaseClinica)[keyof typeof FaseClinica];

export const EstadoSemaforo = {
  VERDE: 'VERDE',
  AMBAR: 'AMBAR',
  ROJO: 'ROJO',
} as const;

export type EstadoSemaforo = (typeof EstadoSemaforo)[keyof typeof EstadoSemaforo];

export const TipoProducto = {
  STANDARD: 'STANDARD',
  FAST: 'FAST',
  SOLO_EVALUACION: 'SOLO_EVALUACION',
  MODULO_POSTOP: 'MODULO_POSTOP',
} as const;

export type TipoProducto = (typeof TipoProducto)[keyof typeof TipoProducto];

export const CanalPago = {
  B2C: 'B2C',
  B2B_SEGURO: 'B2B_SEGURO',
  B2B_IAMC: 'B2B_IAMC',
  B2B_PRESTADOR: 'B2B_PRESTADOR',
} as const;

export type CanalPago = (typeof CanalPago)[keyof typeof CanalPago];

export const RolUsuario = {
  SUPERADMIN: 'SUPERADMIN',
  ADMIN_CLINICA: 'ADMIN_CLINICA',
  MEDICO_LIDER: 'MEDICO_LIDER',
  PROFESIONAL_SALUD: 'PROFESIONAL_SALUD',
  ENFERMERO_COORDINADOR: 'ENFERMERO_COORDINADOR',
  ASISTENTE_ADMINISTRATIVO: 'ASISTENTE_ADMINISTRATIVO',
  CIRUJANO_DERIVADOR: 'CIRUJANO_DERIVADOR',
  PACIENTE: 'PACIENTE',
} as const;

export type RolUsuario = (typeof RolUsuario)[keyof typeof RolUsuario];

export const Especialidad = {
  ANESTESIOLOGIA: 'ANESTESIOLOGIA',
  NUTRICION: 'NUTRICION',
  KINESIOLOGIA: 'KINESIOLOGIA',
  PSICOLOGIA: 'PSICOLOGIA',
  ENFERMERIA: 'ENFERMERIA',
  MEDICINA_INTERNA: 'MEDICINA_INTERNA',
} as const;

export type Especialidad = (typeof Especialidad)[keyof typeof Especialidad];

export const SeveridadEvento = {
  LEVE: 'LEVE',
  MODERADO: 'MODERADO',
  GRAVE: 'GRAVE',
  CRITICO: 'CRITICO',
} as const;

export type SeveridadEvento = (typeof SeveridadEvento)[keyof typeof SeveridadEvento];

export const TipoWearable = {
  APPLE_WATCH: 'APPLE_WATCH',
  FITBIT: 'FITBIT',
  GARMIN: 'GARMIN',
  SAMSUNG_WATCH: 'SAMSUNG_WATCH',
  OXIMETRO: 'OXIMETRO',
  GLUCOMETRO: 'GLUCOMETRO',
  TENSIOMETRO: 'TENSIOMETRO',
  BALANZA_SMART: 'BALANZA_SMART',
} as const;

export type TipoWearable = (typeof TipoWearable)[keyof typeof TipoWearable];

// ============================================
// INTERFACES
// ============================================

export interface Usuario {
  id: string;
  clerkUserId: string;
  email: string;
  nombres: string | null;
  apellidos: string | null;
  telefono: string | null;
  avatarUrl: string | null;
  rol: RolUsuario;
  especialidad: Especialidad | null;
  activo: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Paciente {
  id: string;
  documentoTipo: string;
  documentoNumero: string;
  nombres: string;
  apellidos: string;
  fechaNacimiento: Date;
  sexo: 'M' | 'F' | 'X';
  email: string | null;
  telefonoPrincipal: string;
  telefonoSecundario: string | null;
  clerkUserId: string | null;
  gamificacionActiva: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Episodio {
  id: string;
  codigo: string;
  pacienteId: string;
  productoId: string;
  cirujanoDerivadorId: string | null;
  tipoCirugia: string | null;
  diagnosticoPrincipal: string | null;
  fechaCirugiaTentativa: Date | null;
  fechaCirugiaReal: Date | null;
  estado: EstadoEpisodio;
  faseActual: FaseClinica;
  fechaDerivacion: Date;
  fechaPrimerContacto: Date | null;
  fechaAceptacion: Date | null;
  fechaInicio: Date | null;
  fechaFin: Date | null;
  semaforoFinal: EstadoSemaforo | null;
  canalPago: CanalPago;
  createdAt: Date;
  updatedAt: Date;
}

export interface Producto {
  id: string;
  codigo: string;
  nombre: string;
  tipo: TipoProducto;
  descripcion: string | null;
  duracionSemanasMin: number | null;
  duracionSemanasMax: number | null;
  precioBaseUsd: number;
  activo: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================
// API RESPONSE TYPES
// ============================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// ============================================
// AUTH CONTEXT
// ============================================

export interface AuthContext {
  userId: string;
  email: string;
  rol: RolUsuario;
  organizacionId?: string;
}
