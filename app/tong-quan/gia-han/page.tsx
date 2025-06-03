import { Suspense } from 'react';
import PageContent from '@/app/tong-quan/gia-han/renew';
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Gia hạn gói phần mềm - POSX',
};

export default function Page() {
  return (
    <Suspense>
      <PageContent />
    </Suspense>
  );
}