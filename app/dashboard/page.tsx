import { redirect } from 'next/navigation';

export default function DashRedirect() {
  redirect('/dashboard/home');
}
