import { Suspense } from 'react';
import PageContent from './ai-agent';
// import { TableRowSkeleton } from '@/app/ui/skeletons';
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Trợ lí AI Lilas Maison - POSX',
};


export default function Page() {
  return (
    // <Suspense fallback={<TableRowSkeleton />}>
    <Suspense fallback={<div>Đang tải dữ liệu...</div>}>
      <PageContent />
    </Suspense>
  );
}
