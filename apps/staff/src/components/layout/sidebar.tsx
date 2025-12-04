'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  MessageSquare,
  BarChart3,
  Settings,
  ClipboardList,
  Activity,
  Shield,
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Episodios', href: '/episodios', icon: ClipboardList },
  { name: 'Pacientes', href: '/pacientes', icon: Users },
  { name: 'Agenda', href: '/agenda', icon: Calendar },
  { name: 'Formularios', href: '/formularios', icon: FileText },
  { name: 'Mensajes', href: '/mensajes', icon: MessageSquare },
  { name: 'Monitoreo', href: '/monitoreo', icon: Activity },
  { name: 'KPIs', href: '/kpis', icon: BarChart3 },
  { name: 'Calidad', href: '/calidad', icon: Shield },
  { name: 'Configuración', href: '/configuracion', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-64 flex-col bg-ahead-primary text-white">
      {/* Logo */}
      <div className="flex h-16 items-center justify-center border-b border-white/10">
        <Link href="/dashboard" className="flex items-center gap-2">
          <span className="text-2xl font-bold">AHEAD</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-white/20 text-white'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-white/10 p-4">
        <p className="text-center text-xs text-white/50">
          AHEAD v0.1.0
          <br />
          Prehabilitación Quirúrgica
        </p>
      </div>
    </aside>
  );
}
