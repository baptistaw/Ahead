import {
  pgTable,
  uuid,
  varchar,
  text,
  decimal,
  boolean,
  timestamp,
  index,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { tipoOrganizacionEnum } from './enums';

// ============================================
// ORGANIZACIONES - B2B partners (insurers, IAMC, etc.)
// ============================================

export const organizaciones = pgTable(
  'organizaciones',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    clerkOrganizationId: varchar('clerk_organization_id', { length: 255 }).unique(),
    nombre: varchar('nombre', { length: 200 }).notNull(),
    tipo: tipoOrganizacionEnum('tipo').notNull(),
    rut: varchar('rut', { length: 20 }).unique(),
    direccion: text('direccion'),
    telefono: varchar('telefono', { length: 30 }),
    emailContacto: varchar('email_contacto', { length: 255 }),
    personaContacto: varchar('persona_contacto', { length: 200 }),
    tarifaAcordadaUsd: decimal('tarifa_acordada_usd', { precision: 10, scale: 2 }),
    activo: boolean('activo').notNull().default(true),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index('organizaciones_tipo_idx').on(table.tipo),
    index('organizaciones_clerk_org_idx').on(table.clerkOrganizationId),
  ]
);

export const organizacionesRelations = relations(organizaciones, ({ many }) => ({
  episodios: many(episodios),
  cirujanos: many(cirujanosDerivadores),
}));

// ============================================
// CIRUJANOS_DERIVADORES - Referring surgeons
// ============================================

export const cirujanosDerivadores = pgTable(
  'cirujanos_derivadores',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    nombres: varchar('nombres', { length: 100 }).notNull(),
    apellidos: varchar('apellidos', { length: 100 }).notNull(),
    especialidad: varchar('especialidad', { length: 100 }),
    institucion: varchar('institucion', { length: 200 }),
    organizacionId: uuid('organizacion_id').references(() => organizaciones.id),
    telefono: varchar('telefono', { length: 30 }),
    email: varchar('email', { length: 255 }),
    clerkUserId: varchar('clerk_user_id', { length: 255 }).unique(),
    activo: boolean('activo').notNull().default(true),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index('cirujanos_organizacion_idx').on(table.organizacionId),
    index('cirujanos_apellidos_idx').on(table.apellidos),
  ]
);

export const cirujanosDerivadoresRelations = relations(cirujanosDerivadores, ({ one, many }) => ({
  organizacion: one(organizaciones, {
    fields: [cirujanosDerivadores.organizacionId],
    references: [organizaciones.id],
  }),
  episodiosDerivados: many(episodios),
}));

// Forward declarations
import type { episodios } from './episodios';
