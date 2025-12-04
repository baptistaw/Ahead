import { pgEnum } from 'drizzle-orm/pg-core';

// ============================================
// ENUMS - Based on ETAPA2 data model
// ============================================

export const estadoEpisodioEnum = pgEnum('estado_episodio', [
  'DERIVADO',
  'CONTACTADO',
  'ACEPTADO',
  'EN_EVALUACION',
  'EN_INTERVENCION',
  'EN_REEVALUACION',
  'SEMAFORO_EMITIDO',
  'EN_POSTOP',
  'COMPLETADO',
  'ABANDONADO',
  'RECHAZADO',
]);

export const faseClinicaEnum = pgEnum('fase_clinica', ['F0', 'F1', 'F2', 'F3', 'F4']);

export const estadoSemaforoEnum = pgEnum('estado_semaforo', ['VERDE', 'AMBAR', 'ROJO']);

export const tipoProductoEnum = pgEnum('tipo_producto', [
  'STANDARD',
  'FAST',
  'SOLO_EVALUACION',
  'MODULO_POSTOP',
]);

export const canalPagoEnum = pgEnum('canal_pago', ['B2C', 'B2B_SEGURO', 'B2B_IAMC', 'B2B_PRESTADOR']);

export const rolUsuarioEnum = pgEnum('rol_usuario', [
  'SUPERADMIN',
  'ADMIN_CLINICA',
  'MEDICO_LIDER',
  'PROFESIONAL_SALUD',
  'ENFERMERO_COORDINADOR',
  'ASISTENTE_ADMINISTRATIVO',
  'CIRUJANO_DERIVADOR',
  'PACIENTE',
]);

export const especialidadEnum = pgEnum('especialidad', [
  'ANESTESIOLOGIA',
  'NUTRICION',
  'KINESIOLOGIA',
  'PSICOLOGIA',
  'ENFERMERIA',
  'MEDICINA_INTERNA',
]);

export const sexoEnum = pgEnum('sexo', ['M', 'F', 'X']);

export const urgenciaEnum = pgEnum('urgencia', ['ELECTIVA', 'URGENTE', 'EMERGENCIA']);

export const estadoCitaEnum = pgEnum('estado_cita', [
  'PROGRAMADA',
  'CONFIRMADA',
  'EN_CURSO',
  'COMPLETADA',
  'CANCELADA',
  'NO_ASISTIO',
]);

export const modalidadCitaEnum = pgEnum('modalidad_cita', ['PRESENCIAL', 'TELEMEDICINA']);

export const estadoFormularioEnum = pgEnum('estado_formulario', ['BORRADOR', 'COMPLETO', 'FIRMADO']);

export const tipoFormularioEnum = pgEnum('tipo_formulario', [
  'CONSENTIMIENTO',
  'EVALUACION_INICIAL',
  'EVALUACION_ESPECIALIDAD',
  'PLAN_INTERVENCION',
  'SEGUIMIENTO',
  'ALTA',
  'PROM',
]);

export const severidadEventoEnum = pgEnum('severidad_evento', [
  'LEVE',
  'MODERADO',
  'GRAVE',
  'CRITICO',
]);

export const tipoWearableEnum = pgEnum('tipo_wearable', [
  'APPLE_WATCH',
  'FITBIT',
  'GARMIN',
  'SAMSUNG_WATCH',
  'OXIMETRO',
  'GLUCOMETRO',
  'TENSIOMETRO',
  'BALANZA_SMART',
]);

export const tipoMetricaEnum = pgEnum('tipo_metrica', [
  'PASOS',
  'FRECUENCIA_CARDIACA',
  'SPO2',
  'SUENO',
  'CALORIAS',
  'DISTANCIA',
  'PRESION_ARTERIAL',
  'GLUCOSA',
  'PESO',
]);

export const tipoLogroEnum = pgEnum('tipo_logro', [
  'PASOS_DIARIOS',
  'RACHA_EJERCICIO',
  'COMPLETAR_FORMULARIO',
  'ASISTIR_CITA',
  'META_SEMANAL',
  'OBJETIVO_CLINICO',
]);

export const estadoMensajeEnum = pgEnum('estado_mensaje', ['ENVIADO', 'ENTREGADO', 'LEIDO']);

export const tipoOrganizacionEnum = pgEnum('tipo_organizacion', [
  'SEGURO',
  'IAMC',
  'PRESTADOR_PRIVADO',
]);
