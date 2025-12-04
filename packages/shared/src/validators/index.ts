import { z } from 'zod';
import {
  EstadoEpisodio,
  FaseClinica,
  EstadoSemaforo,
  TipoProducto,
  CanalPago,
  RolUsuario,
} from '../types';

// ============================================
// BASE VALIDATORS
// ============================================

export const uuidSchema = z.string().uuid();

export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
});

export const dateRangeSchema = z.object({
  fechaDesde: z.coerce.date().optional(),
  fechaHasta: z.coerce.date().optional(),
});

// ============================================
// PACIENTE VALIDATORS
// ============================================

export const createPacienteSchema = z.object({
  documentoTipo: z.string().min(1).max(20),
  documentoNumero: z.string().min(1).max(30),
  nombres: z.string().min(1).max(100),
  apellidos: z.string().min(1).max(100),
  fechaNacimiento: z.coerce.date(),
  sexo: z.enum(['M', 'F', 'X']),
  genero: z.string().max(50).optional(),
  email: z.string().email().optional().nullable(),
  telefonoPrincipal: z.string().min(1).max(30),
  telefonoSecundario: z.string().max(30).optional().nullable(),
  direccion: z.string().optional().nullable(),
  ciudad: z.string().max(100).optional().nullable(),
  contactoEmergenciaNombre: z.string().max(200).optional().nullable(),
  contactoEmergenciaTelefono: z.string().max(30).optional().nullable(),
  contactoEmergenciaRelacion: z.string().max(50).optional().nullable(),
});

export const updatePacienteSchema = createPacienteSchema.partial();

// ============================================
// EPISODIO VALIDATORS
// ============================================

export const createEpisodioSchema = z.object({
  pacienteId: uuidSchema,
  productoId: uuidSchema,
  cirujanoDerivadorId: uuidSchema.optional().nullable(),
  tipoCirugia: z.string().max(200).optional().nullable(),
  diagnosticoPrincipal: z.string().optional().nullable(),
  fechaCirugiaTentativa: z.coerce.date().optional().nullable(),
  urgencia: z.enum(['ELECTIVA', 'URGENTE', 'EMERGENCIA']).default('ELECTIVA'),
  canalPago: z.nativeEnum(CanalPago),
  organizacionPagadoraId: uuidSchema.optional().nullable(),
  precioAcordadoUsd: z.number().positive().optional().nullable(),
});

export const updateEpisodioSchema = createEpisodioSchema.partial().extend({
  estado: z.nativeEnum(EstadoEpisodio).optional(),
  fechaPrimerContacto: z.coerce.date().optional().nullable(),
  fechaAceptacion: z.coerce.date().optional().nullable(),
  motivoCierre: z.string().optional().nullable(),
});

export const filtroEpisodiosSchema = paginationSchema.extend({
  estado: z.nativeEnum(EstadoEpisodio).optional(),
  fase: z.nativeEnum(FaseClinica).optional(),
  pacienteId: uuidSchema.optional(),
  search: z.string().optional(),
  fechaCirugiaDesde: z.coerce.date().optional(),
  fechaCirugiaHasta: z.coerce.date().optional(),
});

// ============================================
// CITA VALIDATORS
// ============================================

export const createCitaSchema = z.object({
  episodioId: uuidSchema,
  profesionalId: uuidSchema,
  tipo: z.string().min(1).max(50),
  modalidad: z.enum(['PRESENCIAL', 'TELEMEDICINA']).default('PRESENCIAL'),
  fechaHoraInicio: z.coerce.date(),
  fechaHoraFin: z.coerce.date(),
  ubicacion: z.string().max(200).optional().nullable(),
  linkVideollamada: z.string().url().optional().nullable(),
  notasPrevias: z.string().optional().nullable(),
});

export const updateCitaSchema = createCitaSchema.partial().extend({
  estado: z
    .enum(['PROGRAMADA', 'CONFIRMADA', 'EN_CURSO', 'COMPLETADA', 'CANCELADA', 'NO_ASISTIO'])
    .optional(),
  notasCita: z.string().optional().nullable(),
});

// ============================================
// FORMULARIO VALIDATORS
// ============================================

export const createFormularioInstanciaSchema = z.object({
  faseEpisodioId: uuidSchema,
  formularioTemplateId: uuidSchema,
  datos: z.record(z.unknown()).default({}),
});

export const updateFormularioInstanciaSchema = z.object({
  datos: z.record(z.unknown()),
  estado: z.enum(['BORRADOR', 'COMPLETO', 'FIRMADO']).optional(),
});

// ============================================
// MENSAJE VALIDATORS
// ============================================

export const createMensajeSchema = z.object({
  episodioId: uuidSchema.optional().nullable(),
  destinatarioId: uuidSchema.optional().nullable(),
  destinatariosIds: z.array(uuidSchema).optional(),
  asunto: z.string().max(255).optional().nullable(),
  contenido: z.string().min(1),
});

// ============================================
// TYPE EXPORTS
// ============================================

export type CreatePacienteInput = z.infer<typeof createPacienteSchema>;
export type UpdatePacienteInput = z.infer<typeof updatePacienteSchema>;
export type CreateEpisodioInput = z.infer<typeof createEpisodioSchema>;
export type UpdateEpisodioInput = z.infer<typeof updateEpisodioSchema>;
export type FiltroEpisodiosInput = z.infer<typeof filtroEpisodiosSchema>;
export type CreateCitaInput = z.infer<typeof createCitaSchema>;
export type UpdateCitaInput = z.infer<typeof updateCitaSchema>;
export type CreateFormularioInstanciaInput = z.infer<typeof createFormularioInstanciaSchema>;
export type UpdateFormularioInstanciaInput = z.infer<typeof updateFormularioInstanciaSchema>;
export type CreateMensajeInput = z.infer<typeof createMensajeSchema>;
