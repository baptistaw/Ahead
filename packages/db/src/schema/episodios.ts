import {
  pgTable,
  uuid,
  varchar,
  text,
  date,
  decimal,
  timestamp,
  index,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import {
  estadoEpisodioEnum,
  faseClinicaEnum,
  estadoSemaforoEnum,
  canalPagoEnum,
  urgenciaEnum,
} from './enums';
import { pacientes } from './pacientes';
import { productos } from './productos';
import { organizaciones, cirujanosDerivadores } from './organizaciones';

// ============================================
// EPISODIOS - Clinical episodes (main entity)
// ============================================

export const episodios = pgTable(
  'episodios',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    codigo: varchar('codigo', { length: 20 }).unique().notNull(),
    pacienteId: uuid('paciente_id')
      .notNull()
      .references(() => pacientes.id),
    productoId: uuid('producto_id')
      .notNull()
      .references(() => productos.id),
    cirujanoDerivadorId: uuid('cirujano_derivador_id').references(() => cirujanosDerivadores.id),
    organizacionPagadoraId: uuid('organizacion_pagadora_id').references(() => organizaciones.id),

    // Clinical info
    tipoCirugia: varchar('tipo_cirugia', { length: 200 }),
    diagnosticoPrincipal: text('diagnostico_principal'),
    urgencia: urgenciaEnum('urgencia').notNull().default('ELECTIVA'),

    // Dates
    fechaCirugiaTentativa: date('fecha_cirugia_tentativa'),
    fechaCirugiaReal: date('fecha_cirugia_real'),
    fechaDerivacion: timestamp('fecha_derivacion', { withTimezone: true }).notNull().defaultNow(),
    fechaPrimerContacto: timestamp('fecha_primer_contacto', { withTimezone: true }),
    fechaAceptacion: timestamp('fecha_aceptacion', { withTimezone: true }),
    fechaInicio: timestamp('fecha_inicio', { withTimezone: true }),
    fechaFin: timestamp('fecha_fin', { withTimezone: true }),

    // State
    estado: estadoEpisodioEnum('estado').notNull().default('DERIVADO'),
    faseActual: faseClinicaEnum('fase_actual').notNull().default('F0'),
    semaforoFinal: estadoSemaforoEnum('semaforo_final'),
    motivoCierre: text('motivo_cierre'),

    // Billing
    canalPago: canalPagoEnum('canal_pago').notNull(),
    precioAcordadoUsd: decimal('precio_acordado_usd', { precision: 10, scale: 2 }),

    // Metadata
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index('episodios_paciente_idx').on(table.pacienteId),
    index('episodios_estado_idx').on(table.estado),
    index('episodios_fase_idx').on(table.faseActual),
    index('episodios_fecha_cirugia_idx').on(table.fechaCirugiaTentativa),
    index('episodios_cirujano_idx').on(table.cirujanoDerivadorId),
    index('episodios_organizacion_idx').on(table.organizacionPagadoraId),
  ]
);

export const episodiosRelations = relations(episodios, ({ one, many }) => ({
  paciente: one(pacientes, {
    fields: [episodios.pacienteId],
    references: [pacientes.id],
  }),
  producto: one(productos, {
    fields: [episodios.productoId],
    references: [productos.id],
  }),
  cirujanoDerivador: one(cirujanosDerivadores, {
    fields: [episodios.cirujanoDerivadorId],
    references: [cirujanosDerivadores.id],
  }),
  organizacionPagadora: one(organizaciones, {
    fields: [episodios.organizacionPagadoraId],
    references: [organizaciones.id],
  }),
  fases: many(fasesEpisodio),
  citas: many(citas),
  mensajes: many(mensajes),
  eventosClinicos: many(eventosClinicos),
}));

// ============================================
// FASES_EPISODIO - Phase instances for each episode
// ============================================

export const fasesEpisodio = pgTable(
  'fases_episodio',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    episodioId: uuid('episodio_id')
      .notNull()
      .references(() => episodios.id, { onDelete: 'cascade' }),
    fase: faseClinicaEnum('fase').notNull(),
    orden: varchar('orden', { length: 10 }).notNull(), // "1", "2" for repeated phases
    fechaInicio: timestamp('fecha_inicio', { withTimezone: true }),
    fechaFin: timestamp('fecha_fin', { withTimezone: true }),
    semaforoFase: estadoSemaforoEnum('semaforo_fase'),
    notasClinicas: text('notas_clinicas'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index('fases_episodio_episodio_idx').on(table.episodioId),
    index('fases_episodio_fase_idx').on(table.fase),
  ]
);

export const fasesEpisodioRelations = relations(fasesEpisodio, ({ one, many }) => ({
  episodio: one(episodios, {
    fields: [fasesEpisodio.episodioId],
    references: [episodios.id],
  }),
  formularios: many(formularioInstancias),
  variables: many(variablesFase),
}));

// Forward declarations
import type { citas } from './citas';
import type { mensajes } from './mensajes';
import type { eventosClinicos } from './calidad';
import type { formularioInstancias } from './formularios';
import type { variablesFase } from './variables';
