import { RolUsuario } from '../types';

// ============================================
// PERMISSION DEFINITIONS
// ============================================

export const PERMISOS = {
  // Episodios
  'episodios:read': [
    'SUPERADMIN',
    'ADMIN_CLINICA',
    'MEDICO_LIDER',
    'PROFESIONAL_SALUD',
    'ENFERMERO_COORDINADOR',
  ],
  'episodios:write': ['SUPERADMIN', 'ADMIN_CLINICA', 'MEDICO_LIDER', 'ENFERMERO_COORDINADOR'],
  'episodios:delete': ['SUPERADMIN', 'ADMIN_CLINICA'],

  // Pacientes
  'pacientes:read': [
    'SUPERADMIN',
    'ADMIN_CLINICA',
    'MEDICO_LIDER',
    'PROFESIONAL_SALUD',
    'ENFERMERO_COORDINADOR',
  ],
  'pacientes:write': ['SUPERADMIN', 'ADMIN_CLINICA', 'ENFERMERO_COORDINADOR'],

  // Formularios
  'formularios:read': [
    'SUPERADMIN',
    'ADMIN_CLINICA',
    'MEDICO_LIDER',
    'PROFESIONAL_SALUD',
    'ENFERMERO_COORDINADOR',
  ],
  'formularios:write': [
    'SUPERADMIN',
    'ADMIN_CLINICA',
    'MEDICO_LIDER',
    'PROFESIONAL_SALUD',
    'ENFERMERO_COORDINADOR',
  ],
  'formularios:firmar': ['SUPERADMIN', 'ADMIN_CLINICA', 'MEDICO_LIDER', 'PROFESIONAL_SALUD'],
  'formularios:admin': ['SUPERADMIN', 'ADMIN_CLINICA'],

  // Citas
  'citas:read': [
    'SUPERADMIN',
    'ADMIN_CLINICA',
    'MEDICO_LIDER',
    'PROFESIONAL_SALUD',
    'ENFERMERO_COORDINADOR',
  ],
  'citas:write': ['SUPERADMIN', 'ADMIN_CLINICA', 'ENFERMERO_COORDINADOR'],

  // KPIs
  'kpis:read': ['SUPERADMIN', 'ADMIN_CLINICA', 'MEDICO_LIDER'],
  'kpis:admin': ['SUPERADMIN', 'ADMIN_CLINICA'],

  // Calidad
  'calidad:read': ['SUPERADMIN', 'ADMIN_CLINICA', 'MEDICO_LIDER'],
  'calidad:write': ['SUPERADMIN', 'ADMIN_CLINICA', 'MEDICO_LIDER', 'PROFESIONAL_SALUD'],

  // Usuarios
  'usuarios:read': ['SUPERADMIN', 'ADMIN_CLINICA'],
  'usuarios:write': ['SUPERADMIN', 'ADMIN_CLINICA'],

  // Configuración
  'config:read': ['SUPERADMIN', 'ADMIN_CLINICA'],
  'config:write': ['SUPERADMIN'],

  // Mensajes
  'mensajes:read': [
    'SUPERADMIN',
    'ADMIN_CLINICA',
    'MEDICO_LIDER',
    'PROFESIONAL_SALUD',
    'ENFERMERO_COORDINADOR',
    'PACIENTE',
  ],
  'mensajes:write': [
    'SUPERADMIN',
    'ADMIN_CLINICA',
    'MEDICO_LIDER',
    'PROFESIONAL_SALUD',
    'ENFERMERO_COORDINADOR',
    'PACIENTE',
  ],

  // Wearables
  'wearables:read': [
    'SUPERADMIN',
    'ADMIN_CLINICA',
    'MEDICO_LIDER',
    'PROFESIONAL_SALUD',
    'ENFERMERO_COORDINADOR',
  ],
  'wearables:admin': ['SUPERADMIN', 'ADMIN_CLINICA'],
} as const;

export type Permiso = keyof typeof PERMISOS;

// ============================================
// PERMISSION HELPERS
// ============================================

export function tienePermiso(rol: RolUsuario, permiso: Permiso): boolean {
  const rolesPermitidos = PERMISOS[permiso];
  return rolesPermitidos?.includes(rol as (typeof rolesPermitidos)[number]) ?? false;
}

export function tieneAlgunPermiso(rol: RolUsuario, permisos: Permiso[]): boolean {
  return permisos.some((permiso) => tienePermiso(rol, permiso));
}

export function tieneTodosLosPermisos(rol: RolUsuario, permisos: Permiso[]): boolean {
  return permisos.every((permiso) => tienePermiso(rol, permiso));
}

// ============================================
// ROLE HIERARCHY
// ============================================

export const ROLES_STAFF: RolUsuario[] = [
  'SUPERADMIN',
  'ADMIN_CLINICA',
  'MEDICO_LIDER',
  'PROFESIONAL_SALUD',
  'ENFERMERO_COORDINADOR',
  'ASISTENTE_ADMINISTRATIVO',
];

export const ROLES_CLINICOS: RolUsuario[] = [
  'MEDICO_LIDER',
  'PROFESIONAL_SALUD',
  'ENFERMERO_COORDINADOR',
];

export const ROLES_ADMIN: RolUsuario[] = ['SUPERADMIN', 'ADMIN_CLINICA'];

export function esStaff(rol: RolUsuario): boolean {
  return ROLES_STAFF.includes(rol);
}

export function esClinico(rol: RolUsuario): boolean {
  return ROLES_CLINICOS.includes(rol);
}

export function esAdmin(rol: RolUsuario): boolean {
  return ROLES_ADMIN.includes(rol);
}
