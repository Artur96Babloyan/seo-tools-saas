'use client';

export const dynamic = "force-dynamic";

import { Suspense } from 'react';
import ResetPasswordPage from './ResetPasswordPageImpl';

export default function PageWrapper(props) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordPage {...props} />
    </Suspense>
  );
} 