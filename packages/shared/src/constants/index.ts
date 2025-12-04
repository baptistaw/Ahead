// ============================================
// APP CONSTANTS
// ============================================

export const APP_NAME = 'AHEAD';
export const APP_DESCRIPTION = 'Clínica de Prehabilitación Quirúrgica Premium';

// ============================================
// PAGINATION
// ============================================

export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;

// ============================================
// PHASE LABELS
// ============================================

export const FASE_LABELS = {
  F0: 'Derivación',
  F1: 'Evaluación',
  F2: 'Intervención',
  F3: 'Reevaluación',
  F4: 'Postoperatorio',
} as const;

export const ESTADO_EPISODIO_LABELS = {
  DERIVADO: 'Derivado',
  CONTACTADO: 'Contactado',
  ACEPTADO: 'Aceptado',
  EN_EVALUACION: 'En Evaluación',
  EN_INTERVENCION: 'En Intervención',
  EN_REEVALUACION: 'En Reevaluación',
  SEMAFORO_EMITIDO: 'Semáforo Emitido',
  EN_POSTOP: 'En Postoperatorio',
  COMPLETADO: 'Completado',
  ABANDONADO: 'Abandonado',
  RECHAZADO: 'Rechazado',
} as const;

export const SEMAFORO_LABELS = {
  VERDE: 'Preparado para cirugía',
  AMBAR: 'Preparado con precauciones',
  ROJO: 'No apto para cirugía',
} as const;

export const ROL_LABELS = {
  SUPERADMIN: 'Super Administrador',
  ADMIN_CLINICA: 'Administrador Clínica',
  MEDICO_LIDER: 'Médico Líder',
  PROFESIONAL_SALUD: 'Profesional de Salud',
  ENFERMERO_COORDINADOR: 'Enfermero Coordinador',
  ASISTENTE_ADMINISTRATIVO: 'Asistente Administrativo',
  CIRUJANO_DERIVADOR: 'Cirujano Derivador',
  PACIENTE: 'Paciente',
} as const;

// ============================================
// PRODUCTS
// ============================================

export const PRODUCTOS_DEFAULT = [
  {
    codigo: 'STANDARD',
    nombre: 'Programa Estándar',
    tipo: 'STANDARD',
    duracionSemanasMin: 4,
    duracionSemanasMax: 8,
    precioBaseUsd: 1600,
  },
  {
    codigo: 'FAST',
    nombre: 'Programa FAST Oncológico',
    tipo: 'FAST',
    duracionSemanasMin: 1,
    duracionSemanasMax: 2,
    precioBaseUsd: 1000,
  },
  {
    codigo: 'EVAL',
    nombre: 'Solo Evaluación',
    tipo: 'SOLO_EVALUACION',
    duracionSemanasMin: null,
    duracionSemanasMax: null,
    precioBaseUsd: 400,
  },
  {
    codigo: 'POSTOP',
    nombre: 'Módulo Postoperatorio',
    tipo: 'MODULO_POSTOP',
    duracionSemanasMin: 2,
    duracionSemanasMax: 4,
    precioBaseUsd: 500,
  },
] as const;

// ============================================
// CLINICAL THRESHOLDS
// ============================================

export const CLINICAL_THRESHOLDS = {
  // Hemoglobin (g/dL)
  HB_NORMAL: 13,
  HB_ANEMIA_LEVE: 12,
  HB_ANEMIA_MODERADA: 10,

  // 6MWT improvement (meters)
  MEJORA_6MWT_MINIMA: 30,
  MEJORA_6MWT_SIGNIFICATIVA: 50,

  // Anxiety (GAD-7)
  ANSIEDAD_LEVE: 5,
  ANSIEDAD_MODERADA: 10,
  ANSIEDAD_SEVERA: 15,

  // SpO2 (%)
  SPO2_NORMAL: 95,
  SPO2_ALERTA: 92,
  SPO2_CRITICO: 90,

  // Steps per day
  PASOS_OBJETIVO_MINIMO: 5000,
  PASOS_OBJETIVO_IDEAL: 8000,
} as const;
