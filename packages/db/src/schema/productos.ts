import {
  pgTable,
  uuid,
  varchar,
  text,
  integer,
  decimal,
  boolean,
  timestamp,
  index,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { tipoProductoEnum } from './enums';

// ============================================
// PRODUCTOS - Service products/programs
// ============================================

export const productos = pgTable(
  'productos',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    codigo: varchar('codigo', { length: 20 }).unique().notNull(),
    nombre: varchar('nombre', { length: 100 }).notNull(),
    tipo: tipoProductoEnum('tipo').notNull(),
    descripcion: text('descripcion'),
    duracionSemanasMin: integer('duracion_semanas_min'),
    duracionSemanasMax: integer('duracion_semanas_max'),
    precioBaseUsd: decimal('precio_base_usd', { precision: 10, scale: 2 }).notNull(),
    activo: boolean('activo').notNull().default(true),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [index('productos_tipo_idx').on(table.tipo), index('productos_activo_idx').on(table.activo)]
);

export const productosRelations = relations(productos, ({ many }) => ({
  episodios: many(episodios),
  fasesTemplate: many(fasesProductoTemplate),
}));

// ============================================
// FASES_PRODUCTO_TEMPLATE - Phase templates per product
// ============================================

export const fasesProductoTemplate = pgTable(
  'fases_producto_template',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    productoId: uuid('producto_id')
      .notNull()
      .references(() => productos.id),
    fase: varchar('fase', { length: 10 }).notNull(), // F0, F1, F2, F3, F4
    orden: integer('orden').notNull(),
    duracionDiasEstimada: integer('duracion_dias_estimada'),
    descripcion: text('descripcion'),
    actividadesRequeridas: text('actividades_requeridas'), // JSON array
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [index('fases_template_producto_idx').on(table.productoId)]
);

export const fasesProductoTemplateRelations = relations(fasesProductoTemplate, ({ one }) => ({
  producto: one(productos, {
    fields: [fasesProductoTemplate.productoId],
    references: [productos.id],
  }),
}));

// Forward declarations
import type { episodios } from './episodios';
