import { Suspense } from 'react';
import PageContent from '@/app/tong-quan/lich-su-giao-dich/transaction-history';
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Lịch sử giao dịch - POSX',
};

export default function Page() {
  return (
    <Suspense>
      <PageContent />
    </Suspense>
  );
}