import { pgTable, uuid, varchar, text, boolean, timestamp, index } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { rolUsuarioEnum, especialidadEnum } from './enums';

// ============================================
// USUARIOS - Staff members and professionals
// ============================================

export const usuarios = pgTable(
  'usuarios',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    clerkUserId: varchar('clerk_user_id', { length: 255 }).unique().notNull(),
    email: varchar('email', { length: 255 }).unique().notNull(),
    nombres: varchar('nombres', { length: 100 }),
    apellidos: varchar('apellidos', { length: 100 }),
    telefono: varchar('telefono', { length: 30 }),
    avatarUrl: text('avatar_url'),
    rol: rolUsuarioEnum('rol').notNull().default('PROFESIONAL_SALUD'),
    especialidad: especialidadEnum('especialidad'),
    registroProfesional: varchar('registro_profesional', { length: 50 }),
    activo: boolean('activo').notNull().default(true),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index('usuarios_clerk_user_id_idx').on(table.clerkUserId),
    index('usuarios_email_idx').on(table.email),
    index('usuarios_rol_idx').on(table.rol),
  ]
);

export const usuariosRelations = relations(usuarios, ({ many }) => ({
  citasComoProfesional: many(citas),
  mensajesEnviados: many(mensajes, { relationName: 'remitenteUsuario' }),
  mensajesRecibidos: many(mensajesDestinatarios),
  eventosClinicos: many(eventosClinicos),
}));

// Forward declarations for relations (will be imported from other files)
import type { citas } from './citas';
import type { mensajes, mensajesDestinatarios } from './mensajes';
import type { eventosClinicos } from './calidad';
