import { Suspense } from 'react';
import PageContent from '@/app/tong-quan/danh-sach-cua-hang/shops';
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Danh sách cửa hàng - POSX',
};

export default function Page() {
  return (
    <Suspense>
      <PageContent />
    </Suspense>
  );
}