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
import { pacientes } from './pacientes';
import { episodios } from './episodios';

// ============================================
// BOT_CONVERSACIONES - AI Bot conversations
// ============================================

export const botConversaciones = pgTable(
  'bot_conversaciones',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    pacienteId: uuid('paciente_id')
      .notNull()
      .references(() => pacientes.id, { onDelete: 'cascade' }),
    episodioId: uuid('episodio_id').references(() => episodios.id),
    titulo: varchar('titulo', { length: 200 }),
    contextoFase: varchar('contexto_fase', { length: 10 }), // F0-F4
    activa: boolean('activa').notNull().default(true),
    totalMensajes: integer('total_mensajes').notNull().default(0),
    ultimaActividad: timestamp('ultima_actividad', { withTimezone: true }).notNull().defaultNow(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index('bot_conv_paciente_idx').on(table.pacienteId),
    index('bot_conv_episodio_idx').on(table.episodioId),
    index('bot_conv_activa_idx').on(table.activa),
    index('bot_conv_ultima_actividad_idx').on(table.ultimaActividad),
  ]
);

export const botConversacionesRelations = relations(botConversaciones, ({ one, many }) => ({
  paciente: one(pacientes, {
    fields: [botConversaciones.pacienteId],
    references: [pacientes.id],
  }),
  episodio: one(episodios, {
    fields: [botConversaciones.episodioId],
    references: [episodios.id],
  }),
  mensajes: many(botMensajes),
}));

// ============================================
// BOT_MENSAJES - AI Bot messages
// ============================================

export const botMensajes = pgTable(
  'bot_mensajes',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    conversacionId: uuid('conversacion_id')
      .notNull()
      .references(() => botConversaciones.id, { onDelete: 'cascade' }),
    rol: varchar('rol', { length: 20 }).notNull(), // 'user', 'assistant', 'system'
    contenido: text('contenido').notNull(),
    tokensInput: integer('tokens_input'),
    tokensOutput: integer('tokens_output'),
    modelo: varchar('modelo', { length: 50 }), // 'claude-3-sonnet', 'gpt-4', etc.
    metadata: jsonb('metadata'), // Additional context, citations, etc.
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index('bot_msg_conversacion_idx').on(table.conversacionId),
    index('bot_msg_rol_idx').on(table.rol),
    index('bot_msg_created_idx').on(table.createdAt),
  ]
);

export const botMensajesRelations = relations(botMensajes, ({ one }) => ({
  conversacion: one(botConversaciones, {
    fields: [botMensajes.conversacionId],
    references: [botConversaciones.id],
  }),
}));

// ============================================
// BOT_CONOCIMIENTO - Bot knowledge base
// ============================================

export const botConocimiento = pgTable(
  'bot_conocimiento',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    categoria: varchar('categoria', { length: 50 }).notNull(), // 'FAQ', 'PROTOCOLO', 'EJERCICIO', etc.
    subcategoria: varchar('subcategoria', { length: 50 }),
    pregunta: text('pregunta'),
    contenido: text('contenido').notNull(),
    embedding: jsonb('embedding'), // Vector embedding for semantic search
    fasesAplicables: jsonb('fases_aplicables').$type<string[]>().default([]),
    tags: jsonb('tags').$type<string[]>().default([]),
    prioridad: integer('prioridad').notNull().default(0),
    activo: boolean('activo').notNull().default(true),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index('bot_conocimiento_categoria_idx').on(table.categoria),
    index('bot_conocimiento_activo_idx').on(table.activo),
  ]
);

// ============================================
// BOT_FEEDBACK - User feedback on bot responses
// ============================================

export const botFeedback = pgTable(
  'bot_feedback',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    mensajeId: uuid('mensaje_id')
      .notNull()
      .references(() => botMensajes.id, { onDelete: 'cascade' }),
    esUtil: boolean('es_util'),
    rating: integer('rating'), // 1-5
    comentario: text('comentario'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [index('bot_feedback_mensaje_idx').on(table.mensajeId)]
);

export const botFeedbackRelations = relations(botFeedback, ({ one }) => ({
  mensaje: one(botMensajes, {
    fields: [botFeedback.mensajeId],
    references: [botMensajes.id],
  }),
}));
