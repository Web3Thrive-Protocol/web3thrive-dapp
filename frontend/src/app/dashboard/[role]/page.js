'use client';
import FreelancerDashboard from '@/components/dashboard/FreelancerDashboard';
import RecruiterDashboard from '@/components/dashboard/RecruiterDashboard';
import { redirect } from 'next/navigation';
import { use } from 'react';
import { Suspense } from 'react';
import Loading from './loading';

export default function DashboardPage({ params }) {
  // Properly unwrap the params promise
  const { role } = use(params);
  
  // Validate role parameter
  const validRoles = new Set(['freelancer', 'recruiter']);
  
  if (!validRoles.has(role)) {
    redirect('/register');
  }

  return (
    <>
    <Suspense fallback={<Loading />}>
      {role === 'freelancer' && <FreelancerDashboard />}
      {role === 'recruiter' && <RecruiterDashboard />}
    </Suspense>
    </>
  );
}

