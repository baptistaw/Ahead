import {
  pgTable,
  uuid,
  varchar,
  text,
  integer,
  decimal,
  jsonb,
  boolean,
  timestamp,
  index,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { tipoWearableEnum, tipoMetricaEnum, tipoLogroEnum } from './enums';
import { pacientes } from './pacientes';
import { episodios } from './episodios';

// ============================================
// WEARABLES_PACIENTE - Patient wearable devices
// ============================================

export const wearablesPaciente = pgTable(
  'wearables_paciente',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    pacienteId: uuid('paciente_id')
      .notNull()
      .references(() => pacientes.id, { onDelete: 'cascade' }),
    tipo: tipoWearableEnum('tipo').notNull(),
    marca: varchar('marca', { length: 50 }),
    modelo: varchar('modelo', { length: 100 }),
    terraUserId: varchar('terra_user_id', { length: 255 }), // Terra API integration
    terraProvider: varchar('terra_provider', { length: 50 }),
    fechaVinculacion: timestamp('fecha_vinculacion', { withTimezone: true }).notNull().defaultNow(),
    activo: boolean('activo').notNull().default(true),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index('wearables_paciente_idx').on(table.pacienteId),
    index('wearables_terra_user_idx').on(table.terraUserId),
    index('wearables_activo_idx').on(table.activo),
  ]
);

export const wearablesPacienteRelations = relations(wearablesPaciente, ({ one, many }) => ({
  paciente: one(pacientes, {
    fields: [wearablesPaciente.pacienteId],
    references: [pacientes.id],
  }),
  metricas: many(metricasWearable),
}));

// ============================================
// METRICAS_WEARABLE - Wearable metrics data
// ============================================

export const metricasWearable = pgTable(
  'metricas_wearable',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    wearableId: uuid('wearable_id')
      .notNull()
      .references(() => wearablesPaciente.id, { onDelete: 'cascade' }),
    episodioId: uuid('episodio_id').references(() => episodios.id),
    tipoMetrica: tipoMetricaEnum('tipo_metrica').notNull(),
    valor: decimal('valor', { precision: 10, scale: 4 }).notNull(),
    unidad: varchar('unidad', { length: 20 }),
    valorMinimo: decimal('valor_minimo', { precision: 10, scale: 4 }),
    valorMaximo: decimal('valor_maximo', { precision: 10, scale: 4 }),
    fechaMedicion: timestamp('fecha_medicion', { withTimezone: true }).notNull(),
    datosAdicionales: jsonb('datos_adicionales'), // sleep stages, HR zones, etc.
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index('metricas_wearable_idx').on(table.wearableId),
    index('metricas_episodio_idx').on(table.episodioId),
    index('metricas_tipo_idx').on(table.tipoMetrica),
    index('metricas_fecha_idx').on(table.fechaMedicion),
  ]
);

export const metricasWearableRelations = relations(metricasWearable, ({ one }) => ({
  wearable: one(wearablesPaciente, {
    fields: [metricasWearable.wearableId],
    references: [wearablesPaciente.id],
  }),
  episodio: one(episodios, {
    fields: [metricasWearable.episodioId],
    references: [episodios.id],
  }),
}));

// ============================================
// LOGROS_CATALOGO - Achievement definitions
// ============================================

export const logrosCatalogo = pgTable(
  'logros_catalogo',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    codigo: varchar('codigo', { length: 50 }).unique().notNull(),
    nombre: varchar('nombre', { length: 100 }).notNull(),
    descripcion: text('descripcion'),
    tipo: tipoLogroEnum('tipo').notNull(),
    icono: varchar('icono', { length: 50 }),
    puntosRecompensa: integer('puntos_recompensa').notNull().default(10),
    criterios: jsonb('criterios').notNull(), // JSON with achievement criteria
    activo: boolean('activo').notNull().default(true),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [index('logros_catalogo_tipo_idx').on(table.tipo)]
);

export const logrosCatalogoRelations = relations(logrosCatalogo, ({ many }) => ({
  logrosObtenidos: many(logrosObtenidos),
}));

// ============================================
// LOGROS_OBTENIDOS - Earned achievements
// ============================================

export const logrosObtenidos = pgTable(
  'logros_obtenidos',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    pacienteId: uuid('paciente_id')
      .notNull()
      .references(() => pacientes.id, { onDelete: 'cascade' }),
    logroId: uuid('logro_id')
      .notNull()
      .references(() => logrosCatalogo.id),
    episodioId: uuid('episodio_id').references(() => episodios.id),
    fechaObtencion: timestamp('fecha_obtencion', { withTimezone: true }).notNull().defaultNow(),
    datosContexto: jsonb('datos_contexto'), // Additional context when earned
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index('logros_obtenidos_paciente_idx').on(table.pacienteId),
    index('logros_obtenidos_logro_idx').on(table.logroId),
    index('logros_obtenidos_episodio_idx').on(table.episodioId),
  ]
);

export const logrosObtenidosRelations = relations(logrosObtenidos, ({ one }) => ({
  paciente: one(pacientes, {
    fields: [logrosObtenidos.pacienteId],
    references: [pacientes.id],
  }),
  logro: one(logrosCatalogo, {
    fields: [logrosObtenidos.logroId],
    references: [logrosCatalogo.id],
  }),
  episodio: one(episodios, {
    fields: [logrosObtenidos.episodioId],
    references: [episodios.id],
  }),
}));

// ============================================
// PUNTOS_PACIENTE - Patient points/score
// ============================================

export const puntosPaciente = pgTable(
  'puntos_paciente',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    pacienteId: uuid('paciente_id')
      .notNull()
      .references(() => pacientes.id, { onDelete: 'cascade' }),
    episodioId: uuid('episodio_id').references(() => episodios.id),
    puntos: integer('puntos').notNull(),
    motivo: varchar('motivo', { length: 100 }).notNull(),
    descripcion: text('descripcion'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index('puntos_paciente_idx').on(table.pacienteId),
    index('puntos_episodio_idx').on(table.episodioId),
    index('puntos_created_idx').on(table.createdAt),
  ]
);

export const puntosPacienteRelations = relations(puntosPaciente, ({ one }) => ({
  paciente: one(pacientes, {
    fields: [puntosPaciente.pacienteId],
    references: [pacientes.id],
  }),
  episodio: one(episodios, {
    fields: [puntosPaciente.episodioId],
    references: [episodios.id],
  }),
}));
