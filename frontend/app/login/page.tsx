'use client';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/api';
import { useAuth } from '@/context/auth-context';
// Import the components created above (adjust path as needed)
import { AuthLayout, InputField, Button, ErrorMessage } from '../components/auth-ui';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault(); // Prevent standard HTML form submission refresh
    setError('');
    setLoading(true);

    try {
      const res = await apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify(form),
      });

      // Assuming res.access_token is the correct path
      login(res.access_token);
      router.push('/dashboard');
    } catch (err: any) {
      // Handle cases where err.message might not exist
      setError(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout 
      title="Sign in to your account" 
      subtitle="Access your construction projects and dashboard"
    >
      <form className="space-y-6" onSubmit={submit}>
        
        <ErrorMessage message={error} />

        <InputField
          id="email"
          type="email"
          label="Email Address"
          placeholder="foreman@site.com"
          required
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
        />

        <div className="relative">
          <InputField
            id="password"
            type="password"
            label="Password"
            placeholder="••••••••"
            required
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
          />
          <div className="absolute top-0 right-0">
             <button 
               type="button"
               onClick={() => router.push('/login/forgot-password')}
               className="text-sm font-medium text-orange-600 hover:text-orange-500"
             >
               Forgot password?
             </button>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-2">
          <Button type="submit" isLoading={loading} variant="primary">
            Sign In
          </Button>
          
          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or</span>
            </div>
          </div>

          <Button 
            type="button" 
            variant="outline" 
            onClick={() => router.push('/register')}
            disabled={loading}
          >
            Create New Account
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
}
