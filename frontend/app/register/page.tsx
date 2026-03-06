// 'use client';
// import { useState } from 'react';
// import { apiFetch } from '@/lib/api';
// import { useRouter } from 'next/navigation';

// export default function RegisterPage() {
//   const router = useRouter();
//   const [form, setForm] = useState({
//     name: '',
//     email: '',
//     password: '',
//   });
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   async function submit() {
//     setError('');
//     setLoading(true);

//     try {
//       await apiFetch('/auth/register', {
//         method: 'POST',
//         body: JSON.stringify(form),
//       });

//       // redirect to login after successful registration
//       router.push('/login');
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div>
//       <h1>Register</h1>

//       {error && <p style={{ color: 'red' }}>{error}</p>}

//       <input
//         placeholder="Name"
//         onChange={e => setForm({ ...form, name: e.target.value })}
//       />
//       <input
//         placeholder="Email"
//         onChange={e => setForm({ ...form, email: e.target.value })}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         onChange={e => setForm({ ...form, password: e.target.value })}
//       />

//       <button onClick={submit} disabled={loading}>
//         {loading ? 'Registering...' : 'Register'}
//       </button>
//     </div>
//   );
// }

'use client';
import { useState, FormEvent } from 'react';
import { apiFetch } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { AuthLayout, InputField, Button, ErrorMessage } from '../components/auth-ui'; // Adjust path as needed

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError('');

    // Client-side password match check before hitting the API
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match. Please try again.');
      return;
    }

    setLoading(true);

    try {
      await apiFetch('/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      });

      // Redirect to login after successful registration
      router.push('/login');
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start managing your construction jobs today"
    >
      <form className="space-y-6" onSubmit={submit}>

        <ErrorMessage message={error} />

        <InputField
          id="name"
          type="text"
          label="Full Name"
          placeholder="John Smith"
          required
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />

        <InputField
          id="email"
          type="email"
          label="Email Address"
          placeholder="foreman@site.com"
          required
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
        />

        <InputField
          id="password"
          type="password"
          label="Password"
          placeholder="••••••••"
          required
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
        />

        <InputField
          id="confirmPassword"
          type="password"
          label="Confirm Password"
          placeholder="••••••••"
          required
          value={form.confirmPassword}
          onChange={e => setForm({ ...form, confirmPassword: e.target.value })}
        />

        <div className="flex flex-col gap-3 pt-2">
          <Button type="submit" isLoading={loading} variant="primary">
            Create Account
          </Button>

          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Already have an account?
              </span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/login')}
            disabled={loading}
          >
            Sign In Instead
          </Button>
        </div>

      </form>
    </AuthLayout>
  );
}