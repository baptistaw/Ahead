import {
  pgTable,
  uuid,
  varchar,
  text,
  boolean,
  timestamp,
  index,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { estadoMensajeEnum } from './enums';
import { episodios } from './episodios';
import { usuarios } from './usuarios';
import { pacientes } from './pacientes';

// ============================================
// MENSAJES - Async messages
// ============================================

export const mensajes = pgTable(
  'mensajes',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    episodioId: uuid('episodio_id').references(() => episodios.id, { onDelete: 'cascade' }),

    // Sender can be usuario or paciente
    remitenteUsuarioId: uuid('remitente_usuario_id').references(() => usuarios.id),
    remitentePacienteId: uuid('remitente_paciente_id').references(() => pacientes.id),

    asunto: varchar('asunto', { length: 255 }),
    contenido: text('contenido').notNull(),

    // Reply chain
    mensajePadreId: uuid('mensaje_padre_id'),

    esUrgente: boolean('es_urgente').notNull().default(false),
    esBroadcast: boolean('es_broadcast').notNull().default(false),

    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index('mensajes_episodio_idx').on(table.episodioId),
    index('mensajes_remitente_usuario_idx').on(table.remitenteUsuarioId),
    index('mensajes_remitente_paciente_idx').on(table.remitentePacienteId),
    index('mensajes_padre_idx').on(table.mensajePadreId),
    index('mensajes_created_idx').on(table.createdAt),
  ]
);

export const mensajesRelations = relations(mensajes, ({ one, many }) => ({
  episodio: one(episodios, {
    fields: [mensajes.episodioId],
    references: [episodios.id],
  }),
  remitenteUsuario: one(usuarios, {
    fields: [mensajes.remitenteUsuarioId],
    references: [usuarios.id],
    relationName: 'remitenteUsuario',
  }),
  remitentePaciente: one(pacientes, {
    fields: [mensajes.remitentePacienteId],
    references: [pacientes.id],
  }),
  mensajePadre: one(mensajes, {
    fields: [mensajes.mensajePadreId],
    references: [mensajes.id],
    relationName: 'respuestas',
  }),
  respuestas: many(mensajes, { relationName: 'respuestas' }),
  destinatarios: many(mensajesDestinatarios),
  adjuntos: many(mensajesAdjuntos),
}));

// ============================================
// MENSAJES_DESTINATARIOS - Message recipients
// ============================================

export const mensajesDestinatarios = pgTable(
  'mensajes_destinatarios',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    mensajeId: uuid('mensaje_id')
      .notNull()
      .references(() => mensajes.id, { onDelete: 'cascade' }),

    // Recipient can be usuario or paciente
    destinatarioUsuarioId: uuid('destinatario_usuario_id').references(() => usuarios.id),
    destinatarioPacienteId: uuid('destinatario_paciente_id').references(() => pacientes.id),

    estado: estadoMensajeEnum('estado').notNull().default('ENVIADO'),
    fechaEntrega: timestamp('fecha_entrega', { withTimezone: true }),
    fechaLectura: timestamp('fecha_lectura', { withTimezone: true }),
  },
  (table) => [
    index('mensajes_dest_mensaje_idx').on(table.mensajeId),
    index('mensajes_dest_usuario_idx').on(table.destinatarioUsuarioId),
    index('mensajes_dest_paciente_idx').on(table.destinatarioPacienteId),
    index('mensajes_dest_estado_idx').on(table.estado),
  ]
);

export const mensajesDestinatariosRelations = relations(mensajesDestinatarios, ({ one }) => ({
  mensaje: one(mensajes, {
    fields: [mensajesDestinatarios.mensajeId],
    references: [mensajes.id],
  }),
  destinatarioUsuario: one(usuarios, {
    fields: [mensajesDestinatarios.destinatarioUsuarioId],
    references: [usuarios.id],
  }),
  destinatarioPaciente: one(pacientes, {
    fields: [mensajesDestinatarios.destinatarioPacienteId],
    references: [pacientes.id],
  }),
}));

// ============================================
// MENSAJES_ADJUNTOS - Message attachments
// ============================================

export const mensajesAdjuntos = pgTable(
  'mensajes_adjuntos',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    mensajeId: uuid('mensaje_id')
      .notNull()
      .references(() => mensajes.id, { onDelete: 'cascade' }),
    nombre: varchar('nombre', { length: 255 }).notNull(),
    tipoMime: varchar('tipo_mime', { length: 100 }).notNull(),
    tamanioBytes: varchar('tamanio_bytes', { length: 20 }).notNull(),
    urlStorage: text('url_storage').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [index('mensajes_adjuntos_mensaje_idx').on(table.mensajeId)]
);

export const mensajesAdjuntosRelations = relations(mensajesAdjuntos, ({ one }) => ({
  mensaje: one(mensajes, {
    fields: [mensajesAdjuntos.mensajeId],
    references: [mensajes.id],
  }),
}));
