'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { removeToast } from '@/features/ui/uiSlice';

const toneClasses = {
  success: 'border-emerald-200 bg-emerald-50 text-emerald-800',
  error: 'border-red-200 bg-red-50 text-red-800',
  info: 'border-blue-200 bg-blue-50 text-blue-800',
} as const;

export default function ToastViewport() {
  const toasts = useAppSelector((state) => state.ui.toasts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!toasts.length) {
      return;
    }

    const timers = toasts.map((toast) =>
      window.setTimeout(() => dispatch(removeToast(toast.id)), 3500)
    );

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [dispatch, toasts]);

  if (!toasts.length) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed right-4 top-4 z-50 flex w-full max-w-sm flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto rounded-lg border px-4 py-3 text-sm shadow ${toneClasses[toast.type]}`}
          role="status"
          aria-live="polite"
        >
          {toast.title}
        </div>
      ))}
    </div>
  );
}
