import {
  pgTable,
  uuid,
  varchar,
  text,
  jsonb,
  boolean,
  timestamp,
  index,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { severidadEventoEnum } from './enums';
import { episodios } from './episodios';
import { usuarios } from './usuarios';

// ============================================
// EVENTOS_CLINICOS - Clinical events (SGC)
// ============================================

export const eventosClinicos = pgTable(
  'eventos_clinicos',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    episodioId: uuid('episodio_id')
      .notNull()
      .references(() => episodios.id, { onDelete: 'cascade' }),
    reportadoPorId: uuid('reportado_por_id')
      .notNull()
      .references(() => usuarios.id),

    tipo: varchar('tipo', { length: 50 }).notNull(), // 'COMPLICACION', 'INCIDENTE', 'QUEJA', etc.
    severidad: severidadEventoEnum('severidad').notNull(),
    descripcion: text('descripcion').notNull(),

    // Analysis
    analisisCausa: text('analisis_causa'),
    accionesTomadas: text('acciones_tomadas'),
    leccionesAprendidas: text('lecciones_aprendidas'),

    // Resolution
    resuelto: boolean('resuelto').notNull().default(false),
    resueltoPorId: uuid('resuelto_por_id').references(() => usuarios.id),
    fechaResolucion: timestamp('fecha_resolucion', { withTimezone: true }),
    notasResolucion: text('notas_resolucion'),

    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index('eventos_clinicos_episodio_idx').on(table.episodioId),
    index('eventos_clinicos_tipo_idx').on(table.tipo),
    index('eventos_clinicos_severidad_idx').on(table.severidad),
    index('eventos_clinicos_resuelto_idx').on(table.resuelto),
  ]
);

export const eventosClinicosRelations = relations(eventosClinicos, ({ one }) => ({
  episodio: one(episodios, {
    fields: [eventosClinicos.episodioId],
    references: [episodios.id],
  }),
  reportadoPor: one(usuarios, {
    fields: [eventosClinicos.reportadoPorId],
    references: [usuarios.id],
  }),
  resueltoPor: one(usuarios, {
    fields: [eventosClinicos.resueltoPorId],
    references: [usuarios.id],
  }),
}));

// ============================================
// ENCUESTAS_SATISFACCION - Satisfaction surveys
// ============================================

export const encuestasSatisfaccion = pgTable(
  'encuestas_satisfaccion',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    episodioId: uuid('episodio_id')
      .notNull()
      .references(() => episodios.id, { onDelete: 'cascade' }),
    tipo: varchar('tipo', { length: 50 }).notNull(), // 'NPS', 'CSAT', 'POST_FASE'
    fase: varchar('fase', { length: 10 }), // F0-F4
    respuestas: jsonb('respuestas').$type<Record<string, unknown>>().default({}),
    npsScore: varchar('nps_score', { length: 5 }),
    comentarios: text('comentarios'),
    fechaEnvio: timestamp('fecha_envio', { withTimezone: true }),
    fechaRespuesta: timestamp('fecha_respuesta', { withTimezone: true }),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index('encuestas_episodio_idx').on(table.episodioId),
    index('encuestas_tipo_idx').on(table.tipo),
  ]
);

export const encuestasSatisfaccionRelations = relations(encuestasSatisfaccion, ({ one }) => ({
  episodio: one(episodios, {
    fields: [encuestasSatisfaccion.episodioId],
    references: [episodios.id],
  }),
}));

// ============================================
// AUDITORIAS - Audit log
// ============================================

export const auditorias = pgTable(
  'auditorias',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    usuarioId: uuid('usuario_id').references(() => usuarios.id),
    accion: varchar('accion', { length: 50 }).notNull(), // 'CREATE', 'UPDATE', 'DELETE', 'VIEW'
    entidad: varchar('entidad', { length: 100 }).notNull(), // 'episodio', 'paciente', etc.
    entidadId: uuid('entidad_id'),
    datosAnteriores: jsonb('datos_anteriores'),
    datosNuevos: jsonb('datos_nuevos'),
    ip: varchar('ip', { length: 45 }),
    userAgent: text('user_agent'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index('auditorias_usuario_idx').on(table.usuarioId),
    index('auditorias_entidad_idx').on(table.entidad, table.entidadId),
    index('auditorias_created_idx').on(table.createdAt),
  ]
);

export const auditoriasRelations = relations(auditorias, ({ one }) => ({
  usuario: one(usuarios, {
    fields: [auditorias.usuarioId],
    references: [usuarios.id],
  }),
}));
