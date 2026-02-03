'use client';

import { useRouter } from 'next/navigation';
import { useAuth, useUser } from '@/firebase';
import { useState, useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Logo } from '@/components/icons/logo';

export default function LoginPage() {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (username === 'admin' && password === 'password') {
      // Set mock session
      localStorage.setItem('mock_session', 'true');
      // Trigger a reload or redirect. Since we modify the provider to read this,
      // a reload or state dispatch is needed. For simplicity, we can force reload 
      // or let the provider's useEffect pick it up if we trigger a window event, 
      // but a hard navigation ensures clean state.
      window.location.href = '/dashboard';
    } else {
      setError('Credenciales inválidas');
    }
  };

  useEffect(() => {
    if (!isUserLoading && user) {
      router.push('/dashboard');
    }
  }, [user, isUserLoading, router]);


  if (isUserLoading || user) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="mx-auto w-full max-w-sm">
        <CardHeader className="space-y-4 text-center">
          <Logo className="justify-center" />
          <CardTitle className="font-headline text-2xl">Iniciar Sesión</CardTitle>
          <CardDescription>
            Ingresa tus credenciales para acceder al sistema.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Usuario</Label>
              <Input
                id="username"
                type="text"
                placeholder="admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button type="submit" className="w-full">
              Entrar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

