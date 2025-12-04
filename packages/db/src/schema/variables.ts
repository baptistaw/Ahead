import {
  pgTable,
  uuid,
  varchar,
  text,
  jsonb,
  decimal,
  boolean,
  timestamp,
  index,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { fasesEpisodio } from './episodios';
import { usuarios } from './usuarios';

// ============================================
// VARIABLES_CATALOGO - Variable definitions catalog
// ============================================

export const variablesCatalogo = pgTable(
  'variables_catalogo',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    codigo: varchar('codigo', { length: 50 }).unique().notNull(), // F1_HB, F2_6MWT, etc.
    nombre: varchar('nombre', { length: 200 }).notNull(),
    descripcion: text('descripcion'),
    fasesAplicables: jsonb('fases_aplicables').$type<string[]>().default([]),
    tipoDato: varchar('tipo_dato', { length: 20 }).notNull(), // 'number', 'string', 'boolean', 'date', 'json'
    unidad: varchar('unidad', { length: 30 }),
    valorMinimo: decimal('valor_minimo', { precision: 10, scale: 2 }),
    valorMaximo: decimal('valor_maximo', { precision: 10, scale: 2 }),
    umbralVerde: decimal('umbral_verde', { precision: 10, scale: 2 }),
    umbralAmbar: decimal('umbral_ambar', { precision: 10, scale: 2 }),
    umbralRojo: decimal('umbral_rojo', { precision: 10, scale: 2 }),
    esKpi: boolean('es_kpi').notNull().default(false),
    codigoKpi: varchar('codigo_kpi', { length: 20 }), // K71-01, K72-05, etc.
    activo: boolean('activo').notNull().default(true),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index('variables_catalogo_codigo_idx').on(table.codigo),
    index('variables_catalogo_es_kpi_idx').on(table.esKpi),
  ]
);

export const variablesCatalogoRelations = relations(variablesCatalogo, ({ many }) => ({
  valores: many(variablesFase),
}));

// ============================================
// VARIABLES_FASE - Variable values per phase
// ============================================

export const variablesFase = pgTable(
  'variables_fase',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    faseEpisodioId: uuid('fase_episodio_id')
      .notNull()
      .references(() => fasesEpisodio.id, { onDelete: 'cascade' }),
    variableId: uuid('variable_id')
      .notNull()
      .references(() => variablesCatalogo.id),
    valorNumerico: decimal('valor_numerico', { precision: 10, scale: 4 }),
    valorTexto: text('valor_texto'),
    valorBooleano: boolean('valor_booleano'),
    valorFecha: timestamp('valor_fecha', { withTimezone: true }),
    valorJson: jsonb('valor_json'),
    registradoPorId: uuid('registrado_por_id').references(() => usuarios.id),
    fuente: varchar('fuente', { length: 50 }), // 'MANUAL', 'FORMULARIO', 'WEARABLE', 'CALCULADO'
    formularioInstanciaId: uuid('formulario_instancia_id'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index('variables_fase_fase_idx').on(table.faseEpisodioId),
    index('variables_fase_variable_idx').on(table.variableId),
    index('variables_fase_created_idx').on(table.createdAt),
  ]
);

export const variablesFaseRelations = relations(variablesFase, ({ one }) => ({
  faseEpisodio: one(fasesEpisodio, {
    fields: [variablesFase.faseEpisodioId],
    references: [fasesEpisodio.id],
  }),
  variable: one(variablesCatalogo, {
    fields: [variablesFase.variableId],
    references: [variablesCatalogo.id],
  }),
  registradoPor: one(usuarios, {
    fields: [variablesFase.registradoPorId],
    references: [usuarios.id],
  }),
}));
