'use client';

import { UserButton, useUser } from '@clerk/nextjs';
import { Bell, Search } from 'lucide-react';

export function Header() {
  const { user } = useUser();

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">
      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar pacientes, episodios..."
            className="h-10 w-80 rounded-lg border bg-gray-50 pl-10 pr-4 text-sm focus:border-ahead-primary focus:outline-none focus:ring-1 focus:ring-ahead-primary"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative rounded-lg p-2 text-gray-500 hover:bg-gray-100">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
        </button>

        {/* User info */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs text-gray-500">Profesional</p>
          </div>
          <UserButton
            afterSignOutUrl="/sign-in"
            appearance={{
              elements: {
                avatarBox: 'h-10 w-10',
              },
            }}
          />
        </div>
      </div>
    </header>
  );
}
