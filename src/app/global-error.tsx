'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html>
      <body>
        <div style={{ 
          minHeight: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          padding: '1rem',
          fontFamily: 'system-ui, sans-serif'
        }}>
          <div style={{ 
            maxWidth: '28rem', 
            width: '100%', 
            padding: '2rem', 
            textAlign: 'center',
            backgroundColor: '#fff',
            borderRadius: '1rem',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>⚠️</div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
              出错了
            </h2>
            <p style={{ color: '#666', marginBottom: '1.5rem' }}>
              抱歉，应用程序出现了问题
            </p>
            <button
              onClick={reset}
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '0.75rem',
                fontWeight: '600',
                backgroundColor: '#3b82f6',
                color: '#fff',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              重试
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
