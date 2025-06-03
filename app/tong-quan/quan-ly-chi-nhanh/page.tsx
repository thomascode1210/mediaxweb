import { Suspense } from 'react';
import PageContent from '@/app/tong-quan/quan-ly-chi-nhanh/branch-manage';
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Quản lý chi nhánh - POSX',
};

export default function Page() {
  return (
    <Suspense>
      <PageContent />
    </Suspense>
  );
}