import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-ahead-light">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-ahead-primary">AHEAD</h1>
          <p className="mt-2 text-gray-600">Clínica de Prehabilitación Quirúrgica</p>
        </div>
        <SignIn
          appearance={{
            elements: {
              rootBox: 'mx-auto',
              card: 'shadow-lg',
              headerTitle: 'text-ahead-primary',
              headerSubtitle: 'text-gray-600',
              formButtonPrimary: 'bg-ahead-primary hover:bg-ahead-primary/90',
            },
          }}
        />
      </div>
    </div>
  );
}
