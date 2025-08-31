'use client';

import { useEffect, useMemo } from 'react';
import Cal, { getCalApi } from '@calcom/embed-react';

export default function CalEmbed({ calLink, fullUrl }: { calLink?: string; fullUrl?: string }) {
  // Normalize full URL to "username/event" if provided
  const link = useMemo(() => {
    if (fullUrl) {
      try {
        const u = new URL(fullUrl);
        const path = u.pathname.replace(/^\//, '');
        return path || calLink || '';
      } catch {
        return calLink || '';
      }
    }
    return calLink || '';
  }, [calLink, fullUrl]);

  useEffect(() => {
    (async () => {
      const cal = await getCalApi();
      cal('ui', {
        layout: 'month_view',
        styles: { branding: { brandColor: '#6c5ce7' } },
      } as any);
    })();
  }, []);

  return (
    <div className="h-[80vh] w-full">
      <Cal calLink={link} style={{ width: '100%', height: '100%' }} config={{ layout: 'month_view' } as any} />
    </div>
  );
}


