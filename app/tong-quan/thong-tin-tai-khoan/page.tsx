import { Suspense } from 'react';
import PageContent from '@/app/tong-quan/thong-tin-tai-khoan/user-info';
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Thông tin tài khoản - POSX',
};

export default function Page() {
  return (
    <Suspense>
      <PageContent />
    </Suspense>
  );
}