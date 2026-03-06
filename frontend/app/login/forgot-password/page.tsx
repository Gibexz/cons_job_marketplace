'use client';
import { useState, FormEvent } from 'react';
import { apiFetch } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { AuthLayout, InputField, Button, ErrorMessage } from '../../components/auth-ui'; // Adjust path as needed

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await apiFetch('/auth/forgot-password', {
        method: 'POST',
        body: JSON.stringify({ email }),
      });

      // Show success state rather than redirecting
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  // --- SUCCESS STATE ---
  // Shown after the API call succeeds, replaces the form
  if (submitted) {
    return (
      <AuthLayout
        title="Check your email"
        subtitle="Password reset instructions have been sent"
      >
        <div className="flex flex-col items-center gap-6 py-4">

          {/* Success Icon */}
          <div className="h-16 w-16 bg-orange-50 rounded-full flex items-center justify-center">
            <svg
              className="h-8 w-8 text-orange-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>

          {/* Confirmation Message */}
          <div className="text-center space-y-2">
            <p className="text-sm text-gray-600">
              We sent a password reset link to:
            </p>
            <p className="text-sm font-semibold text-gray-900 bg-gray-50 px-4 py-2 rounded-md border border-gray-200">
              {email}
            </p>
            <p className="text-xs text-gray-500 pt-1">
              If you don't see it, check your spam folder.
            </p>
          </div>

          <div className="w-full flex flex-col gap-3 pt-2">
            {/* Resend Option */}
            <Button
              type="button"
              variant="outline"
              onClick={() => setSubmitted(false)}
            >
              Resend Email
            </Button>

            {/* Back to Login */}
            <Button
              type="button"
              variant="secondary"
              onClick={() => router.push('/login')}
            >
              Back to Sign In
            </Button>
          </div>

        </div>
      </AuthLayout>
    );
  }

  // --- FORM STATE ---
  // Default view before submission
  return (
    <AuthLayout
      title="Forgot your password?"
      subtitle="Enter your email and we'll send you a reset link"
    >
      <form className="space-y-6" onSubmit={submit}>

        <ErrorMessage message={error} />

        {/* Info Banner */}
        <div className="rounded-md bg-orange-50 border border-orange-200 p-4">
          <div className="flex gap-3">
            <svg
              className="h-5 w-5 text-orange-600 mt-0.5 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20A10 10 0 0012 2z"
              />
            </svg>
            <p className="text-sm text-orange-800">
              Enter the email address linked to your Construction Job MarketPlace
              account and we will send you a secure reset link.
            </p>
          </div>
        </div>

        <InputField
          id="email"
          type="email"
          label="Email Address"
          placeholder="foreman@site.com"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <div className="flex flex-col gap-3 pt-2">
          <Button type="submit" isLoading={loading} variant="primary">
            Send Reset Link
          </Button>

          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Remembered your password?
              </span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/login')}
            disabled={loading}
          >
            Back to Sign In
          </Button>
        </div>

      </form>
    </AuthLayout>
  );
}