import {
  pgTable,
  uuid,
  varchar,
  text,
  jsonb,
  integer,
  boolean,
  timestamp,
  index,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { tipoFormularioEnum, estadoFormularioEnum, faseClinicaEnum } from './enums';
import { fasesEpisodio } from './episodios';
import { usuarios } from './usuarios';

// ============================================
// FORMULARIOS_TEMPLATE - Form templates
// ============================================

export const formulariosTemplate = pgTable(
  'formularios_template',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    codigo: varchar('codigo', { length: 50 }).unique().notNull(),
    nombre: varchar('nombre', { length: 200 }).notNull(),
    tipo: tipoFormularioEnum('tipo').notNull(),
    fasesAplicables: jsonb('fases_aplicables').$type<string[]>().default([]),
    especialidadesAplicables: jsonb('especialidades_aplicables').$type<string[]>().default([]),
    esquema: jsonb('esquema').notNull(), // JSON Schema for form structure
    version: integer('version').notNull().default(1),
    requiereFirma: boolean('requiere_firma').notNull().default(false),
    activo: boolean('activo').notNull().default(true),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index('formularios_template_tipo_idx').on(table.tipo),
    index('formularios_template_activo_idx').on(table.activo),
  ]
);

export const formulariosTemplateRelations = relations(formulariosTemplate, ({ many }) => ({
  instancias: many(formularioInstancias),
}));

// ============================================
// FORMULARIO_INSTANCIAS - Form instances
// ============================================

export const formularioInstancias = pgTable(
  'formulario_instancias',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    faseEpisodioId: uuid('fase_episodio_id')
      .notNull()
      .references(() => fasesEpisodio.id, { onDelete: 'cascade' }),
    formularioTemplateId: uuid('formulario_template_id')
      .notNull()
      .references(() => formulariosTemplate.id),
    versionTemplate: integer('version_template').notNull(),
    estado: estadoFormularioEnum('estado').notNull().default('BORRADOR'),
    datos: jsonb('datos').$type<Record<string, unknown>>().default({}),
    creadoPorId: uuid('creado_por_id').references(() => usuarios.id),
    firmadoPorId: uuid('firmado_por_id').references(() => usuarios.id),
    fechaFirma: timestamp('fecha_firma', { withTimezone: true }),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index('formulario_instancias_fase_idx').on(table.faseEpisodioId),
    index('formulario_instancias_template_idx').on(table.formularioTemplateId),
    index('formulario_instancias_estado_idx').on(table.estado),
  ]
);

export const formularioInstanciasRelations = relations(formularioInstancias, ({ one }) => ({
  faseEpisodio: one(fasesEpisodio, {
    fields: [formularioInstancias.faseEpisodioId],
    references: [fasesEpisodio.id],
  }),
  template: one(formulariosTemplate, {
    fields: [formularioInstancias.formularioTemplateId],
    references: [formulariosTemplate.id],
  }),
  creadoPor: one(usuarios, {
    fields: [formularioInstancias.creadoPorId],
    references: [usuarios.id],
  }),
  firmadoPor: one(usuarios, {
    fields: [formularioInstancias.firmadoPorId],
    references: [usuarios.id],
  }),
}));
