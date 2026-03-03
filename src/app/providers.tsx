'use client';

import { Provider } from 'react-redux';
import { store } from './store';
import ToastViewport from '@/components/system/ToastViewport';
import { AppErrorBoundary } from '@/components/system/AppErrorBoundary';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <Provider store={store}>
      <AppErrorBoundary>
        {children}
        <ToastViewport />
      </AppErrorBoundary>
    </Provider>
  );
}
