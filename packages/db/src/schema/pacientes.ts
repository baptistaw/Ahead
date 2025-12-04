import {
  pgTable,
  uuid,
  varchar,
  text,
  date,
  boolean,
  timestamp,
  index,
  uniqueIndex,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { sexoEnum } from './enums';

// ============================================
// PACIENTES - Patient records
// ============================================

export const pacientes = pgTable(
  'pacientes',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    documentoTipo: varchar('documento_tipo', { length: 20 }).notNull(),
    documentoNumero: varchar('documento_numero', { length: 30 }).notNull(),
    nombres: varchar('nombres', { length: 100 }).notNull(),
    apellidos: varchar('apellidos', { length: 100 }).notNull(),
    fechaNacimiento: date('fecha_nacimiento').notNull(),
    sexo: sexoEnum('sexo').notNull(),
    genero: varchar('genero', { length: 50 }),
    email: varchar('email', { length: 255 }),
    telefonoPrincipal: varchar('telefono_principal', { length: 30 }).notNull(),
    telefonoSecundario: varchar('telefono_secundario', { length: 30 }),
    direccion: text('direccion'),
    ciudad: varchar('ciudad', { length: 100 }),
    contactoEmergenciaNombre: varchar('contacto_emergencia_nombre', { length: 200 }),
    contactoEmergenciaTelefono: varchar('contacto_emergencia_telefono', { length: 30 }),
    contactoEmergenciaRelacion: varchar('contacto_emergencia_relacion', { length: 50 }),
    clerkUserId: varchar('clerk_user_id', { length: 255 }).unique(),
    gamificacionActiva: boolean('gamificacion_activa').notNull().default(true),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    uniqueIndex('pacientes_documento_idx').on(table.documentoTipo, table.documentoNumero),
    index('pacientes_clerk_user_id_idx').on(table.clerkUserId),
    index('pacientes_apellidos_idx').on(table.apellidos),
  ]
);

export const pacientesRelations = relations(pacientes, ({ many, one }) => ({
  episodios: many(episodios),
  wearables: many(wearablesPaciente),
  logrosObtenidos: many(logrosObtenidos),
  mensajesRecibidos: many(mensajesDestinatarios),
}));

// Forward declarations
import type { episodios } from './episodios';
import type { wearablesPaciente, logrosObtenidos } from './gamificacion';
import type { mensajesDestinatarios } from './mensajes';
