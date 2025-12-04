import Image from 'next/image';
import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-ahead-light">
      <div className="w-full max-w-md">
        {/* Logo vertical con descriptor */}
        <div className="mb-8 flex flex-col items-center">
          <Image
            src="/images/logo-vertical.jpeg"
            alt="AHEAD - Clínica Integral de Optimización Quirúrgica"
            width={180}
            height={180}
            className="h-40 w-auto object-contain"
            priority
          />
          <p className="mt-4 text-center text-sm text-ahead-text">
            Un paso adelante de la cirugía
          </p>
        </div>
        <SignIn
          appearance={{
            elements: {
              rootBox: 'mx-auto',
              card: 'shadow-lg rounded-xl',
              headerTitle: 'text-ahead-primary font-heading',
              headerSubtitle: 'text-ahead-text',
              formButtonPrimary: 'bg-ahead-primary hover:bg-ahead-primary/90',
              formFieldInput: 'border-ahead-muted focus:border-ahead-secondary focus:ring-ahead-secondary',
              footerActionLink: 'text-ahead-secondary hover:text-ahead-secondary/80',
            },
          }}
        />
      </div>
    </div>
  );
}
