import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  index,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { estadoCitaEnum, modalidadCitaEnum } from './enums';
import { episodios } from './episodios';
import { usuarios } from './usuarios';

// ============================================
// CITAS - Appointments
// ============================================

export const citas = pgTable(
  'citas',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    episodioId: uuid('episodio_id')
      .notNull()
      .references(() => episodios.id, { onDelete: 'cascade' }),
    profesionalId: uuid('profesional_id')
      .notNull()
      .references(() => usuarios.id),
    tipo: varchar('tipo', { length: 50 }).notNull(), // 'EVALUACION_ANESTESIA', 'NUTRICION', etc.
    modalidad: modalidadCitaEnum('modalidad').notNull().default('PRESENCIAL'),
    estado: estadoCitaEnum('estado').notNull().default('PROGRAMADA'),
    fechaHoraInicio: timestamp('fecha_hora_inicio', { withTimezone: true }).notNull(),
    fechaHoraFin: timestamp('fecha_hora_fin', { withTimezone: true }).notNull(),
    ubicacion: varchar('ubicacion', { length: 200 }),
    linkVideollamada: text('link_videollamada'),
    notasPrevias: text('notas_previas'),
    notasCita: text('notas_cita'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index('citas_episodio_idx').on(table.episodioId),
    index('citas_profesional_idx').on(table.profesionalId),
    index('citas_fecha_idx').on(table.fechaHoraInicio),
    index('citas_estado_idx').on(table.estado),
  ]
);

export const citasRelations = relations(citas, ({ one }) => ({
  episodio: one(episodios, {
    fields: [citas.episodioId],
    references: [episodios.id],
  }),
  profesional: one(usuarios, {
    fields: [citas.profesionalId],
    references: [usuarios.id],
  }),
}));
