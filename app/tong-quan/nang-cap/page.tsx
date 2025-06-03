import { Suspense } from 'react';
import PageContent from '@/app/tong-quan/nang-cap/upgrade';
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Nâng cấp tài khoản - POSX',
};

export default function Page() {
  return (
    <Suspense>
      <PageContent />
    </Suspense>
  );
}