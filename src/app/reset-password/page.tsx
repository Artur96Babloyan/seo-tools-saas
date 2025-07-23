import { redirect } from 'next/navigation';

export default function ResetPasswordRedirect(props: { searchParams?: { token?: string } }) {
  const token = props.searchParams?.token;
  if (token) {
    redirect(`/auth/reset-password?token=${encodeURIComponent(token)}`);
  }
  redirect('/auth/reset-password');
} 